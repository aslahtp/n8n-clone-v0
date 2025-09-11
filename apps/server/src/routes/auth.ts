import express from "express";
import { generateToken } from "../utils/jwt";
import { userSigninSchemaZod, userSignupSchemaZod } from "../types/types";
import { createUser, getUserByEmail } from "../db/user";

const authRoutes = express.Router();

authRoutes.post("/signin", async (req, res) => {
  const result = userSigninSchemaZod.safeParse(req.body);
  if (!result.success)
    return res.status(401).json({ message: "Invalid Schema" });
  const { email, password } = result.data;
  if (!email || !password)
    return res.status(401).json({ message: "Invalid credentials" });
  const user = await getUserByEmail(email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  if (user.password !== password)
    return res.status(401).json({ message: "Invalid credentials" });
  const token = generateToken(email);
  res.status(200).json({ message: "Signin successful", token });
});

authRoutes.post("/signup", async (req, res) => {
  const result = userSignupSchemaZod.safeParse(req.body);
  if (!result.success)
    return res.status(401).json({ message: "Invalid Schema" });
  const { email, password, name } = result.data;
  if (!email || !password || !name)
    return res.status(401).json({ message: "Invalid credentials" });
  const user = await getUserByEmail(email);
  if (user) return res.status(401).json({ message: "User already exists" });
  const newUser = await createUser({ email, password, name });
  const token = generateToken(email);
  res.status(200).json({ message: "Signup successful", token });
});

export { authRoutes };
