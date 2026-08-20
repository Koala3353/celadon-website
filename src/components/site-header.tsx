"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/departments", label: "Departments" },
  { href: "/projects", label: "Projects" },
  { href: "/recruitment", label: "Recruitment" },
];

export function SiteHeader() {
  const pathname = usePathname() ?? "/";

  return (
    <header
      className="sticky top-0 border-b border-border bg-white/85 backdrop-blur-md"
      style={{ zIndex: "var(--z-nav)" }}
    >
      {/* Four uppercase labels plus the mark do not fit on one line at
          375px, so the header stacks into two rows below sm. */}
      <Container className="flex flex-col items-center gap-1 py-2.5 sm:h-[4.5rem] sm:flex-row sm:justify-between sm:gap-4 sm:py-0">
        <Link
          href="/"
          aria-label="Ateneo Celadon — home"
          className="flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
        >
          <Image
            src={asset("/brand/dreagle-mark.png")}
            alt=""
            width={775}
            height={775}
            priority
            className="h-16 w-auto"
          />
          <span className="sr-only">Ateneo Celadon</span>
        </Link>

        <nav
          aria-label="Main"
          className="flex w-full items-center justify-between gap-0.5 sm:w-auto sm:justify-end sm:gap-1"
        >
          {NAV.map((item) => {
            // Nested routes (/recruitment/roles/rose-sale-log) should still
            // light up their top-level entry.
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-2 py-2 text-[0.6875rem] font-bold uppercase tracking-wider transition-colors sm:px-4 sm:text-sm",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
                  active
                    ? "text-navy"
                    : "text-muted-foreground hover:text-navy"
                )}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-navy sm:inset-x-4"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
