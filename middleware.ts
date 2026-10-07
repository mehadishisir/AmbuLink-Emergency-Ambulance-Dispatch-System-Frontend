import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_ROUTES = ["/login", "/register", "/verify-email"];
const PROTECTED_PREFIXES = ["/dashboard", "/provider", "/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("ambulink-token")?.value;

  // Already logged in → kick out of auth pages
  if (AUTH_ROUTES.some((r) => pathname.startsWith(r)) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protected routes without token → login
  const isProtected = PROTECTED_PREFIXES.some((p) =>
    pathname.startsWith(p),
  );
  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};