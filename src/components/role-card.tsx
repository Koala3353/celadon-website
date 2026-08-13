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
      data-reveal
      className="group rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
    >
      <Card className="lift h-full" innerClassName="flex h-full flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={role.status === "open" ? "open" : "closed"}>
            {role.status === "open" ? "Open" : "Closed"}
          </Badge>
          {parent && <Badge>{parent}</Badge>}
        </div>

        <h3 className="text-lg font-extrabold leading-tight text-navy">
          {role.title}
        </h3>

        {role.description && (
          <p className="prose-body line-clamp-3 text-sm text-muted-foreground">
            {role.description}
          </p>
        )}

        <p className="mt-auto pt-3 text-xs font-bold uppercase tracking-wider text-link">
          {deadline ? `Apply by ${deadline}` : "Read the role"}
        </p>
      </Card>
    </Link>
  );
}
