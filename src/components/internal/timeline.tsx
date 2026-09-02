import type { DeptTimelineItem } from "@/lib/deputy-departments";

export function Timeline({ items }: { items: DeptTimelineItem[] }) {
  return (
    <ol className="flex flex-col gap-0">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4">
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
