import { Router } from "express";
import { v4 as uuidV4 } from "uuid";
import { Users } from "../db/model";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const router: Router = Router();
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || Bun.env.JWT_SECRET as string;
console.log('JWT_SECRET loaded:', JWT_SECRET ? 'Yes' : 'No');

router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        const userId = uuidV4();

        const user = await Users.findOne({ username });

        if (user) return res.status(401).json({ message: "user already exists" });

        await Users.create({ username, userId, password });

        console.log("user created");

        res.json({ userId });
    } catch (e) {
        res.status(500).json({ detail: e });
    }
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });

    if (!user) return res.status(401).json({ message: "user not found" });

    if (user.password !== password) return res.status(401).json({ message: "Incorrect credentials" });

    const token = jwt.sign({ userId: user.userId }, JWT_SECRET);

    res.json({ token });
});

export default router;
