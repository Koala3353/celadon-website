import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { copy, getPublishedProjects, parseStat } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { ProjectCard } from "@/components/project-card";
import { PhotoCarousel } from "@/components/photo-carousel";
import { Marquee } from "@/components/marquee";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { HeroLines } from "@/components/motion/hero-lines";

const STATS = [
  ["stat_1_value", "stat_1_label"],
  ["stat_3_value", "stat_3_label"],
  ["stat_4_value", "stat_4_label"],
] as const;

// Hand-picked for the home page teaser rather than "whatever's newest" —
// swap slugs here to feature different projects.
const FEATURED_SLUGS = ["rose-sale", "binondo-amazing-race", "chinese-new-year"];

const CELAZINE_COVERS = [
  { src: "/celazine/vol-1-unabridged.jpg", alt: "CelaZine Vol. 1 — Unabridged" },
  { src: "/celazine/vol-2-countenance.jpg", alt: "CelaZine Vol. 2 — Countenance" },
  { src: "/celazine/womens-month-special.jpg", alt: "CelaZine Special — Women's Month" },
];

// No title override — the layout's default ("Ateneo Celadon") is already
// the right title for the root page. Setting one here would run it through
// the "%s — Ateneo Celadon" template and read as "Home — Ateneo Celadon".
export const metadata: Metadata = {
  description:
    "Ateneo Celadon (ADMU Celadon / ADMU CLDN) is the premier Chinese-Filipino student organization of the Ateneo de Manila University — six departments, dozens of cultural festivals and projects, and a community built on Chinese-Filipino heritage since 1985.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const allProjects = getPublishedProjects();
  const featured = FEATURED_SLUGS.map((slug) =>
    allProjects.find((p) => p.slug === slug)
  ).filter((p) => p != null);

  return (
    <>
      {/* ---- Hero: editorial split, type left, mascot right -------------- */}
      <section
        className="bg-cover bg-center text-on-navy"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(0,35,87,0.92) 0%, rgba(0,48,120,0.82) 32%, rgba(0,48,120,0.45) 62%, rgba(0,48,120,0.18) 100%), url(" +
            asset("/hero-collage.jpg") +
            ")",
        }}
      >
        <Container className="grid items-center gap-12 py-10 sm:py-14 lg:grid-cols-[1.25fr_1fr] lg:py-16">
          <div className="flex flex-col gap-7">
            <p className="eyebrow text-link-navy">Est. {copy("est_year")} · Loyola Heights</p>

            <HeroLines
              lines={[copy("hero_line_1")]}
              className="display text-[clamp(3.25rem,11vw,8rem)] text-white"
            />

            <Reveal delay={220} className="flex flex-col gap-7">
              <p
                className="prose-body max-w-xl text-lg text-on-navy sm:text-xl"
                data-reveal
              >
                {copy("org_tagline")}
              </p>
              <div className="flex flex-wrap gap-3" data-reveal>
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
      </section>

      <Marquee />

      {/* ---- Stats ------------------------------------------------------- */}
      <section className="border-b border-border">
        <Container>
          <Reveal as="div" stagger={60}>
            <dl className="grid grid-cols-3 gap-x-8 gap-y-10 py-10">
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
        </Container>
      </section>

      {/* ---- About ------------------------------------------------------- */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col gap-8">
              <SectionHeading eyebrow="About Us" title={copy("about_heading")} />
              <Image
                src={asset("/about/celadon-banner.jpg")}
                alt="The Ateneo Celadon banner at an event"
                width={1284}
                height={801}
                data-reveal
                className="h-auto w-full max-w-sm rounded-[1.75rem]"
              />
            </div>
            <div className="flex flex-col gap-6 lg:pt-16">
              <p className="prose-body whitespace-pre-line text-lg text-muted-foreground" data-reveal>
                {copy("about_body_short")}
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

      {/* ---- Projects ---------------------------------------------------- */}
      <section className="border-t border-border py-16 sm:py-20">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading title={copy("projects_heading")} />
            <div data-reveal>
              <ButtonLink href="/projects" variant="outline">
                All projects
              </ButtonLink>
            </div>
          </Reveal>

          {featured.length > 0 && (
            <Reveal stagger={70} className="mt-10">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      {/* ---- CelaZine ------------------------------------------------------ */}
      <section className="border-t border-border py-16 sm:py-20">
        <Container>
          <Reveal className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col gap-8">
              <SectionHeading title={copy("celazine_heading")} />
              <PhotoCarousel
                photos={CELAZINE_COVERS.map((cover) => asset(cover.src))}
                alt="CelaZine issue cover"
                data-reveal
                className="aspect-square w-full max-w-xs self-center rounded-2xl border border-border"
              />
            </div>
            <div className="flex flex-col gap-6 lg:pt-16">
              <p className="prose-body whitespace-pre-line text-lg text-muted-foreground" data-reveal>
                {copy("celazine_body")}
              </p>
              <div data-reveal>
                <ButtonLink href={copy("celazine_url")} variant="outline" external>
                  Read CelaZine
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
