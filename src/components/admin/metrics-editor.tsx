"use client";

import { useState } from "react";
import type { ProjectMetric, MetricType } from "@/lib/supabase/types";
import type { ProjectWithDepartment } from "@/lib/data";

const METRIC_TYPES: { type: MetricType; label: string; isJson?: boolean }[] = [
  { type: "impressions", label: "Impressions" },
  { type: "engagement_rate", label: "Engagement Rate (0–1)" },
  { type: "participant_count", label: "Participant Count" },
  { type: "participant_yoy_change", label: "YoY Participant Change (e.g. 0.12)" },
  { type: "satisfaction_rating", label: "Satisfaction Rating (0–5)" },
  { type: "beneficiaries_reached", label: "Beneficiaries Reached" },
  { type: "demographic_breakdown", label: "Demographic Breakdown (JSON)", isJson: true },
];

type ProjectRow = ProjectWithDepartment & { metrics: ProjectMetric[] };

export function MetricsEditor({ projects }: { projects: ProjectRow[] }) {
  return (
    <div className="flex flex-col gap-6">
      {projects.map((project) => (
        <ProjectMetricsCard key={project.id} project={project} />
      ))}
    </div>
  );
}

function ProjectMetricsCard({ project }: { project: ProjectRow }) {
  const metricsByType = Object.fromEntries(project.metrics.map((m) => [m.metric_type, m.value]));

  return (
    <details className="rounded-2xl border border-border" open={false}>
      <summary className="cursor-pointer list-none px-6 py-4 font-medium">
        {project.title}{" "}
        <span className="text-sm font-normal text-muted-foreground">({project.year})</span>
      </summary>
      <div className="grid gap-4 border-t border-border p-6 sm:grid-cols-2">
        {METRIC_TYPES.map((mt) => (
          <MetricField
            key={mt.type}
            projectId={project.id}
            metricType={mt.type}
            label={mt.label}
            isJson={mt.isJson}
            initialValue={metricsByType[mt.type]}
          />
        ))}
      </div>
    </details>
  );
}

function MetricField({
  projectId,
  metricType,
  label,
  isJson,
  initialValue,
}: {
  projectId: string;
  metricType: MetricType;
  label: string;
  isJson?: boolean;
  initialValue: unknown;
}) {
  const [value, setValue] = useState(() =>
    initialValue === undefined
      ? ""
      : isJson
      ? JSON.stringify(initialValue, null, 2)
      : String(initialValue)
  );
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSave() {
    setStatus("saving");
    setErrorMessage(null);
    try {
      const parsedValue = isJson ? JSON.parse(value) : Number(value);
      if (!isJson && Number.isNaN(parsedValue)) {
        throw new Error("Must be a number");
      }
      const res = await fetch("/api/admin/metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, metricType, value: parsedValue }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to save");
      }
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1500);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to save");
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="flex gap-2">
        {isJson ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={3}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs outline-none focus:border-accent"
          />
        ) : (
          <input
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        )}
        <button
          type="button"
          onClick={handleSave}
          disabled={status === "saving"}
          className="shrink-0 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save"}
        </button>
      </div>
      {status === "error" && <p className="text-xs text-red-600">{errorMessage}</p>}
    </div>
  );
}
