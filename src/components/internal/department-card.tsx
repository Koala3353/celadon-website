import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import type { Department } from "@/lib/deputy-departments";

/**
 * Double-bezel treatment (outer tray + inner plate), same family as the
 * public site's <Card> — an untinted navy tray here would fight the sky
 * palette, so the outer shell is tinted to the department's own accent
 * instead, set once as CSS variables (see DepartmentPage for the same
 * pattern on the full page).
 */
export function DepartmentCard({ dept }: { dept: Department }) {
  return (
    <Link
      href={`/internal/dept-apps/${dept.slug}`}
      data-reveal
      style={
        {
          "--dept-accent": dept.accent.base,
          "--dept-tint": dept.accent.tint,
          "--dept-ink": dept.accent.ink,
        } as React.CSSProperties
      }
      className="lift pressable group block rounded-[1.75rem] bg-dept-accent/[0.08] p-1.5 ring-1 ring-inset ring-dept-accent/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-navy"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[1.375rem] bg-white shadow-[var(--shadow-sm)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
          <Image
            src={asset(dept.cardCover.src)}
            alt=""
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/25 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col gap-1 p-5">
          <div className="flex items-center gap-2">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dept-tint text-lg"
              aria-hidden
            >
              {dept.emoji}
            </span>
            <span className="sky-display text-lg font-semibold text-dept-ink">{dept.name}</span>
          </div>
          <span className="text-sm text-muted-foreground">{dept.fullName}</span>
          <p className="prose-body mt-2 text-sm text-muted-foreground">{dept.cardBlurb}</p>
          <span className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-bold uppercase tracking-wider text-dept-ink transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1">
            View department <span aria-hidden>&rarr;</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
