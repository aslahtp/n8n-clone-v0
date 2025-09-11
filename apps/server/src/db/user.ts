import mongoose from "mongoose";
import type { IUser } from "../types/user";

mongoose.connect(Bun.env.MONGO_URI as string);

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", userSchema);

export const createUser = async (user: IUser ) => {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
};

export const getUserByEmail = async (email: string) => {
    return await User.findOne({ email });
}; 