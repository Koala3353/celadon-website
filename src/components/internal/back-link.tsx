import Link from "next/link";

/**
 * A pill pinned to the top-left corner of a department's or project's own
 * hero — sits directly on top of the banner art (the hero section it's
 * dropped into is `relative`, so this positions against that, not the
 * page), same corner placement as a video player's own back button. A
 * translucent white chip rather than `--dept-ink` text reads reliably over
 * every hero, whether that's a flat accent tint or a busy illustrated
 * banner underneath it.
 */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-dept-ink shadow-[var(--shadow-sm)] backdrop-blur-sm transition-colors hover:bg-white sm:left-6 sm:top-6"
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
