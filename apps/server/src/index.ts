import express from "express";
import { authRoutes } from "./routes/auth";
import cors from "cors";
import credentialsRoutes from "./routes/credentials";
import { connectDB } from "./db/connection";

const app = express();
await connectDB();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(express.json());
app.use(cors());

app.use("/api/auth",authRoutes)
app.use("/api/cred",credentialsRoutes)

app.listen(Bun.env.PORT, () => {
  console.log(`Server is running on port ${Bun.env.PORT}`);
});
