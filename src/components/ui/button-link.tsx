import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Pill CTA with the trailing arrow nested in its own disc rather than sitting
 * naked beside the label. On hover the disc drifts up-and-right while the
 * whole control presses down on click — small kinetic tension, no layout cost.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "onNavy";
  external?: boolean;
  className?: string;
}) {
  const base =
    "group pressable inline-flex items-center gap-3 rounded-full py-3 pl-6 pr-3 text-sm font-bold uppercase tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2";

  const variants = {
    primary:
      "bg-navy text-white outline-navy transition-colors hover:bg-[#002560]",
    outline:
      "bg-transparent text-navy ring-2 ring-inset ring-navy outline-navy transition-colors hover:bg-navy hover:text-white",
    onNavy:
      "bg-white text-navy outline-white transition-colors hover:bg-on-navy",
  } as const;

  const discs = {
    primary: "bg-white/15",
    outline: "bg-navy/10 group-hover:bg-white/20",
    onNavy: "bg-navy/10",
  } as const;

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          discs[variant]
        )}
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="h-3.5 w-3.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12 12 4M6 4h6v6" />
        </svg>
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variants[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {content}
    </Link>
  );
}
