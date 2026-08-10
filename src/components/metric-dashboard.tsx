import { Card } from "@/components/ui/card";
import { formatCompactNumber, formatPercent } from "@/lib/format";
import type { ProjectMetric } from "@/lib/supabase/types";

const METRIC_LABELS: Record<string, string> = {
  impressions: "Impressions",
  engagement_rate: "Engagement Rate",
  participant_count: "Participants",
  participant_yoy_change: "YoY Participant Change",
  satisfaction_rating: "Satisfaction Rating",
  beneficiaries_reached: "Beneficiaries Reached",
};

export function MetricDashboard({ metrics }: { metrics: ProjectMetric[] }) {
  const byType = Object.fromEntries(metrics.map((m) => [m.metric_type, m.value]));
  const demographic = byType.demographic_breakdown as Record<string, number> | undefined;

  const statCards: Array<{ key: string; label: string; value: string }> = [];

  if (typeof byType.impressions === "number") {
    statCards.push({ key: "impressions", label: METRIC_LABELS.impressions, value: formatCompactNumber(byType.impressions) });
  }
  if (typeof byType.participant_count === "number") {
    statCards.push({ key: "participant_count", label: METRIC_LABELS.participant_count, value: formatCompactNumber(byType.participant_count) });
  }
  if (typeof byType.engagement_rate === "number") {
    statCards.push({ key: "engagement_rate", label: METRIC_LABELS.engagement_rate, value: formatPercent(byType.engagement_rate) });
  }
  if (typeof byType.participant_yoy_change === "number") {
    const v = byType.participant_yoy_change as number;
    statCards.push({
      key: "participant_yoy_change",
      label: METRIC_LABELS.participant_yoy_change,
      value: `${v >= 0 ? "+" : ""}${formatPercent(v)}`,
    });
  }
  if (typeof byType.satisfaction_rating === "number") {
    statCards.push({ key: "satisfaction_rating", label: METRIC_LABELS.satisfaction_rating, value: `${byType.satisfaction_rating.toFixed(1)} / 5` });
  }
  if (typeof byType.beneficiaries_reached === "number") {
    statCards.push({ key: "beneficiaries_reached", label: METRIC_LABELS.beneficiaries_reached, value: formatCompactNumber(byType.beneficiaries_reached) });
  }

  if (statCards.length === 0 && !demographic) return null;

  return (
    <div className="flex flex-col gap-8">
      {statCards.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {statCards.map((stat) => (
            <Card key={stat.key} className="p-5">
              <p className="font-display text-2xl font-medium">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      )}

      {demographic && (
        <Card className="p-6">
          <p className="mb-4 text-sm font-medium">Demographic Breakdown</p>
          <div className="flex flex-col gap-3">
            {Object.entries(demographic).map(([label, value]) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-32 shrink-0 text-sm text-muted-foreground">{label}</span>
                <div className="h-2 flex-1 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-accent"
                    style={{ width: `${Math.min(value, 100)}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-sm tabular-nums">{value}%</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
