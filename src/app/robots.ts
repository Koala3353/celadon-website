import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

// Required for a static export — otherwise Next can't tell this route is
// safe to prerender to a plain file at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
