import { v4 as uuidv4 } from "uuid";
import mongoose, { Schema, Document } from "mongoose";

export interface ICredential extends Document {
  id: string;
  userId: string;
  type: string;
  credential: any;
}

const credentialSchema = new mongoose.Schema<ICredential>({
    id: { type: String, required: true, unique: true, default: () => uuidv4() },
    userId: { type: String, required: true },
    type: { type: String, required: true },
    credential: Schema.Types.Mixed,
});

export const Credential = mongoose.model<ICredential>(
  "Credential",
  credentialSchema
);

export const createCredential = async (credential: ICredential) => {
  try {
    const newCredential = new Credential(credential);
    await newCredential.save();
    return newCredential;
  } catch (error: any) {
    if (error.code === 11000) {
      const existingCredential = await Credential.findOne({
        userId: credential.userId,
        type: credential.type,
      });

      if (existingCredential) {
        return await Credential.findOneAndUpdate(
          { userId: credential.userId, type: credential.type },
          { credential: credential.credential },
          { new: true }
        );
      }
    }
    throw error;
  }
};

export const getCredentialById = async (id: string) => {
  const credential = await Credential.findById(id);
  return credential;
};

export const deleteCredentialById = async (id: string) => {
  const deletedCredential = await Credential.findByIdAndDelete(id);
  return deletedCredential;
};
