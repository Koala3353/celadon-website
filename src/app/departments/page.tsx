import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { ayiFor } from "@/lib/ayi";
import {
  copy,
  getDepartmentSpotlights,
  getPublishedProjects,
  getRolesForDepartment,
} from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Departments",
  description: "The six departments that keep Ateneo Celadon running.",
};

export default function DepartmentsPage() {
  const departments = getDepartmentSpotlights();
  const projects = getPublishedProjects();

  return (
    <>
      <PageHero
        eyebrow="The organization"
        title={copy("departments_heading")}
        description={copy("departments_body")}
      />

      <Container className="flex flex-col gap-24 py-24">
        {departments.map((department, i) => {
          const roles = getRolesForDepartment(department.slug);
          const owned = projects.filter(
            (p) => p.department?.slug === department.slug
          );
          const ayi = ayiFor(department.slug);
          // Alternate which side the mascot sits on so the page doesn't read
          // as six identical rows.
          const flip = i % 2 === 1;

          return (
            <Reveal
              as="section"
              key={department.slug}
              className="scroll-mt-28"
            >
              <div id={department.slug} className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
                <div
                  className={`flex flex-col gap-5 ${flip ? "lg:order-2" : ""}`}
                >
                  {ayi && (
                    <Image
                      src={asset(ayi)}
                      alt={`Ayi in ${department.name} colours`}
                      width={700}
                      height={950}
                      data-reveal
                      className="h-44 w-auto self-start"
                    />
                  )}
                  <h2 className="display text-4xl text-navy" data-reveal>
                    {department.name}
                  </h2>
                  <div data-reveal>
                    {department.openRoleCount > 0 ? (
                      <Badge tone="navy">
                        {department.openRoleCount} open role
                        {department.openRoleCount === 1 ? "" : "s"}
                      </Badge>
                    ) : (
                      roles.length > 0 && (
                        <Badge>
                          {roles.length} role{roles.length === 1 ? "" : "s"} documented
                        </Badge>
                      )
                    )}
                  </div>
                  <p className="prose-body text-muted-foreground" data-reveal>
                    {department.overview}
                  </p>
                </div>

                <div className="flex flex-col gap-8">
                  {roles.length > 0 && (
                    <div className="flex flex-col gap-4">
                      <h3 className="eyebrow text-muted-foreground" data-reveal>
                        Roles
                      </h3>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {roles.map((role) => (
                          <li key={role.slug} data-reveal>
                            <Link
                              href={`/recruitment/roles/${role.slug}`}
                              className="group block h-full rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
                            >
                              <Card className="lift h-full" innerClassName="p-5">
                                <p className="font-extrabold text-navy">
                                  {role.title}
                                </p>
                                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                                  {role.status === "open" ? "Open" : "Closed"}
                                </p>
                              </Card>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {owned.length > 0 && (
                    <div className="flex flex-col gap-4">
                      <h3 className="eyebrow text-muted-foreground" data-reveal>
                        Projects
                      </h3>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {owned.map((project) => (
                          <li key={project.slug} data-reveal>
                            <Link
                              href={`/projects/${project.slug}`}
                              className="group block h-full rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
                            >
                              <Card className="lift h-full" innerClassName="p-5">
                                <p className="tnum text-xs text-muted-foreground">
                                  {project.year}
                                </p>
                                <p className="mt-1 font-extrabold text-navy">
                                  {project.title}
                                </p>
                              </Card>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {roles.length === 0 && owned.length === 0 && (
                    <p className="text-sm text-muted-foreground" data-reveal>
                      Nothing published for this department yet.
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </Container>
    </>
  );
}
