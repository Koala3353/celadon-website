import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/page-hero";
import { RoleCard } from "@/components/role-card";
import { Reveal } from "@/components/motion/reveal";
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
      <PageHero
        eyebrow={project.department?.name ?? String(project.year)}
        title={project.title}
        description={project.description || undefined}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="onNavy">{project.year}</Badge>
          {project.department && <Badge tone="onNavy">{project.department.name}</Badge>}
        </div>
      </PageHero>

      <Container className="flex flex-col gap-20 py-20">
        {project.coverImageUrl && (
          <Reveal>
            <div
              data-reveal
              className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] bg-navy-tint shadow-[var(--shadow-md)]"
            >
              <Image
                src={project.coverImageUrl}
                alt={project.coverImageAlt || project.title}
                fill
                sizes="(min-width: 1280px) 76rem, 92vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        )}

        {roles.length > 0 && (
          <Reveal as="section" stagger={60} className="flex flex-col gap-6">
            <h2 className="display text-3xl text-navy sm:text-4xl" data-reveal>
              Core Team committees
            </h2>
            <p className="prose-body max-w-2xl text-muted-foreground" data-reveal>
              These are the committees that run {project.title}. Each lists what
              the work actually involves.
            </p>
            <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((role) => (
                <li key={role.slug}>
                  <RoleCard role={role} />
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Link
          href="/projects"
          className="w-fit text-sm font-bold uppercase tracking-wider text-link underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          All projects
        </Link>
      </Container>
    </>
  );
}
