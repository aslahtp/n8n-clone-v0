import jwt from "jsonwebtoken";

export const generateToken = (email: string, userId: string) => {
  return jwt.sign({ email, id: userId }, Bun.env.JWT_SECRET as string);
};
