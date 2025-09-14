import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, Bun.env.JWT_SECRET as string, (err, decoded) => {
    if (err || !decoded)
      return res.status(401).json({ message: "Unauthorized" });
    req.user = {
      id: (decoded as any).id,
      email: (decoded as any).email,
    };
    next();
  });
};
