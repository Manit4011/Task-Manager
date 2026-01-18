import { NextResponse } from 'next/server'


export function middleware(request) {
  console.log("middleware is running")

  const token = request.cookies.get("token")?.value
  const pathname = request.nextUrl.pathname

  const authPages = pathname === "/login" || pathname === "/signup"

  // If user is logged in, block access to login/signup
  if (token && authPages) {
    return NextResponse.redirect(new URL("/profile", request.url))
  }

  // If user is NOT logged in, protect private routes
  if (!token && !authPages) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Allow request to continue
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/addtasks",
    "/showtasks",
    "/profile",
    "/login",
    "/signup",
    "/api/tasks",
  ],
}
