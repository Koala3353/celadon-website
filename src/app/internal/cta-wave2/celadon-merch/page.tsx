import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { FloatingApplyButton } from "@/components/internal/floating-apply-button";
import { RichParagraphs } from "@/components/internal/rich-text";
import { BackLink } from "@/components/internal/back-link";
import { Timeline } from "@/components/internal/timeline";
import { ListAccordion } from "@/components/internal/list-accordion";
import { PhotoPlaceholder } from "@/components/internal/photo-placeholder";
import { asset } from "@/lib/asset";
import { CTA_WAVE2_APPLICATION_FORM_URL } from "@/lib/core-team-wave2";
import { CELADON_MERCH } from "@/lib/cta-projects-wave2";

export const metadata: Metadata = {
  title: "Celadon Merch — Core Team Applications Wave 2",
  robots: { index: false, follow: false },
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

// CelaMerch hasn't sent fonts or colors yet, so this page uses the site's
// own type and takes every color from --dept-* — swapping the placeholder
// accent in cta-projects-wave2.ts restyles the whole page at once.
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-dept-ink sm:text-2xl" data-reveal>
      {children}
    </h2>
  );
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
              width={1920}
              height={1080}
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
              <h1 className="text-4xl font-bold text-dept-ink sm:text-6xl" data-reveal>
                {project.fullName}
              </h1>
            </Reveal>
          </Container>
        )}

        <Container className="relative flex flex-col items-center gap-5 pb-10 pt-10 text-center sm:pb-14 sm:pt-12">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5">
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
          <Reveal className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-10">
            <div className="flex flex-col gap-4 text-left">
              <Heading>What is CelaMerch?</Heading>
              <p className="prose-body text-dept-ink/80" data-reveal>
                {project.whatIsIt}
              </p>
              <p className="text-lg font-bold text-dept-accent" data-reveal>
                {project.welcome}
              </p>
            </div>
            <PhotoPlaceholder className="aspect-[4/3] w-full" />
          </Reveal>
        </Container>
      </section>

      {/* A Message from the PMs */}
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-2xl flex-col gap-4 text-left">
            <Heading>A Message from the PMs&hellip;</Heading>
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
              { heading: "Our Vision", body: project.vision },
              { heading: "Our Thrust", body: project.thrust },
            ].map((block) => (
              <div
                key={block.heading}
                className="flex flex-col gap-3 rounded-2xl bg-dept-tint p-6 text-left ring-1 ring-inset ring-dept-accent/15"
                data-reveal
              >
                <h2 className="text-xl font-bold text-dept-ink">{block.heading}</h2>
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
            {project.timeline.length > 0 ? (
              <Timeline items={project.timeline} />
            ) : (
              <PhotoPlaceholder className="py-10" label="Timeline coming soon" />
            )}
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
            <ListAccordion groups={project.committees} />
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
                  <p className="font-bold text-dept-ink">{req.label}</p>
                  <Bullets items={req.items as string[]} />
                </div>
              ))}
            </div>
            <p className="prose-body mt-6 text-center italic text-dept-ink/70" data-reveal>
              ~ {project.requirementsNote} ~
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Project FAQs! */}
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>Project FAQs!</Heading>
            <div className="mt-6 flex flex-col gap-6">
              {project.faqs.map((faq) => (
                <div key={faq.q} data-reveal>
                  <p className="font-bold text-dept-ink">{faq.q}</p>
                  <RichParagraphs
                    paragraphs={faq.a}
                    className="mt-1.5 flex flex-col gap-2"
                    paragraphClassName="prose-body text-muted-foreground"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Flat white — last section, footer sits directly below. */}
      <section className="bg-white pb-14 pt-4 sm:pb-20">
        <Container>
          <Reveal className="mx-auto w-full max-w-2xl text-left">
            <Heading>Contact Us!!</Heading>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {project.contacts.map((contact) => (
                <div key={contact.name} className="flex flex-col items-center gap-2 text-center" data-reveal>
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-dept-accent/15">
                    <span className="display text-2xl text-dept-ink/60">{initials(contact.name)}</span>
                  </div>
                  <p className="font-bold text-dept-ink">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.role}</p>
                  <p className="text-sm">
                    {contact.facebook && (
                      <a
                        href={contact.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link underline-offset-2 hover:underline"
                      >
                        Facebook
                      </a>
                    )}
                    {contact.facebook && contact.email && " | "}
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} className="text-link underline-offset-2 hover:underline">
                        Email
                      </a>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <FloatingApplyButton href={CTA_WAVE2_APPLICATION_FORM_URL} label={`Apply to ${project.name} now`} />
    </div>
  );
}
