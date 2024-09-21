
import {auth} from "@/auth"
import { db } from "@/lib/db"

export async function getAdmin() {
    const session = await auth();
    if (!session) {
        return null
    }

    try {
        const profile = await db.admin.findUnique({
            where: {
                id: session.user.id
            },
            select: {
                id: true,
                email: true,
                name: true,
                userType: true,
                phone: true,
            }
        })

        return profile

    } catch (error) {
        console.error(error)
    }
}