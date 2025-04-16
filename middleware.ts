import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path starts with /dashboard
  const isDashboardPath = pathname.startsWith("/dashboard")

  // Get the token
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // If the user is not authenticated and trying to access dashboard
  if (isDashboardPath && !token) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  // If the user is authenticated and trying to access login or register
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
}
