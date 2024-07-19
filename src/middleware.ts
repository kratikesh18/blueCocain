import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/profile", "/login", "/signup"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  // console.log("printing the token ", token);
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/signup") || url.pathname.startsWith("/login"))
  ) {
    return NextResponse.redirect(new URL("/profile", request.url)); // Redirect to profile if user is logged in and trying to access signup or login
  }

  if (!token && url.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login if user is not logged in and trying to access profile
  }

  return NextResponse.next(); // Allow the request if none of the above conditions are met
}
