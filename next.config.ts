import type { NextConfig } from "next";

/**
 * `STATIC_EXPORT=1` switches the build into GitHub Pages mode:
 * a fully static `out/` directory, served from a project subpath.
 * Normal `next dev` / `next build` are unaffected.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export" as const,
        basePath,
        // GitHub Pages serves directories, not extensionless files.
        trailingSlash: true,
      }
    : {}),
  images: {
    // No Next.js image optimizer exists on a static host.
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "szzmmykmmxjsrjabwofz.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
