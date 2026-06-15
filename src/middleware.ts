import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/settings", "/finance", "/hr", "/payroll", "/scm", "/forecast", "/projects", "/my-projects", "/my-tasks", "/my-timesheets", "/my-milestones", "/employee", "/admin"];
const authRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password", "/auth/reset-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasClientSession = request.cookies.has("cloud-erp-auth");

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !hasClientSession) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (authRoutes.includes(pathname) && hasClientSession) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*", "/auth/:path*"]
};
