import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/page-hero";
import { copy, getOrgStats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "下一课！Start the next chapter with Celadon — the story behind " +
    "Celaville, Recweek 2026–2027.",
};

export default function AboutPage() {
  const stats = getOrgStats();

  return (
    <>
      <PageHero
        eyebrow="第一课 · Lesson one"
        title={copy("about_heading")}
        description={copy("tagline_en")}
      />

      <Container className="flex flex-col gap-16 py-16">
        <section className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <SectionHeading eyebrow="The theme" title="Celaville" />
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-muted-foreground">
            <p>{copy("hero_body")}</p>
            <p>{copy("about_body")}</p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-8 border-y-2 border-border py-12 sm:grid-cols-4">
          {[
            ["Departments", stats.departmentCount],
            ["Projects", stats.projectCount],
            ["Roles documented", stats.roleCount],
            ["Open right now", stats.openRoleCount],
          ].map(([label, value]) => (
            <div key={String(label)} className="flex flex-col gap-1">
              <p className="font-poster text-4xl text-green-ink">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Join the village"
            title={copy("recruitment_heading")}
            description={copy("recruitment_body")}
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/recruitment"
              className="w-fit rounded-full bg-red px-7 py-3.5 font-display text-base font-bold text-cream transition-transform hover:-translate-y-0.5"
            >
              Browse every role
            </Link>
            <Link
              href="/projects"
              className="w-fit rounded-full border-2 border-green px-7 py-3.5 font-display text-base font-bold text-green-ink transition-colors hover:bg-green hover:text-cream"
            >
              See the projects
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
