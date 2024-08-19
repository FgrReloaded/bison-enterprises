"use server"

import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Product } from "@prisma/client";
import { ProductVariant } from "@/lib/types";

export const getProducts = async () => {
    try {
        const products = await db.product.findMany({
            include: {
                variants: {
                    select: {
                        productId: true,
                        variant: {
                            select: {
                                id: true,
                                name: true,
                                type: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    },
                },
            },
        });
        return products;
    } catch (error) {
        console.log(error);
    }
}


export const createProduct = async ({ product, variant }: { product: Product, variant: ProductVariant }) => {
    try {
        if (!product) throw new Error('No data to create product');
        const { name, description, price, stock, images, isFeatured } = product;

        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return;
        }

        if (!name || !description || !price || !stock || !images) {
            return;
        }

        if (!variant) {
            const newProduct = await db.product.create({
                data: {
                    name,
                    description,
                    price,
                    stock,
                    images,
                    isFeatured,
                }
            });
            return newProduct;
        }
        const newProduct = await db.product.create({
            data: {
                name,
                description,
                price,
                stock,
                images,
                isFeatured,
                variants: {
                    create: variant.map(vary => ({
                        variant: {
                            connect: { id: vary.variantId },
                        },
                        price: vary.price,
                        stock: vary.stock,
                    })),
                },
            }
        });

        return newProduct


    } catch (error) {
        console.log(error);
        throw new Error('Failed to create product');
    }
}

export const deleteProduct = async (id: string): Promise<boolean> => {
    try {
        if (!id) throw new Error('No product id provided');
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return false;
        }

        await db.product.delete({
            where: {
                id
            }
        });

        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to delete product');
    }
}

export const updateProduct = async (product: Product): Promise<Product> => {
    try {
        if (!product) throw new Error('No data to update product');
        const { id, name, description, price, stock, images } = product;

        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            throw new Error('No data to update product');
        }

        if (!id || !name || !description || !price || !stock || !images) {
            throw new Error('No data to update product');
        }

        const updatedProduct = await db.product.update({
            where: {
                id
            },
            data: {
                name,
                description,
                price,
                stock,
                images
            }
        });

        return updatedProduct;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to update product');
    }
}

export const updateStock = async ({ id, stock }: { id: string, stock: number }): Promise<Product> => {
    try {
        if (!id || !stock) throw new Error('No data to update stock');
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            throw new Error('No data to update stock');
        }

        const updatedProduct = await db.product.update({
            where: {
                id
            },
            data: {
                stock
            },
        });

        return updatedProduct;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to update stock');
    }
}

export const productVisibility = async ({ id, isHide }: { id: string, isHide: boolean }): Promise<Product> => {
    try {
        if (!id || isHide === undefined) throw new Error('No product id provided');
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            throw new Error('No product id provided');
        }

        const updatedProduct = await db.product.update({
            where: {
                id
            },
            data: {
                isHide: isHide
            }
        });

        return updatedProduct;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to hide product');
    }
}