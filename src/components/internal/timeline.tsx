import type { DeptTimelineItem } from "@/lib/deputy-departments";

function TimelineColumn({ items }: { items: DeptTimelineItem[] }) {
  return (
    <ol className="flex flex-col gap-0">
      {items.map((item, i) => (
        <li key={i} data-reveal className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-dept-accent ring-4 ring-dept-accent/15" />
            {i < items.length - 1 && <span className="w-px flex-1 bg-dept-accent/20" />}
          </div>
          <div className="pb-7">
            <p className="text-xs font-bold uppercase tracking-wider text-dept-accent">{item.date}</p>
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
