import { base64UrlEncodeString, base64UrlDecodeString, hmacSign, hmacVerify } from "./crypto";

export function parseCookies(header: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(value);
  }
  return out;
}

export function setCookie(name: string, value: string, maxAgeSeconds: number): string {
  return `${name}=${encodeURIComponent(value)}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}

export function clearCookie(name: string): string {
  return `${name}=; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=0`;
}

interface SessionPayload {
  email: string;
  exp: number;
}

export async function createSessionToken(
  email: string,
  secret: string,
  ttlSeconds: number
): Promise<string> {
  const payload: SessionPayload = { email, exp: Math.floor(Date.now() / 1000) + ttlSeconds };
  const payloadStr = base64UrlEncodeString(JSON.stringify(payload));
  const signature = await hmacSign(payloadStr, secret);
  return `${payloadStr}.${signature}`;
}

/**
 * Verifies the HMAC signature before trusting anything in the payload — the
 * cookie is client-held, so an unsigned or mis-signed token must be treated
 * as if it weren't there at all, not partially trusted.
 */
export async function verifySessionToken(
  token: string | undefined,
  secret: string
): Promise<SessionPayload | null> {
  if (!token) return null;
  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) return null;
  const payloadStr = token.slice(0, dotIndex);
  const signature = token.slice(dotIndex + 1);

  const valid = await hmacVerify(payloadStr, signature, secret);
  if (!valid) return null;

  try {
    const payload = JSON.parse(base64UrlDecodeString(payloadStr)) as SessionPayload;
    if (typeof payload.email !== "string" || typeof payload.exp !== "number") return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
