"use server"
import { db } from "@/lib/db"
import bcrypt from "bcrypt"
import { signIn } from "next-auth/react"


interface User {
    email: string;
    password: string;
    name?: string;
}

export async function createUser(User: User) {
    try {
        const { email, password, name } = User;

        if (!email || !password || !name) {
            throw new Error("Invalid credentials");
        }

        const existingUser = await db.customer.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.customer.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });


    } catch (error) {
        console.error(error);
    }
}
