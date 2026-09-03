import Link from "next/link";
import { SkeletonImage } from "@/components/ui/skeleton-image";
import { asset } from "@/lib/asset";
import type { Department } from "@/lib/deputy-departments";

/**
 * A single flat surface tinted to the department's own accent (set once as
 * CSS variables — see DepartmentPage for the same pattern on the full page),
 * with the cover photo doing the identifying work instead of a decorative
 * icon badge. The department name sits directly on the tint, colored by the
 * accent's ink, so each card reads as a distinct color-block rather than a
 * repeat of the same white card shape six times over.
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
      className="lift pressable group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-navy"
    >
      {/* overflow-hidden lives on this inner wrapper, not the <a> itself —
          the hover lift's box-shadow is painted on the <a>, and an element
          clips its own shadow if overflow-hidden sits on that same box. */}
      <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-dept-tint">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <SkeletonImage
            src={asset(dept.cardCover.src)}
            alt=""
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover ease-[var(--ease-out)] group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1 p-5">
          <span className="sky-display text-lg font-semibold text-dept-ink">
            {dept.name} <span aria-hidden>{dept.emoji}</span>
          </span>
          <span className="text-sm text-dept-ink/70">{dept.fullName}</span>
          <p className="prose-body mt-2 text-sm text-dept-ink/80">{dept.cardBlurb}</p>
          <span className="mt-auto pt-4 text-sm font-bold text-dept-accent">View department</span>
        </div>
      </div>
    </Link>
  );
}
