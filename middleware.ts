// import { NextResponse, type NextRequest } from "next/server";
// import { getSessionCookie } from "better-auth/cookies";

// const protectedRoutes = ["/tools", "/learn", "/Quiz", "/dashboard"];

// function isProtectedPath(pathname: string) {
//   return protectedRoutes.some(
//     (route) => pathname === route || pathname.startsWith(`${route}/`)
//   );
// }

// export async function middleware(request: NextRequest) {
//   const { pathname, search } = request.nextUrl;

//   // CRITICAL: Never intercept auth routes — not even for a millisecond
//   // The state cookie must flow through untouched
//   if (pathname.startsWith("/api/auth")) {
//     return NextResponse.next();
//   }

//   if (!isProtectedPath(pathname)) {
//     return NextResponse.next();
//   }

//   // Use cookie check ONLY — zero DB calls, zero latency
//   // This reads the session cookie header directly
//   const sessionCookie = getSessionCookie(request);

//   if (!sessionCookie) {
//     const signInUrl = new URL("/signin", request.url);
//     signInUrl.searchParams.set("next", `${pathname}${search}`);
//     return NextResponse.redirect(signInUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     // Explicitly exclude /api/auth/* at the matcher level as well
//     "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
//   ],
// };

import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = [ "/dashboard"];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Auth routes must NEVER be touched by middleware
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isProtected = protectedRoutes.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`)
  );

  if (!isProtected) return NextResponse.next();

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)" ],
};