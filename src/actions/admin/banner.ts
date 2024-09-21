"use server"

import { db } from "@/lib/db";
import {auth} from "@/auth";

export const getBanners = async () => {
    try {
        const banners = await db.banner.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return banners;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch banners');
    }
}

export const createBanner = async ({ tag, title, tagline, link, image }: { tag:string, title: string, tagline: string, link: string, image: string }) => {
    try {

        const session = await auth();

        if (!session || session.user.role !== 'ADMIN') {
            return;
        }

        if (!title || !tagline || !link || !image || !tag) {
            return;
        }

        const newBanner = await db.banner.create({
            data: {
                tag,
                title,
                tagline,
                link,
                image
            }
        });

        return newBanner;

    } catch (error) {
        console.log(error);
        throw new Error('Failed to create banner');
    }
}