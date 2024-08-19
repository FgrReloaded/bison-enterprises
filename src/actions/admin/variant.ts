"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";


export const createVariant = async (data: any) => {
    try {
        if (!data) throw new Error('No data to create variant');
        const { name, variants } = data;

        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return;
        }

        if (!name) {
            return;
        }

        const sizeVariantType = await db.variantType.create({
            data: {
                name,
            },
        });
        const createdVariants = [];
        if (variants.length > 0) {
            for (let variant of variants) {
                const createdVariant = await db.variant.create({
                    data: {
                        name: variant,
                        typeId: sizeVariantType.id,
                    },
                });
                createdVariants.push(createdVariant);
            }
        }

        return {
            id: sizeVariantType.id,
            name: sizeVariantType.name,
            variants: createdVariants.map(variant => ({
                id: variant.id,
                name: variant.name,
            })),
        };

    } catch (error) {
        throw new Error("Failed to create variant");
    }
}

export const getVariants = async () => {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'ADMIN') {
            return;
        }

        const variants = await db.variantType.findMany({

            select: {
                id: true,
                name: true,
                variants: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });

        return variants;

    } catch (error) {
        throw new Error("Failed to get variants");
    }
}