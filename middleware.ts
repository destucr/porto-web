import NextAuth from "next-auth"
import { authConfig } from "./lib/auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnKeystatic = req.nextUrl.pathname.startsWith("/keystatic")

  if (isOnKeystatic && !isLoggedIn) {
    const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", callbackUrl);
    return NextResponse.redirect(loginUrl);
  }
})

export const config = {
  // Protect keystatic routes and its API
  matcher: ["/keystatic/:path*", "/api/keystatic/:path*"],
}