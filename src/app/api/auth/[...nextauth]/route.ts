import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { Customer, Admin } from "@prisma/client";

export const authOptions: NextAuthOptions = {
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
        const customer = await db.customer.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!customer || !(await bcrypt.compare(credentials.password, customer.password))) {
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
        const admin = await db.admin.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!admin || !(await bcrypt.compare(credentials.password, admin.password)) || admin.userType !== "ADMIN") {
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
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.userType;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
