import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { ayiFor } from "@/lib/ayi";
import {
  copy,
  getDepartmentSpotlights,
  getFeaturedProjects,
  getOrgStats,
} from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { ProjectCard } from "@/components/project-card";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { HeroLines } from "@/components/motion/hero-lines";

export default function Home() {
  const stats = getOrgStats();
  const featured = getFeaturedProjects(3);
  const departments = getDepartmentSpotlights();

  return (
    <>
      {/* ---- Hero: editorial split, type left, mascot right -------------- */}
      <section className="navy-field text-on-navy">
        <div className="navy-grid">
          <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.25fr_1fr] lg:py-32">
            <div className="flex flex-col gap-7">
              <p className="eyebrow text-link-navy">Est. 1977 · Loyola Heights</p>

              <HeroLines
                lines={[copy("hero_line_1"), copy("hero_line_2")]}
                className="display text-[clamp(3.25rem,11vw,8rem)] text-white"
              />

              <Reveal delay={220} className="flex flex-col gap-7">
                <p
                  className="prose-body max-w-xl text-lg text-on-navy sm:text-xl"
                  data-reveal
                >
                  {copy("org_tagline")}
                </p>
                <p className="prose-body max-w-xl text-on-navy/80" data-reveal>
                  {copy("hero_body")}
                </p>
                <div className="flex flex-wrap gap-3" data-reveal>
                  <ButtonLink href={copy("hero_cta_href")} variant="onNavy">
                    {copy("hero_cta_label")}
                  </ButtonLink>
                  <Link
                    href="/about"
                    className="pressable inline-flex items-center rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider text-white ring-2 ring-inset ring-white/25 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    About us
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120} className="relative hidden lg:block">
              <div
                aria-hidden
                className="absolute inset-x-8 bottom-6 top-10 rounded-full bg-link-navy/10 blur-3xl"
              />
              <Image
                src={asset("/ayi/ayi.png")}
                alt="Ayi, Celadon's panda mascot"
                width={700}
                height={919}
                priority
                data-reveal
                className="relative mx-auto w-full max-w-[22rem] drop-shadow-2xl"
              />
            </Reveal>
          </Container>
        </div>
      </section>

      <Marquee />

      {/* ---- Stats ------------------------------------------------------- */}
      <section className="border-b border-border">
        <Container>
          <Reveal as="div" stagger={60}>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-10 py-16 lg:grid-cols-4">
              {[
                ["Departments", stats.departmentCount],
                ["Projects", stats.projectCount],
                ["Roles documented", stats.roleCount],
                ["Open right now", stats.openRoleCount],
              ].map(([label, value]) => (
                <div key={String(label)} className="flex flex-col gap-2" data-reveal>
                  <dd className="display tnum text-5xl text-navy sm:text-6xl">
                    <Counter value={Number(value)} />
                  </dd>
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* ---- About ------------------------------------------------------- */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading eyebrow="About" title={copy("about_heading")} />
            <div className="flex flex-col gap-6 lg:pt-16">
              <p className="prose-body text-lg text-muted-foreground" data-reveal>
                {copy("about_body")}
              </p>
              <p className="prose-body text-lg text-muted-foreground" data-reveal>
                {copy("about_secondary_body")}
              </p>
              <div data-reveal>
                <ButtonLink href="/about" variant="outline">
                  More about Celadon
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---- Departments: asymmetric bento ------------------------------- */}
      <section className="pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The organization"
              title={copy("departments_heading")}
              description={copy("departments_body")}
            />
          </Reveal>

          <Reveal stagger={60} className="mt-14">
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {departments.map((department, i) => {
                const ayi = ayiFor(department.slug);
                // First tile spans two columns on wide screens so the grid
                // isn't six identical boxes.
                const wide = i === 0;

                return (
                  <li
                    key={department.slug}
                    data-reveal
                    className={wide ? "lg:col-span-2" : undefined}
                  >
                    <Link
                      href={`/departments#${department.slug}`}
                      className="group block h-full rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
                    >
                      <Card
                        className="lift h-full"
                        innerClassName={`flex h-full flex-col gap-4 p-6 ${
                          wide ? "lg:flex-row lg:items-center" : ""
                        }`}
                      >
                        {ayi && (
                          <Image
                            src={asset(ayi)}
                            alt=""
                            width={700}
                            height={950}
                            className={`h-24 w-auto self-start ${
                              wide ? "lg:order-2 lg:h-36 lg:shrink-0" : ""
                            }`}
                          />
                        )}
                        <div className="flex flex-1 flex-col gap-2">
                          <h3 className="display text-2xl text-navy">
                            {department.name}
                          </h3>
                          <p
                            className={`prose-body line-clamp-3 text-sm text-muted-foreground ${
                              wide ? "lg:line-clamp-none" : ""
                            }`}
                          >
                            {department.overview}
                          </p>
                          <p className="mt-auto pt-3 text-xs font-bold uppercase tracking-wider text-link">
                            {department.totalRoleCount} role
                            {department.totalRoleCount === 1 ? "" : "s"}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* ---- Projects ---------------------------------------------------- */}
      <section className="pb-24 sm:pb-32">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Recent work"
              title={copy("projects_heading")}
              description={copy("projects_body")}
            />
            <div data-reveal>
              <ButtonLink href="/projects" variant="outline">
                All projects
              </ButtonLink>
            </div>
          </Reveal>

          {featured.length > 0 && (
            <Reveal stagger={70} className="mt-14">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      {/* ---- Closing CTA ------------------------------------------------- */}
      <section className="navy-field text-on-navy">
        <div className="navy-grid">
          <Container>
            <Reveal className="flex flex-col items-start justify-between gap-10 py-24 lg:flex-row lg:items-center">
              <SectionHeading
                eyebrow={copy("cta_heading")}
                title={copy("recruitment_heading")}
                description={copy("recruitment_body")}
                tone="invert"
                size="lg"
              />
              <div data-reveal>
                <ButtonLink href="/recruitment" variant="onNavy">
                  Browse every role
                </ButtonLink>
              </div>
            </Reveal>
          </Container>
        </div>
      </section>
    </>
  );
}
