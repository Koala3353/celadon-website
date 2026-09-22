import type { Metadata } from "next";
import { Playfair_Display, Lato, DM_Sans } from "next/font/google";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ClosedBanner } from "@/components/internal/closed-banner";
import { RichParagraphs } from "@/components/internal/rich-text";
import { BackLink } from "@/components/internal/back-link";
import { Timeline } from "@/components/internal/timeline";
import { ListAccordion } from "@/components/internal/list-accordion";
import { PhotoCarousel } from "@/components/photo-carousel";
import { TestimonialCard } from "@/components/testimonial-card";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { ROSE_SALE } from "@/lib/cta-projects";

export const metadata: Metadata = {
  title: "Rose Sale — Core Team Applications",
  robots: { index: false, follow: false },
};

// RS's own doc doesn't use one body font throughout — per a precise
// span-by-span PDF export check, the letter and "What is Rose Sale?"
// section are DM Sans (as is the timeline), while the Vision, Testimonies,
// committees, FAQs, and everything from "Who are we looking for?" onward
// is Lato. Headings stay Playfair Display everywhere. Applied per-section
// below rather than as one page-wide font, to match the doc exactly
// instead of picking one font for "everything else".
const playfairDisplay = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-rs-heading" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-rs-lato" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-rs-dmsans" });

function Heading({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <h2
      className="text-xl font-bold sm:text-2xl [font-family:var(--font-rs-heading)] [color:#3F5F99]"
      style={color ? { color } : undefined}
      data-reveal
    >
      {children}
    </h2>
  );
}

const LOOKING_FOR = [
  "Leaders with a love for the Chinese-Filipino culture who wish to share it with the wider community",
  "Individuals who are passionate and want to enhance their project management skills",
];

const WHAT_TO_EXPECT = [
  "Customizable bouquet bloom bar",
  "Bouquet and packages products display",
  "Advocacy program",
];

const OUR_PROMISES = [
  "You get to showcase your creativity and hard work to a large audience (aka. our dearest customers).",
  "Rose Sale will be a social, hardworking, and healthy working environment that credits and trains you!",
];

export default function RoseSaleProjectPage() {
  const project = ROSE_SALE;

  return (
    <div
      className={cn(playfairDisplay.variable, lato.variable, dmSans.variable)}
      style={
        {
          "--dept-accent": project.accent.base,
          "--dept-tint": project.accent.tint,
          "--dept-ink": project.accent.ink,
        } as React.CSSProperties
      }
    >
      <section className="relative overflow-hidden bg-dept-tint text-dept-ink">
        <ClosedBanner>Wave 1 Core Team Applications are now closed.</ClosedBanner>
        <BackLink href="/internal/cta-wave1" label="All Projects" />

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
            height={865}
            priority
            data-reveal
            className="max-h-[60vh] w-full object-cover"
          />
        </Reveal>
        <Container className="relative flex flex-col items-center gap-5 pb-10 pt-12 text-center sm:pb-14 sm:pt-16">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5">
            <p className="prose-body text-lg text-dept-ink/80 [font-family:var(--font-rs-dmsans)]" data-reveal>
              {project.about}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Letter from the PMs */}
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto grid w-full max-w-4xl gap-8 md:grid-cols-[1fr_1.3fr] md:items-start">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[var(--shadow-md)]" data-reveal>
              <Image src={asset("/internal/cta-wave1/rs-letter.webp")} alt="Members browsing bouquets at a past Rose Sale" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col gap-4 [font-family:var(--font-rs-dmsans)]">
              <p className="text-xl font-extrabold [font-family:var(--font-rs-heading)] [color:#3F5F99]" data-reveal>
                Dear Applicant,
              </p>
              <RichParagraphs
                paragraphs={project.letter}
                className="flex flex-col gap-4"
                paragraphClassName="prose-body text-dept-ink/80"
              />
              <p className="text-right" data-reveal>
                <span className="prose-body text-dept-ink">{project.letterSignoff.highlighted}</span>
                <br />
                <span className="prose-body text-dept-ink">{project.letterSignoff.name}</span>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* What is Rose Sale? + Vision */}
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[1.2fr_1fr] md:items-start md:gap-10">
            <div className="flex flex-col gap-4 text-left [font-family:var(--font-rs-dmsans)]">
              <Heading>{project.whatIsIt.heading}</Heading>
              <p className="prose-body -mt-2 flex items-center gap-1.5 text-sm font-bold [color:#783F1A]" data-reveal>
                <span aria-hidden>📌</span> February 9–13, 2027
              </p>
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

          <Reveal className="mx-auto mt-10 grid w-full max-w-5xl gap-8 md:grid-cols-[1fr_1.2fr] md:items-start md:gap-10">
            <div className="relative hidden aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[var(--shadow-md)] md:block" data-reveal>
              <Image src={asset("/internal/cta-wave1/rs-vision.webp")} alt="Core team members arranging flowers at a past Rose Sale" fill sizes="40vw" className="object-cover" />
            </div>
            <div className="flex flex-col gap-3 text-left [font-family:var(--font-rs-lato)]">
              <Heading>🌷 Vision and Thrust</Heading>
              <RichParagraphs
                paragraphs={project.vision}
                className="flex flex-col gap-4"
                paragraphClassName="prose-body text-dept-ink/80"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Testimonies */}
      {project.testimonials && (
        <section className="bg-white py-8 sm:py-10">
          <Container>
            <Reveal className="mx-auto w-full max-w-3xl text-left">
              <Heading color="#783F1A">💬 Testimonies</Heading>
            </Reveal>
            <Reveal
              stagger={70}
              className="mx-auto mt-10 flex w-full max-w-2xl flex-col gap-10 [font-family:var(--font-rs-lato)]"
            >
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
          </Container>
        </section>
      )}

      {/* Who are we looking for? */}
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto grid w-full max-w-4xl gap-8 md:grid-cols-[1fr_1fr] md:items-center">
            <div className="text-left [font-family:var(--font-rs-lato)]">
              <Heading>🕵️‍♀️ Who are we looking for?</Heading>
              <ul className="mt-4 flex flex-col gap-2">
                {LOOKING_FOR.map((item) => (
                  <li key={item} className="prose-body flex gap-2 text-base text-dept-ink/80" data-reveal>
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-dept-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[var(--shadow-md)]" data-reveal>
              <Image src={asset("/internal/cta-wave1/rs-looking-for.webp")} alt="A Valentine's bouquet of roses and gerberas from a past Rose Sale" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-2xl text-left">
            <Heading color="#783F1A">📌 Project Timeline</Heading>
          </Reveal>
          <Reveal className="mx-auto mt-10 w-full max-w-3xl">
            {/* Scoped to just the timeline — a softer mauve instead of the
                page's own magenta-pink accent for its untagged dots/line/
                date text, without touching that accent anywhere else on
                the page. */}
            <div
              style={{ "--dept-accent": "#C79ABB" } as React.CSSProperties}
              className="[font-family:var(--font-rs-dmsans)]"
            >
              <Timeline items={project.timeline} columns={2} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Core Team Committees */}
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading color="#783F1A">👥 Core Team Committees</Heading>
            <p className="prose-body mt-3 text-muted-foreground" data-reveal>
              Open a committee to see its competencies and deliverables.
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-10 w-full max-w-3xl [font-family:var(--font-rs-lato)]">
            <ListAccordion groups={project.committees} />
          </Reveal>
        </Container>
      </section>

      {/* What We're Bringing this Year! */}
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left [font-family:var(--font-rs-lato)]">
            <Heading color="#783F1A">🎁 What We&rsquo;re Bringing this Year!</Heading>
            <div className="mt-6 overflow-hidden rounded-2xl shadow-[var(--shadow-md)]" data-reveal>
              <Image
                src={asset("/internal/cta-wave1/rs-bringing.webp")}
                alt="The Rose Sale core team at their booth, selling bouquets and flower arrangements"
                width={1696}
                height={1146}
                className="w-full object-cover"
              />
            </div>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="font-bold text-dept-ink" data-reveal>
                  What to expect?
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {WHAT_TO_EXPECT.map((item) => (
                    <li key={item} className="prose-body flex gap-2 text-base text-muted-foreground" data-reveal>
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-dept-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-bold text-dept-ink" data-reveal>
                  Our Promises
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {OUR_PROMISES.map((item) => (
                    <li key={item} className="prose-body flex gap-2 text-base text-muted-foreground" data-reveal>
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-dept-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQs */}
      <section className="bg-dept-tint py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl [font-family:var(--font-rs-lato)]">
            <Heading color="#783F1A">❓ FAQs</Heading>
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
      <section className="bg-white py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto w-full max-w-2xl text-left">
            <Heading>✉️ Contact us!</Heading>
            {/* RS's own doc pairs its two PMs under one shared candid photo
                and caption rather than individual headshots — reproduced
                as-is here instead of the other projects' per-contact photo
                grid. */}
            <div className="mt-6 flex flex-col items-center gap-4 text-center" data-reveal>
              <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-2xl shadow-[var(--shadow-md)]">
                <Image
                  src={asset("/internal/cta-wave1/rs-contact-photo.webp")}
                  alt="Chels and Ailyse sharing drinks at a restaurant"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <p className="prose-body text-muted-foreground [font-family:var(--font-rs-lato)]">
                In Rose Sale, we will always have drinks (Chagee)!
              </p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {project.contacts.map((contact) => (
                <div key={contact.name} className="flex flex-col items-center gap-1 text-center" data-reveal>
                  <p className="font-bold text-dept-ink">{contact.name}</p>
                  <p className="text-sm text-muted-foreground [font-family:var(--font-rs-lato)]">{contact.role}</p>
                  <p className="text-sm [font-family:var(--font-rs-lato)]">
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
