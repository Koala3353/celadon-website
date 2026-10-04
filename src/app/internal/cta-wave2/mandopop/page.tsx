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
 * Color follows the project's own 60/30/10 split, read against its
 * "Beyond the Final Note" moodboard (blues, muted reds, warm yellows,
 * creamy beiges): navy is the dominant surface, red the alternating band,
 * and yellow is held back for headings, labels and the primary button.
 * Cream carries body copy on both dark grounds.
 */
const NAVY = MANDOPOP.palette.dominant;
const RED = MANDOPOP.palette.secondary;
const CREAM = "#F5ECDA";

function Band({
  tone,
  className,
  children,
}: {
  tone: "navy" | "red" | "white";
  className?: string;
  children: React.ReactNode;
}) {
  const bg = tone === "navy" ? NAVY : tone === "red" ? RED : "#FFFFFF";
  return (
    <section
      className={cn("py-10 sm:py-14", className)}
      // White is the one light ground, so it switches the inherited ink to navy.
      style={{ backgroundColor: bg, color: tone === "white" ? NAVY : undefined }}
    >
      {children}
    </section>
  );
}

function Heading({ children, onLight }: { children: React.ReactNode; onLight?: boolean }) {
  return (
    <h2
      className="text-2xl font-black sm:text-3xl"
      style={{ color: onLight ? NAVY : MANDOPOP.palette.accent }}
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
          // accordion's bullets take red, the accordion's white cards keep
          // navy ink, and its frame takes the cream.
          "--dept-accent": RED,
          "--dept-tint": CREAM,
          "--dept-ink": NAVY,
          color: CREAM,
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
      <Band tone="navy">
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
                  <dt className="shrink-0 font-bold" style={{ color: project.palette.accent }}>
                    📅 Target date:
                  </dt>
                  <dd>{project.targetDate}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 font-bold" style={{ color: project.palette.accent }}>
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
                  style={{ backgroundColor: project.palette.accent, color: NAVY, outlineColor: project.palette.accent }}
                >
                  Apply Now <span aria-hidden>&#8599;</span>
                </a>
              </div>
            </div>
            <PhotoPlaceholder tone="dark" className="aspect-[4/3] w-full" />
          </Reveal>
        </Container>
      </Band>

      {/* Dear Applicant */}
      <Band tone="red">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-2xl flex-col gap-4 text-left">
            <Heading>Dear Applicant,</Heading>
            {project.letter.map((p) => (
              <p key={p} className="prose-body opacity-95" data-reveal>
                {p}
              </p>
            ))}
            <p className="prose-body mt-2" data-reveal>
              <strong className="font-bold">{project.letterSignoff.closing}</strong>
              <br />
              <strong className="font-bold">{project.letterSignoff.names}</strong>
              <br />
              <em className="italic opacity-85">{project.letterSignoff.role}</em>
            </p>
          </Reveal>
        </Container>
      </Band>

      {/* Our Vision */}
      <Band tone="navy">
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
      <Band tone="red">
        <Container>
          <Reveal className="mx-auto w-full max-w-4xl text-left">
            <Heading>What&rsquo;s in Store This Year? ✨</Heading>
          </Reveal>
          <Reveal stagger={60} className="mx-auto mt-8 grid w-full max-w-4xl gap-4 sm:grid-cols-2">
            {project.whatsInStore.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 rounded-2xl p-6 shadow-[var(--shadow-sm)]"
                style={{ backgroundColor: NAVY }}
                data-reveal
              >
                <p className="font-black" style={{ color: project.palette.accent }}>
                  {item.title}
                </p>
                <p className="prose-body text-sm opacity-90">{item.body}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </Band>

      {/* Who Are We Looking For? */}
      <Band tone="navy">
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
                    style={{ backgroundColor: project.palette.accent }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="prose-body mt-2 font-bold" style={{ color: project.palette.accent }} data-reveal>
              {project.lookingForNote}
            </p>
          </Reveal>
        </Container>
      </Band>

      {/* Estimated Project Timeline */}
      <Band tone="red">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>Estimated Project Timeline 🗓️</Heading>
            <p className="prose-body mt-3 italic opacity-90" data-reveal>
              {project.timelineNote}
            </p>
          </Reveal>
          {/* The doc lays this out as a two-column table, so it's kept as
              one — the period in yellow, what to expect beside it. */}
          <Reveal className="mx-auto mt-8 w-full max-w-3xl">
            <dl
              className="overflow-hidden rounded-2xl ring-1 ring-inset ring-white/15"
              style={{ backgroundColor: NAVY }}
            >
              <div className="hidden grid-cols-[13rem_1fr] gap-4 border-b border-white/15 px-5 py-3 text-xs font-black uppercase tracking-wider opacity-70 sm:grid">
                <span>Period</span>
                <span>What to Expect</span>
              </div>
              {project.timeline.map((row, i) => (
                <div
                  key={row.period}
                  data-reveal
                  className={cn(
                    "grid gap-1 px-5 py-4 sm:grid-cols-[13rem_1fr] sm:gap-4",
                    i > 0 && "border-t border-white/10"
                  )}
                >
                  <dt className="text-sm font-black" style={{ color: project.palette.accent }}>
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
      <Band tone="navy">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>Find Your Place Behind the Music 🎤</Heading>
            <p className="prose-body mt-3 opacity-90" data-reveal>
              Open a committee to see what it handles.
            </p>
            <p className="prose-body mt-4 text-sm" data-reveal>
              <span className="font-bold" style={{ color: project.palette.accent }}>
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
      <Band tone="red">
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
                    style={{ backgroundColor: project.palette.accent }}
                  />
                  <span>
                    <strong className="font-bold" style={{ color: project.palette.accent }}>
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
      <Band tone="navy">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>FAQs 💬</Heading>
            <div className="mt-6 flex flex-col gap-6">
              {project.faqs.map((faq) => (
                <div key={faq.q} data-reveal>
                  <p className="font-bold" style={{ color: project.palette.accent }}>
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
            <Heading onLight>Contact Us! 📮</Heading>
            <p className="prose-body mt-3" data-reveal>
              {project.contactsIntro}
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {project.contacts.map((contact) => (
                <div key={contact.name} className="flex flex-col items-center gap-2 text-center" data-reveal>
                  <div
                    className="flex h-28 w-28 items-center justify-center rounded-full"
                    style={{ backgroundColor: NAVY, color: project.palette.accent }}
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
