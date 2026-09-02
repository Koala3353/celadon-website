"use client";

import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

/**
 * Just the `<footer>` shell's background — split out from SiteFooter so that
 * component can stay a server component (it calls `copy()`, which reads
 * content via `fs`/`path` and can't be bundled for the client). This piece
 * only needs `usePathname()` to swap in the CelaSkies sky background for the
 * internal portal.
 */
export function FooterFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const isInternal = pathname === "/internal" || pathname.startsWith("/internal/");

  return (
    <footer
      className={cn(
        "relative mt-20 overflow-hidden text-on-navy",
        !isInternal && "navy-field",
        isInternal && "footer-dark-text"
      )}
      style={
        isInternal
          ? {
              backgroundImage: `url(${asset("/internal/footer-sky-bg.webp")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className={cn("relative", !isInternal && "navy-grid")}>{children}</div>
    </footer>
  );
}
