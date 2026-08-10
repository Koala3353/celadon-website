import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { RoleWithParent } from "@/lib/types";

export function formatDeadline(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function RoleCard({ role }: { role: RoleWithParent }) {
  const parent = role.project?.title ?? role.department?.name;
  const deadline = formatDeadline(role.applicationDeadline);

  return (
    <Link
      href={`/recruitment/roles/${role.slug}`}
      className="group rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
    >
      <Card className="flex h-full flex-col gap-3 p-6 transition-transform group-hover:-translate-y-1 group-hover:border-green">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={role.status === "open" ? "open" : "closed"}>
            {role.status === "open" ? "Open" : "Closed"}
          </Badge>
          {parent && <Badge tone="sky">{parent}</Badge>}
        </div>

        <h3 className="font-display text-xl font-bold text-ink">{role.title}</h3>

        {role.description && (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {role.description}
          </p>
        )}

        <p className="mt-auto pt-2 font-display text-sm font-semibold text-green-ink">
          {deadline ? `Apply by ${deadline}` : "See the role →"}
        </p>
      </Card>
    </Link>
  );
}
