import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/motion/reveal";
import { FloatingApplyButton } from "@/components/internal/floating-apply-button";
import { RichParagraphs } from "@/components/internal/rich-text";
import { BackLink } from "@/components/internal/back-link";
import { ProjectFaqs } from "@/components/internal/project-faqs";
import { PmContacts } from "@/components/internal/pm-contacts";
import { ListAccordion } from "@/components/internal/list-accordion";
import { Timeline } from "@/components/internal/timeline";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { CTA_WAVE2_APPLICATION_FORM_URL, wave2Blurb } from "@/lib/core-team-wave2";
import { COMMPUB_REQUIREMENTS_GUIDE_URL, MANDOPOP } from "@/lib/cta-projects-wave2";

// Served from src/fonts rather than fetched from Google Fonts at build
// time — see src/fonts/README.md.
const merriweather = localFont({
  src: [
    { path: "../../../../fonts/merriweather/merriweather-normal.woff2", weight: "400 900", style: "normal" },
    { path: "../../../../fonts/merriweather/merriweather-italic.woff2", weight: "400 900", style: "italic" },
  ],
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  title: "Mandopop Music Festival — Core Team Applications Wave 2",
  robots: { index: false, follow: false },
};

// The instructions doc is set in Merriweather throughout, headings and body.

/*
 * White-led like every other project page, with the project's own 60/30/10
 * split carried by the accents instead of the backgrounds: navy (60) is the
 * ink, the headings, the pale alternate band and the solid blocks (cards,
 * table header, avatars); red (30) is the secondary accent — labels,
 * bullets, links, FAQ questions, the accordion and floating button; yellow
 * (10) is kept to the heading underlines and a few
 * small highlights on navy, where it has the contrast to read.
 */
const NAVY = MANDOPOP.palette.dominant;
const RED = MANDOPOP.palette.secondary;
const YELLOW = MANDOPOP.palette.accent;
const CREAM = "#F5ECDA";
/** Navy at ~8% on white — the alternate band, in place of other pages' bg-dept-tint. */
const NAVY_TINT = "#EEF1F7";

function Band({
  tone,
  className,
  children,
}: {
  tone: "white" | "tint";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn("py-10 sm:py-14", className)}
      style={{ backgroundColor: tone === "tint" ? NAVY_TINT : "#FFFFFF" }}
    >
      {children}
    </section>
  );
}

function Photo({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-md)]" data-reveal>
      <Image
        src={asset(src)}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 40vw, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl font-black after:mt-3 after:block after:h-1 after:w-12 after:rounded-full after:bg-[#FBD271] sm:text-3xl"
      style={{ color: NAVY }}
      data-reveal
    >
      {children}
    </h2>
  );
}


export default function MandopopProjectPage() {
  const project = MANDOPOP;

  return (
    <div
      className={merriweather.className}
      style={
        {
          // Shared components read these: the floating button and the
          // accordion's bullets take red, its cards keep navy ink, and its
          // frame (plus the photo placeholder) takes the pale navy tint.
          "--dept-accent": RED,
          "--dept-tint": NAVY_TINT,
          "--dept-ink": NAVY,
          color: NAVY,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <section className="relative overflow-hidden" style={{ backgroundColor: NAVY_TINT }}>
        <BackLink href="/internal/cta-wave2" label="All Projects" />
        <Reveal>
          <Image
            src={asset(project.heroImage.src)}
            alt={project.heroImage.alt}
            width={1600}
            height={900}
            priority
            data-reveal
            className="max-h-[60vh] w-full object-cover"
          />
        </Reveal>
        <Container className="relative flex flex-col items-center pb-10 pt-10 text-center sm:pb-14 sm:pt-12">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5">
            <p className="prose-body max-w-2xl text-lg text-dept-ink/80" data-reveal>
              {wave2Blurb("mandopop")}
            </p>
            <div data-reveal>
              <ButtonLink href={CTA_WAVE2_APPLICATION_FORM_URL} external size="lg" variant="accent">
                Apply Now
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* What is Mandopop? */}
      <Band tone="white">
        <Container>
          <Reveal className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10">
            <div className="flex flex-col gap-4 text-left">
              <Heading>What is Mandopop? 🎶</Heading>
              <RichParagraphs
                paragraphs={project.about}
                className="flex flex-col gap-4"
                paragraphClassName="prose-body opacity-90"
              />
              <dl className="mt-2 flex flex-col gap-2 text-sm" data-reveal>
                <div className="flex gap-2">
                  <dt className="shrink-0 font-bold" style={{ color: RED }}>
                    📅 Target date:
                  </dt>
                  <dd>{project.targetDate}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 font-bold" style={{ color: RED }}>
                    📍 Venue:
                  </dt>
                  <dd>{project.venue}</dd>
                </div>
              </dl>
            </div>
            <Photo
              src="/internal/cta-wave2/mdp-crowd.webp"
              alt="A crowd watching a band under blue stage lights at a past Mandopop Music Festival"
              width={1400}
              height={748}
            />
          </Reveal>
        </Container>
      </Band>

      {/* Dear Applicant */}
      <Band tone="tint">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-5xl flex-col gap-6 text-left">
            <Heading>Dear Applicant,</Heading>
            <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-start md:gap-10">
              <Photo
                src="/internal/cta-wave2/mdp-guzheng.webp"
                alt="A performer playing the guzheng on stage at a past Mandopop Music Festival"
                width={1400}
                height={808}
              />
              <div className="flex flex-col gap-4">
                {project.letter.map((p) => (
                  <p key={p} className="prose-body opacity-95" data-reveal>
                    {p}
                  </p>
                ))}
                <p className="prose-body mt-2" data-reveal>
                  <strong className="font-bold" style={{ color: RED }}>{project.letterSignoff.closing}</strong>
                  <br />
                  <strong className="font-bold">{project.letterSignoff.names}</strong>
                  <br />
                  <em className="italic opacity-85">{project.letterSignoff.role}</em>
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Band>

      {/* Our Vision */}
      <Band tone="white">
        <Container>
          <Reveal className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10">
            <div className="flex flex-col gap-4 text-left">
              <Heading>Our Vision: {project.visionHeading} 💿</Heading>
              <RichParagraphs
                paragraphs={project.vision}
                className="flex flex-col gap-4"
                paragraphClassName="prose-body opacity-90"
              />
            </div>
            <Photo
              src="/internal/cta-wave2/mdp-team.webp"
              alt="The Mandopop core team posing together on stage after a past festival"
              width={1400}
              height={675}
            />
          </Reveal>
        </Container>
      </Band>

      {/* What's in Store This Year? */}
      <Band tone="tint">
        <Container>
          <Reveal className="mx-auto w-full max-w-4xl text-left">
            <Heading>What&rsquo;s in Store This Year? ✨</Heading>
          </Reveal>
          <Reveal stagger={60} className="mx-auto mt-8 grid w-full max-w-4xl gap-4 sm:grid-cols-2">
            {project.whatsInStore.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 rounded-2xl p-6 shadow-[var(--shadow-sm)]"
                style={{ backgroundColor: NAVY, color: CREAM }}
                data-reveal
              >
                <p className="font-black" style={{ color: YELLOW }}>
                  {item.title}
                </p>
                <p className="prose-body text-sm opacity-90">{item.body}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </Band>

      {/* Who Are We Looking For? */}
      <Band tone="white">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-2xl flex-col gap-4 text-left">
            <Heading>Who Are We Looking For? 🎧</Heading>
            <p className="prose-body opacity-90" data-reveal>
              We&rsquo;re looking for Celadon members who:
            </p>
            <ul className="flex flex-col gap-2">
              {project.lookingFor.map((item) => (
                <li key={item} className="prose-body flex gap-3 opacity-90" data-reveal>
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: RED }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="prose-body mt-2 font-bold" style={{ color: RED }} data-reveal>
              {project.lookingForNote}
            </p>
          </Reveal>
        </Container>
      </Band>

      {/* Estimated Project Timeline */}
      <Band tone="tint">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>Estimated Project Timeline 🗓️</Heading>
            <p className="prose-body mt-3 italic opacity-90" data-reveal>
              {project.timelineNote}
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-8 w-full max-w-3xl">
            <Timeline
              items={project.timeline.map((row) => ({
                date: row.period,
                label: row.expect,
                emphasis: row.expect === "Mandopop Music Festival" ? "critical" : undefined,
              }))}
            />
          </Reveal>
        </Container>
      </Band>

      {/* Find Your Place Behind the Music */}
      <Band tone="white">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>Find Your Place Behind the Music 🎤</Heading>
            <div className="mt-6">
              <Photo
                src="/internal/cta-wave2/mdp-stage.webp"
                alt="A band performing on the Mandopop stage under coloured lights, with the audience in front"
                width={1400}
                height={813}
              />
            </div>
            <p className="prose-body mt-6 opacity-90" data-reveal>
              Open a committee to see what it handles.
            </p>
            <p className="prose-body mt-4 text-sm" data-reveal>
              <span className="font-bold" style={{ color: RED }}>
                MDP Moodboard:
              </span>{" "}
              <a
                href={project.moodboard.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline underline-offset-2 hover:opacity-80"
              >
                {project.moodboard.label}
              </a>
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-8 w-full max-w-3xl">
            <ListAccordion groups={project.committees} />
          </Reveal>
        </Container>
      </Band>

      {/* Additional Requirements */}
      <Band tone="tint">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-3xl flex-col gap-4 text-left">
            <Heading>Additional Requirements 🎨</Heading>
            <RichParagraphs
              paragraphs={project.requirementsIntro}
              className="flex flex-col gap-4"
              paragraphClassName="prose-body opacity-95"
            />
            <ul className="mt-2 flex flex-col gap-3">
              {project.requirements.map((req) => (
                <li key={req.committee} className="prose-body flex gap-3" data-reveal>
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: RED }}
                  />
                  <span>
                    <strong className="font-bold" style={{ color: RED }}>
                      {req.committee}:
                    </strong>{" "}
                    <span className="opacity-95">{req.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="prose-body mt-2 opacity-95" data-reveal>
              Please refer to the{" "}
              <a
                href={COMMPUB_REQUIREMENTS_GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline underline-offset-2 hover:opacity-80"
              >
                COMMPUB Additional Requirements Guide
              </a>{" "}
              for the complete instructions.
            </p>
          </Reveal>
        </Container>
      </Band>

      {/* FAQs */}
      <Band tone="white">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>FAQs 💬</Heading>
            <ProjectFaqs faqs={project.faqs} />
          </Reveal>
        </Container>
      </Band>

      {/* Flat white — last section, footer sits directly below. Same as
          every other project page: the footer's own top gap is white, so
          any tint here would meet it with a hard edge. */}
      <Band tone="white" className="pb-14 sm:pb-20">
        <Container>
          <Reveal className="mx-auto w-full max-w-2xl text-left">
            <Heading>Contact Us! 📮</Heading>
            <p className="prose-body mt-3" data-reveal>
              {project.contactsIntro}
            </p>
            <div className="mt-8">
              <PmContacts contacts={project.contacts} />
            </div>
            <p className="prose-body mt-10 text-center font-bold" data-reveal>
              {project.closingLine} 📼
            </p>
          </Reveal>
        </Container>
      </Band>

      <FloatingApplyButton href={CTA_WAVE2_APPLICATION_FORM_URL} label="Apply to Mandopop now" />
    </div>
  );
}
