import { DefaultEdgeOptions, Edge, FitViewOptions, OnNodeDrag, type Node } from "@xyflow/react";
import DarkNode from "../nodes/DarkNode";
import { AgentNode } from "../nodes/AgentNode";
import { ToolNode } from "../nodes/ToolNode";
import { ModelNode } from "../nodes/ModelNode";
import { TriggerNode } from "../nodes/TriggerNode";

export const nodeTypes = { node: DarkNode, trigger: TriggerNode, agent: AgentNode, tool: ToolNode, model: ModelNode };

export const initialNodes: Node[] = [];

export const initialEdges: Edge[] = [];

export const fitViewOptions: FitViewOptions = {
    padding: 0.2,
};

export const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: true,
};

export const onNodeDrag: OnNodeDrag = (_, node) => {
    console.log("drag event", node.data);
};

