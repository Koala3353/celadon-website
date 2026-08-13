import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { copy, getOrgStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: copy("org_tagline"),
};

export default function AboutPage() {
  const stats = getOrgStats();

  return (
    <>
      <PageHero
        eyebrow="About"
        title={copy("about_heading")}
        description={copy("org_tagline")}
      />

      <Container className="py-24 sm:py-32">
        <Reveal className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="The organization" title="Celadon at a glance" />
          <div className="flex flex-col gap-6 lg:pt-16">
            <p className="prose-body text-lg text-muted-foreground" data-reveal>
              {copy("about_body")}
            </p>
            <p className="prose-body text-lg text-muted-foreground" data-reveal>
              {copy("about_secondary_body")}
            </p>
          </div>
        </Reveal>

        <Reveal stagger={60} className="mt-20">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-y border-border py-14 lg:grid-cols-4">
            {[
              ["Departments", stats.departmentCount],
              ["Projects", stats.projectCount],
              ["Roles documented", stats.roleCount],
              ["Open right now", stats.openRoleCount],
            ].map(([label, value]) => (
              <div key={String(label)} className="flex flex-col gap-2" data-reveal>
                <dd className="display tnum text-5xl text-navy">
                  <Counter value={Number(value)} />
                </dd>
                <dt className="text-sm text-muted-foreground">{label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="mt-20 flex flex-col gap-7">
          <SectionHeading
            eyebrow={copy("cta_heading")}
            title={copy("recruitment_heading")}
            description={copy("cta_body")}
          />
          <div className="flex flex-wrap gap-3" data-reveal>
            <ButtonLink href="/recruitment">Browse every role</ButtonLink>
            <ButtonLink href="/projects" variant="outline">
              See the projects
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
