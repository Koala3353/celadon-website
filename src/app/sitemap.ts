import type { MetadataRoute } from "next";
import { getAllRoleSlugs } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";

// Required for a static export — otherwise Next can't tell this route is
// safe to prerender to a plain file at build time.
export const dynamic = "force-static";

// `trailingSlash: true` in next.config.ts means every route is actually
// served with a trailing slash — the sitemap has to match exactly, or
// Search Console flags it as a canonical mismatch.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "about", "departments", "projects", "recruitment"].map(
    (path) => ({
      url: `${SITE_URL}/${path ? `${path}/` : ""}`,
      lastModified: new Date(),
    })
  );

  const roleRoutes = getAllRoleSlugs().map((slug) => ({
    url: `${SITE_URL}/recruitment/roles/${slug}/`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...roleRoutes];
}
