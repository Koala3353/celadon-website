"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExpandableList } from "@/components/expandable-list";
import { cn } from "@/lib/cn";
import type { CoreTeamCommittee } from "@/lib/types";

/**
 * A picker + detail panel instead of 14 identical accordions. Selecting a
 * committee swaps the panel below rather than expanding in place, so nothing
 * downstream reflows the way an inline accordion grid would.
 */
export function CommitteeExplorer({ committees }: { committees: CoreTeamCommittee[] }) {
  const [selectedAbbr, setSelectedAbbr] = useState(committees[0]?.abbr);
  const selected = committees.find((c) => c.abbr === selectedAbbr) ?? committees[0];

  if (!selected) return null;

  return (
    <div>
      {/* A vertical stack of 14 buttons put the detail panel a full page
          below the picker on mobile — picking a different committee meant
          scrolling all the way back up, reading, then all the way back
          down. Below sm this is instead a single horizontally-scrollable
          row (snapping, no visible scrollbar), so the whole picker stays
          about one thumb-swipe wide and the detail panel right underneath
          it never moves. From sm up there's room for the original grid. */}
      <div
        role="tablist"
        aria-label="Core Team committees"
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
      >
        {committees.map((c) => {
          const isSelected = c.abbr === selected.abbr;
          return (
            <button
              key={c.abbr}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedAbbr(c.abbr)}
              className={cn(
                "pressable flex shrink-0 snap-start items-center gap-3 whitespace-nowrap rounded-2xl p-4 text-left ring-1 ring-inset transition sm:shrink sm:whitespace-normal",
                isSelected
                  ? "bg-navy text-white shadow-[var(--shadow-md)] ring-navy"
                  : "bg-white text-navy ring-navy/[0.07] hover:-translate-y-0.5 hover:bg-navy/[0.08] hover:shadow-[var(--shadow-sm)] hover:ring-navy/[0.2]"
              )}
            >
              <Badge tone={isSelected ? "onNavy" : "neutral"}>{c.abbr}</Badge>
              <span className="font-extrabold">{c.name}</span>
            </button>
          );
        })}
      </div>

      <Card key={selected.abbr} className="mt-6" innerClassName="p-6 sm:p-8">
        <div role="tabpanel" className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Badge tone="navy">{selected.abbr}</Badge>
            <h3 className="display text-2xl text-navy">{selected.name}</h3>
          </div>

          {selected.description && (
            <p className="prose-body text-muted-foreground">{selected.description}</p>
          )}

          <div className="grid gap-6 border-t border-border pt-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-accent-ink">
                Responsibilities
              </p>
              <ExpandableList items={selected.responsibilities} cap={selected.listCap ?? 4} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-accent-ink">
                Common deliverables
              </p>
              <ExpandableList items={selected.deliverables} cap={selected.listCap ?? 4} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-accent-ink">
                Relevant qualities
              </p>
              <ExpandableList items={selected.qualities} cap={selected.listCap ?? 4} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
