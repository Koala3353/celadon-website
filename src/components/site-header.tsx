import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";

const NAV = [
  { href: "/recruitment", label: "Roles" },
  { href: "/projects", label: "Projects" },
  { href: "/departments", label: "Departments" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream/90 backdrop-blur-sm">
      <Container className="flex flex-col items-center gap-1 py-3 sm:h-20 sm:flex-row sm:justify-between sm:gap-6 sm:py-0">
        <Link
          href="/"
          className="shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
        >
          <Image
            src="/brand/celaville-wordmark.png"
            alt="Celaville — Ateneo Celadon Recweek 2026–2027"
            width={900}
            height={253}
            priority
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav
          aria-label="Main"
          className="flex w-full items-center justify-between gap-1 sm:w-auto sm:justify-end sm:gap-2"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-2.5 py-2 font-display text-sm font-semibold text-ink transition-colors hover:bg-muted hover:text-green-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green sm:px-4 sm:text-base"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>

      {/* Rooflines, echoing the logo's houses. */}
      <div aria-hidden className="rooflines h-3 w-full opacity-70" />
    </header>
  );
}
