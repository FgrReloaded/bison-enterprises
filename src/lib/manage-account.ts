"use server"

import {auth} from "@/auth"
import { db } from "./db"

export async function getProfile() {
    const session = await auth();
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
                state: true,
                city: true,
                address: true,
                pincode: true,
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
                name: user.name,
                phone: user.phone,
            },
            select: {
                id: true,
                email: true,
                name: true,
                userType: true,
                phone: true,
            }
        })

        return updatedProfile

    } catch (error) {
        console.error(error)
    }
};

export async function updateAddress(user: any) {
    let profile = await getProfile();

    if (!profile) {
        return null
    }

    try {
        await db.customer.update({
            where: {
                id: profile.id
            },
            data: {
                state: user.state,
                city: user.city,
                address: user.address,
                pincode: user.pincode,
            }
        })


    } catch (error) {
        console.error(error)
    }
}
