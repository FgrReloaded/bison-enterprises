"use server"

import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Product } from "@prisma/client";

export const getProducts = async () => {
    try {
        const products = await db.product.findMany();
        return products;
    } catch (error) {
        console.log(error);
    }
}


export const createProduct = async (product: Product) => {
    try {
        if (!product) throw new Error('No data to create product');
        const { name, description, price, stock, images } = product;

        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return;
        }

        if (!name || !description || !price || !stock || !images) {
            return;
        }

        const newProduct = await db.product.create({
            data: {
                name,
                description,
                price,
                stock,
                images
            }
        });

        return newProduct


    } catch (error) {
        console.log(error);
        throw new Error('Failed to create product');
    }
}