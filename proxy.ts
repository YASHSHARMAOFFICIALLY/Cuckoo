import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const protectedRoutes = ["/tools", "/learn", "/Quiz", "/dashboard"];

function isProtectedPath(pathname: string) {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/tools/:path*",
    "/learn/:path*",
    "/Quiz/:path*",
    "/dashboard/:path*",
  ],
};