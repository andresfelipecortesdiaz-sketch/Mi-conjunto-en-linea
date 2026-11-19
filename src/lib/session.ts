import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import { Role } from "@prisma/client";
const COOKIE = "mco_session";
type Session = { userId: string; role: Role; name: string; exp: number };
function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("SESSION_SECRET debe tener al menos 32 caracteres");
  return value;
}
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("base64url"); }
export async function createSession(session: Omit<Session, "exp">) {
  const payload = Buffer.from(JSON.stringify({ ...session, exp: Date.now() + 1000 * 60 * 60 * 12 })).toString("base64url");
  const jar = await cookies();
  jar.set(COOKIE, `${payload}.${sign(payload)}`, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 12 });
}
export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const [payload, mac, extra] = token.split(".");
  if (!payload || !mac || extra) return null;
  const expected = Buffer.from(sign(payload)); const received = Buffer.from(mac);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;
  try { const value = JSON.parse(Buffer.from(payload, "base64url").toString()) as Session; return value.exp > Date.now() ? value : null; } catch { return null; }
}
export async function requireRole(...roles: Role[]) {
  const session = await getSession();
  if (!session) throw new Error("NO_SESSION");
  if (!roles.includes(session.role)) throw new Error("FORBIDDEN");
  return session;
}
export async function destroySession() { (await cookies()).delete(COOKIE); }
