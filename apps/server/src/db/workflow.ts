import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IConnection {
    source:{
            node:string;
            type?:string;
            }
    destination:{
                node:string;
                type?:string;
                }
    index?:string;
}

export interface INode {
    id: string;
    name: string;
    type: string;
    code: string;
    position: [number,number];
    parameters? : Record<string,any>;
    credentials? : Record<string,any>;
}

export interface IWorkflow extends Document {
    id: string;
    userId: string;
    title: string;
    enabled: boolean;
    nodes?: INode[];
    connections?: IConnection[];
}

export const ConnectionSchema = new Schema<IConnection>({
    source: {
        node: { type: String, required: true },
        type: { type: String }
    },
    destination: {
        node: { type: String, required: true },
        type: { type: String }
    },
    index: { type: String }
})

export const NodeSchema = new Schema<INode>({
    id: {type:String,required:true},
    name: String,
    type: String,
    code: String,
    position: {type:[Number],required:true},
    parameters: Schema.Types.Mixed,
    credentials: Schema.Types.Mixed
})

export const WorkflowSchema = new Schema<IWorkflow>({
    id:{type:String,unique:true,required:true,default: () => uuidv4()},
    userId:{type:String,required:true},
    title:String,
    enabled:Boolean,
    nodes:[NodeSchema],
    connections:[ConnectionSchema]
})

export const createWorkflow = async (workflow: IWorkflow) => {
    const newWorkflow = await Workflow.create(workflow);
    return newWorkflow;
}

export const getWorkflowsByUserId = async (userId: string) => {
    const workflows = await Workflow.find({ userId });
    return workflows;
}

export const getWorkflowById = async (id: string) => {
    const workflow = await Workflow.findById(id);
    return workflow;
}

export const updateWorkflow = async (id: string, workflow: IWorkflow) => {
    const updatedWorkflow = await Workflow.findByIdAndUpdate(id, workflow, { new: true });
    return updatedWorkflow;
}

export const deleteWorkflowById = async (id: string) => {
    const deletedWorkflow = await Workflow.findByIdAndDelete(id);
    return deletedWorkflow;
}

export const Workflow = mongoose.model<IWorkflow>("Workflow", WorkflowSchema);