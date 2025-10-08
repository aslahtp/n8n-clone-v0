import { Router } from "express";
import { verifyToken } from "../middlewares/jwt";
import { Nodes, Workflows } from "../db/model";
import { executeWorkflow } from "../services/executionService";

const router: Router = Router();

router.post('/', verifyToken, async (req, res) => {
    try {
        const workflow = await Workflows.create({ ...req.body, userId: (req as any).user?.id || (req as any).userId });
        console.log("workflow created ");
        res.json({ message: "workflow created", id: workflow.id });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "error creating workflow" });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const userId = (req as any).user?.id || (req as any).userId;
        const workflows = await Workflows.find({ userId });
        res.json({ workflows });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "error getting workflow" });
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const workflow = await Workflows.findOne({ id: id });
        if (!workflow) return res.status(404).json({ message: "workflow not found" });
        res.json(workflow);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "error getting workflow" });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const workflow = await Workflows.replaceOne({ id: id }, req.body);
        res.json(workflow);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "error updating workflow" });
    }
});

router.post('/node', verifyToken, async (req, res) => {
    try {
        await Nodes.create(req.body);
        res.json({ message: "node created successfully" });
    } catch (e) {
        console.error("error creating node ", e);
        res.status(500).json({ message: "error creating node" });
    }
});

router.get('/node/get', verifyToken, async (req, res) => {
    try {
        const nodes = await Nodes.find();
        res.json({ nodes });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "error getting nodes" });
    }
});

router.post('/execute', verifyToken, async (req, res) => {
    const { id } = req.body;
    try {
        const workflow = await Workflows.findOne({ id: id });
        if (!workflow) return res.status(404).json({ message: "workflow not found" });
        await executeWorkflow(workflow);
        res.json({ message: "workflow executed" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "error executing workflow" });
    }
});

export default router;
