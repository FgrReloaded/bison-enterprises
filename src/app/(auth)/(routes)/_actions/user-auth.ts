"use server"
import { db } from "@/lib/db"
import bcrypt from "bcrypt"
import { signIn } from "next-auth/react"


interface User {
    email: string;
    password: string;
    name?: string;
}

export async function createUser(User: User): Promise<{ error: boolean; msg: string }> {
    try {
        const { email, password, name } = User;

        if (!email || !password || !name) {
            return { error: true, msg: "Invalid credentials" };
        }

        const existingUser = await db.customer.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { error: true, msg: "User already exists" };
        }
        console.log('Reached');
        
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.customer.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return { error: false, msg: "User created successfully" };

    } catch (error) {
        console.error(error);
        return { error: true, msg: "An error occurred" };
    }
}
