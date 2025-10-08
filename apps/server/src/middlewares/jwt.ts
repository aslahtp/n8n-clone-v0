import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || (Bun.env.JWT_SECRET as string);

export const jwtVerify = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || !decoded)
      return res.status(401).json({ message: "Unauthorized" });
    (req as any).userId = (decoded as any).userId;
    next();
  });
};

export const verifyToken = jwtVerify;
