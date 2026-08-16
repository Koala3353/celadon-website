import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/motion/reveal";
import { copy, getPublishedProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse Celadon's projects.",
};

export default function ProjectsPage() {
  const projects = getPublishedProjects();

  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={copy("projects_heading")}
        description={copy("projects_body")}
      />
      <Container className="py-20">
        <p className="mb-8 text-sm text-muted-foreground">
          {projects.length} project{projects.length === 1 ? "" : "s"}
        </p>

        {projects.length === 0 ? (
          <p className="text-muted-foreground">No projects published yet.</p>
        ) : (
          <Reveal stagger={50}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </>
  );
}
