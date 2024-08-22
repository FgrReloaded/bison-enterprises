"use server"

import { db } from '@/lib/db';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function addToCart({ productId, quantity, variant }: { productId: string, quantity: number, variant: any | null }): Promise<any> {
    try {
        const session = await getServerSession(authOptions);

        if (!session) throw new Error('You need to be signed in to add items to your cart')
        let customerId = session.user.id;

        const cart = await db.cart.findUnique({ where: { customerId } })
        let newCart;
        if (!cart) {
            newCart = await db.cart.create({
                data: {
                    customerId,
                    items: {
                        create: {
                            product: { connect: { id: productId } },
                            quantity,
                            variant,
                        },
                    },
                },
                select: {

                }
            })
        } else {
            newCart = db.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                    variant,
                },
            })
        }
        return newCart

    } catch (error) {
        console.error(error)
    }
}

// Remove item from cart
export async function removeFromCart({ cartItemId }: { cartItemId: string }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) throw new Error('You need to be signed in to add items to your cart')
        let customerId = session.user.id;

        const cart = await db.cart.findUnique({ where: { customerId } })
        if (!cart) throw new Error('Cart not found')

        await db.cartItem.delete({
            where: { id: cartItemId },
        })
    } catch (error) {
        console.error(error)
    }
}

// Update cart item quantity
export async function updateCartItemQuantity(customerId: string, cartItemId: string, quantity: number) {
    const cart = await db.cart.findUnique({ where: { customerId } })
    if (!cart) throw new Error('Cart not found')

    await db.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
    })
}

// Get cart contents
export async function getCart() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) throw new Error('You need to be signed in to add items to your cart')
        let customerId = session.user.id;

        const cart = await db.cart.findUnique({
            where: { customerId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        })

        return cart
    } catch (error) {
        console.error(error)
    }
}

// Clear cart
export async function clearCart(customerId: string) {
    const cart = await db.cart.findUnique({ where: { customerId } })
    if (!cart) throw new Error('Cart not found')

    await db.cartItem.deleteMany({
        where: { cartId: cart.id },
    })
}