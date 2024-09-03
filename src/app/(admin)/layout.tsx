import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Dashboard | Online Store",
    description: "Online Store",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
         children
    );
}
