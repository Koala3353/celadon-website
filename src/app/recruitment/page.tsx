import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRoles } from "@/lib/data";
import type { RoleWithParent } from "@/lib/data";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Recruitment",
  description: "Open Core Team committees and Department roles at Celadon.",
};

function formatDeadline(dateStr: string | null) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function RoleCard({ role }: { role: RoleWithParent }) {
  return (
    <Link href={`/recruitment/roles/${role.slug}`}>
      <Card className="flex h-full flex-col gap-3 p-6 transition-colors hover:border-accent">
        <Badge className="w-fit bg-highlight text-highlight-foreground">Open</Badge>
        <h3 className="font-display text-xl font-medium">{role.title}</h3>
        {role.application_deadline && (
          <p className="mt-auto text-xs text-muted-foreground">
            Apply by {formatDeadline(role.application_deadline)}
          </p>
        )}
      </Card>
    </Link>
  );
}

export default async function RecruitmentPage() {
  const roles = await getRoles({ status: "open" }).catch(() => []);

  const projectRoles = roles.filter((r) => r.project);
  const departmentRoles = roles.filter((r) => r.department);

  const committeesByProject = new Map<string, { title: string; slug: string; roles: RoleWithParent[] }>();
  for (const role of projectRoles) {
    if (!role.project) continue;
    const existing = committeesByProject.get(role.project.id);
    if (existing) {
      existing.roles.push(role);
    } else {
      committeesByProject.set(role.project.id, {
        title: role.project.title,
        slug: role.project.slug,
        roles: [role],
      });
    }
  }

  return (
    <>
      <section className="bg-brand text-brand-foreground">
        <Container className="py-16">
          <SectionHeading
            eyebrow="Discovery & Application Hub"
            title="Open Roles"
            description="See what a role actually entails before you apply — responsibilities, expectations, and real examples of the work."
            tone="brand"
          />
        </Container>
      </section>
      <Container className="flex flex-col gap-16 py-16">
      {roles.length === 0 && (
        <p className="text-muted-foreground">No open roles right now — check back soon.</p>
      )}

      {committeesByProject.size > 0 && (
        <div className="flex flex-col gap-10">
          <h2 className="font-display text-2xl font-medium">Core Team Recruitment</h2>
          {Array.from(committeesByProject.values()).map((group) => (
            <div key={group.slug} className="flex flex-col gap-4">
              <Link
                href={`/projects/${group.slug}`}
                className="w-fit text-lg font-medium hover:text-accent"
              >
                {group.title} &rarr;
              </Link>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.roles.map((role) => (
                  <RoleCard key={role.id} role={role} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {departmentRoles.length > 0 && (
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-2xl font-medium">Department Recruitment</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departmentRoles.map((role) => (
              <RoleCard key={role.id} role={role} />
            ))}
          </div>
        </div>
      )}
      </Container>
    </>
  );
}
