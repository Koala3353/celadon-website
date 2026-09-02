"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { DEPARTMENTS } from "@/lib/deputy-departments";

/**
 * The nav bar shown across the whole /internal portal — deliberately
 * distinct from the public SiteHeader (different links, a departments
 * dropdown, an explicit way back out to the public site). SiteHeader
 * renders this instead of its own markup whenever the route is under
 * /internal, so there's still only one header mounted at the root layout.
 */
export function InternalNav() {
  const pathname = usePathname() ?? "/internal";
  const [menuOpen, setMenuOpen] = useState(false);

  const deptAppsActive = pathname.startsWith("/internal/dept-apps");

  return (
    <header
      className="sticky top-0 border-b border-border bg-white/85 backdrop-blur-md"
      style={{ zIndex: "var(--z-nav)" }}
    >
      <Container className="flex h-16 items-center justify-between sm:h-[4.5rem]">
        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            href="/internal"
            aria-label="A-yi's Corner — dashboard"
            className="flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
          >
            <Image
              src={asset("/brand/dreagle-mark.png")}
              alt=""
              width={775}
              height={775}
              priority
              className="h-12 w-auto sm:h-14"
            />
            <span className="sr-only">A-yi&rsquo;s Corner</span>
          </Link>

          <nav aria-label="Internal portal" className="hidden items-center gap-1 sm:flex">
            <NavPill href="/internal" label="Dashboard" active={pathname === "/internal"} />

            {/* Keyed by pathname so it's a fresh instance (deptsOpen reset
                to false) after every navigation — no effect-based setState
                needed, and no risk of a click-time re-render racing the
                link's own navigation (see DeptsDropdown for why that
                mattered). */}
            <DeptsDropdown key={pathname} active={deptAppsActive} />

            <NavPill
              href="/internal/ebcb-directory"
              label="EBCB Directory"
              active={pathname.startsWith("/internal/ebcb-directory")}
            />
          </nav>
        </div>

        <Link
          href="/"
          className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-navy sm:flex"
        >
          <span aria-hidden>&larr;</span> Public Site
        </Link>

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

      {menuOpen && (
        <InternalMobileMenu deptAppsActive={deptAppsActive} pathname={pathname} onClose={() => setMenuOpen(false)} />
      )}
    </header>
  );
}

/**
 * The "Deputy Apps" pill + its departments dropdown. Split out from
 * InternalNav so it can be remounted fresh (via `key={pathname}` on the
 * parent) whenever the route changes — that resets `deptsOpen` back to
 * false for free, without an effect calling setState (which both trips the
 * react-hooks/set-state-in-effect lint rule and, worse, risks toggling
 * `pointer-events` on a link mid-click and eating the click's own default
 * navigation before the browser processes it).
 */
function DeptsDropdown({ active }: { active: boolean }) {
  const [deptsOpen, setDeptsOpen] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setDeptsOpen(true)}
      onMouseLeave={() => setDeptsOpen(false)}
    >
      <div className="flex items-center">
        <NavPill href="/internal/dept-apps" label="Deputy Apps" active={active} />
        <button
          type="button"
          onClick={() => setDeptsOpen((v) => !v)}
          aria-label="Show departments"
          aria-expanded={deptsOpen}
          className="pressable -ml-2 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-navy-tint hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          <span
            className={cn("inline-block transition-transform duration-200", deptsOpen && "rotate-180")}
            aria-hidden
          >
            &#8964;
          </span>
        </button>
      </div>

      {/* Zero-gap, transparent bridge between the trigger and the panel —
          without it, moving the mouse straight down crosses dead space,
          `mouseleave` fires on .group, and the panel closes before you can
          reach it. */}
      <div className="absolute left-0 top-full w-56 pt-2">
        <div
          className={cn(
            "grid grid-cols-1 gap-0.5 rounded-2xl bg-white p-2 shadow-[var(--shadow-md)] ring-1 ring-inset ring-border transition-opacity duration-150",
            deptsOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.slug}
              href={`/internal/dept-apps/${dept.slug}`}
              style={{ "--dept-tint": dept.accent.tint, "--dept-ink": dept.accent.ink } as React.CSSProperties}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-dept-tint hover:text-dept-ink"
            >
              <span aria-hidden>{dept.emoji}</span>
              {dept.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavPill({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
        active ? "text-navy" : "text-muted-foreground hover:text-navy"
      )}
    >
      {label}
      {active && (
        <span aria-hidden className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-navy" />
      )}
    </Link>
  );
}

function InternalMobileMenu({
  pathname,
  deptAppsActive,
  onClose,
}: {
  pathname: string;
  deptAppsActive: boolean;
  onClose: () => void;
}) {
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

  const blockClass = (active: boolean) =>
    cn(
      "rounded-2xl px-4 py-3 text-base font-bold uppercase tracking-wider transition-colors",
      active ? "bg-navy-tint text-navy" : "text-muted-foreground hover:bg-navy-tint hover:text-navy"
    );

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Internal portal menu"
      className="fixed inset-0 sm:hidden"
      style={{ zIndex: "var(--z-overlay)" }}
    >
      <div aria-hidden onClick={onClose} className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />

      <div className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col overflow-y-auto bg-white p-6 shadow-[var(--shadow-lg)]">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-accent-ink">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="pressable flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav aria-label="Internal portal" className="mt-8 flex flex-col gap-1">
          <Link href="/internal" onClick={onClose} className={blockClass(pathname === "/internal")}>
            Dashboard
          </Link>
          <Link href="/internal/dept-apps" onClick={onClose} className={blockClass(deptAppsActive)}>
            Deputy Apps
          </Link>
          <div className="ml-3 flex flex-col gap-0.5 border-l border-border pl-3">
            {DEPARTMENTS.map((dept) => (
              <Link
                key={dept.slug}
                href={`/internal/dept-apps/${dept.slug}`}
                onClick={onClose}
                style={{ "--dept-tint": dept.accent.tint, "--dept-ink": dept.accent.ink } as React.CSSProperties}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-dept-tint hover:text-dept-ink"
              >
                <span aria-hidden>{dept.emoji}</span>
                {dept.name}
              </Link>
            ))}
          </div>
          <Link
            href="/internal/ebcb-directory"
            onClick={onClose}
            className={blockClass(pathname.startsWith("/internal/ebcb-directory"))}
          >
            EBCB Directory
          </Link>
        </nav>

        <Link
          href="/"
          onClick={onClose}
          className="mt-6 flex items-center gap-1.5 rounded-2xl px-4 py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-navy-tint hover:text-navy"
        >
          <span aria-hidden>&larr;</span> Public Site
        </Link>
      </div>
    </div>,
    document.body
  );
}
