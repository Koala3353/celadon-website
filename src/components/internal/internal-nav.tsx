"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";

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

          <nav aria-label="Internal portal" className="hidden items-center gap-1 lg:flex">
            <NavPill href="/internal" label="Dashboard" active={pathname === "/internal"} />

            {/* Core Team Applications sat here until Wave 1 closed. Like
                Deputy Applications before it, the hub and its project pages
                are no longer reachable from the portal — direct links still
                resolve and show a ClosedBanner. */}
            <NavPill
              href="/internal/ebcb-directory"
              label="EBCB Directory"
              active={pathname.startsWith("/internal/ebcb-directory")}
            />
          </nav>
        </div>

        <Link
          href="/"
          className="pressable hidden items-center whitespace-nowrap rounded-full bg-navy-tint px-4 py-2 text-xs font-bold uppercase tracking-wider text-navy transition-colors hover:bg-navy/[0.15] lg:flex"
        >
          Public Site
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          className="pressable flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy lg:hidden"
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
        <InternalMobileMenu pathname={pathname} onClose={() => setMenuOpen(false)} />
      )}
    </header>
  );
}

function NavPill({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors",
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

// Matches the panel's `duration-300` below — the actual unmount (telling
// the parent to drop `menuOpen`) waits this long after a close is
// requested, so the slide-out has time to finish instead of the panel just
// vanishing mid-transition.
const MENU_TRANSITION_MS = 300;

function InternalMobileMenu({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  // Starts closed and flips to open one frame after mount, so the panel's
  // own transition (rather than its resting state) is what carries it
  // in — a plain `{menuOpen && <InternalMobileMenu/>}` mount has nothing
  // to transition *from*, which is why it used to just pop into place.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Every close trigger (backdrop, X, Escape, a nav link) goes through
  // this instead of calling `onClose` directly, so the panel always gets
  // to slide back out before it's removed from the DOM.
  const handleClose = () => {
    setVisible(false);
    window.setTimeout(onClose, MENU_TRANSITION_MS);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      className="fixed inset-0 lg:hidden"
      style={{ zIndex: "var(--z-overlay)" }}
    >
      <div
        aria-hidden
        onClick={handleClose}
        className={cn(
          "absolute inset-0 bg-ink/80 backdrop-blur-sm transition-opacity duration-300 ease-[var(--ease-out)]",
          visible ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-xs flex-col overflow-y-auto bg-white p-6 shadow-[var(--shadow-lg)] transition-transform duration-300 ease-[var(--ease-out)]",
          visible ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="eyebrow text-accent-ink">Menu</span>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close menu"
            className="pressable flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav aria-label="Internal portal" className="mt-8 flex flex-col gap-1">
          <Link href="/internal" onClick={handleClose} className={blockClass(pathname === "/internal")}>
            Dashboard
          </Link>
          <Link
            href="/internal/ebcb-directory"
            onClick={handleClose}
            className={blockClass(pathname.startsWith("/internal/ebcb-directory"))}
          >
            EBCB Directory
          </Link>
        </nav>

        <Link
          href="/"
          onClick={handleClose}
          className="mt-6 flex items-center gap-1.5 rounded-2xl px-4 py-3 text-sm font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:bg-navy-tint hover:text-navy"
        >
          <span aria-hidden>&larr;</span> Public Site
        </Link>
      </div>
    </div>,
    document.body
  );
}
