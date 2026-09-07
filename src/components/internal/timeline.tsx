import { cn } from "@/lib/cn";
import type { DeptTimelineItem } from "@/lib/deputy-departments";

// "notable" grows the dot and switches it to a fixed amber (matching a
// source doc's own yellow row-highlighting, independent of the department's
// accent color); "critical" grows it further still and switches to the
// department's darker ink shade — so a doc's own two-tier highlighting (e.g.
// Rose Sale's yellow vs. salmon timeline rows) reads as two distinct colors
// here too, and the date text is tinted to match each row's own dot.
const DOT_STYLES = {
  notable: "mt-1 h-4 w-4 bg-amber-500 ring-[5px] ring-amber-500/20",
  critical: "mt-0.5 h-5 w-5 bg-dept-ink ring-[5px] ring-dept-ink/20",
} as const;

const DATE_TEXT_STYLES = {
  notable: "text-amber-600",
  critical: "text-dept-ink",
} as const;

function TimelineColumn({ items }: { items: DeptTimelineItem[] }) {
  return (
    <ol className="flex flex-col gap-0">
      {items.map((item, i) => (
        <li key={i} data-reveal className="flex gap-4">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "shrink-0 rounded-full",
                item.emphasis ? DOT_STYLES[item.emphasis] : "mt-1.5 h-3 w-3 bg-dept-accent ring-4 ring-dept-accent/15"
              )}
            />
            {i < items.length - 1 && <span className="w-px flex-1 bg-dept-accent/20" />}
          </div>
          <div className="pb-7">
            <p
              className={cn(
                "text-xs font-bold uppercase tracking-wider",
                item.emphasis ? DATE_TEXT_STYLES[item.emphasis] : "text-dept-accent"
              )}
            >
              {item.date}
            </p>
            <p className="prose-body text-muted-foreground">{item.label}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Timeline({
  items,
  columns = 1,
}: {
  items: DeptTimelineItem[];
  /** Split a long timeline into two side-by-side columns (first half, then
   * second half) instead of one tall single-file list — for a project like
   * Rose Sale whose timeline has far more entries than CNY/JADE/SFF's. Each
   * column gets its own connecting line rather than one spanning both. */
  columns?: 1 | 2;
}) {
  if (columns === 1) return <TimelineColumn items={items} />;

  const half = Math.ceil(items.length / 2);
  return (
    <div className="grid gap-x-8 sm:grid-cols-2">
      <TimelineColumn items={items.slice(0, half)} />
      <TimelineColumn items={items.slice(half)} />
    </div>
  );
}
