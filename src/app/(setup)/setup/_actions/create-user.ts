"use server"

import { db } from "@/lib/db";
import { adminExists } from "@/lib/check-if-admin";
import bcrypt from "bcrypt"

interface Admin{
    name: string;
    email: string;
    password: string;
}

export const createSuperUser = async ({name, email, password}:Admin) => {
    try {
        const isAdminExists = await adminExists();

        if (isAdminExists) {
            console.log('Superuser already exists');
            return false;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.admin.create({
            data: {
                name,
                email,
                password: hashedPassword,
                userType: 'ADMIN',
            },
        });

        return true;

    } catch (error) {
        console.error('Error creating superuser:', error);
    }
}
