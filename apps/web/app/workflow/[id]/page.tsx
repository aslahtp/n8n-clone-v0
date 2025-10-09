"use client";

import { useParams } from "next/navigation";
import { Graph } from "./components/Graph";
import axios from "axios";
import { useWorkflowStore } from "./components/utils/storeSaveWF";
import { API_BASE_URL } from "../../../lib/config";
import { getToken } from "../../../lib/auth";

export default function WorkflowPage() {
    const params = useParams();
    const { id } = params;

    return (
        <div className="bg-[#414244] w-screen h-screen">
            <Graph workflowId={id!.toString()} />
            <Execute />
        </div>
    );
}

function Execute() {
    const saveWorkFlow = useWorkflowStore(s => s.saveWorkFlow);
    const params = useParams();
    const id = params.id;

    const handleExecute = () => {
        const token = getToken();
        if (!token) return;

        saveWorkFlow && saveWorkFlow();
        axios.post(`${API_BASE_URL}/workflow/execute`, {
            id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data);
            alert("Workflow executed successfully!");
        }).catch(console.error);
    };

    return (
        <div className="bg-[#2d2f2e] w-[70vw] h-[53px] flex justify-center items-center ml-4 rounded-b-lg">
            <button
                className="cursor-pointer bg-[#ef4e39] text-white p-2 rounded-md font-semibold"
                onClick={handleExecute}
            >
                Execute Workflow
            </button>
        </div>
    );
}

