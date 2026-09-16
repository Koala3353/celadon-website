"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import type { DeptAccent } from "@/lib/deputy-departments";
import { CORE_TEAM_PROJECTS } from "@/lib/core-team-wave";

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

  const ctaActive = pathname.startsWith("/internal/cta-wave1");

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

            {/* Keyed by pathname so it's a fresh instance (its open state
                reset to false) after every navigation — no effect-based
                setState needed, and no risk of a click-time re-render
                racing the link's own navigation (see PortalDropdown for why
                that mattered). */}
            <CtaDropdown key={pathname} active={ctaActive} />

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
        <InternalMobileMenu ctaActive={ctaActive} pathname={pathname} onClose={() => setMenuOpen(false)} />
      )}
    </header>
  );
}

interface DropdownItem {
  slug: string;
  name: string;
  emoji?: string;
  href: string;
  accent: DeptAccent;
}

/**
 * A nav pill + chevron that opens a small panel of links below it — the
 * "Core Team Applications" pill and its one-entry-per-project panel.
 *
 * Opens on hover over the trigger (the pill + its chevron) or the panel
 * itself, closes a beat after the pointer leaves both — not the whole
 * `relative` wrapper, whose box also covers the dead space where the
 * (currently invisible) panel sits before it's ever opened, which used to
 * open the menu just from hovering past that empty gap. The short close
 * delay is what lets the pointer cross the small trigger-to-panel gap
 * without the panel closing under it. A click on the chevron still toggles
 * it too, for touch/keyboard use where there's no hover to begin with.
 */
function PortalDropdown({
  href,
  label,
  active,
  items,
  chevronLabel,
}: {
  href: string;
  label: string;
  active: boolean;
  items: DropdownItem[];
  chevronLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openNow = () => {
    cancelClose();
    setOpen(true);
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <div className="flex items-center" onMouseEnter={openNow} onMouseLeave={closeSoon}>
        <NavPill href={href} label={label} active={active} />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={chevronLabel}
          aria-expanded={open}
          className="pressable -ml-2 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-navy-tint hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
            aria-hidden
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      <div className="absolute left-0 top-full w-56 pt-2">
        <div
          onMouseEnter={openNow}
          onMouseLeave={closeSoon}
          className={cn(
            "grid grid-cols-1 gap-0.5 rounded-2xl bg-white p-2 shadow-[var(--shadow-md)] ring-1 ring-inset ring-border transition-opacity duration-150",
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          {items.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              style={{ "--dept-tint": item.accent.tint, "--dept-ink": item.accent.ink } as React.CSSProperties}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-dept-tint hover:text-dept-ink"
            >
              {item.emoji && <span aria-hidden>{item.emoji}</span>}
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function CtaDropdown({ active }: { active: boolean }) {
  return (
    <PortalDropdown
      href="/internal/cta-wave1"
      label="Core Team Applications"
      active={active}
      chevronLabel="Show projects"
      items={CORE_TEAM_PROJECTS.map((project) => ({
        slug: project.slug,
        name: project.name,
        emoji: project.emoji,
        href: project.href ?? "/internal/cta-wave1",
        accent: project.accent,
      }))}
    />
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
  ctaActive,
  onClose,
}: {
  pathname: string;
  ctaActive: boolean;
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
          <Link href="/internal/cta-wave1" onClick={handleClose} className={blockClass(ctaActive)}>
            Core Team Applications
          </Link>
          <div className="ml-3 flex flex-col gap-0.5 border-l border-border pl-3">
            {CORE_TEAM_PROJECTS.map((project) => (
              <Link
                key={project.slug}
                href={project.href ?? "/internal/cta-wave1"}
                onClick={handleClose}
                style={{ "--dept-tint": project.accent.tint, "--dept-ink": project.accent.ink } as React.CSSProperties}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-dept-tint hover:text-dept-ink"
              >
                {project.emoji && <span aria-hidden>{project.emoji}</span>}
                {project.name}
              </Link>
            ))}
          </div>
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
