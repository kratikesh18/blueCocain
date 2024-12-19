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


  if(!token){
    console.log("No token found")
    return;
  }
  
  

  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/signup") || url.pathname.startsWith("/login"))
  ) {
    console.log(
      "User is authenticated and trying to access auth page, redirecting to profile"
    );
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (!token && url.pathname.startsWith("/profile")) {
    console.log(
      "User is not authenticated and trying to access profile, redirecting to login"
    );
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
