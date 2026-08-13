import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { copy, getDepartments, getPublishedProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse Celadon's projects by year and department.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={copy("projects_heading")}
        description={copy("projects_body")}
      />
      <Container className="py-20">
        <ProjectsExplorer
          projects={getPublishedProjects()}
          departments={getDepartments()}
        />
      </Container>
    </>
  );
}
