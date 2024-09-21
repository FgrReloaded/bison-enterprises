"use server"

import { db } from "@/lib/db";
import { auth } from "@/auth";


export const getBillboards = async () => {
    try {
        const billboards = await db.billBoard.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return billboards;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch billboards');
    }
}

export const createBillboard = async ({ title, tagline, link, image }: { title: string, tagline: string, link: string, image: string }) => {
    try {

        const session = await auth();

        if (!session || session.user.role !== 'ADMIN') {
            return;
        }

        if (!title || !tagline || !link || !image) {
            return;
        }

        const newBillboard = await db.billBoard.create({
            data: {
                title,
                tagline,
                link,
                image
            }
        });

        return newBillboard;

    } catch (error) {
        console.log(error);
        throw new Error('Failed to create billboard');
    }
}