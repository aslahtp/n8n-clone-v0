import dotenv from "dotenv";
dotenv.config();

import express from "express";
import AuthRouter from "./routes/auth";
import WorkflowRouter from "./routes/workflows";
import { jwtVerify } from "./middlewares/jwt";
import { connectDB } from "./db/connection";
import cors from "cors";
import credentialsRoutes from "./routes/credentials";
import { seedNodes } from "./utils/seedNodes";

async function main() {
  const PORT = process.env.PORT || Bun.env.PORT || 4000;

  const app = express();
  await connectDB();
  await seedNodes();

  app.use(express.json());
  app.use(cors());

  app.get("/", (req, res) => {
    console.log("endpoint hit");
    res.json({ message: "Hello World" });
  });

  app.use("/auth", AuthRouter);
  app.use("/api/cred", credentialsRoutes);

  app.use(jwtVerify);

  app.use("/workflow", WorkflowRouter);

  app.listen(PORT, () => {
    console.log(`\nserver running at port ${PORT}`);
  });
}

main();
