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
        "relative overflow-hidden text-on-navy",
        isInternal ? "mt-8" : "mt-20",
        !isInternal && "navy-field",
        isInternal && "footer-dark-text"
      )}
    >
      {isInternal && (
        <>
          {/* Both background layers fade in from transparent at the very top
              edge — the artwork itself has a hard-edged cloud shape with no
              soft entry, so without this the page's white abruptly gives way
              to solid color partway down the footer instead of blending in. */}
          <div
            aria-hidden
            className="absolute inset-0 sm:hidden"
            style={{
              backgroundImage: `url(${asset("/internal/footer-osr-bg-mobile.webp")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage: "linear-gradient(to bottom, transparent, black 20%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 hidden sm:block"
            style={{
              backgroundImage: `url(${asset("/internal/footer-commpub-bg.webp")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage: "linear-gradient(to bottom, transparent, black 20%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%)",
            }}
          />
        </>
      )}
      <div className={cn("relative", !isInternal && "navy-grid")}>{children}</div>
    </footer>
  );
}
