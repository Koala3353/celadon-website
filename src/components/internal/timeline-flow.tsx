import type { DeptTimelineItem } from "@/lib/deputy-departments";
import { cn } from "@/lib/cn";

const CHEVRON_COLORS = ["bg-sky-blue", "bg-sky-teal", "bg-sky-peach"];

// Left edge notched in, right edge pointed — lets consecutive chevrons nest
// into one continuous chain via a small negative margin. Notch/point kept
// shallow (vs. a sharper cut) so text stays clear of the angled edges.
const CHEVRON_CLIP = "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%, 12% 50%)";

/**
 * Chevron flow used only for the hub's 3-step HUB_TIMELINE. The shared
 * Timeline component stays a plain dot list for department pages, whose
 * timelines run up to 9 items — too many to read as a horizontal chain.
 */
export function TimelineFlow({ items }: { items: DeptTimelineItem[] }) {
  return (
    <>
      <ol className="flex flex-col gap-3 sm:hidden">
        {items.map((item, i) => (
          <li key={item.label} className={cn("rounded-2xl px-5 py-4", CHEVRON_COLORS[i % CHEVRON_COLORS.length])}>
            <p className="text-xs font-bold uppercase tracking-wider text-sky-navy/70">{item.date}</p>
            <p className="sky-display mt-0.5 text-lg font-semibold text-sky-navy">{item.label}</p>
          </li>
        ))}
      </ol>

      <div className="hidden sm:flex sm:items-stretch sm:px-6 sm:py-5">
        {items.map((item, i) => (
          <div key={item.label} className={cn("relative min-w-0 flex-1", i > 0 && "-ml-5")}>
            <div
              className={cn(
                "flex h-36 flex-col items-center justify-center gap-1 px-8 text-center sm:px-10",
                CHEVRON_COLORS[i % CHEVRON_COLORS.length]
              )}
              style={{ clipPath: CHEVRON_CLIP }}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-sky-navy/70">{item.date}</p>
              <p className="sky-display text-base font-semibold leading-tight text-sky-navy sm:text-lg">
                {item.label}
              </p>
            </div>
            <span
              aria-hidden
              className={cn(
                "absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-sky-navy ring-4 ring-white",
                i % 2 === 0 ? "-bottom-1.5" : "-top-1.5"
              )}
            />
          </div>
        ))}
      </div>
    </>
  );
}
