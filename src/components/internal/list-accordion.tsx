import { renderItem } from "@/components/internal/rich-text";
import { cn } from "@/lib/cn";
import type { AboutRun, DeptGroup } from "@/lib/deputy-departments";

/** A bare bold-only run (e.g. "Competencies", "Deliverables", "Photos") acts
 * as a sub-heading within a committee's items rather than a bullet of its
 * own — it introduces the bullets that follow it, so it renders without a
 * dot and with a little extra breathing room above it. */
function isSubheading(item: string | AboutRun[]): boolean {
  return Array.isArray(item) && item.length === 1 && item[0].bold === true &&
    !item[0].italic && !item[0].underline && !item[0].accent && !item[0].highlight;
}

/**
 * A collapsible list of labeled bullet groups — same disclosure styling and
 * nav-matching chevron as RoleAccordion, for content too dense to show fully
 * expanded at once (e.g. FIN's four committees).
 */
export function ListAccordion({ groups }: { groups: DeptGroup[] }) {
  return (
    <div className="flex flex-col gap-3">
      {groups.map((group) => (
        <details
          key={group.label}
          data-reveal
          className="group rounded-2xl bg-dept-tint p-1.5 ring-1 ring-inset ring-dept-accent/15 transition-shadow duration-300 ease-[var(--ease-out)] open:shadow-[var(--shadow-sm)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[1.125rem] bg-white p-5 shadow-[var(--shadow-sm)] transition-colors hover:bg-dept-tint group-open:rounded-b-none [&::-webkit-details-marker]:hidden">
            <span className="font-extrabold text-dept-ink">{group.label}</span>
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
            <ul className="flex flex-col gap-1.5">
              {group.items.map((item, i) =>
                isSubheading(item) ? (
                  <li key={i} className={cn("prose-body text-sm font-bold text-dept-ink", i > 0 && "mt-2")}>
                    {renderItem(item)}
                  </li>
                ) : (
                  <li key={i} className="prose-body flex gap-2 text-sm text-muted-foreground">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-dept-accent" />
                    <span>{renderItem(item)}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </details>
      ))}
    </div>
  );
}
