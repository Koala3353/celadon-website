import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/page-hero";
import { RoleCard } from "@/components/role-card";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getRolesForProject,
} from "@/lib/content";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description || undefined,
    openGraph: {
      title: project.title,
      description: project.description || undefined,
      images: project.coverImageUrl ? [{ url: project.coverImageUrl }] : undefined,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const roles = getRolesForProject(project.slug);

  return (
    <>
      <PageHero title={project.title} description={project.description || undefined}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="gold">{project.year}</Badge>
          {project.department && <Badge tone="sky">{project.department.name}</Badge>}
        </div>
      </PageHero>

      <Container className="flex flex-col gap-16 py-16">
        {project.coverImageUrl && (
          <div className="relative aspect-video overflow-hidden rounded-3xl border-2 border-border bg-muted">
            <Image
              src={project.coverImageUrl}
              alt={project.coverImageAlt || project.title}
              fill
              sizes="(min-width: 1024px) 64rem, 92vw"
              className="object-cover"
            />
          </div>
        )}

        {roles.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="font-display text-2xl font-bold text-ink">
              <span className="underline-sketch">Core Team committees</span>
            </h2>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">
              These are the committees that run {project.title}. Each one lists
              what the work actually involves.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((role) => (
                <RoleCard key={role.slug} role={role} />
              ))}
            </div>
          </section>
        )}

        <Link
          href="/projects"
          className="w-fit font-display text-sm font-bold text-red-ink underline-offset-4 hover:underline"
        >
          ← All projects
        </Link>
      </Container>
    </>
  );
}
