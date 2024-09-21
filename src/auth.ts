import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import { Customer, Admin } from "@prisma/client";
import { db } from "./lib/db";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            id: "customer",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials): Promise<Customer | null> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }
                const email = credentials.email as string;
                const password = credentials.password as string;

                const customer = await db.customer.findUnique({
                    where: {
                        email,
                    },
                });
                if (!customer || !(await bcrypt.compare(password, customer.password))) {
                    throw new Error("Invalid credentials");
                }
                return customer;
            },
        }),
        CredentialsProvider({
            id: "admin",
            name: "Admin",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials): Promise<Admin | null> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }
                const email = credentials.email as string;
                const password = credentials.password as string;

                const admin = await db.admin.findUnique({
                    where: {
                        email,
                    },
                });
                if (!admin || !(await bcrypt.compare(password, admin.password)) || admin.userType !== "ADMIN") {
                    throw new Error("Invalid credentials");
                }
                return admin;
            }
        }),
    ],
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id ?? '';
                token.role = user.userType;
            }
            return token
        },
        session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session
        },
    },
});