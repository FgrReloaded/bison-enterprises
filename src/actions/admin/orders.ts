"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db"
import { getServerSession } from "next-auth";

export async function fetchAllOrders() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return;
        }

        const orders = await db.order.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return orders

    } catch (error) {
        console.error(error)
    }
}

export async function deleteOrder(id: string) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return;
        }

        const order = await db.order.delete({
            where: {
                id
            }
        })
        return order

    } catch (error) {
        console.error(error)
    }
}