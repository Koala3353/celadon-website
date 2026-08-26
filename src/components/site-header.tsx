"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/departments", label: "Departments" },
  { href: "/projects", label: "Projects" },
  { href: "/recruitment", label: "Recruitment" },
];

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 border-b border-border bg-white/85 backdrop-blur-md"
      style={{ zIndex: "var(--z-nav)" }}
    >
      <Container className="flex h-16 items-center justify-between sm:h-[4.5rem]">
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

        <nav aria-label="Main" className="hidden items-center gap-1 sm:flex">
          {NAV.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          className="pressable flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </Container>

      {menuOpen && <MobileMenu pathname={pathname} onClose={() => setMenuOpen(false)} />}
    </header>
  );
}

function NavLink({
  item,
  pathname,
  onClick,
  variant = "pill",
}: {
  item: { href: string; label: string };
  pathname: string;
  onClick?: () => void;
  variant?: "pill" | "block";
}) {
  // Nested routes (/recruitment/roles/rose-sale-log) should still light up
  // their top-level entry.
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative font-bold uppercase tracking-wider transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
        variant === "pill" &&
          cn(
            "rounded-full px-4 py-2 text-sm",
            active ? "text-navy" : "text-muted-foreground hover:text-navy"
          ),
        variant === "block" &&
          cn(
            "rounded-2xl px-4 py-3 text-base",
            active ? "bg-navy-tint text-navy" : "text-muted-foreground hover:bg-navy-tint hover:text-navy"
          )
      )}
    >
      {item.label}
      {variant === "pill" && active && (
        <span
          aria-hidden
          className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-navy"
        />
      )}
    </Link>
  );
}

function MobileMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
      className="fixed inset-0 sm:hidden"
      style={{ zIndex: "var(--z-overlay)" }}
    >
      {/* Darkened backdrop over the rest of the page. */}
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
      />

      <div className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col bg-white p-6 shadow-[var(--shadow-lg)]">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-accent-ink">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="pressable flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-5 w-5"
              aria-hidden
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav aria-label="Main" className="mt-8 flex flex-col gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              pathname={pathname}
              onClick={onClose}
              variant="block"
            />
          ))}
        </nav>
      </div>
    </div>,
    document.body
  );
}
