"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export const addToWishlist = async (id: string) => {
    try {
        if (!id) throw new Error('No product selected');

        const session = await getServerSession(authOptions);

        if (!session) {
            return;
        }
        const customerId = session.user.id;

        let wishlist = await db.wishlist.findUnique({
            where: { customerId }
        });

        if (wishlist) {
            const itemIndex = wishlist.items.indexOf(id);

            if (itemIndex > -1) {
                const updatedItems = wishlist.items.filter((item: any) => item !== id);

                await db.wishlist.update({
                    where: { customerId },
                    data: {
                        items: updatedItems
                    }
                });
            } else {
                await db.wishlist.update({
                    where: { customerId },
                    data: {
                        items: {
                            push: id
                        }
                    }
                });
            }
        } else {
            await db.wishlist.create({
                data: {
                    customerId,
                    items: [id]
                }
            });
        }

        return

    } catch (error) {
        console.log(error);
        throw new Error('Failed to create wishlist');
    }
}


export const getWishlist = async () => {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return;
        }
        const customerId = session.user.id;

        let wishlist = await db.wishlist.findUnique({
            where: { customerId },
        });

        if (!wishlist) {
            return [];
        }

        const products = await db.product.findMany({
            where: {
                id: {
                    in: wishlist.items
                }
            }
        })

        return products;

    } catch (error) {
        console.log(error);
        throw new Error('Failed to get wishlist');
    }
}