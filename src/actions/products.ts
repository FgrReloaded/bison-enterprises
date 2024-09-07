"use server"

import { db } from "@/lib/db";
import { Product } from "@prisma/client";


export const getProducts = async () => {
    try {
        const products = await db.product.findMany({
            where: {
                isHide: false 
            },
            select: {
                id: true,
                name: true,
                price: true,
                images: true,
                category: true,
            }
        });
        return products;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getProduct = async (id: string) => {
    try {
        const product = await db.product.findUnique({
            where: {
                id
            },
        });
        return product;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getFeaturedProducts = async () => {
    try {
        const products = await db.product.findMany({
            where: {
                isFeatured: true
            }
        });
        return products;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const searchProducts = async (query: string) => {
    try {
        const products = await db.product.findMany({
            where: {
                name: {
                    contains: query
                }
            }
        });
        return products;
    } catch (error) {
        console.log(error);
        return [];
    }
}