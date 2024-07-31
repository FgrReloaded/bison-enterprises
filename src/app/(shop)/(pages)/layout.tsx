"use client"

import Navbar from "@/components/header/Navbar";
import { SessionProvider } from "next-auth/react";

export default function PagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <Navbar />
            {children}
        </SessionProvider>
    );
}
