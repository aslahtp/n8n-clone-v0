import express from "express";
import { authRoutes } from "./routes/auth";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(express.json());

app.use("/auth",authRoutes)

app.listen(Bun.env.PORT, () => {
  console.log(`Server is running on port ${Bun.env.PORT}`);
});
