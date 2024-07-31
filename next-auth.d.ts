import NextAuth from "next-auth";
import { UserTypes } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserTypes;
    };
  }

  interface User {
    id: string;
    userType: UserTypes;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserTypes;
  }
}
