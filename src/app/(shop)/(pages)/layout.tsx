"use client"

import { getCart } from "@/actions/cart";
import Footer from "@/components/Footer";
import Nav from "@/components/header/Nav";
import Navbar from "@/components/header/Navbar";
import ModalProvider from "@/components/providers/modal-provider";
import SideBar from "@/components/sidebar";
import { adminExists } from "@/lib/check-if-admin";
import { getProfile } from "@/lib/manage-account";
import { setCart } from "@/lib/slices/cartSlice";
import { setUserProfile } from "@/lib/slices/userSlice";
import { useQuery } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';


export default function PagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { data: cart, isLoading, error } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => getCart(),
    });

    useEffect(() => {
        if (cart) {
            dispatch(setCart(cart as any));
        }
        const fetchProfile = async () => {
            const isAdminExists = await adminExists();
            if (!isAdminExists) {
                router.push("/setup");
            }
            const profile = await getProfile();

            if (!profile) return;
            dispatch(setUserProfile(profile))
        }

        fetchProfile()
    }, [dispatch, cart])

    return (
        <SessionProvider>
            <Navbar />
            <Nav />
            <SideBar />
            {children}
            <ModalProvider />
            <Footer />
        </SessionProvider>
    );
}
