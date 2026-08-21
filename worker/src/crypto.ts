// Base64url + HMAC/JWT helpers. Everything here runs on the Workers runtime's
// Web Crypto implementation — no npm crypto packages needed or usable.

export function base64UrlEncode(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of arr) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function base64UrlDecode(value: string): Uint8Array {
  const padLength = (4 - (value.length % 4)) % 4;
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(padLength);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function base64UrlEncodeString(value: string): string {
  return base64UrlEncode(new TextEncoder().encode(value));
}

export function base64UrlDecodeString(value: string): string {
  return new TextDecoder().decode(base64UrlDecode(value));
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function hmacSign(data: string, secret: string): Promise<string> {
  const key = await hmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return base64UrlEncode(signature);
}

export async function hmacVerify(data: string, signature: string, secret: string): Promise<boolean> {
  try {
    const key = await hmacKey(secret);
    return await crypto.subtle.verify("HMAC", key, base64UrlDecode(signature), new TextEncoder().encode(data));
  } catch {
    return false;
  }
}

// Google's JWKS rarely rotates — caching it for the isolate's lifetime avoids
// an extra round trip on every sign-in without risking staleness that matters.
let cachedJwks: { keys: JsonWebKey[] } | null = null;
let cachedJwksAt = 0;
const JWKS_CACHE_MS = 60 * 60 * 1000;

async function getGoogleJwks(): Promise<{ keys: JsonWebKey[] }> {
  if (cachedJwks && Date.now() - cachedJwksAt < JWKS_CACHE_MS) return cachedJwks;
  const res = await fetch("https://www.googleapis.com/oauth2/v3/certs");
  const jwks = await res.json<{ keys: JsonWebKey[] }>();
  cachedJwks = jwks;
  cachedJwksAt = Date.now();
  return jwks;
}

export interface GoogleIdClaims {
  email?: string;
  email_verified?: boolean;
  aud?: string;
  iss?: string;
  exp?: number;
}

/**
 * Verifies a Google id_token's RS256 signature against Google's published
 * JWKS (matched by `kid`), then checks audience/issuer/expiry. Returns the
 * decoded claims only if every check passes — never trust the payload
 * without the signature check, since a forged token would otherwise sail
 * through with any email it likes.
 */
export async function verifyGoogleIdToken(
  idToken: string,
  clientId: string
): Promise<GoogleIdClaims | null> {
  const parts = idToken.split(".");
  if (parts.length !== 3) return null;
  const [headerB64, payloadB64, signatureB64] = parts;

  let header: { kid?: string; alg?: string };
  let claims: GoogleIdClaims;
  try {
    header = JSON.parse(base64UrlDecodeString(headerB64));
    claims = JSON.parse(base64UrlDecodeString(payloadB64));
  } catch {
    return null;
  }

  if (header.alg !== "RS256" || !header.kid) return null;

  const jwks = await getGoogleJwks();
  const jwk = jwks.keys.find((key) => (key as { kid?: string }).kid === header.kid);
  if (!jwk) return null;

  const publicKey = await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const signedData = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    publicKey,
    base64UrlDecode(signatureB64),
    signedData
  );
  if (!valid) return null;

  if (claims.aud !== clientId) return null;
  if (claims.iss !== "https://accounts.google.com" && claims.iss !== "accounts.google.com") return null;
  if (!claims.exp || claims.exp < Math.floor(Date.now() / 1000)) return null;

  return claims;
}
