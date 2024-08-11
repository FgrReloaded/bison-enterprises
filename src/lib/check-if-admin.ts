"use server"
import { db } from "@/lib/db";

export const adminExists = async () => {
    try {
        const existingSuperUser = await db.admin.findFirst({
            where: { userType: 'ADMIN' },
        });

        if (!existingSuperUser) {
            return false;
        }

        return true;

    } catch (error) {
        console.error('Error checking admin:', error);
    }
}
