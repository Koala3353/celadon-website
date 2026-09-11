import type { Metadata } from "next";
import { Nunito, DM_Sans } from "next/font/google";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { SkeletonImage } from "@/components/ui/skeleton-image";
import { ButtonLink } from "@/components/ui/button-link";
import { RichParagraphs } from "@/components/internal/rich-text";
import { Timeline } from "@/components/internal/timeline";
import { ListAccordion } from "@/components/internal/list-accordion";
import { PhotoCarousel } from "@/components/photo-carousel";
import { TestimonialCard } from "@/components/testimonial-card";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { CTA_APPLICATION_FORM_URL } from "@/lib/core-team-wave";
import { CHINESE_NEW_YEAR } from "@/lib/cta-projects";

export const metadata: Metadata = {
  title: "Chinese New Year — Core Team Applications",
  robots: { index: false, follow: false },
};

// CNY's own doc sets its body copy in DM Sans throughout, with headings and
// the PM salutation in a heavier Nunito Black, in the doc's own red (#d0353e).
const nunito = Nunito({ subsets: ["latin"], weight: ["800", "900"], variable: "--font-cny-heading" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700", "900"], variable: "--font-cny-body" });

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-black sm:text-2xl [font-family:var(--font-cny-heading)] [color:#d0353e]" data-reveal>
      {children}
    </h2>
  );
}

export default function ChineseNewYearProjectPage() {
  const project = CHINESE_NEW_YEAR;

  return (
    <div
      className={cn(nunito.variable, dmSans.variable, "[font-family:var(--font-cny-body)]")}
      style={
        {
          "--dept-accent": project.accent.base,
          "--dept-tint": project.accent.tint,
          "--dept-ink": project.accent.ink,
        } as React.CSSProperties
      }
    >
      {/* Hero — same reasoning as DeptHero: the banner art already carries
          the project name and thrust, so there's no separate H1 repeating
          it underneath. */}
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
            <p
              className="flex items-center gap-2 text-xl font-black sm:text-2xl [font-family:var(--font-cny-heading)] [color:#d0353e]"
              data-reveal
            >
              <span aria-hidden>✨</span> Dear Applicant,
            </p>
            <RichParagraphs
              paragraphs={project.letter}
              className="flex flex-col gap-4"
              paragraphClassName="prose-body text-dept-ink/80"
            />
            <p className="text-right" data-reveal>
              <mark className="rounded-[2px] bg-red-200/70 px-0.5 font-black text-dept-ink">
                {project.letterSignoff.highlighted}
              </mark>
              <br />
              <span className="prose-body text-dept-ink">{project.letterSignoff.name}</span>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* What is Chinese New Year? + Vision */}
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[1.2fr_1fr] md:items-start md:gap-10">
            <div className="flex flex-col gap-4 text-left">
              <Heading>{project.whatIsIt.heading}</Heading>
              <RichParagraphs
                paragraphs={project.whatIsIt.body}
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

          <Reveal className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-3 text-left">
            <Heading>🎯 Vision</Heading>
            <RichParagraphs
              paragraphs={project.vision}
              className="flex flex-col gap-4"
              paragraphClassName="prose-body text-dept-ink/80"
              data-reveal
            />
          </Reveal>
        </Container>
      </section>

      {/* Why join CNY '27? — testimonials, as the PDF's own designed graphic
          rather than pulled apart into generic cards. */}
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>💬 Why join CNY &lsquo;27?</Heading>
          </Reveal>
          {project.testimonialsImage && (
            <Reveal className="mx-auto mt-10 w-full max-w-3xl overflow-hidden rounded-2xl shadow-[var(--shadow-md)]">
              <Image
                src={asset(project.testimonialsImage.src)}
                alt={project.testimonialsImage.alt}
                width={1600}
                height={900}
                data-reveal
                className="w-full object-cover"
              />
            </Reveal>
          )}
          {!project.testimonialsImage && project.testimonials && (
            <Reveal stagger={70} className="mx-auto mt-10 grid w-full max-w-4xl gap-10 sm:grid-cols-2">
              {project.testimonials.map((t) => (
                <TestimonialCard
                  key={t.name}
                  name={t.name}
                  role={t.role}
                  imageSrc={t.photo ? asset(t.photo) : null}
                  testimonialText={t.quote}
                />
              ))}
            </Reveal>
          )}
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-2xl text-left">
            <Heading>📌 Project Timeline</Heading>
          </Reveal>
          <Reveal className="mx-auto mt-10 w-full max-w-xl">
            <Timeline items={project.timeline} />
          </Reveal>
        </Container>
      </section>

      {/* Core Team Committees */}
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>👥 Core Team Committees</Heading>
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
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl">
            <Heading>❓ FAQs</Heading>
            <div className="mt-6 flex flex-col gap-6">
              {project.faqs.map((faq) => (
                <div key={faq.q} data-reveal>
                  <p className="font-bold text-dept-ink">{faq.q}</p>
                  <div className="mt-1.5 flex gap-2">
                    <span aria-hidden className="text-dept-accent">
                      ⊹
                    </span>
                    <RichParagraphs
                      paragraphs={faq.a}
                      className="flex flex-col gap-2"
                      paragraphClassName="prose-body text-muted-foreground"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Flat white — this is the last section on the page, and its bottom
          padding sits directly above the footer's own white margin gap.
          Letting the tint show through here instead would cut off abruptly
          right where the footer art needs to fade in cleanly. */}
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading>✉️ Reach out to your PMs:</Heading>
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
