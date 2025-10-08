import { Inode } from "../db/schema";

export class ManualTrigger {
    async execute(
        parameters: Record<string, any>,
        credentials: Record<string, any>,
        tools: any[] = [],
        model: any
    ): Promise<{ success: boolean }> {
        console.log("manual trigger executed");

        return {
            success: true
        };
    }
}

