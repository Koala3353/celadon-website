import Link from "next/link";

/**
 * A small "back to the hub" link shown at the top of a department's or
 * project's own detail page — relies on `--dept-ink` already being set by
 * the page it's dropped into, same as every other dept-tinted element
 * there, so it needs no accent prop of its own.
 */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-dept-ink/60 transition-colors hover:text-dept-ink"
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
