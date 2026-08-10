import type { NextConfig } from "next";

/**
 * The site is a pure static export — there is no server anywhere in the
 * deployment, so `output: "export"` is on unconditionally rather than behind a
 * flag. That way a route handler or dynamic page can never be added by
 * accident and only fail in CI.
 *
 * `PAGES_BASE_PATH` is set to /<repo> by the Pages workflow because this
 * deploys as a project page, not a user page. It stays empty locally.
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
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
