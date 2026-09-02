"use client";

import { usePathname } from "next/navigation";

/**
 * Swaps the footer's first column between the public logo+tagline and the
 * internal portal's "Have Questions?" blurb — split out as its own tiny
 * client component (rather than making SiteFooter itself client) for the
 * same reason as FooterFrame: SiteFooter calls `copy()`, which needs to stay
 * server-side.
 */
export function FooterColumnSwitch({
  publicContent,
  internalContent,
}: {
  publicContent: React.ReactNode;
  internalContent: React.ReactNode;
}) {
  const pathname = usePathname() ?? "/";
  const isInternal = pathname === "/internal" || pathname.startsWith("/internal/");
  return <>{isInternal ? internalContent : publicContent}</>;
}
