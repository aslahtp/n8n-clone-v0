import z from "zod";

export const userSignupSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
});

export const userSigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
