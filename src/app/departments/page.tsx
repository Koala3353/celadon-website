import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { getDepartmentSpotlights } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Departments",
  description: "Department and project spotlights across Celadon.",
};

export default async function DepartmentsPage() {
  const departments = await getDepartmentSpotlights().catch(() => []);

  return (
    <>
      <section className="bg-brand text-brand-foreground">
        <Container className="py-16">
          <SectionHeading
            eyebrow="Org Structure"
            title="Department & Project Spotlights"
            description="Every department behind Celadon's work, and the projects and roles that live within them."
            tone="brand"
          />
        </Container>
      </section>
      <Container className="flex flex-col gap-14 py-16">
      {departments.length === 0 ? (
        <p className="text-muted-foreground">No departments published yet.</p>
      ) : (
        <div className="flex flex-col gap-12">
          {departments.map((department) => (
            <div
              key={department.id}
              className="grid gap-6 border-t border-border pt-8 lg:grid-cols-3"
            >
              <div className="flex flex-col gap-3">
                {department.banner_image_url && (
                  <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
                    <Image
                      src={department.banner_image_url}
                      alt={department.banner_image_alt ?? department.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="font-display text-2xl font-medium">{department.name}</h3>
                {department.overview && (
                  <p className="text-sm text-muted-foreground">{department.overview}</p>
                )}
                {department.openRoleCount > 0 && (
                  <Link href="/recruitment" className="w-fit">
                    <Badge className="bg-highlight text-highlight-foreground">
                      {department.openRoleCount} open role
                      {department.openRoleCount === 1 ? "" : "s"}
                    </Badge>
                  </Link>
                )}
              </div>

              <div className="lg:col-span-2">
                {department.projects.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No published projects yet.</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {department.projects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/projects/${project.slug}`}
                        className="rounded-xl border border-border p-4 transition-colors hover:border-accent"
                      >
                        <p className="text-xs text-muted-foreground">{project.year}</p>
                        <p className="mt-1 font-medium">{project.title}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      </Container>
    </>
  );
}
