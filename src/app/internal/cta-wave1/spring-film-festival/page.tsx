import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { SkeletonImage } from "@/components/ui/skeleton-image";
import { ButtonLink } from "@/components/ui/button-link";
import { RichParagraphs } from "@/components/internal/rich-text";
import { Timeline } from "@/components/internal/timeline";
import { ListAccordion } from "@/components/internal/list-accordion";
import { PhotoCarousel } from "@/components/photo-carousel";
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
  const [appFaqs, projectFaqs] = [project.faqs.slice(0, 1), project.faqs.slice(1)];

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
              <span className="prose-body font-bold text-dept-ink">{project.letterSignoff.highlighted}</span>
              <br />
              <span className="prose-body text-dept-ink">{project.letterSignoff.name}</span>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* What is the Spring Film Festival? + Vision */}
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[1.2fr_1fr] md:items-start md:gap-10">
            <div className="flex flex-col gap-4 text-left">
              <Heading>{project.whatIsIt.heading}</Heading>
              <RichParagraphs
                paragraphs={project.whatIsIt.body.slice(0, -1)}
                className="flex flex-col gap-4"
                paragraphClassName="prose-body text-dept-ink/80"
              />
            </div>
            <PhotoCarousel
              photos={(project.whatIsIt.images ?? []).map((img) => ({ src: asset(img.src) }))}
              alt={project.whatIsIt.heading}
              className="aspect-[4/3] w-full rounded-2xl shadow-[var(--shadow-md)]"
            />
          </Reveal>

          <Reveal className="mx-auto mt-4 w-full max-w-5xl text-left">
            <RichParagraphs
              paragraphs={project.whatIsIt.body.slice(-1)}
              className="flex flex-col gap-4"
              paragraphClassName="prose-body text-dept-ink/80"
            />
          </Reveal>

          <Reveal className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-3 text-left">
            <Heading>🏮 Vision & Thrust</Heading>
            <RichParagraphs
              paragraphs={project.vision}
              className="flex flex-col gap-4"
              paragraphClassName="prose-body text-dept-ink/80"
              data-reveal
            />
          </Reveal>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-2xl text-left">
            <Heading>📌 Project Timeline</Heading>
            <p className="prose-body mt-3 font-bold text-dept-ink" data-reveal>
              Project Planning, Execution, and Evaluation
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-10 w-full max-w-3xl">
            <Timeline items={project.timeline} columns={2} />
          </Reveal>
          <Reveal className="mx-auto mt-4 w-full max-w-3xl text-left">
            <p className="prose-body text-sm italic text-muted-foreground" data-reveal>
              * All dates are tentative and are subject to change.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Committees */}
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>👥 Core Team Committees</Heading>
            <p className="prose-body mt-3 text-muted-foreground" data-reveal>
              The eight committees of the Spring Film Festival make up the different teams that help the
              Spring Film Festival reach its project goals, each having distinct yet complementary
              responsibilities. Found below are the descriptions, expectations, and common responsibilities of
              each committee.
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
                  <RichParagraphs
                    paragraphs={faq.a}
                    className="mt-1.5 flex flex-col gap-2"
                    paragraphClassName="prose-body text-muted-foreground"
                  />
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
