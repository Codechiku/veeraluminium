import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE = "veer_admin_session";

function secret() {
  const s = process.env.AUTH_SECRET || "dev-insecure-secret-change-me-please-now";
  return new TextEncoder().encode(s);
}

/** Protects /admin (except the login page) behind a valid session cookie. */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();

    const token = req.cookies.get(COOKIE)?.value;
    let valid = false;
    if (token) {
      try {
        await jwtVerify(token, secret());
        valid = true;
      } catch {
        valid = false;
      }
    }
    if (!valid) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
