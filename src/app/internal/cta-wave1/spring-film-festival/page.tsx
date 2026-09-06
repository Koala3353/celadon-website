import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { SkeletonImage } from "@/components/ui/skeleton-image";
import { ButtonLink } from "@/components/ui/button-link";
import { RichParagraphs } from "@/components/internal/rich-text";
import { Timeline } from "@/components/internal/timeline";
import { ListAccordion } from "@/components/internal/list-accordion";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { CTA_APPLICATION_FORM_URL } from "@/lib/core-team-wave";
import { SPRING_FILM_FESTIVAL } from "@/lib/cta-projects";

export const metadata: Metadata = {
  title: "Spring Film Festival — Core Team Applications",
  robots: { index: false, follow: false },
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-extrabold text-dept-accent sm:text-2xl" data-reveal>
      {children}
    </h2>
  );
}

export default function SpringFilmFestivalProjectPage() {
  const project = SPRING_FILM_FESTIVAL;
  const [appFaqs, projectFaqs] = [project.faqs.slice(0, 4), project.faqs.slice(4)];

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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 85% 0%, color-mix(in srgb, var(--dept-accent) 20%, transparent) 0%, transparent 65%)",
          }}
        />
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
        <Container className="relative flex flex-col items-center gap-5 pb-10 pt-12 text-center sm:pb-14 sm:pt-16">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5">
            <p className="prose-body text-lg text-dept-ink/80" data-reveal>
              {project.about}
            </p>
            <div data-reveal>
              <ButtonLink href={CTA_APPLICATION_FORM_URL} external size="lg" variant="accent">
                Apply Now
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Letter from the PMs */}
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-2xl flex-col gap-4">
            <p className="flex items-center gap-2 text-xl font-extrabold text-dept-accent" data-reveal>
              <span aria-hidden>💌</span> Dear Aspiring Applicants,
            </p>
            <RichParagraphs
              paragraphs={project.letter}
              className="flex flex-col gap-4"
              paragraphClassName="prose-body text-dept-ink/80"
            />
            <p className="text-right" data-reveal>
              <mark className="rounded-[2px] bg-amber-200/70 px-0.5 font-semibold text-dept-ink">
                {project.letterSignoff.highlighted}
              </mark>
              <br />
              <span className="prose-body text-dept-ink">{project.letterSignoff.name}</span>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* What is the Spring Film Festival? + Vision */}
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-3xl flex-col gap-4 text-left">
            <Heading>{project.whatIsIt.heading}</Heading>
            <RichParagraphs
              paragraphs={project.whatIsIt.body}
              className="flex flex-col gap-4"
              paragraphClassName="prose-body text-dept-ink/80"
            />
          </Reveal>

          <Reveal className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-3 text-left">
            <Heading>🏮 Vision & Mission</Heading>
            <p className="prose-body text-dept-ink/80" data-reveal>
              {project.vision}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-2xl text-left">
            <Heading>📌 Project Timeline</Heading>
          </Reveal>
          <Reveal className="mx-auto mt-10 w-full max-w-xl">
            <Timeline items={project.timeline} />
          </Reveal>
        </Container>
      </section>

      {/* Committees */}
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>👥 List of Committees</Heading>
            <p className="prose-body mt-3 text-muted-foreground" data-reveal>
              Open a committee to see its description and general responsibilities.
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-10 w-full max-w-3xl">
            <ListAccordion groups={project.committees} />
          </Reveal>
        </Container>
      </section>

      {/* FAQs */}
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl">
            <Heading>❓ FAQs</Heading>
            <p className="prose-body mt-4 font-bold text-dept-ink" data-reveal>
              Application-Related Questions
            </p>
            <div className="mt-4 flex flex-col gap-6">
              {appFaqs.map((faq) => (
                <div key={faq.q} data-reveal>
                  <p className="font-bold text-dept-ink">{faq.q}</p>
                  <p className="prose-body mt-1.5 text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
            <p className="prose-body mt-8 font-bold text-dept-ink" data-reveal>
              Project-Related Questions
            </p>
            <div className="mt-4 flex flex-col gap-6">
              {projectFaqs.map((faq) => (
                <div key={faq.q} data-reveal>
                  <p className="font-bold text-dept-ink">{faq.q}</p>
                  <p className="prose-body mt-1.5 text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Flat white — last section, footer sits directly below. */}
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>✉️ Contact Us</Heading>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {project.contacts.map((contact) => (
                <div key={contact.name} className="flex flex-col items-center gap-2 text-center" data-reveal>
                  {contact.photo ? (
                    <SkeletonImage
                      src={asset(contact.photo)}
                      alt={contact.name}
                      width={112}
                      height={112}
                      containerClassName="h-28 w-28 rounded-full"
                      className="h-28 w-28 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-dept-accent/15">
                      <span className="display text-2xl text-dept-ink/60">{initials(contact.name)}</span>
                    </div>
                  )}
                  <p className="font-bold text-dept-ink">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.role}</p>
                  <p className="text-sm">
                    {contact.facebook && (
                      <a
                        href={contact.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn("text-link underline-offset-2 hover:underline")}
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
    </div>
  );
}
