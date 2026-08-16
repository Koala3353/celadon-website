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

  // Reveal the grid. This runs after the initial mount too (React fires
  // effects once after first render regardless of the dependency array), so
  // it also has to cover the very first paint — there's no page-level
  // <Reveal> wrapping this component, and each card's own [data-reveal]
  // starts at opacity:0 via CSS (globals.css) until something clears it.
  // Filter changes re-run it for whichever project cards just mounted.
  useEffect(() => {
    const el = grid.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((t) => {
        t.style.opacity = "1";
        t.style.transform = "none";
      });
      return;
    }

    const animation = animate(targets, {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 420,
      delay: stagger(40),
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
            <ProjectCard key={project.slug} project={project} />
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
