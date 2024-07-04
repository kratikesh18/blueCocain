import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      username?: string;
      isVerified?: boolean;
      userType?: string;
    } & DefaultSession["user"];
  }
  interface User {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    userType?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    userType?: string;
  }
}
