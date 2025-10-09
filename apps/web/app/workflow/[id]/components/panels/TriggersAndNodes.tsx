"use client";

import { useEffect, useState } from "react";
import type { Node as ReactFlowNode } from "@xyflow/react";
import { DBNode } from "../../../../home/types";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { API_BASE_URL } from "../../../../../lib/config";
import { getToken } from "../../../../../lib/auth";

export function TriggersAndNodes({
    setNodes,
    isSelectingTool,
    setIsSelectingTool,
    isSelectingModel,
    setIsSelectingModel
}: {
    setNodes: React.Dispatch<React.SetStateAction<ReactFlowNode[]>>;
    isSelectingTool: boolean;
    setIsSelectingTool: React.Dispatch<React.SetStateAction<boolean>>;
    isSelectingModel: boolean;
    setIsSelectingModel: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [Nodes, SetNodes] = useState<DBNode[]>([]);
    const [selectedNodeType, setSelectedNodeType] = useState<string>("trigger");

    const getNodes = () => {
        const token = getToken();
        if (!token) return;

        axios
            .get(`${API_BASE_URL}/workflow/node/get`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                SetNodes(res.data.nodes);
            })
            .catch(console.error);
    };

    useEffect(() => {
        getNodes();
    }, [selectedNodeType]);

    const addNodeToCanvas = (node: DBNode) => {
        const newNode: ReactFlowNode = {
            id: uuidv4(),
            type: node.type === "trigger" ? "trigger" : node.type === "agent" ? "agent" : node.type === "tool" ? "tool" : node.type === "model" ? "model" : "node",
            data: {
                label: node.name,
                type: node.type,
                code: node.code,
                icon: node.icon,
                parameters: {},
                credentials: {},
                onSelectTool: () => setIsSelectingTool(true),
                onSelectModel: () => setIsSelectingModel(true)
            },
            position: {
                x: Math.random() * 400,
                y: Math.random() * 400,
            },
        };
        setNodes((nds) => [...nds, newNode]);
    };

    return (
        <div className="w-full h-full text-white bg-[#414244]">
            <div className="flex w-full p-3 items-center">
                <button
                    className={`w-1/2 text-xl font-bold cursor-pointer ${selectedNodeType == "trigger" ? " border-b-2 border-[#ef4e39]" : ""}`}
                    onClick={() => {
                        setSelectedNodeType("trigger");
                    }}
                >
                    Triggers
                </button>
                <button
                    className={`w-1/2 text-xl font-bold cursor-pointer ${selectedNodeType == "node" ? " border-b-2 border-[#ef4e39]" : ""}`}
                    onClick={() => {
                        setSelectedNodeType("node");
                    }}
                >
                    Nodes
                </button>
            </div>
            <div className="flex flex-col w-full">
                {Nodes.map((node, idx) => {
                    if ((node.type == "node" || node.type == 'agent') && selectedNodeType == "node") {
                        return (
                            <div
                                key={idx}
                                className="w-full p-3 cursor-pointer hover:bg-[#2d2f2e]"
                                onClick={() => {
                                    addNodeToCanvas(node);
                                }}
                            >
                                <h1>{node.name}</h1>
                                <h2 className="text-sm text-gray-400">{node.code}</h2>
                            </div>
                        );
                    }
                    if (node.type == "trigger" && selectedNodeType == "trigger") {
                        return (
                            <div
                                key={idx}
                                className="w-full p-3 cursor-pointer hover:bg-[#2d2f2e]"
                                onClick={() => {
                                    addNodeToCanvas(node);
                                }}
                            >
                                <h1>{node.name}</h1>
                                <h2 className="text-sm text-gray-400">{node.code}</h2>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

