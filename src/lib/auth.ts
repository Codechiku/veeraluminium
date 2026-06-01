import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE = "veer_admin_session";
const ALG = "HS256";

function secret() {
  const s = process.env.AUTH_SECRET || "dev-insecure-secret-change-me-please-now";
  return new TextEncoder().encode(s);
}

export interface Session {
  email: string;
  name: string;
  role: string;
}

/** Validates credentials against env (and optionally a DB admin). */
export async function verifyCredentials(
  email: string,
  password: string,
): Promise<Session | null> {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@veeraluminium.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (
    email.trim().toLowerCase() === adminEmail.toLowerCase() &&
    password === adminPassword
  ) {
    return { email: adminEmail, name: "Administrator", role: "ADMIN" };
  }
  return null;
}

export async function createSession(session: Session) {
  const token = await new SignJWT({ ...session })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function getSession(): Promise<Session | null> {
  try {
    const store = await cookies();
    const token = store.get(COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret());
    return {
      email: String(payload.email),
      name: String(payload.name),
      role: String(payload.role),
    };
  } catch {
    return null;
  }
}

/** For use in middleware (edge) — verifies a raw token string. */
export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secret());
    return true;
  } catch {
    return false;
  }
}

export const SESSION_COOKIE = COOKIE;
