import z from "zod";

export const userSignupSchemaZod = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(4),
});

export const userSigninSchemaZod = z.object({
    email: z.string().email(),
    password: z.string().min(4),
});
