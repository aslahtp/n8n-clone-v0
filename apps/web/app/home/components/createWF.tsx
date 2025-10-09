"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_BASE_URL } from "../../../lib/config";
import { getToken } from "../../../lib/auth";

export function CreateWF() {
  const [wfName, setWFname] = useState<string>("");
  const router = useRouter();

  const createWorkflow = () => {
    const token = getToken();
    if (!token) {
      router.push("/signin");
      return;
    }

    axios
      .post(
        `${API_BASE_URL}/workflow/`,
        {
          title: wfName,
          enabled: false,
          nodes: [],
          connections: [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        router.push(`/workflow/${res.data.id}`);
      })
      .catch(console.error);
  };

  return (
    <div className="w-[400px] h-[200px] rounded-lg border border-white/10 flex flex-col justify-center items-center p-6 bg-[#2d2f2e]">
      <h1 className="text-white mb-4">Enter Workflow Name</h1>
      <input
        className="w-full p-2 rounded mb-4 text-black"
        value={wfName}
        onChange={(e) => {
          setWFname(e.target.value);
        }}
      />
      <button
        className="w-full cursor-pointer bg-[#d67062] text-white p-2 rounded"
        onClick={() => {
          createWorkflow();
        }}
      >
        Create
      </button>
    </div>
  );
}
