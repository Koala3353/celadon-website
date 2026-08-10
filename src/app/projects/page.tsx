import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { getAllProjects, getDepartments } from "@/lib/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse Celadon's project archive by year and department.",
};

export default async function ProjectsPage() {
  const [projects, departments] = await Promise.all([
    getAllProjects().catch(() => []),
    getDepartments().catch(() => []),
  ]);

  return (
    <>
      <section className="bg-brand text-brand-foreground">
        <Container className="py-16">
          <SectionHeading
            eyebrow="Portfolio"
            title="Project Archive"
            description="Every Celadon project, filterable by year and department."
            tone="brand"
          />
        </Container>
      </section>
      <Container className="py-16">
        <ProjectsExplorer projects={projects} departments={departments} />
      </Container>
    </>
  );
}
