import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SkeletonImage } from "@/components/ui/skeleton-image";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { SkyHero } from "@/components/internal/sky-hero";
import { TimelineFlow } from "@/components/internal/timeline-flow";
import { DepartmentCard } from "@/components/internal/department-card";
import { PaperCrane } from "@/components/internal/sky-motifs";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import {
  APPLICATION_FORM_URL,
  DEPARTMENTS,
  HUB_FAQS,
  HUB_TESTIMONIALS,
  HUB_TIMELINE,
} from "@/lib/deputy-departments";

export const metadata: Metadata = {
  title: "Deputy Pool Applications",
  robots: { index: false, follow: false },
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function SectionHeading({
  children,
  tone = "navy",
  size = "md",
}: {
  children: React.ReactNode;
  tone?: "navy" | "white";
  size?: "md" | "lg";
}) {
  return (
    <h2
      className={cn(
        "sky-display font-semibold",
        size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl",
        tone === "white" ? "text-white" : "text-sky-navy"
      )}
      data-reveal
    >
      {children}
    </h2>
  );
}

export default function DeptAppsHubPage() {
  return (
    <>
      <SkyHero
        title="CelaSkies"
        heroImage={{ src: "/internal/celaskies-hero.webp", alt: "CelaSkies — Deputy Applications, 2026-2027" }}
      />

      {/* One continuous ambient wash for the whole page body — sections
          below are spacing and content only, never a new flat background,
          so nothing reads as a stitched-together band. */}
      <div className="sky-tint-field">
        <section className="py-14 sm:py-20">
          <Container>
            <Reveal>
              <Card
                className="mx-auto w-full max-w-4xl bg-sky-peach/25 ring-sky-navy/10"
                innerClassName="flex flex-col items-center gap-6 p-8 text-center md:flex-row md:gap-10 md:p-10 md:text-left"
                data-reveal
              >
                <SkeletonImage
                  src={asset("/internal/dept-pandas.gif")}
                  alt="The A-yi mascots of Celadon's departments"
                  width={272}
                  height={384}
                  unoptimized
                  containerClassName="h-auto w-40 shrink-0 sm:w-52"
                  className="h-auto w-40 shrink-0 sm:w-52"
                />
                <div className="flex flex-1 flex-col items-center gap-4 md:items-start">
                  <span className="sky-display eyebrow rounded-full bg-sky-peach/50 px-4 py-1.5 text-sky-navy/80">
                    2026&ndash;2027 applications
                  </span>
                  <p className="sky-display text-xl font-semibold text-sky-navy sm:text-2xl">
                    Get ready for take-off! Celadon Deputy Applications 2627 are officially open!
                    &#9992;&#65039; &#128153;
                  </p>
                  <ButtonLink href={APPLICATION_FORM_URL} external size="lg">
                    Apply Now
                  </ButtonLink>
                </div>
              </Card>
            </Reveal>
          </Container>
        </section>

        <section className="py-8 sm:py-10">
          <Container>
            <Reveal className="mx-auto w-full max-w-5xl">
              <SectionHeading size="lg">Meet the Departments!</SectionHeading>
            </Reveal>
            <Reveal stagger={60} className="mx-auto mt-10 grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {DEPARTMENTS.map((dept) => (
                <DepartmentCard key={dept.slug} dept={dept} />
              ))}
            </Reveal>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <Reveal>
              <Card
                className="mx-auto w-full max-w-3xl"
                innerClassName="flex flex-col items-center gap-5 p-8 text-center sm:p-10"
                data-reveal
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-sky-blue/15">
                  <PaperCrane className="h-11 w-auto text-sky-navy/70" />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <SectionHeading>What&rsquo;s a deputy?</SectionHeading>
                  <p className="prose-body max-w-xl text-muted-foreground">
                    A department deputy role is a year-long journey with your department family &mdash;
                    you&rsquo;ll train together, build close bonds, and get deployed to support or lead
                    multiple projects throughout the year. Every department runs its own pool with its own
                    roadmap and responsibilities, so take a look before you apply.
                  </p>
                </div>
              </Card>
            </Reveal>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <Reveal className="mx-auto w-full max-w-3xl">
              <SectionHeading>Timeline</SectionHeading>
            </Reveal>
            <Reveal className="mx-auto mt-10 w-full max-w-3xl">
              <Card innerClassName="p-6 sm:p-8" data-reveal>
                <TimelineFlow items={HUB_TIMELINE} />
              </Card>
            </Reveal>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <Reveal>
              <Card
                className="mx-auto w-full max-w-2xl bg-sky-teal/20"
                innerClassName="p-8 sm:p-10"
                data-reveal
              >
                <SectionHeading>How to apply</SectionHeading>
                <ol className="prose-body mt-6 flex flex-col gap-2.5 text-sky-navy/80">
                  <li className="flex gap-2.5">
                    <span className="font-bold text-sky-navy">1.</span>
                    <span>Fill out and submit the Application Google Form.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="font-bold text-sky-navy">2.</span>
                    <span>Schedule and attend your interview.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="font-bold text-sky-navy">3.</span>
                    <span>Wait for your application results!</span>
                  </li>
                </ol>
                <p className="prose-body mt-4 text-sm text-sky-navy/70">
                  Some departments have their own additional requirements &mdash; check the department&rsquo;s
                  own page for details before you apply.
                </p>
              </Card>
            </Reveal>
          </Container>
        </section>

        <section className="py-14 sm:py-20">
          <Container>
            <Reveal>
              <Card
                className="mx-auto w-full max-w-5xl"
                innerClassName="flex flex-col items-center gap-8 p-8 md:flex-row md:items-center md:gap-10 md:p-12"
                data-reveal
              >
                <div className="flex flex-1 flex-col gap-6">
                  <h2
                    className="sky-display flex items-center justify-center gap-2 text-2xl font-semibold text-sky-navy sm:text-3xl md:justify-start"
                  >
                    <span aria-hidden>&#10067;</span> FAQs
                  </h2>
                  <div className="flex flex-col gap-4">
                    {HUB_FAQS.map((faq) => (
                      <div key={faq.q}>
                        <p className="font-bold text-sky-navy">{faq.q}</p>
                        <p className="prose-body mt-1.5 rounded-xl bg-sky-tint p-4 text-sky-navy/80">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <SkeletonImage
                  src={asset("/internal/faq-panda.webp")}
                  alt=""
                  width={340}
                  height={447}
                  containerClassName="h-auto w-32 shrink-0 sm:w-40 md:w-48"
                  className="h-auto w-32 shrink-0 sm:w-40 md:w-48"
                />
              </Card>
            </Reveal>
          </Container>
        </section>

        <section className="pb-14 pt-4 sm:pb-20">
          <Container>
            <Reveal className="mx-auto w-full max-w-5xl overflow-hidden rounded-[1.75rem] bg-sky-navy shadow-[var(--shadow-lg)]">
              <div className="navy-grid relative">
                <div className="relative p-8 sm:p-12" data-reveal>
                  <SectionHeading tone="white" size="lg">Testimonials</SectionHeading>
                  <div className="mt-8 grid gap-10 sm:grid-cols-2">
                    {HUB_TESTIMONIALS.map((t) => (
                      <div key={t.name} className="flex gap-5">
                        {t.photo ? (
                          <SkeletonImage
                            src={asset(t.photo)}
                            alt={t.name}
                            width={112}
                            height={112}
                            containerClassName="h-24 w-24 shrink-0 rounded-full ring-2 ring-white/20 sm:h-28 sm:w-28"
                            className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
                          />
                        ) : (
                          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/20 sm:h-28 sm:w-28">
                            <span className="text-xl font-semibold text-white/80">{initials(t.name)}</span>
                          </div>
                        )}
                        <div>
                          <p className="text-lg font-bold text-white">{t.name}</p>
                          {t.role.split(", ").map((line) => (
                            <p key={line} className="text-sm text-white/70">
                              {line}
                            </p>
                          ))}
                          <p className="prose-body mt-2 text-sm italic text-white/90">&ldquo;{t.quote}&rdquo;</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </div>
    </>
  );
}
