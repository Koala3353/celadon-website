import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { MetricType } from "@/lib/supabase/types";

const VALID_METRIC_TYPES: MetricType[] = [
  "impressions",
  "engagement_rate",
  "participant_count",
  "participant_yoy_change",
  "satisfaction_rating",
  "demographic_breakdown",
  "beneficiaries_reached",
];

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { projectId, metricType, value } = body as {
    projectId?: string;
    metricType?: string;
    value?: unknown;
  };

  if (!projectId || !metricType || !VALID_METRIC_TYPES.includes(metricType as MetricType)) {
    return NextResponse.json({ error: "Invalid projectId or metricType" }, { status: 400 });
  }

  if (value === undefined || value === null) {
    return NextResponse.json({ error: "value is required" }, { status: 400 });
  }

  let admin;
  try {
    admin = createAdminClient();
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Admin client not configured" },
      { status: 500 }
    );
  }

  const { error } = await admin
    .from("project_metrics")
    .upsert(
      { project_id: projectId, metric_type: metricType, value, updated_at: new Date().toISOString() },
      { onConflict: "project_id,metric_type" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
