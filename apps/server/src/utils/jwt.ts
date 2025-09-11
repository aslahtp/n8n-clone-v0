import jwt from "jsonwebtoken";

export const generateToken = (email: string) => {
  return jwt.sign({ email }, Bun.env.JWT_SECRET as string);
};
