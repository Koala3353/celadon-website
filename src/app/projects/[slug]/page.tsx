import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MetricDashboard } from "@/components/metric-dashboard";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/data";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs().catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug).catch(() => null);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description ?? undefined,
    openGraph: {
      title: project.title,
      description: project.description ?? undefined,
      images: project.cover_image_url ? [{ url: project.cover_image_url }] : undefined,
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
  const project = await getProjectBySlug(slug).catch(() => null);
  if (!project) notFound();

  return (
    <>
      <section className="bg-brand text-brand-foreground">
        <Container className="flex flex-col gap-4 py-16">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{project.year}</Badge>
            {project.department && <Badge>{project.department.name}</Badge>}
          </div>
          <h1 className="font-display text-4xl font-medium tracking-tight text-brand-foreground sm:text-5xl">
            {project.title}
          </h1>
          {project.description && (
            <p className="max-w-2xl text-lg text-brand-muted-foreground">{project.description}</p>
          )}
        </Container>
      </section>

      {(project.cover_image_url || project.gallery.length > 0) && (
        <section className="py-12">
          <Container className="grid gap-4 sm:grid-cols-2">
            {project.cover_image_url && (
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted sm:col-span-2">
                <Image
                  src={project.cover_image_url}
                  alt={project.cover_image_alt ?? project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {project.gallery.map((image, i) => (
              <div key={i} className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
                <Image src={image.url} alt={image.alt} fill className="object-cover" />
              </div>
            ))}
          </Container>
        </section>
      )}

      {project.metrics.length > 0 && (
        <section className="border-t border-border py-16">
          <Container>
            <h2 className="mb-6 font-display text-2xl font-medium">Metric Dashboard</h2>
            <MetricDashboard metrics={project.metrics} />
          </Container>
        </section>
      )}

      {project.testimonials.length > 0 && (
        <section className="border-t border-border bg-muted/40 py-16">
          <Container className="grid gap-6 sm:grid-cols-2">
            {project.testimonials.map((t) => (
              <Card key={t.id} className="p-6">
                <p className="font-display text-lg italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 text-sm font-medium">{t.author_name}</p>
                {t.author_role && <p className="text-sm text-muted-foreground">{t.author_role}</p>}
              </Card>
            ))}
          </Container>
        </section>
      )}

      {project.credits.length > 0 && (
        <section className="border-t border-border py-16">
          <Container>
            <h2 className="mb-6 font-display text-2xl font-medium">Core Team</h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {project.credits.map((credit) => (
                <div key={credit.id} className="flex flex-col items-center gap-3 text-center">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full bg-muted">
                    {credit.photo_url && (
                      <Image
                        src={credit.photo_url}
                        alt={credit.photo_alt ?? credit.member_name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{credit.member_name}</p>
                    {credit.role && <p className="text-xs text-muted-foreground">{credit.role}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
