import type { NextConfig } from "next";

/**
 * The site is a pure static export — there is no server anywhere in the
 * deployment, so `output: "export"` is on unconditionally rather than behind a
 * flag. That way a route handler or dynamic page can never be added by
 * accident and only fail in CI.
 *
 * `PAGES_BASE_PATH` prefixes every asset URL and is only non-empty when the
 * site is served under a path segment (a GitHub Pages *project* page like
 * koala3353.github.io/celadon-website/). With the ateneoceladon.com custom
 * domain mapped in, the site is served at the domain root, so the workflow
 * sets this to "" — set it back to /celadon-website only if the custom
 * domain is ever removed. It stays empty locally too.
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Exposed so `asset()` can prefix /public URLs; see src/lib/asset.ts.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // GitHub Pages serves directories; without this, /projects 404s.
  trailingSlash: true,
  images: {
    // No image optimizer exists on a static host.
    unoptimized: true,
    // Cover images are pasted into the content Sheet, so the host isn't known
    // ahead of time. Any HTTPS origin is allowed; `unoptimized` means Next
    // only emits the URL rather than fetching it at build time.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
