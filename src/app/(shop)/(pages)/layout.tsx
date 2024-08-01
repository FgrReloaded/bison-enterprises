"use client"

import Nav from "@/components/header/Nav";
import Navbar from "@/components/header/Navbar";
import SideBar from "@/components/sidebar";
import { store } from "@/lib/store";
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';


export default function PagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <Provider store={store}>
                <Navbar />
                <Nav />
                <SideBar />
                {children}
            </Provider>
        </SessionProvider>
    );
}
