import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { ProjectCard } from "@/components/project-card";
import {
  copy,
  getDepartmentSpotlights,
  getFeaturedProjects,
  getOrgStats,
} from "@/lib/content";

export default function Home() {
  const stats = getOrgStats();
  const featured = getFeaturedProjects(3);
  const departments = getDepartmentSpotlights();

  return (
    <>
      {/* ---- Hero ------------------------------------------------------- */}
      <section className="sky-wash relative isolate overflow-hidden">
        <div aria-hidden className="paper-grid absolute inset-0 opacity-60" />

        <Container className="relative grid gap-10 pb-36 pt-16 sm:pt-24 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <p className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
              <span className="font-hanzi text-2xl font-bold text-green-ink">
                {copy("tagline_zh")}
              </span>
              <span className="text-base text-muted-foreground">
                {copy("tagline_en")}
              </span>
            </p>

            <h1 className="font-poster text-5xl leading-[1.02] text-red sm:text-7xl">
              {copy("hero_heading")}
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              {copy("hero_body")}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={copy("hero_cta_href")}
                className="rounded-full bg-red px-7 py-3.5 text-center font-display text-base font-bold text-cream transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {copy("hero_cta_label")}
              </Link>
              <Link
                href="/projects"
                className="rounded-full border-2 border-green px-7 py-3.5 text-center font-display text-base font-bold text-green-ink transition-colors hover:bg-green hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Wander the village
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <Image
              src="/brand/celaville-mark.png"
              alt=""
              width={512}
              height={512}
              priority
              className="drift mx-auto w-full max-w-sm"
            />
          </div>
        </Container>

        <div aria-hidden className="absolute inset-x-0 bottom-0">
          <div className="fence h-5 w-full opacity-70" />
          <div className="hill h-14 w-full" />
        </div>
      </section>

      {/* ---- Stats ------------------------------------------------------ */}
      <section className="border-b-2 border-border bg-muted/50">
        <Container>
          <dl className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
            {[
              ["Departments", stats.departmentCount],
              ["Projects", stats.projectCount],
              ["Roles documented", stats.roleCount],
              ["Open right now", stats.openRoleCount],
            ].map(([label, value]) => (
              <div key={String(label)} className="flex flex-col gap-1">
                <dt className="order-2 text-sm text-muted-foreground">{label}</dt>
                <dd className="order-1 font-poster text-4xl text-green-ink">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ---- About ------------------------------------------------------ */}
      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="第一课 · Lesson one"
            title={copy("about_heading")}
          />
          <p className="text-lg leading-relaxed text-muted-foreground">
            {copy("about_body")}
          </p>
        </Container>
      </section>

      {/* ---- Featured projects ------------------------------------------ */}
      <section className="pb-20">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Around the village"
              title={copy("projects_heading")}
              description={copy("projects_body")}
            />
            <Link
              href="/projects"
              className="font-display text-sm font-bold text-red-ink underline-offset-4 hover:underline"
            >
              All projects →
            </Link>
          </div>

          {featured.length === 0 ? (
            <p className="text-muted-foreground">
              No published projects yet — check back soon.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ---- Departments ------------------------------------------------ */}
      <section className="pb-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Neighborhoods"
            title={copy("departments_heading")}
            description={copy("departments_body")}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => (
              <Card key={department.slug} className="flex flex-col gap-2 p-6">
                <h3 className="font-display text-lg font-bold text-ink">
                  {department.name}
                </h3>
                <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                  {department.overview}
                </p>
                <p className="mt-auto pt-3 font-display text-sm font-semibold text-green-ink">
                  {department.totalRoleCount} role
                  {department.totalRoleCount === 1 ? "" : "s"}
                </p>
              </Card>
            ))}
          </div>

          <Link
            href="/departments"
            className="w-fit font-display text-sm font-bold text-red-ink underline-offset-4 hover:underline"
          >
            Meet the departments →
          </Link>
        </Container>
      </section>

      {/* ---- Closing CTA ------------------------------------------------ */}
      <section className="bg-green">
        <Container className="flex flex-col items-start gap-8 py-16 sm:flex-row sm:items-center sm:justify-between">
          <SectionHeading
            eyebrow="下一课"
            title={copy("recruitment_heading")}
            description={copy("recruitment_body")}
            tone="invert"
            className="max-w-xl"
          />
          <Link
            href="/recruitment"
            className="shrink-0 rounded-full bg-cream px-7 py-3.5 font-display text-base font-bold text-green-ink transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          >
            Browse every role
          </Link>
        </Container>
      </section>
    </>
  );
}
