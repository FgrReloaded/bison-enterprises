"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db"
import { OrderStatus } from "@prisma/client";
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

export async function updateOrderStatus({id, status}:{id: string, status: OrderStatus}) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return;
        }

        const order = await db.order.update({
            where: {
                id
            },
            data: {
                status
            }
        })
        return order

    } catch (error) {
        console.error(error)
    }
}

export async function getTotalOrderAmount() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return;
        }

        const totalAmount = await db.order.aggregate({
            _sum: {
                total: true
            }
        })

        return { totalAmount: totalAmount._sum.total }

    } catch (error) {
        console.error(error)
    }
}

export async function getTotalOrders() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return;
        }

        const totalOrders = await db.order.count()

        return totalOrders

    } catch (error) {
        console.error(error)
    }
}


export async function getLatestOrders() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return;
        }

        const latestOrders = await db.order.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                total: true,
                customer: {
                    select: {
                        name: true
                    }
                }
            },
            take: 5
        })

        console.log('Latest Orders:', latestOrders);
        

        return latestOrders

    } catch (error) {
        console.error(error)
    }
}