import mongoose from "mongoose";
import { CredentialsSchema, DBNodeSchema, WorkflowSchema, ConnectionSchema, NodeSchema } from "./schema";

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    userId: String,
});

export const Workflows = mongoose.model('workflows', WorkflowSchema);
export const Users = mongoose.model('users', UserSchema);
export const Nodes = mongoose.model('nodes', DBNodeSchema);
export const Credentials = mongoose.model('credentials', CredentialsSchema);

