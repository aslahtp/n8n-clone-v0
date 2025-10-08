import { Iworkflow, Inode } from "../db/schema";
import { v4 as uuidv4 } from "uuid";
import { nodeQueue } from "./queue";
import { Workflows } from "../db/model";
import { NodeRegistry, ToolRegistry } from "./nodeRegistry";
import { DynamicTool } from "@langchain/core/tools";
import { ToolInput } from "../nodes/types";

export interface ExecutionContext {
    executionId: string;
    workflowId: string;
    userId: string;
    startTime: Date;
}

export async function executeWorkflow(workflow: Iworkflow) {
    const nodes = workflow.nodes;
    const edges = workflow.connections;

    const startNode = nodes?.find(node => node.type == 'trigger');

    if (!startNode) {
        console.error("No TRIGGER node found in workflow");
        throw new Error("No TRIGGER node found in workflow");
    }

    const executionId = uuidv4();

    const State: ExecutionContext = {
        executionId: executionId,
        workflowId: workflow.id,
        userId: workflow.userId,
        startTime: new Date(),
    };
    await executeFromNode(startNode!, workflow, executionId);
}

export async function executeFromNode(currentNode: Inode, Workflow: Iworkflow, executionId: string) {
    if (!nodeQueue) {
        console.error("Redis queue not available. Cannot execute workflow.");
        throw new Error("Redis queue not available");
    }
    await nodeQueue.add("executeNode", {
        executionId: executionId,
        workflowId: Workflow.id,
        nodeId: currentNode.id,
    });
}

export async function executeNode(nodeId: string, workflowId: string, executionId: string) {
    console.log("executing node", nodeId);
    const workflow = await Workflows.findOne({ id: workflowId });

    const node = workflow?.nodes?.find(nd => nd.id === nodeId);

    if (node?.type == 'tool' || node?.type == 'model') return console.log(`Reached ${node.name}, and returning`);

    let tools: any[] = [];
    let model: any;

    if (node?.type == 'agent') {
        const outgoing = workflow?.connections?.filter(edge => edge.source.node == node.id) ?? [];

        const toolNodes = outgoing?.map(c => workflow?.nodes?.find(nd => nd.id == c.destination.node));

        toolNodes.map(tln => {
            if (tln?.type == 'model') {
                model = tln;
            } else {
                const baseTool = ToolRegistry[tln?.code!];

                const wrappedTool = new DynamicTool({
                    name: baseTool.name,
                    description: tln?.parameters!.description || baseTool.description,
                    func: async (input: string) => {
                        const ToolData: ToolInput = {
                            workflow: workflowId,
                            nodeId: tln?.id!,
                            parameters: tln?.parameters!,
                            credentials: tln?.credentials!,
                            executionId: executionId
                        };
                        return await baseTool.func({
                            AgentData: input,
                            ToolData: ToolData
                        });
                    }
                });

                tools.push(wrappedTool);
            }
        });
    }

    const NodeClass = NodeRegistry[node?.code ?? ""];

    if (!NodeClass) {
        console.log("Unknown node type");
    }

    const nodeInstance = new NodeClass();

    await nodeInstance.execute(node?.parameters, node?.credentials, tools, model);
}

