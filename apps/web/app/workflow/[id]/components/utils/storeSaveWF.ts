import { create } from 'zustand';

interface workflowStore {
    saveWorkFlow: (() => void) | null;
    setSaveWorkFlow: (fn: () => void) => void;
}

export const useWorkflowStore = create<workflowStore>(set => ({
    saveWorkFlow: null,
    setSaveWorkFlow: (fn) => set({ saveWorkFlow: fn })
}));

