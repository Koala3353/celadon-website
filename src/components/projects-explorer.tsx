"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { ProjectWithDepartment } from "@/lib/data";
import type { Department } from "@/lib/supabase/types";

export function ProjectsExplorer({
  projects,
  departments,
}: {
  projects: ProjectWithDepartment[];
  departments: Department[];
}) {
  const [year, setYear] = useState<number | "all">("all");
  const [departmentSlug, setDepartmentSlug] = useState<string | "all">("all");

  const years = useMemo(
    () => Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => b - a),
    [projects]
  );

  const filtered = projects.filter((p) => {
    if (year !== "all" && p.year !== year) return false;
    if (departmentSlug !== "all" && p.department?.slug !== departmentSlug) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        <FilterPill active={year === "all"} onClick={() => setYear("all")}>
          All years
        </FilterPill>
        {years.map((y) => (
          <FilterPill key={y} active={year === y} onClick={() => setYear(y)}>
            {y}
          </FilterPill>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <FilterPill
          active={departmentSlug === "all"}
          onClick={() => setDepartmentSlug("all")}
        >
          All departments
        </FilterPill>
        {departments.map((d) => (
          <FilterPill
            key={d.slug}
            active={departmentSlug === d.slug}
            onClick={() => setDepartmentSlug(d.slug)}
          >
            {d.name}
          </FilterPill>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">No projects match these filters.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`}>
              <Card className="flex h-full flex-col gap-3 p-6 transition-colors hover:border-accent">
                <Badge className="w-fit">{project.year}</Badge>
                <h3 className="font-display text-xl font-medium">{project.title}</h3>
                {project.department && (
                  <p className="text-sm text-muted-foreground">{project.department.name}</p>
                )}
                {project.description && (
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
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
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border text-muted-foreground hover:bg-muted"
      )}
    >
      {children}
    </button>
  );
}
