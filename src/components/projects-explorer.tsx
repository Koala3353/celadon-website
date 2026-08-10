"use client";

import { useMemo, useState } from "react";
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

  const years = useMemo(
    () => Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => b - a),
    [projects]
  );

  // Only offer a department filter for departments that actually have
  // projects — otherwise most pills lead to an empty grid.
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

  return (
    <div className="flex flex-col gap-8">
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
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
      <span className="mr-1 font-display text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </span>
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
        "rounded-full border-2 px-4 py-1.5 font-display text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green",
        active
          ? "border-green bg-green text-cream"
          : "border-border text-muted-foreground hover:bg-muted"
      )}
    >
      {children}
    </button>
  );
}
