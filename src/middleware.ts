import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/profile", "/login", "/signup"],
};

export async function middleware(request: NextRequest) {
  // Retrieve the token from the request
  const token = await getToken({ req: request });
  console.log("token found", token);
  // Get the URL from the request
  const url = request.nextUrl;

  // If the user is logged in and tries to access signup or login, redirect to profile
  if (
    token &&
    (url.pathname.startsWith("/signup") || url.pathname.startsWith("/login"))
  ) {
    console.log(
      "token found and tryin to reach authentication redirected to profile"
    );
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // If the user is not logged in and tries to access profile, redirect to login
  if (!token && url.pathname.startsWith("/profile")) {
    console.log(
      "Without toaken trying to accces profile , redirecting to the authentication"
    );
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request if none of the above conditions are met
  return NextResponse.next();
}
