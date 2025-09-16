import mongoose from "mongoose";
export const connectDB = () => mongoose.connect(Bun.env.MONGO_URI as string);