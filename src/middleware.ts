import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/profile", "/login", "/signup"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const url = request.nextUrl;
  const { pathname } = url;

  if (token) {
    // Redirect authenticated users away from login or signup pages
    if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
      console.log("Authenticated user accessing auth page, redirecting to profile");
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    // Allow authenticated users to access all other routes
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access restricted pages (like /profile)
  if (pathname.startsWith("/profile")) {
    console.log("Unauthenticated user accessing profile, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow unauthenticated users to access public pages like /login or /signup
  return NextResponse.next();
}