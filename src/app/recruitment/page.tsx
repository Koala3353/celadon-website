import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import { RoleCard } from "@/components/role-card";
import { copy, getRoles } from "@/lib/content";
import type { RoleWithParent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Roles",
  description:
    "Every Core Team committee and Department role at Celadon — what the " +
    "work actually involves, before you apply.",
};

export default function RecruitmentPage() {
  const roles = getRoles();
  const openCount = roles.filter((r) => r.status === "open").length;

  // Project roles are a project's core-team committees; department roles are
  // standing pools. They're browsed differently, so they're grouped apart.
  const byProject = new Map<string, { title: string; roles: RoleWithParent[] }>();
  for (const role of roles) {
    if (!role.project) continue;
    const group = byProject.get(role.project.slug);
    if (group) group.roles.push(role);
    else byProject.set(role.project.slug, { title: role.project.title, roles: [role] });
  }

  const byDepartment = new Map<string, { name: string; roles: RoleWithParent[] }>();
  for (const role of roles) {
    if (!role.department) continue;
    const group = byDepartment.get(role.department.slug);
    if (group) group.roles.push(role);
    else byDepartment.set(role.department.slug, { name: role.department.name, roles: [role] });
  }

  return (
    <>
      <PageHero
        eyebrow="Discovery & application hub"
        title={copy("recruitment_heading")}
        description={copy("recruitment_body")}
      >
        <p className="font-display text-sm font-semibold text-green-ink">
          {openCount > 0
            ? `${openCount} role${openCount === 1 ? "" : "s"} open now · ${roles.length} documented in total`
            : `Applications aren't open yet — all ${roles.length} roles are documented here so you can read up before they are.`}
        </p>
      </PageHero>

      <Container className="flex flex-col gap-16 py-16">
        {byProject.size > 0 && (
          <section className="flex flex-col gap-10">
            <h2 className="font-display text-2xl font-bold text-ink">
              <span className="underline-sketch">Core Team committees</span>
            </h2>

            {Array.from(byProject.entries()).map(([slug, group]) => (
              <div key={slug} className="flex flex-col gap-4">
                <Link
                  href={`/projects/${slug}`}
                  className="w-fit font-display text-lg font-bold text-green-ink underline-offset-4 hover:underline"
                >
                  {group.title} →
                </Link>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.roles.map((role) => (
                    <RoleCard key={role.slug} role={role} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {byDepartment.size > 0 && (
          <section className="flex flex-col gap-10">
            <h2 className="font-display text-2xl font-bold text-ink">
              <span className="underline-sketch">Department pools</span>
            </h2>

            {Array.from(byDepartment.entries()).map(([slug, group]) => (
              <div key={slug} className="flex flex-col gap-4">
                <Link
                  href={`/departments#${slug}`}
                  className="w-fit font-display text-lg font-bold text-green-ink underline-offset-4 hover:underline"
                >
                  {group.name} →
                </Link>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.roles.map((role) => (
                    <RoleCard key={role.slug} role={role} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {roles.length === 0 && (
          <p className="text-muted-foreground">
            No roles published yet — check back soon.
          </p>
        )}
      </Container>
    </>
  );
}
