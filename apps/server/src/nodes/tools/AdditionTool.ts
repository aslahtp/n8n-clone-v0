import { DynamicTool } from "@langchain/core/tools";

export const AdditionTool = new DynamicTool({
    name: "AdditionTool",
    description: "Adds two numbers. Provide JSON: {\"a\": number, \"b\": number}",
    func: async (input: string) => {
        try {
            console.log("Addition agent hit");
            const { a, b } = JSON.parse(input);
            const result = Number(a) + Number(b);
            if (Number.isNaN(result)) throw new Error("Invalid numbers");
            return String(result);
        } catch {
            return "Error: expected JSON like {\"a\": 6, \"b\": 7}";
        }
    },
});

