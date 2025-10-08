import { DynamicTool } from "@langchain/core/tools";
import axios from "axios";
import { ToolInput } from "../types";

export const FetchTool = new DynamicTool({
    name: "FetchTool",
    description: "The tool is used to get a joke.",

    func: async (input: string) => {
        try {
            console.log("Fetch Tool hit");
            console.log("Input type:", typeof input);
            console.log("Input value:", input);

            let parsedInput;
            if (typeof input === 'string') {
                parsedInput = JSON.parse(input);
            } else {
                parsedInput = input;
            }

            const { AgentData, ToolData } = parsedInput;
            const { url } = ToolData.parameters;

            console.log("The url is : ", url);

            const res = await axios.get(url);
            console.log("the response is ", res.data);
            return JSON.stringify(res.data);
        } catch (e) {
            console.log(e);
            return "Error: expected JSON like {\"url\": string}";
        }
    },
});

