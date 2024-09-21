"use server"

import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getOrders = async () => {
    try {
        const session = await auth();

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
