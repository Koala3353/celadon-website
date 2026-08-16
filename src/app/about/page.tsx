import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import {
  copy,
  getIdentityStatements,
  getOrgStats,
  getPurposes,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: copy("org_tagline"),
};

export default function AboutPage() {
  const stats = getOrgStats();
  const identity = getIdentityStatements();
  const purposes = getPurposes();

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

        {identity.length > 0 && (
          <Reveal className="mt-20 flex flex-col gap-10">
            <SectionHeading eyebrow="Identity" title="What we stand for" />
            <div className="grid gap-5 sm:grid-cols-2">
              {identity.map((statement) => (
                <Card key={statement.key} data-reveal>
                  <div className="flex h-full flex-col gap-3 p-6">
                    <h3 className="display text-xl text-navy">{statement.heading}</h3>
                    <p className="prose-body text-muted-foreground">
                      {statement.body}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Reveal>
        )}

        {purposes.items.length > 0 && (
          <Reveal stagger={40} className="mt-20 flex flex-col gap-6">
            <h2 className="display text-2xl text-navy sm:text-3xl" data-reveal>
              {purposes.heading ?? "Purposes & Functions"}
            </h2>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {purposes.items.map((item, i) => (
                <li
                  key={i}
                  data-reveal
                  className="prose-body flex gap-4 text-muted-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-ink"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

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
