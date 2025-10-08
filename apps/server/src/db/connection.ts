import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL || Bun.env.MONGO_URI as string);
        console.log("connected to DB");
    } catch (e) {
        console.error("error connecting db", e);
    }
}