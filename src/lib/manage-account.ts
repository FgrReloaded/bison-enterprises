import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "./db"

export async function getProfile() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return null
    }

    try {
        const profile = await db.customer.findUnique({
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

export async function updateProfile(user: any) {
    let profile = await getProfile();

    if (!profile) {
        return null
    }


    try {
        const updatedProfile = await db.customer.update({
            where: {
                id: profile.id
            },
            data: {
                email: user.email,
                name: user.name,
                phone: user.phone,
            }
        })

        return updatedProfile

    } catch (error) {
        console.error(error)
    }
};