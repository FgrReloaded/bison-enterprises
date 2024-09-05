"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function getAdminUsers() {
    try {
        const session = await getServerSession(authOptions);

        if(!session || session.user.role !== "ADMIN"){
            return { error: 'Unauthorized' }
        }

        const allAdmins = await db.admin.findMany({
            select: {
                id: true,
                email: true,
                name: true,
            }
        });

        return allAdmins;

    } catch (error) {
        console.error(error);
    }
}
