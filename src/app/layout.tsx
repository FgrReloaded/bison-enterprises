import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import QueryProvider from "@/components/providers/query-provider";
import { Suspense } from "react";
import LoadingPage from "./loading";
import StoreProvider from "@/components/providers/StoreProvider";
import ModalProvider from "@/components/providers/modal-provider";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Store",
  description: "Online Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Suspense fallback={<LoadingPage />}>
          <StoreProvider>
            <QueryProvider>
              {children}
              <ModalProvider />
              <Toaster />
            </QueryProvider>
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
