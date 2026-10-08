import { NextResponse, type NextRequest } from "next/server";

const roleHome = {
  ADMIN: "/admin",
  DRIVER: "/provider",
  PATIENT: "/dashboard",
} as const;
type Role = keyof typeof roleHome;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;
  const role = request.cookies.get("role")?.value as Role | undefined;
  const home = role ? roleHome[role] : undefined;

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/verify-email");


  if (isAuthPage && token && home) {
    return NextResponse.redirect(new URL(home, request.url));
  }

 
  const section = Object.values(roleHome).find(
    (base) => pathname === base || pathname.startsWith(base + "/"),
  );

  if (section) {
    if (!token || !home) {
      const url = new URL("/login", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    if (home !== section) {
      return NextResponse.redirect(new URL(home, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/verify-email",
    "/admin/:path*",
    "/provider/:path*",
    "/dashboard/:path*",
  ],
};