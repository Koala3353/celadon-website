import Image from "next/image";
import { renderItem } from "@/components/internal/rich-text";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import type { AboutRun, DeptGroup } from "@/lib/deputy-departments";

/** A bare bold-only run (e.g. "Competencies", "Deliverables", "Photos") acts
 * as a sub-heading within a committee's items, and an all-italic run or
 * sequence of runs (a committee's description paragraph, or a trailing
 * "Note:"/"Additional Requirement:" aside — possibly with a linked phrase
 * like "this document" in the middle) reads as body copy rather than a
 * checklist entry — neither is a bullet of its own, so both render without
 * a dot. */
function freeformBlockStyle(item: string | AboutRun[]): "bold" | "italic" | null {
  if (!Array.isArray(item) || item.length === 0) return null;
  if (item.some((run) => run.underline || run.accent || run.highlight)) return null;
  if (item.every((run) => run.bold && !run.italic)) return "bold";
  if (item.every((run) => run.italic && !run.bold)) return "italic";
  return null;
}

/**
 * A collapsible list of labeled bullet groups — same disclosure styling and
 * nav-matching chevron as RoleAccordion, for content too dense to show fully
 * expanded at once (e.g. FIN's four committees).
 *
 * `photos`, when given, pairs each group (by index) with its own photo —
 * Rose Sale's own doc places a specific picture beside every committee —
 * shown alongside the items once that committee is expanded.
 */
export function ListAccordion({ groups, photos }: { groups: DeptGroup[]; photos?: ({ src: string; alt: string } | undefined)[] }) {
  return (
    <div className="flex flex-col gap-3">
      {groups.map((group, groupIndex) => {
        const photo = photos?.[groupIndex];
        const list = (
          <ul className="flex flex-col gap-1.5">
            {group.items.map((item, i) => {
              const block = freeformBlockStyle(item);
              if (block) {
                return (
                  <li
                    key={i}
                    className={cn(
                      "prose-body text-sm",
                      block === "bold" ? "font-bold text-dept-ink" : "text-muted-foreground",
                      i > 0 && "mt-2"
                    )}
                  >
                    {renderItem(item)}
                  </li>
                );
              }
              return (
                <li key={i} className="prose-body flex gap-2 text-sm text-muted-foreground">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-dept-accent" />
                  <span>{renderItem(item)}</span>
                </li>
              );
            })}
          </ul>
        );

        return (
          <details
            key={group.label}
            data-reveal
            className="group rounded-2xl bg-dept-tint p-1.5 ring-1 ring-inset ring-dept-accent/15 transition-shadow duration-300 ease-[var(--ease-out)] open:shadow-[var(--shadow-sm)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[1.125rem] bg-white p-5 shadow-[var(--shadow-sm)] transition-colors hover:bg-dept-tint group-open:rounded-b-none group-open:hover:bg-white [&::-webkit-details-marker]:hidden">
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
              {photo ? (
                <div className="grid gap-4 sm:grid-cols-[1fr_9rem]">
                  {list}
                  <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl sm:aspect-auto">
                    <Image src={asset(photo.src)} alt={photo.alt} fill sizes="144px" className="object-cover" />
                  </div>
                </div>
              ) : (
                list
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}
