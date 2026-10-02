import { base64UrlEncodeString, base64UrlDecodeString, verifyGoogleIdToken } from "./crypto";
import { parseCookies, cookieValues, setCookie, clearCookie, createSessionToken, verifySessionToken } from "./session";
import { signInPage, type GateSite } from "./pages";

export interface Env {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  COOKIE_SECRET: string;
  // Comma-separated list of allowed email domains, e.g. "student.ateneo.edu".
  ALLOWED_EMAIL_DOMAINS: string;
  // Roster of ~700-800 member emails, synced from the Sheet's `members` tab
  // via scripts/sync-members.mjs. Keyed by lowercased email; the value isn't
  // read, presence is all that matters.
  MEMBERS: KVNamespace;
}

const GATE_PATH_PREFIX = "/internal";
const AUTH_START_PATH = "/internal/__auth/start";
const CALLBACK_PATH = "/internal/__auth/callback";
const SESSION_COOKIE = "celadon_session";
const NONCE_COOKIE = "celadon_oauth_nonce";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30d — matches the "same browser, no repeat sign-in" behavior.
const NONCE_TTL_SECONDS = 600; // Just long enough to complete the Google redirect round trip.

// The PM Toolkit (pm.ateneoceladon.com, a separate GitHub Pages site) sits
// behind this same gate. Its sign-in runs through the main domain's
// /internal/__auth/* endpoints, so Google only ever sees the one redirect URI
// already registered, and the session cookie is scoped to the parent domain
// so one sign-in covers both sites.
const MAIN_ORIGIN = "https://ateneoceladon.com";
const TOOLKIT_HOST = "pm.ateneoceladon.com";
const COOKIE_DOMAIN = "ateneoceladon.com";

function isAllowedDomain(email: string, env: Env): boolean {
  const domains = env.ALLOWED_EMAIL_DOMAINS.split(",")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
  const lower = email.toLowerCase();
  return domains.some((domain) => lower.endsWith(`@${domain}`));
}

// @ateneo-celadon.org is the org's own domain — every address on it is a
// Celadon account by construction (unlike @student.ateneo.edu, which is
// shared with every other Ateneo student), so it skips the member-roster
// check entirely rather than needing each address added to the Sheet.
const ROSTER_EXEMPT_DOMAIN = "ateneo-celadon.org";

// Individual addresses that should get in without being on the roster —
// e.g. a shared/official inbox rather than a real member's own account.
const ROSTER_EXEMPT_EMAILS = new Set(["celadon.college.org@student.ateneo.edu"]);

// A signed-in Ateneo/Celadon email only gets in if it's also on the member
// roster — the domain check alone would admit any Ateneo student, not just
// Celadon's ~700-800 actual members. ROSTER_EXEMPT_DOMAIN/_EMAILS are the
// deliberate exceptions to that.
async function isMember(email: string, env: Env): Promise<boolean> {
  const lower = email.toLowerCase();
  if (lower.endsWith(`@${ROSTER_EXEMPT_DOMAIN}`)) return true;
  if (ROSTER_EXEMPT_EMAILS.has(lower)) return true;
  return (await env.MEMBERS.get(lower)) !== null;
}

async function isAuthorized(email: string, env: Env): Promise<boolean> {
  return isAllowedDomain(email, env) && (await isMember(email, env));
}

// Only ever redirect back into a gated place we own — the /internal path on
// this domain, or a page on the PM Toolkit — since a returnTo taken straight
// from a query param would otherwise be an open redirect.
function safeReturnTo(value: string | null): string {
  if (value && value.startsWith(GATE_PATH_PREFIX) && !value.startsWith("//")) return value;
  if (value) {
    try {
      const u = new URL(value);
      if (u.protocol === "https:" && u.hostname === TOOLKIT_HOST && !u.username && !u.password) {
        return u.toString();
      }
    } catch {
      // Not an absolute URL; fall through to the default.
    }
  }
  return `${GATE_PATH_PREFIX}/`;
}

function isToolkitUrl(value: string): boolean {
  return value.startsWith(`https://${TOOLKIT_HOST}/`);
}

async function sessionEmail(request: Request, env: Env): Promise<string | null> {
  for (const token of cookieValues(request.headers.get("Cookie") ?? "", SESSION_COOKIE)) {
    const session = await verifySessionToken(token, env.COOKIE_SECRET);
    if (session && (await isAuthorized(session.email, env))) return session.email;
  }
  return null;
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
  // Set once the state is decoded, so a failure sends a PM Toolkit visitor
  // back to the toolkit's sign-in screen rather than the portal's.
  let bounceTarget = `${GATE_PATH_PREFIX}/`;
  const bounceBack = (notice: "denied" | "error") =>
    new Response(null, {
      status: 302,
      headers: (() => {
        const target = isToolkitUrl(bounceTarget) ? `https://${TOOLKIT_HOST}/` : `${GATE_PATH_PREFIX}/`;
        const h = new Headers({ Location: `${target}?notice=${notice}` });
        h.append("Set-Cookie", clearCookie(NONCE_COOKIE));
        return h;
      })(),
    });

  const state = url.searchParams.get("state");
  const dotIndex = state ? state.indexOf(".") : -1;

  let returnTo = `${GATE_PATH_PREFIX}/`;
  if (state && dotIndex !== -1) {
    try {
      returnTo = safeReturnTo(base64UrlDecodeString(state.slice(dotIndex + 1)));
    } catch {
      // Keep the default.
    }
  }
  bounceTarget = returnTo;

  if (url.searchParams.get("error")) return bounceBack("error");

  const code = url.searchParams.get("code");
  if (!code || !state || dotIndex === -1) return bounceBack("error");
  const nonce = state.slice(0, dotIndex);

  const cookies = parseCookies(request.headers.get("Cookie") ?? "");
  if (!nonce || cookies[NONCE_COOKIE] !== nonce) return bounceBack("error");

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

  if (!(await isAuthorized(claims.email, env))) return bounceBack("denied");

  const token = await createSessionToken(claims.email, env.COOKIE_SECRET, SESSION_TTL_SECONDS);
  const headers = new Headers({ Location: returnTo });
  headers.append("Set-Cookie", clearCookie(NONCE_COOKIE));
  // Parent-domain cookie so the same sign-in is valid on pm.ateneoceladon.com.
  headers.append("Set-Cookie", setCookie(SESSION_COOKIE, token, SESSION_TTL_SECONDS, COOKIE_DOMAIN));
  return new Response(null, { status: 302, headers });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === TOOLKIT_HOST) return handleToolkit(request, url, env);

    if (url.pathname === CALLBACK_PATH) return handleCallback(request, url, env);
    if (url.pathname === AUTH_START_PATH) return handleAuthStart(url, env);

    if (!url.pathname.startsWith(GATE_PATH_PREFIX)) {
      // Route is scoped to the gate prefix, so this shouldn't happen — fail
      // safe by passing it straight through rather than blocking it.
      return fetch(request);
    }

    // Re-check the allowlist on every request, not just at sign-in time — if
    // someone's email is removed from ALLOWED_EMAIL_DOMAINS or the member
    // roster after they already have a session cookie, they lose access
    // immediately rather than keeping it until the cookie happens to expire.
    if (await sessionEmail(request, env)) {
      return fetch(request);
    }

    const startUrl = `${AUTH_START_PATH}?returnTo=${encodeURIComponent(url.pathname)}`;
    return gatePage(url, startUrl, "portal");
  },
};

function gatePage(url: URL, startUrl: string, site: GateSite): Response {
  const notice = url.searchParams.get("notice");
  return new Response(signInPage(startUrl, notice === "denied" || notice === "error" ? notice : null, site), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

// Every path on pm.ateneoceladon.com is members-only, assets and the search
// index included, so nothing from the toolkit is served before sign-in.
async function handleToolkit(request: Request, url: URL, env: Env): Promise<Response> {
  if (await sessionEmail(request, env)) {
    const upstream = await fetch(request);
    const response = new Response(upstream.body, upstream);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    // Gated pages must not be stored by shared caches between visitors.
    response.headers.set("Cache-Control", "private, max-age=0, must-revalidate");
    return response;
  }

  const back = new URL(url.toString());
  back.searchParams.delete("notice");
  const startUrl = `${MAIN_ORIGIN}${AUTH_START_PATH}?returnTo=${encodeURIComponent(back.toString())}`;
  return gatePage(url, startUrl, "toolkit");
}
