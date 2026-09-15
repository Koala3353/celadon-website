import Link from "next/link";

/**
 * A pill that stays pinned to the viewport's top-left corner (just under
 * the sticky internal nav) for the whole page, not just while its hero is
 * on screen — same "follow the screen" treatment as FloatingApplyButton,
 * mirrored to the opposite corner. A translucent white chip rather than
 * `--dept-ink` text reads reliably over every hero it starts out on top
 * of, whether that's a flat accent tint or a busy illustrated banner.
 */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{ zIndex: "calc(var(--z-nav) - 1)" }}
      className="group fixed left-4 top-20 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-dept-ink shadow-[var(--shadow-sm)] backdrop-blur-sm transition-colors hover:bg-white sm:left-6 sm:top-24"
    >
      <span
        aria-hidden
        className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-x-0.5"
      >
        &larr;
      </span>
      {label}
    </Link>
  );
}
