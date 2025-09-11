import express from "express";
import { generateToken } from "../utils/jwt";
import { userSigninSchema, userSignupSchema } from "../types/types";

const authRoutes = express.Router();

authRoutes.post("/signin", (req, res) => {
  const { email, password } = userSigninSchema.parse(req.body);
  const token = generateToken(email);
  res.status(200).json({ message: "Signin successful", token });
});

authRoutes.post("/signup", (req, res) => {
  const { email, password, name } = userSignupSchema.parse(req.body);
  const token = generateToken(email);
  res.status(200).json({ message: "Signup successful", token });
});

export { authRoutes };
