"use client"

import NavigationSidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header"
import ModalProvider from "@/components/providers/modal-provider";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

export default function AdminPageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider store={store}>
            <div className="min-h-screen bg-gray-50/50">
                <NavigationSidebar />
                <div className="p-4 xl:ml-80">
                    <Header />
                    <div className="mt-12">
                        {children}
                        <ModalProvider />
                    </div>
                </div>
            </div>
        </Provider>
    );
}
