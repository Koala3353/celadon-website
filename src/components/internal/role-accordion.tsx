import { PhotoCarousel } from "@/components/photo-carousel";
import { AboutRunText } from "@/components/internal/rich-text";
import { asset } from "@/lib/asset";
import type { DeptRole } from "@/lib/deputy-departments";

/**
 * Only rendered where a department actually has more than one distinct
 * applicant-facing position (COMMPUB's five pools) — everything else is a
 * single role described directly in `sections`, no accordion needed.
 */
export function RoleAccordion({ roles }: { roles: DeptRole[] }) {
  return (
    <div className="flex flex-col gap-3">
      {roles.map((role) => (
        <details
          key={role.slug}
          data-reveal
          className="group rounded-2xl bg-dept-tint p-1.5 ring-1 ring-inset ring-dept-accent/15 transition-shadow duration-300 ease-[var(--ease-out)] open:shadow-[var(--shadow-sm)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[1.125rem] bg-white p-5 shadow-[var(--shadow-sm)] transition-colors hover:bg-dept-tint group-open:rounded-b-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-3">
              {role.emoji && <span className="text-xl">{role.emoji}</span>}
              <span className="font-extrabold text-dept-ink">{role.title}</span>
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 shrink-0 text-dept-ink/50 transition-transform duration-200 group-open:rotate-180"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="rounded-b-[1.125rem] bg-white px-5 pb-5">
            <p className="prose-body text-sm text-dept-ink/70">
              {Array.isArray(role.description)
                ? role.description.map((run, i) => <AboutRunText key={i} run={run} />)
                : role.description}
            </p>
            {role.images && role.images.length > 0 && (
              <PhotoCarousel
                photos={role.images.map((img) => asset(img.src))}
                alt={`${role.title} sample output`}
                fit="contain"
                className="mx-auto mt-4 aspect-[3/2] w-full max-w-sm rounded-xl"
              />
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
