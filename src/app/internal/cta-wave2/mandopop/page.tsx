import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { FloatingApplyButton } from "@/components/internal/floating-apply-button";
import { RichParagraphs } from "@/components/internal/rich-text";
import { BackLink } from "@/components/internal/back-link";
import { ListAccordion } from "@/components/internal/list-accordion";
import { PhotoPlaceholder } from "@/components/internal/photo-placeholder";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { CTA_WAVE2_APPLICATION_FORM_URL } from "@/lib/core-team-wave2";
import { COMMPUB_REQUIREMENTS_GUIDE_URL, MANDOPOP } from "@/lib/cta-projects-wave2";

export const metadata: Metadata = {
  title: "Mandopop Music Festival — Core Team Applications Wave 2",
  robots: { index: false, follow: false },
};

// The instructions doc is set in Merriweather throughout, headings and body.
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

/*
 * White-led like every other project page, with the project's own 60/30/10
 * split carried by the accents instead of the backgrounds: navy (60) is the
 * ink, the headings, the pale alternate band and the solid blocks (cards,
 * table header, avatars); red (30) is the secondary accent — labels,
 * bullets, links, FAQ questions, the accordion and floating button; yellow
 * (10) is kept to the heading underlines, the Apply Now button and a few
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

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
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
      <section className="relative overflow-hidden" style={{ backgroundColor: NAVY }}>
        <BackLink href="/internal/cta-wave2" label="All Projects" />
        <Reveal>
          <Image
            src={asset(project.heroImage.src)}
            alt={project.heroImage.alt}
            width={1095}
            height={615}
            priority
            data-reveal
            className="max-h-[60vh] w-full object-cover"
          />
        </Reveal>
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
              <div className="pt-3" data-reveal>
                <a
                  href={CTA_WAVE2_APPLICATION_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-black uppercase tracking-wider shadow-[var(--shadow-md)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ backgroundColor: YELLOW, color: NAVY, outlineColor: NAVY }}
                >
                  Apply Now <span aria-hidden>&#8599;</span>
                </a>
              </div>
            </div>
            <PhotoPlaceholder className="aspect-[4/3] w-full" />
          </Reveal>
        </Container>
      </Band>

      {/* Dear Applicant */}
      <Band tone="tint">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-2xl flex-col gap-4 text-left">
            <Heading>Dear Applicant,</Heading>
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
          </Reveal>
        </Container>
      </Band>

      {/* Our Vision */}
      <Band tone="white">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-2xl flex-col gap-4 text-left">
            <Heading>Our Vision: {project.visionHeading} 💿</Heading>
            <RichParagraphs
              paragraphs={project.vision}
              className="flex flex-col gap-4"
              paragraphClassName="prose-body opacity-90"
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
          {/* The doc lays this out as a two-column table, so it's kept as
              one — the period in red, what to expect beside it. */}
          <Reveal className="mx-auto mt-8 w-full max-w-3xl">
            <dl className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-sm)] ring-1 ring-inset ring-[#2A4072]/10">
              <div
                className="hidden grid-cols-[13rem_1fr] gap-4 px-5 py-3 text-xs font-black uppercase tracking-wider sm:grid"
                style={{ backgroundColor: NAVY, color: CREAM }}
              >
                <span>Period</span>
                <span>What to Expect</span>
              </div>
              {project.timeline.map((row, i) => (
                <div
                  key={row.period}
                  data-reveal
                  className={cn(
                    "grid gap-1 px-5 py-4 sm:grid-cols-[13rem_1fr] sm:gap-4",
                    i > 0 && "border-t border-[#2A4072]/10"
                  )}
                >
                  <dt className="text-sm font-black" style={{ color: RED }}>
                    {row.period}
                  </dt>
                  <dd className="prose-body text-sm opacity-90">{row.expect}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Band>

      {/* Find Your Place Behind the Music */}
      <Band tone="white">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>Find Your Place Behind the Music 🎤</Heading>
            <p className="prose-body mt-3 opacity-90" data-reveal>
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
            <div className="mt-6 flex flex-col gap-6">
              {project.faqs.map((faq) => (
                <div key={faq.q} data-reveal>
                  <p className="font-bold" style={{ color: RED }}>
                    {faq.q}
                  </p>
                  <RichParagraphs
                    paragraphs={faq.a}
                    className="mt-1.5 flex flex-col gap-2"
                    paragraphClassName="prose-body opacity-90"
                  />
                </div>
              ))}
            </div>
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
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {project.contacts.map((contact) => (
                <div key={contact.name} className="flex flex-col items-center gap-2 text-center" data-reveal>
                  <div
                    className="flex h-28 w-28 items-center justify-center rounded-full"
                    style={{ backgroundColor: NAVY, color: YELLOW }}
                  >
                    <span className="text-2xl font-black">{initials(contact.name)}</span>
                  </div>
                  <p className="font-bold">{contact.name}</p>
                  <p className="text-sm opacity-75">{contact.role}</p>
                  <p className="text-sm">
                    {contact.facebook && (
                      <a
                        href={contact.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold underline-offset-2 hover:underline"
                        style={{ color: RED }}
                      >
                        Facebook
                      </a>
                    )}
                    {contact.facebook && contact.email && " | "}
                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="font-bold underline-offset-2 hover:underline"
                        style={{ color: RED }}
                      >
                        Email
                      </a>
                    )}
                  </p>
                </div>
              ))}
            </div>
            <p className="prose-body mt-10 text-center font-bold" data-reveal>
              {project.closingLine} 📼
            </p>
          </Reveal>
        </Container>
      </Band>

      <FloatingApplyButton href={CTA_WAVE2_APPLICATION_FORM_URL} label={`Apply to ${project.name} now`} />
    </div>
  );
}
