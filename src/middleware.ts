import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// import { refreshAccessToken } from "./app/api/auth/[...nextauth]/options";
export const config = {
  matcher: ["/profile", "/login", "/signup"],
};

export async function middleware(request: NextRequest) {
  // Ensure the token is fetched properly
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if(!token){
    console.log("No token found")
    return;
  }

  // console.log("Token found:", token);

  // Get the URL from the request
  const url = request.nextUrl;

 
  // If the user is logged in and tries to access signup or login, redirect to profile
  if (
    token &&
    (url.pathname.startsWith("/signup") || url.pathname.startsWith("/login"))
  ) {
    console.log(
      "User is authenticated and trying to access auth page, redirecting to profile"
    );
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // If the user is not logged in and tries to access profile, redirect to login
  if (!token && url.pathname.startsWith("/profile")) {
    console.log(
      "User is not authenticated and trying to access profile, redirecting to login"
    );
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request if none of the above conditions are met
  return NextResponse.next();
}
