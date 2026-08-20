import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { copy, copyList, parseStat } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Established in 1985, Ateneo Celadon — also known as ADMU Celadon, ADMU CLDN, or Ateneo Cela — has spent 40 years developing Chinese-Filipino leaders at the Ateneo de Manila University.",
  alternates: { canonical: "/about/" },
};

const STATS = [
  ["stat_1_value", "stat_1_label"],
  ["stat_2_value", "stat_2_label"],
  ["stat_3_value", "stat_3_label"],
  ["stat_4_value", "stat_4_label"],
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={copy("about_heading")}
        description={copy("org_tagline")}
      />

      <Container className="py-16 sm:py-20">
        {/* ---- Who we are --------------------------------------------- */}
        <Reveal className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="The organization" title="Celadon at a glance" />
          <div className="flex flex-col gap-6 lg:pt-16">
            <p className="prose-body whitespace-pre-line text-lg text-muted-foreground" data-reveal>
              {copy("about_body")}
            </p>
          </div>
        </Reveal>

        {/* ---- Stats ---------------------------------------------------- */}
        <Reveal stagger={60} className="mt-14">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-y border-border py-10 lg:grid-cols-4">
            {STATS.map(([valueKey, labelKey]) => {
              const { prefix, value, suffix } = parseStat(copy(valueKey));
              return (
                <div
                  key={valueKey}
                  className="flex flex-col items-center gap-2 text-center"
                  data-reveal
                >
                  <dd className="display tnum break-words text-4xl text-navy sm:text-5xl">
                    <Counter value={value} prefix={prefix} suffix={suffix} />
                  </dd>
                  <dt className="text-sm text-muted-foreground">{copy(labelKey)}</dt>
                </div>
              );
            })}
          </dl>
        </Reveal>

        {/* ---- Identity: Vision, Mission, Core Competency, Core Advocacy -- */}
        <Reveal className="mt-14">
          <SectionHeading eyebrow="Identity" title="What We Stand For" />
        </Reveal>
        <Reveal stagger={60} className="mt-8 grid gap-6 sm:grid-cols-2">
          <div data-reveal>
            <Card className="h-full" innerClassName="flex h-full flex-col gap-3 p-8">
              <h3 className="display text-2xl text-navy">{copy("vision_heading")}</h3>
              <p className="prose-body text-muted-foreground">{copy("vision_body")}</p>
            </Card>
          </div>
          <div data-reveal>
            <Card className="h-full" innerClassName="flex h-full flex-col gap-3 p-8">
              <h3 className="display text-2xl text-navy">{copy("mission_heading")}</h3>
              <p className="prose-body text-muted-foreground">{copy("mission_body")}</p>
            </Card>
          </div>
          <div data-reveal>
            <Card className="h-full" innerClassName="flex h-full flex-col gap-3 p-8">
              <h3 className="display text-2xl text-navy">{copy("core_competency_heading")}</h3>
              <p className="prose-body text-muted-foreground">
                {copyList("core_competency_body").join(" ")}
              </p>
            </Card>
          </div>
          <div data-reveal>
            <Card className="h-full" innerClassName="flex h-full flex-col gap-3 p-8">
              <h3 className="display text-2xl text-navy">{copy("core_advocacy_heading")}</h3>
              <p className="prose-body text-muted-foreground">{copy("core_advocacy_body")}</p>
            </Card>
          </div>
        </Reveal>

        {/* ---- Purposes & Functions ---------------------------------------- */}
        <Reveal stagger={60} className="mt-14">
          <h2 className="display text-3xl text-navy sm:text-4xl" data-reveal>
            {copy("purposes_heading")}
          </h2>
          <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {copyList("purposes_body").map((item, i) => (
              <li key={i} className="prose-body flex gap-3 text-muted-foreground" data-reveal>
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-ink" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </>
  );
}
