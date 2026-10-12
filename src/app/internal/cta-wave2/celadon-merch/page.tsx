import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { FloatingApplyButton } from "@/components/internal/floating-apply-button";
import { RichParagraphs } from "@/components/internal/rich-text";
import { BackLink } from "@/components/internal/back-link";
import { ProjectFaqs } from "@/components/internal/project-faqs";
import { PmContacts } from "@/components/internal/pm-contacts";
import { Timeline } from "@/components/internal/timeline";
import { ListAccordion } from "@/components/internal/list-accordion";
import { asset } from "@/lib/asset";
import { CTA_WAVE2_APPLICATION_FORM_URL, wave2Blurb } from "@/lib/core-team-wave2";
import { CELADON_MERCH } from "@/lib/cta-projects-wave2";

// Served from src/fonts rather than fetched from Google Fonts at build
// time — see src/fonts/README.md.
const kumbhSans = localFont({
  src: [{ path: "../../../../fonts/kumbh-sans/kumbh-sans-normal.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-cm-body",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});
const libreBaskerville = localFont({
  src: [{ path: "../../../../fonts/libre-baskerville/libre-baskerville-normal.woff2", weight: "700", style: "normal" }],
  variable: "--font-cm-heading",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  title: "Celadon Merch — Core Team Applications Wave 2",
  robots: { index: false, follow: false },
};


// Matches the PMs' content tab: Kumbh Sans body, Libre Baskerville
// headings in near-black brown, with one word of each heading picked out in
// brick red or warm orange.

const RED = "#BD433E";
// The doc's own orange (#DC9960) is too light to read as small text on
// white, so text uses this darker shade of it; fills keep the original.
const ORANGE_TEXT = "#B5652A";

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-dept-ink [font-family:var(--font-cm-heading)] sm:text-2xl" data-reveal>
      {children}
    </h2>
  );
}

function Red({ children }: { children: React.ReactNode }) {
  return <span style={{ color: RED }}>{children}</span>;
}

function Orange({ children }: { children: React.ReactNode }) {
  return <span style={{ color: ORANGE_TEXT }}>{children}</span>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="prose-body flex gap-2 text-dept-ink/80" data-reveal>
          <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-dept-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CeladonMerchProjectPage() {
  const project = CELADON_MERCH;

  return (
    <div
      className={`${kumbhSans.variable} ${libreBaskerville.variable} [font-family:var(--font-cm-body)]`}
      style={
        {
          "--dept-accent": project.accent.base,
          "--dept-tint": project.accent.tint,
          "--dept-ink": project.accent.ink,
        } as React.CSSProperties
      }
    >
      <section className="relative overflow-hidden bg-dept-tint text-dept-ink">
        <BackLink href="/internal/cta-wave2" label="All Projects" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 85% 0%, color-mix(in srgb, var(--dept-accent) 20%, transparent) 0%, transparent 65%)",
          }}
        />

        {project.heroImage ? (
          <Reveal>
            <Image
              src={asset(project.heroImage.src)}
              alt={project.heroImage.alt}
              width={1600}
              height={902}
              priority
              data-reveal
              className="max-h-[60vh] w-full object-cover"
            />
          </Reveal>
        ) : (
          // No header artwork yet — a plain color-field title in its place,
          // the same fallback the department pages use for OSR.
          <Container className="relative flex flex-col items-center pb-2 pt-32 text-center sm:pt-40">
            <Reveal className="flex flex-col items-center gap-3">
              <p className="sky-display eyebrow text-dept-accent" data-reveal>
                Core Team Applications &middot; Wave 2
              </p>
              <h1 className="text-4xl font-bold text-dept-ink [font-family:var(--font-cm-heading)] sm:text-6xl" data-reveal>
                <Red>Celadon</Red> <Orange>Merchandise</Orange>
              </h1>
            </Reveal>
          </Container>
        )}

        <Container className="relative flex flex-col items-center gap-5 pb-10 pt-10 text-center sm:pb-14 sm:pt-12">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5">
            <p className="prose-body max-w-2xl text-lg text-dept-ink/80" data-reveal>
              {wave2Blurb("celadon-merch")}
            </p>
            <div data-reveal>
              <ButtonLink href={CTA_WAVE2_APPLICATION_FORM_URL} external size="lg" variant="accent">
                Apply Now
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* What is CelaMerch? */}
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl">
            <div className="flex flex-col gap-4 text-left">
              <Heading>
                What is <Red>Cela</Red>
                <Orange>Merch</Orange>?
              </Heading>
              <p className="prose-body text-dept-ink/80" data-reveal>
                {project.whatIsIt}
              </p>
              <p className="text-lg font-bold text-dept-ink [font-family:var(--font-cm-heading)]" data-reveal>
                Welcome to <Red>Celadon</Red> <Orange>Merchandise</Orange>!
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* A Message from the PMs */}
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-2xl flex-col gap-4 text-left">
            <Heading>
              A <Red>Message</Red> from the PMs&hellip;
            </Heading>
            <RichParagraphs
              paragraphs={project.letter}
              className="flex flex-col gap-4"
              paragraphClassName="prose-body text-dept-ink/80"
            />
            <p className="prose-body text-right font-bold text-dept-ink" data-reveal>
              {project.letterSignoff}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Vision + Thrust */}
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto grid w-full max-w-4xl gap-6 sm:grid-cols-2">
            {[
              { heading: "Our", word: "Vision", color: RED, body: project.vision },
              { heading: "Our", word: "Thrust", color: ORANGE_TEXT, body: project.thrust },
            ].map((block) => (
              <div
                key={block.heading}
                className="flex flex-col gap-3 rounded-2xl bg-dept-tint p-6 text-left ring-1 ring-inset ring-dept-accent/15"
                data-reveal
              >
                <h2 className="text-xl font-bold text-dept-ink [font-family:var(--font-cm-heading)]">
                  {block.heading} <span style={{ color: block.color }}>{block.word}</span>
                </h2>
                <p className="prose-body text-dept-ink/80">{block.body}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Project Timeline */}
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-2xl text-left">
            <Heading>Project Timeline</Heading>
          </Reveal>
          <Reveal className="mx-auto mt-8 w-full max-w-2xl">
            <Timeline items={project.timeline} />
          </Reveal>
        </Container>
      </section>

      {/* Who are we looking for? */}
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>Who are we looking for?</Heading>
            <p className="prose-body mt-3 text-muted-foreground" data-reveal>
              Open a committee to see what it handles and who it&rsquo;s looking for.
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-10 w-full max-w-3xl">
            {/* Committee names in the doc's heading face, Libre Baskerville. */}
            <div className="[&_summary>span]:[font-family:var(--font-cm-heading)]">
              <ListAccordion groups={project.committees} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Committee Specific Requirements */}
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>Committee Specific Requirements</Heading>
            <p className="prose-body mt-3 text-dept-ink/80" data-reveal>
              Note that the following committees are required to submit additional requirements for their
              application:
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {project.requirements.map((req) => (
                <div key={req.label} className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-[var(--shadow-sm)]" data-reveal>
                  <p className="font-bold" style={{ color: RED }}>
                    {req.label}
                  </p>
                  <Bullets items={req.items as string[]} />
                </div>
              ))}
            </div>
            <p className="prose-body mt-6 text-center" style={{ color: ORANGE_TEXT }} data-reveal>
              ~ {project.requirementsNote}{" "}
              <a
                href={project.moodboard.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline underline-offset-2 hover:opacity-80"
              >
                {project.moodboard.label}
              </a>{" "}
              ~
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Project FAQs! */}
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>
              Project <Red>FAQs</Red>!
            </Heading>
            <ProjectFaqs faqs={project.faqs} />
          </Reveal>
        </Container>
      </section>

      {/* Flat white — last section, footer sits directly below. */}
      <section className="bg-white pb-14 pt-4 sm:pb-20">
        <Container>
          <Reveal className="mx-auto w-full max-w-2xl text-left">
            <Heading>
              Contact <Red>Us</Red>!!
            </Heading>
            <div className="mt-6">
              <PmContacts contacts={project.contacts} />
            </div>
          </Reveal>
        </Container>
      </section>

      <FloatingApplyButton href={CTA_WAVE2_APPLICATION_FORM_URL} label="Apply to Celadon Merch now" />
    </div>
  );
}
