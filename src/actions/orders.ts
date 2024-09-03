"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export const getOrders = async () => {
    try {
        const session = await getServerSession(authOptions);

        if (!session) throw new Error('You need to be signed in to get orders')
        let customerId = session.user.id;

        const orders = await db.order.findMany({
            where: {
                customerId: customerId
            },
        });
        return orders;
    } catch (error) {
        console.log(error);
        return [];
    }
}
