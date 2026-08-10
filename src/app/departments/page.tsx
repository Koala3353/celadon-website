import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import {
  copy,
  getDepartmentSpotlights,
  getPublishedProjects,
  getRolesForDepartment,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Departments",
  description: "The six departments that keep Celadon running.",
};

export default function DepartmentsPage() {
  const departments = getDepartmentSpotlights();
  const projects = getPublishedProjects();

  return (
    <>
      <PageHero
        eyebrow="Org structure"
        title={copy("departments_heading")}
        description={copy("departments_body")}
      />

      <Container className="flex flex-col gap-14 py-16">
        {departments.length === 0 ? (
          <p className="text-muted-foreground">No departments published yet.</p>
        ) : (
          departments.map((department) => {
            const roles = getRolesForDepartment(department.slug);
            const owned = projects.filter(
              (p) => p.department?.slug === department.slug
            );

            return (
              <section
                key={department.slug}
                id={department.slug}
                className="grid scroll-mt-28 gap-8 border-t-2 border-border pt-10 lg:grid-cols-3"
              >
                <div className="flex flex-col gap-3">
                  <h2 className="font-poster text-3xl text-green-ink">
                    {department.name}
                  </h2>
                  {department.openRoleCount > 0 ? (
                    <Badge tone="open" className="w-fit">
                      {department.openRoleCount} open role
                      {department.openRoleCount === 1 ? "" : "s"}
                    </Badge>
                  ) : (
                    roles.length > 0 && (
                      <Badge tone="gold" className="w-fit">
                        {roles.length} role{roles.length === 1 ? "" : "s"} documented
                      </Badge>
                    )
                  )}
                  <p className="leading-relaxed text-muted-foreground">
                    {department.overview}
                  </p>
                </div>

                <div className="flex flex-col gap-6 lg:col-span-2">
                  {roles.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        Roles
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {roles.map((role) => (
                          <Link
                            key={role.slug}
                            href={`/recruitment/roles/${role.slug}`}
                            className="rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
                          >
                            <Card className="h-full p-4 transition-colors hover:border-green">
                              <p className="font-display font-bold text-ink">
                                {role.title}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {role.status === "open" ? "Open" : "Closed"}
                              </p>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {owned.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        Projects
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {owned.map((project) => (
                          <Link
                            key={project.slug}
                            href={`/projects/${project.slug}`}
                            className="rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
                          >
                            <Card className="h-full p-4 transition-colors hover:border-green">
                              <p className="text-xs text-muted-foreground">
                                {project.year}
                              </p>
                              <p className="mt-1 font-display font-bold text-ink">
                                {project.title}
                              </p>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {roles.length === 0 && owned.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Nothing published for this department yet.
                    </p>
                  )}
                </div>
              </section>
            );
          })
        )}
      </Container>
    </>
  );
}
