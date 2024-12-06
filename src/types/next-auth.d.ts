// next-auth.d.ts (or inside your types directory)

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    error?: string;
  }

  interface User {
    name: string;
    email: string;
  }
}

// import { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       _id?: string;
//       username?: string;
//       isVerified?: boolean;
//       userType?: string;
//       image?: string;
//       accessToken:string;
//     } & DefaultSession["user"];
//    }
//   interface User {
//     _id?: string;
//     username?: string;
//     isVerified?: boolean;
//     userType?: string;
//     image?: string;
//     accessToken:string;
//   }
// }

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    userType?: string;
    image?: string;
    accessToken?:string;
    expiresAt?:number;
  }
}

