import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/motion/reveal";
import { FloatingApplyButton } from "@/components/internal/floating-apply-button";
import { BackLink } from "@/components/internal/back-link";
import { ProjectFaqs } from "@/components/internal/project-faqs";
import { PmContacts } from "@/components/internal/pm-contacts";
import { ListAccordion } from "@/components/internal/list-accordion";
import { Timeline } from "@/components/internal/timeline";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { CTA_WAVE2_APPLICATION_FORM_URL, wave2Blurb } from "@/lib/core-team-wave2";
import { CELABALL } from "@/lib/cta-projects-wave2";
import type { DeptGroup } from "@/lib/deputy-departments";

// Served from src/fonts rather than fetched from Google Fonts at build
// time — see src/fonts/README.md.
const ebGaramond = localFont({
  src: [
    { path: "../../../../fonts/eb-garamond/eb-garamond-normal.woff2", weight: "400 700", style: "normal" },
    { path: "../../../../fonts/eb-garamond/eb-garamond-italic.woff2", weight: "400 700", style: "italic" },
  ],
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  title: "Celaball — Core Team Applications Wave 2",
  robots: { index: false, follow: false },
};

// The doc is set in Garamond throughout; EB Garamond is its web stand-in.

/*
 * Sunset palette from the doc: amber, orange, coral and a soft teal on
 * white and cream. Those exact values stay on fills, dividers and the big
 * decorative characters; text that has to be read at body size uses a
 * deeper shade of the same hue, since the originals are too light on white.
 */
const P = CELABALL.palette;
const INK = "#1F1F1F";
const TEXT = {
  amber: "#B8641A",
  orange: "#B8641A",
  coral: "#C4503C",
  teal: "#3F7F8B",
};

function Heading({
  children,
  color,
  className,
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
}) {
  return (
    <h2 className={cn("text-3xl font-bold sm:text-4xl", className)} style={{ color }} data-reveal>
      {children}
    </h2>
  );
}

function Stars({ color, className }: { color: string; className?: string }) {
  return (
    <p aria-hidden className={cn("select-none tracking-[0.3em]", className)} style={{ color }}>
      ✮ ⋆ ˚｡ ⋆｡°✩
    </p>
  );
}

function Bullets({ items, color = INK }: { items: string[]; color?: string }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 leading-snug" style={{ color }}>
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "currentColor" }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CelaballProjectPage() {
  const project = CELABALL;
  const [aboutLead, aboutRest] = project.about;
  // Same accordion as every other project page; a committee's requirement
  // follows its duties under its own bold sub-heading.
  const committeeGroups: DeptGroup[] = project.committees.map((committee) => ({
    label: `${committee.name} · ${committee.count}`,
    items: [
      ...committee.items,
      ...(committee.requirement
        ? [
            [{ text: "Requirement", bold: true }],
            committee.requirement.portfolio,
            `Alternative: ${committee.requirement.alternative}`,
          ]
        : []),
    ],
  }));

  return (
    <div
      className={cn(ebGaramond.className, "text-[17px] leading-relaxed")}
      style={
        {
          // Read by the floating Apply button and BackLink.
          "--dept-accent": "#B5601A",
          "--dept-tint": P.cream,
          "--dept-ink": "#4A2A0E",
          color: INK,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <section className="relative overflow-hidden" style={{ backgroundColor: P.cream }}>
        <BackLink href="/internal/cta-wave2" label="All Projects" />
        <Reveal>
          <Image
            src={asset(project.heroImage.src)}
            alt={project.heroImage.alt}
            width={1365}
            height={768}
            priority
            data-reveal
            className="max-h-[60vh] w-full object-cover"
          />
        </Reveal>
        <Container className="relative flex flex-col items-center pb-10 pt-10 text-center sm:pb-14 sm:pt-12">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5">
            <p className="prose-body max-w-2xl text-lg text-dept-ink/80" data-reveal>
              {wave2Blurb("celaball")}
            </p>
            <div data-reveal>
              <ButtonLink href={CTA_WAVE2_APPLICATION_FORM_URL} external size="lg" variant="accent">
                Apply Now
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* What is Celaball? */}
      <section className="relative overflow-hidden bg-white py-12 sm:py-16">
        {/* The doc's drifting sunset clouds, behind this section's text. */}
        <Image
          src={asset("/internal/cta-wave2/cb-cloud.webp")}
          alt=""
          aria-hidden
          width={487}
          height={360}
          className="pointer-events-none absolute -right-10 -top-6 w-[22rem] opacity-50 mix-blend-multiply sm:w-[30rem]"
        />
        <Container className="relative">
          <Reveal className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-12">
            <div className="flex flex-col gap-4 text-left">
              <Heading color={TEXT.amber}>What is Celaball?</Heading>
              <p className="font-bold italic" data-reveal>
                <span aria-hidden style={{ color: P.amber }}>
                  ★{" "}
                </span>
                {project.date}
              </p>
              <p data-reveal>
                {aboutLead.map((run, i) =>
                  run.bold ? (
                    <strong
                      key={i}
                      className="text-xl font-bold"
                      style={{ color: run.text === "Celaball" ? TEXT.amber : TEXT.teal }}
                    >
                      {run.text}
                    </strong>
                  ) : (
                    <span key={i}>{run.text}</span>
                  )
                )}
              </p>
              <p data-reveal>{aboutRest.map((run) => run.text).join("")}</p>
            </div>
            <div className="relative aspect-[1654/962] w-full overflow-hidden rounded-2xl shadow-[var(--shadow-md)]" data-reveal>
              <Image
                src={asset("/internal/cta-wave2/cb-what-is.webp")}
                alt="Guests seated at round tables under a draped ceiling at a past Celadon Ball"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Dear Applicant */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: P.cream }}>
        <Container>
          <Reveal className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[1fr_1.2fr] md:gap-12">
            <div className="flex flex-col gap-5">
              <Heading color={TEXT.orange}>Dear Applicant,</Heading>
              <div className="relative aspect-[1648/962] w-full overflow-hidden rounded-2xl shadow-[var(--shadow-md)]" data-reveal>
                <Image
                  src={asset("/internal/cta-wave2/cb-letter.webp")}
                  alt="Celadon members dancing in formal wear at a past Celadon Ball"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 text-left md:pt-14">
              {project.letter.map((p) => (
                <p key={p} data-reveal>
                  {p}
                </p>
              ))}
              <p className="mt-2" data-reveal>
                {project.letterSignoff.closing}
              </p>
              <p className="text-lg font-bold" style={{ color: TEXT.amber }} data-reveal>
                {project.letterSignoff.names}
              </p>
              <p className="-mt-3 italic" data-reveal>
                {project.letterSignoff.role}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Jia Yuan — this year's theme */}
      <section className="bg-white py-12 sm:py-16">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <div className="flex items-center gap-3" data-reveal>
              <Image
                src={asset("/internal/cta-wave2/cb-butterfly.webp")}
                alt=""
                aria-hidden
                width={736}
                height={736}
                className="h-16 w-16 mix-blend-multiply sm:h-20 sm:w-20"
              />
              <div className="text-left">
                <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: TEXT.amber }}>
                  {project.theme.name} ({project.theme.chinese})
                </h2>
                <p className="text-xl font-bold" style={{ color: TEXT.amber }}>
                  {project.theme.subtitle}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal stagger={80} className="mx-auto mt-10 grid w-full max-w-4xl gap-10 sm:grid-cols-2">
            {project.theme.parts.map((part) => {
              const glyphColor = part.tone === "teal" ? P.teal : P.coral;
              const labelColor = part.tone === "teal" ? TEXT.teal : TEXT.coral;
              return (
                <div key={part.romanized} className="flex flex-col gap-3 text-left" data-reveal>
                  <p className="flex items-end gap-2">
                    <span lang="zh-Hant" className="text-7xl leading-none" style={{ color: glyphColor }}>
                      {part.glyph}
                    </span>
                    <span className="pb-1 text-lg font-bold" style={{ color: labelColor }}>
                      {part.romanized} <span aria-hidden>♡</span>
                      <span className="sr-only">—</span> {part.meaning}
                    </span>
                  </p>
                  <p>{part.body}</p>
                </div>
              );
            })}
          </Reveal>
          <Reveal className="mx-auto mt-10 w-full max-w-4xl">
            <p className="rounded-2xl px-6 py-5 text-center" style={{ backgroundColor: P.cream }} data-reveal>
              {project.theme.together[0].map((run, i) =>
                run.bold ? (
                  <strong key={i} className="font-bold">
                    {run.text}
                  </strong>
                ) : (
                  <span key={i}>{run.text}</span>
                )
              )}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Our Objectives */}
      <section className="bg-white pb-12 sm:pb-16">
        <Container>
          <Reveal className="mx-auto w-full max-w-4xl">
            <Stars color={P.amber} className="text-center text-lg" />
            <div className="mt-6 text-left">
              <Heading color={TEXT.coral}>Our Objectives</Heading>
            </div>
          </Reveal>
          <Reveal stagger={80} className="mx-auto mt-6 grid w-full max-w-4xl gap-8 sm:grid-cols-2">
            {project.objectives.map((obj) => (
              <div key={obj.title} className="flex flex-col gap-2 text-left" data-reveal>
                <h3 className="text-xl font-bold" style={{ color: TEXT.teal }}>
                  {obj.title}:
                </h3>
                <Bullets items={[obj.body]} />
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Project Timeline */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: P.cream }}>
        <Container>
          {/* Heading sits flush on top of the timeline, left-aligned; the
              moon hangs beside it without adding to its height. */}
          <Reveal className="mx-auto flex w-full max-w-3xl justify-start text-left">
            <div className="relative">
              <Image
                src={asset("/internal/cta-wave2/cb-moon.webp")}
                alt=""
                aria-hidden
                width={700}
                height={700}
                className="pointer-events-none absolute left-full top-1/2 ml-3 hidden w-24 -translate-y-1/2 mix-blend-multiply sm:block"
              />
              <h2 className="text-4xl font-bold leading-tight sm:text-5xl" style={{ color: TEXT.teal }} data-reveal>
                Project Timeline
              </h2>
              <Stars color={TEXT.orange} className="text-sm" />
            </div>
          </Reveal>
          <Reveal className="mx-auto mt-2 w-full max-w-3xl">
            <Timeline
              items={project.timeline.map((row) => ({
                date: row.date,
                label: row.label,
                emphasis: row.proper ? "critical" : undefined,
                // The doc sets the event-day row in its peach.
                color: row.proper ? P.coral : undefined,
              }))}
            />
          </Reveal>
        </Container>
      </section>

      {/* Who are we looking for? */}
      <section className="bg-white py-12 sm:py-16">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading color={TEXT.orange}>Who are we looking for?</Heading>
            <p className="mt-3" data-reveal>
              {project.lookingFor}
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-8 w-full max-w-3xl">
            {/* Garamond reads small, so the duties inside each committee go up
                a step from the accordion's default 14px. */}
            <div className="[&_details>div_li]:text-[17px] [&_details>div_p]:text-[17px]">
              <ListAccordion groups={committeeGroups} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: P.cream }}>
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading color={TEXT.amber}>FAQs</Heading>
            <ProjectFaqs faqs={project.faqs} />
          </Reveal>
        </Container>
      </section>

      {/* Flat white — last section, footer sits directly below. */}
      <section className="bg-white pb-14 pt-12 sm:pb-20 sm:pt-16">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
            <Heading color={TEXT.orange}>Contact Us!</Heading>
            <Stars color={P.amber} className="mt-1 text-sm" />
            <p className="mt-4" data-reveal>
              {project.contactsIntro}
            </p>
            <div className="mt-8 w-full">
              <PmContacts contacts={project.contacts} />
            </div>
          </Reveal>
        </Container>
      </section>

      <FloatingApplyButton href={CTA_WAVE2_APPLICATION_FORM_URL} label="Apply to Celaball now" />
    </div>
  );
}
