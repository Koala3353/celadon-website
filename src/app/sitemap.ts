import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

// Required for a static export — otherwise Next can't tell this route is
// safe to prerender to a plain file at build time.
export const dynamic = "force-static";

/**
 * `new Date()` here would stamp every URL with the exact build time, on
 * every build — including the scheduled rebuild that runs every 3 hours
 * whether or not the Sheet actually changed. A `lastmod` that's always
 * "now" isn't a signal at all, and search engines are known to start
 * ignoring a sitemap's lastmod once it stops correlating with real
 * changes. The last commit's date is a real (if coarse — it's the same
 * for every URL, and content-only edits via the Sheet don't move it since
 * those aren't committed) signal: it only advances when the code or
 * checked-in content actually changes.
 */
function lastCommitDate(): Date {
  try {
    const iso = execSync("git log -1 --format=%cI", {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (iso) return new Date(iso);
  } catch {
    // No .git available (e.g. a tarball build) — fall back below.
  }
  return new Date();
}

// `trailingSlash: true` in next.config.ts means every route is actually
// served with a trailing slash — the sitemap has to match exactly, or
// Search Console flags it as a canonical mismatch.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = lastCommitDate();

  const STATIC_PATHS: {
    path: string;
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
    priority: number;
  }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "about", changeFrequency: "monthly", priority: 0.7 },
    { path: "departments", changeFrequency: "monthly", priority: 0.7 },
    { path: "projects", changeFrequency: "weekly", priority: 0.7 },
  ];
  const staticRoutes: MetadataRoute.Sitemap = STATIC_PATHS.map(({ path, ...rest }) => ({
    url: `${SITE_URL}/${path ? `${path}/` : ""}`,
    lastModified,
    ...rest,
  }));

  // Deliberately excluded: /internal — members-only, marked
  // `robots: { index: false }` on the page itself, and never linked from
  // public nav. Listing it here would just be inviting a crawl of a page
  // that has nothing to show an unauthenticated visitor anyway.
  return staticRoutes;
}
