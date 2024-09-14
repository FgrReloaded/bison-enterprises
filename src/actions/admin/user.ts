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


export async function getCustomers() {
    try {
        const session = await getServerSession(authOptions);

        if(!session || session.user.role !== "ADMIN"){
            return { error: 'Unauthorized' }
        }

        const allCustomers = await db.customer.findMany({
            select: {
                id: true,
                email: true,
                name: true,
            }
        });

        return allCustomers;

    } catch (error) {
        console.error(error);
    }
}

export async function getTotalCustomers() {
    try {
        const session = await getServerSession(authOptions);

        if(!session || session.user.role !== "ADMIN"){
            return { error: 'Unauthorized' }
        }

        const totalCustomers = await db.customer.count();

        return totalCustomers;

    } catch (error) {
        console.error(error);
    }
}

export async function getCustomerDetails(id: string) {
    try {
        const session = await getServerSession(authOptions);

        if(!session || session.user.role !== "ADMIN"){
            return { error: 'Unauthorized' }
        }

        const customer = await db.customer.findUnique({
            where: {
                id
            }
        });

        return customer;

    } catch (error) {
        console.error(error);
    }
}