import { Router } from "express";
import { verifyToken } from "../middlewares/jwt";
import { createWorkflow, getWorkflowsByUserId, getWorkflowById, updateWorkflow, deleteWorkflowById, type IWorkflow } from "../db/workflow";

const workflowsRoutes = Router();

workflowsRoutes.post("/", verifyToken, async (req, res) => {
    const { title, enabled, nodes, connections } = req.body;
    if (!req.user?.id) return res.status(401).json({ message: "User not authenticated" });

    const workflow = await createWorkflow({ title, enabled, nodes, connections, userId: req.user.id } as IWorkflow);
    res.status(200).json({ message: "Workflow created successfully", workflow });
});

workflowsRoutes.get("/", verifyToken, async (req, res) => {
    if (!req.user?.id) return res.status(401).json({ message: "User not authenticated" });
    const workflows = await getWorkflowsByUserId(req.user.id);
    res.status(200).json({ message: "Workflows fetched successfully", workflows });
});

workflowsRoutes.get("/:id", verifyToken, async (req, res) => {
    if (!req.user?.id) return res.status(401).json({ message: "User not authenticated" });
    const workflow = await getWorkflowById(req.params.id as string);
    res.status(200).json({ message: "Workflow fetched successfully", workflow });
});

workflowsRoutes.put("/:id", verifyToken, async (req, res) => {
    if (!req.user?.id) return res.status(401).json({ message: "User not authenticated" });
    const workflow = await updateWorkflow(req.params.id as string, req.body as IWorkflow);
    res.status(200).json({ message: "Workflow updated successfully", workflow });
});

workflowsRoutes.delete("/:id", verifyToken, async (req, res) => {
    if (!req.user?.id) return res.status(401).json({ message: "User not authenticated" });
    const workflow = await deleteWorkflowById(req.params.id as string);
    res.status(200).json({ message: "Workflow deleted successfully", workflow });
});


export default workflowsRoutes;
