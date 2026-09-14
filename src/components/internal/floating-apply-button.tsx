/**
 * A pill that stays pinned to the viewport while the page scrolls — same
 * treatment as a department's own floating apply button
 * (`dept.floatingApplyUrl` in department-page.tsx), reused here for each
 * Core Team project's detail page. Relies on `--dept-accent` already being
 * set by the page it's dropped into.
 */
export function FloatingApplyButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        zIndex: "var(--z-nav)",
        // Clears the iOS home-indicator / gesture bar on notched phones
        // instead of sitting flush against the very bottom edge.
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
      className="pressable fixed inset-x-4 mx-auto flex w-fit max-w-[calc(100%-2rem)] items-center justify-center gap-2 rounded-full bg-dept-accent px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[var(--shadow-lg)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dept-accent sm:inset-x-auto sm:right-6 sm:px-6 sm:py-3 sm:text-sm"
    >
      <span className="truncate">{label}</span>
      <span aria-hidden className="shrink-0 text-sm sm:text-base">
        &#8599;
      </span>
    </a>
  );
}
