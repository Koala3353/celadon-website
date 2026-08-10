import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stat } from "@/components/ui/stat";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProjects, getOrgStats } from "@/lib/data";
import { formatCompactNumber } from "@/lib/format";

export const revalidate = 3600;

export default async function Home() {
  const [stats, featuredProjects] = await Promise.all([
    getOrgStats().catch(() => null),
    getFeaturedProjects(3).catch(() => []),
  ]);

  return (
    <>
      <section className="bg-brand text-brand-foreground">
        <Container className="flex flex-col gap-8 py-20 sm:py-28">
          <Badge className="w-fit bg-highlight text-highlight-foreground">
            Celadon &times; COMMPUB
          </Badge>
          <h1 className="max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight text-brand-foreground sm:text-6xl">
            The digital portfolio and recruitment home of Celadon.
          </h1>
          <p className="max-w-xl text-lg text-brand-muted-foreground">
            Explore the projects, people, and impact behind Celadon&apos;s
            year-round work — and discover what it actually takes to join
            the team.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="rounded-full bg-brand-foreground px-6 py-3 text-center text-sm font-medium text-brand transition-opacity hover:opacity-90"
            >
              Explore Projects
            </Link>
            <Link
              href="/recruitment"
              className="rounded-full border border-brand-muted-foreground/40 px-6 py-3 text-center text-sm font-medium text-brand-foreground transition-colors hover:bg-white/10"
            >
              View Open Roles
            </Link>
          </div>
        </Container>
      </section>

      {stats && (
        <section className="border-b border-border">
          <Container className="grid grid-cols-2 gap-8 py-14 sm:grid-cols-4">
            <Stat label="Projects delivered" value={String(stats.projectCount)} />
            <Stat
              label="Total impressions"
              value={formatCompactNumber(stats.totalImpressions)}
            />
            <Stat
              label="Participants engaged"
              value={formatCompactNumber(stats.totalParticipants)}
            />
            <Stat label="Open roles" value={String(stats.openRoleCount)} />
          </Container>
        </section>
      )}

      <section className="py-20">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Portfolio"
              title="Featured projects"
              description="A look at what Celadon has shipped and the impact behind it."
            />
            <Link
              href="/projects"
              className="text-sm font-medium text-accent hover:underline"
            >
              View all projects &rarr;
            </Link>
          </div>

          {featuredProjects.length === 0 ? (
            <p className="text-muted-foreground">
              No published projects yet — check back soon.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`}>
                  <Card className="flex h-full flex-col gap-3 p-6 transition-colors hover:border-accent">
                    <Badge className="w-fit">{project.year}</Badge>
                    <h3 className="font-display text-xl font-medium">
                      {project.title}
                    </h3>
                    {project.department && (
                      <p className="text-sm text-muted-foreground">
                        {project.department.name}
                      </p>
                    )}
                    {project.description && (
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="bg-brand text-brand-foreground">
        <Container className="flex flex-col items-start gap-6 py-20 sm:flex-row sm:items-center sm:justify-between">
          <SectionHeading
            eyebrow="Join Us"
            title="See what it's really like before you apply."
            description="Our Discovery and Application Hub shows the real day-to-day of every Core Team and Managerial role."
            className="max-w-xl"
            tone="brand"
          />
          <Link
            href="/recruitment"
            className="rounded-full bg-brand-foreground px-6 py-3 text-sm font-medium text-brand transition-opacity hover:opacity-90 whitespace-nowrap"
          >
            Explore Roles
          </Link>
        </Container>
      </section>
    </>
  );
}
