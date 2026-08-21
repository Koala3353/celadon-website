const SHARED_STYLE = `
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background:
      radial-gradient(80% 120% at 12% 0%, #0a44a0 0%, transparent 55%),
      radial-gradient(70% 100% at 100% 100%, #002357 0%, transparent 60%),
      #003078;
    color: #c7d2e1;
  }
  .card { width: 100%; max-width: 24rem; text-align: center; }
  .eyebrow {
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.16em;
    font-size: 0.75rem; color: #7ba4ff; margin: 0 0 0.75rem;
  }
  h1 {
    font-weight: 800; text-transform: uppercase; letter-spacing: -0.01em;
    font-size: 1.75rem; line-height: 1.15; color: #fff; margin: 0 0 0.75rem;
  }
  p.lede { margin: 0 0 2rem; font-size: 0.9375rem; line-height: 1.5; }
  .error {
    margin: 0 0 1.5rem; padding: 0.75rem 1rem; border-radius: 0.6rem;
    background: rgba(179, 38, 30, 0.18); border: 1px solid rgba(224, 133, 124, 0.4);
    color: #f3c9c5; font-size: 0.875rem; text-align: left;
  }
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem;
    width: 100%; padding: 0.85rem 1.25rem; border-radius: 999px;
    background: #fff; color: #16213a; font-weight: 700; font-size: 0.9375rem;
    text-decoration: none; box-shadow: 0 6px 24px -8px rgba(0,0,0,0.4);
  }
  .btn svg { flex-shrink: 0; }
  .retry { display: block; margin-top: 1.25rem; font-size: 0.8125rem; color: #7ba4ff; text-decoration: none; }
  .retry:hover { text-decoration: underline; }
`;

const GOOGLE_ICON = `<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
  <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"/>
  <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.81.54-1.85.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z"/>
  <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z"/>
  <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58z"/>
</svg>`;

export function signInPage(startUrl: string, notice: string | null): string {
  const errorBlock =
    notice === "denied"
      ? `<div class="error">This email is not authorized for the Celadon internal portal.</div>`
      : notice === "error"
        ? `<div class="error">Something went wrong signing you in. Please try again.</div>`
        : "";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Celadon Internal Portal</title>
<style>${SHARED_STYLE}</style>
</head>
<body>
  <div class="card">
    <p class="eyebrow">Celadon Internal Portal</p>
    <h1>Sign in to continue</h1>
    <p class="lede">Sign in with your organization Google account to continue.</p>
    ${errorBlock}
    <a class="btn" href="${startUrl}">${GOOGLE_ICON}Continue with Google</a>
  </div>
</body>
</html>`;
}
