import { Queue, Worker, Job } from "bullmq";
import { Redis } from "ioredis";
import { executeFromNode, executeNode } from "./executionService";
import { Iworkflow } from "../db/schema";
import { Workflows } from "../db/model";

let connection: Redis | null = null;

try {
    connection = new Redis({
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT || 6379),
        maxRetriesPerRequest: null,
        retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
        lazyConnect: true,
    });

    connection.on("error", (err) => {
        console.warn("Redis connection error:", err.message);
        console.warn("Workflow execution will not work until Redis is available");
    });

    connection.on("connect", () => {
        console.log("Connected to Redis");
    });
} catch (error) {
    console.warn("Failed to initialize Redis connection:", error);
    console.warn("Workflow execution will not work until Redis is available");
}

export const nodeQueue = connection ? new Queue('node-queue', { connection: connection! }) : null;

export const nodeWorker = connection ? new Worker('node-queue',
    async (job: Job) => {
        const { executionId, workflowId, nodeId } = job.data;

        console.log("executing node: ", nodeId);

        await executeNode(nodeId, workflowId, executionId);

        return {
            success: true,
            nodeId,
            executionId,
            workflowId
        };
    },
    { connection: connection! }
) : null;

if (nodeWorker) {
    nodeWorker.on("completed", async (job) => {
    const { executionId, workflowId, nodeId } = job.returnvalue;
    console.log(`Job ${job.id} for node ${nodeId} in workflow ${workflowId} completed`);

    const Workflow = await Workflows.findOne({ id: workflowId });

    if (!Workflow) return console.log("workflow not found");

    const outgoingEdges = Workflow.connections?.filter(edge => edge.source.node === nodeId) || [];
    for (const edge of outgoingEdges) {
        const nextNode = Workflow.nodes?.find(node => node.id === edge.destination.node);

        if (nextNode) {
            await executeFromNode(nextNode, Workflow, executionId);
        } else {
            console.log("next node not found");
        }
    }
    });

    nodeWorker.on("failed", (job, err) => {
        console.error(`Job ${job?.id} failed`, err);
    });
}

