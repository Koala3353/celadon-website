"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/cn";
import type { Department, ProjectWithDepartment } from "@/lib/types";

export function ProjectsExplorer({
  projects,
  departments,
}: {
  projects: ProjectWithDepartment[];
  departments: Department[];
}) {
  const [year, setYear] = useState<number | "all">("all");
  const [departmentSlug, setDepartmentSlug] = useState<string>("all");
  const grid = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  const years = useMemo(
    () => Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => b - a),
    [projects]
  );

  // Only offer a department filter for departments that own projects —
  // otherwise most pills lead to an empty grid.
  const usedDepartments = useMemo(() => {
    const slugs = new Set(projects.map((p) => p.department?.slug).filter(Boolean));
    return departments.filter((d) => slugs.has(d.slug));
  }, [projects, departments]);

  const filtered = projects.filter((project) => {
    if (year !== "all" && project.year !== year) return false;
    if (departmentSlug !== "all" && project.department?.slug !== departmentSlug)
      return false;
    return true;
  });

  // Re-stagger the grid when the filter changes so results feel dealt out
  // rather than swapped. Skipped on first paint — the Reveal on mount already
  // covers that, and doubling up reads as a stutter.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = grid.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    if (cards.length === 0) return;

    const animation = animate(cards, {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 380,
      delay: stagger(35),
      ease: "cubicBezier(0.23, 1, 0.32, 1)",
    });
    return () => {
      animation.revert();
    };
  }, [year, departmentSlug]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <FilterRow label="Year">
          <FilterPill active={year === "all"} onClick={() => setYear("all")}>
            All years
          </FilterPill>
          {years.map((y) => (
            <FilterPill key={y} active={year === y} onClick={() => setYear(y)}>
              {y}
            </FilterPill>
          ))}
        </FilterRow>

        {usedDepartments.length > 0 && (
          <FilterRow label="Department">
            <FilterPill
              active={departmentSlug === "all"}
              onClick={() => setDepartmentSlug("all")}
            >
              All departments
            </FilterPill>
            {usedDepartments.map((d) => (
              <FilterPill
                key={d.slug}
                active={departmentSlug === d.slug}
                onClick={() => setDepartmentSlug(d.slug)}
              >
                {d.name}
              </FilterPill>
            ))}
          </FilterRow>
        )}
      </div>

      <p aria-live="polite" className="text-sm text-muted-foreground">
        {filtered.length} project{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">No projects match these filters.</p>
      ) : (
        <div
          ref={grid}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <div key={project.slug} data-card>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="eyebrow mr-1 text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "pressable rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
        active
          ? "bg-navy text-white"
          : "bg-navy/[0.05] text-muted-foreground hover:bg-navy/[0.1] hover:text-navy"
      )}
    >
      {children}
    </button>
  );
}
