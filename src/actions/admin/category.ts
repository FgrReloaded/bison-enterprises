"use server"

import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getCategories = async () => {
    try {
        const categories = await db.category.findMany();

        return categories;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch categories');
    }
}

export const createCategory = async ({ categoryName }: { categoryName: string }) => {
    try {

        const session = await auth();

        if (!session || session.user.role !== 'ADMIN') {
            return;
        }

        if (!categoryName) {
            return;
        }

        const newCategory = await db.category.create({
            data: {
                name: categoryName,
            }
        });

        return newCategory;

    } catch (error) {
        console.log(error);
        throw new Error('Failed to create banner');
    }
}


export const deleteCategory = async (categoryId: string) => {
    try {
        console.log('categoryId', categoryId);
        
        if(!categoryId) {
            return false;
        }

        const session = await auth();

        if (!session || session.user.role !== 'ADMIN') {
            return false;
        }

        await db.product.updateMany({
            where: {
                categoryId: categoryId
            },
            data: {
                categoryId: null
            }
        });

        await db.category.delete({
            where: {
                id: categoryId
            }
        });



        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete category');
    }
}