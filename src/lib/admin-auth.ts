export const ADMIN_SESSION_COOKIE = "construct_admin_session";
const SESSION_SUBJECT = "construct-admin-metrics-session";

async function computeExpectedToken(): Promise<string> {
  const password = process.env.ADMIN_METRICS_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_METRICS_PASSWORD is not set.");
  }
  const encoder = new TextEncoder();
  const digest = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(`${password}:${SESSION_SUBJECT}`)
  );
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function checkPassword(candidate: string): Promise<boolean> {
  return candidate === process.env.ADMIN_METRICS_PASSWORD;
}

export async function createSessionToken(): Promise<string> {
  return computeExpectedToken();
}

export async function isValidSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const expected = await computeExpectedToken();
    return token === expected;
  } catch {
    return false;
  }
}
