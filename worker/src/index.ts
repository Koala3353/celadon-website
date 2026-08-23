import { base64UrlEncodeString, base64UrlDecodeString, verifyGoogleIdToken } from "./crypto";
import { parseCookies, setCookie, clearCookie, createSessionToken, verifySessionToken } from "./session";
import { signInPage } from "./pages";

export interface Env {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  COOKIE_SECRET: string;
  // Comma-separated list of allowed email domains, e.g. "student.ateneo.edu".
  ALLOWED_EMAIL_DOMAINS: string;
}

const GATE_PATH_PREFIX = "/recruitment/internal";
const AUTH_START_PATH = "/recruitment/internal/__auth/start";
const CALLBACK_PATH = "/recruitment/internal/__auth/callback";
const SESSION_COOKIE = "celadon_session";
const NONCE_COOKIE = "celadon_oauth_nonce";
const SESSION_TTL_SECONDS = 60 * 60 * 24; // 24h — matches the "same browser, no repeat sign-in" behavior.
const NONCE_TTL_SECONDS = 600; // Just long enough to complete the Google redirect round trip.

function isAllowedEmail(email: string, env: Env): boolean {
  const domains = env.ALLOWED_EMAIL_DOMAINS.split(",")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
  const lower = email.toLowerCase();
  return domains.some((domain) => lower.endsWith(`@${domain}`));
}

// Only ever redirect back into our own gated path — a returnTo taken
// straight from a query param would otherwise be an open redirect.
function safeReturnTo(value: string | null): string {
  if (value && value.startsWith(GATE_PATH_PREFIX) && !value.startsWith("//")) return value;
  return `${GATE_PATH_PREFIX}/`;
}

async function handleAuthStart(url: URL, env: Env): Promise<Response> {
  const returnTo = safeReturnTo(url.searchParams.get("returnTo"));
  const nonce = crypto.randomUUID();
  const state = `${nonce}.${base64UrlEncodeString(returnTo)}`;

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", env.GOOGLE_CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", `${url.origin}${CALLBACK_PATH}`);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("prompt", "select_account");

  const headers = new Headers({ Location: authUrl.toString() });
  headers.append("Set-Cookie", setCookie(NONCE_COOKIE, nonce, NONCE_TTL_SECONDS));
  return new Response(null, { status: 302, headers });
}

async function handleCallback(request: Request, url: URL, env: Env): Promise<Response> {
  const bounceBack = (notice: "denied" | "error") =>
    new Response(null, {
      status: 302,
      headers: (() => {
        const h = new Headers({ Location: `${GATE_PATH_PREFIX}/?notice=${notice}` });
        h.append("Set-Cookie", clearCookie(NONCE_COOKIE));
        return h;
      })(),
    });

  if (url.searchParams.get("error")) return bounceBack("error");

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state) return bounceBack("error");

  const dotIndex = state.indexOf(".");
  if (dotIndex === -1) return bounceBack("error");
  const nonce = state.slice(0, dotIndex);
  const returnToB64 = state.slice(dotIndex + 1);

  const cookies = parseCookies(request.headers.get("Cookie") ?? "");
  if (!nonce || cookies[NONCE_COOKIE] !== nonce) return bounceBack("error");

  let returnTo: string;
  try {
    returnTo = safeReturnTo(base64UrlDecodeString(returnToB64));
  } catch {
    returnTo = `${GATE_PATH_PREFIX}/`;
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${url.origin}${CALLBACK_PATH}`,
      grant_type: "authorization_code",
    }),
  });
  if (!tokenRes.ok) return bounceBack("error");

  const tokenBody = await tokenRes.json<{ id_token?: string }>();
  if (!tokenBody.id_token) return bounceBack("error");

  const claims = await verifyGoogleIdToken(tokenBody.id_token, env.GOOGLE_CLIENT_ID);
  if (!claims || !claims.email || !claims.email_verified) return bounceBack("error");

  if (!isAllowedEmail(claims.email, env)) return bounceBack("denied");

  const token = await createSessionToken(claims.email, env.COOKIE_SECRET, SESSION_TTL_SECONDS);
  const headers = new Headers({ Location: returnTo });
  headers.append("Set-Cookie", clearCookie(NONCE_COOKIE));
  headers.append("Set-Cookie", setCookie(SESSION_COOKIE, token, SESSION_TTL_SECONDS));
  return new Response(null, { status: 302, headers });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === CALLBACK_PATH) return handleCallback(request, url, env);
    if (url.pathname === AUTH_START_PATH) return handleAuthStart(url, env);

    if (!url.pathname.startsWith(GATE_PATH_PREFIX)) {
      // Route is scoped to the gate prefix, so this shouldn't happen — fail
      // safe by passing it straight through rather than blocking it.
      return fetch(request);
    }

    const cookies = parseCookies(request.headers.get("Cookie") ?? "");
    const session = await verifySessionToken(cookies[SESSION_COOKIE], env.COOKIE_SECRET);

    // Re-check the allowlist on every request, not just at sign-in time — if
    // someone's email is removed from ALLOWED_EMAIL_DOMAINS after they
    // already have a session cookie, they lose access immediately rather
    // than keeping it until the cookie happens to expire.
    if (session && isAllowedEmail(session.email, env)) {
      return fetch(request);
    }

    const startUrl = `${AUTH_START_PATH}?returnTo=${encodeURIComponent(url.pathname)}`;
    const notice = url.searchParams.get("notice");
    return new Response(signInPage(startUrl, notice === "denied" || notice === "error" ? notice : null), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  },
};
