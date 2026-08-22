"use client";

import { useState } from "react";

/**
 * A bullet list capped to a few items, with a "+N more" toggle. Used inside
 * the committee accordions on /recruitment, where a couple of lists (e.g.
 * PROG's 11 deliverables) would otherwise make an open card unreasonably
 * tall.
 */
export function ExpandableList({ items, cap = 4 }: { items: string[]; cap?: number }) {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = items.length - cap;
  const visible = expanded || hiddenCount <= 0 ? items : items.slice(0, cap);

  return (
    <>
      <ul className="mt-3 flex flex-col gap-2">
        {visible.map((item, i) => (
          <li key={i} className="prose-body flex gap-2 text-sm text-muted-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-ink" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-xs font-bold uppercase tracking-wider text-link"
        >
          {expanded ? "Show less" : `+${hiddenCount} more`}
        </button>
      )}
    </>
  );
}
