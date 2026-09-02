import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { SkyHero } from "@/components/internal/sky-hero";
import { TimelineFlow } from "@/components/internal/timeline-flow";
import { DepartmentCard } from "@/components/internal/department-card";
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
        heroImage={{ src: "/internal/celaskies-hero.jpg", alt: "CelaSkies — Deputy Applications, 2026-2027" }}
      />

      <section
        className="py-6 sm:py-8"
        style={{ background: "linear-gradient(180deg, var(--sky-peach) 0%, #ffffff 100%)" }}
      >
        <Container>
          <Reveal className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-12">
            <div className="flex flex-1 flex-col items-center gap-4 text-center">
              <p className="sky-display text-xl font-semibold text-sky-navy sm:text-2xl" data-reveal>
                Get ready for take-off! Celadon Deputy Applications 2627 are officially open! &#9992;&#65039; &#128153;
              </p>
              <div data-reveal>
                <ButtonLink href={APPLICATION_FORM_URL} external size="lg">
                  Apply Now
                </ButtonLink>
              </div>
            </div>
            <Image
              src={asset("/internal/dept-pandas.gif")}
              alt="The A-yi mascots of Celadon's departments"
              width={272}
              height={384}
              unoptimized
              data-reveal
              className="h-auto w-48 shrink-0 sm:w-64"
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-sky-navy py-10 sm:py-14">
        <Container>
          <Reveal className="w-full max-w-2xl">
            <SectionHeading tone="white" size="lg">Meet the Departments!</SectionHeading>
          </Reveal>
        </Container>
      </section>

      <section
        className="py-10 sm:py-14"
        style={{ background: "linear-gradient(180deg, #aed6e7 0%, #ffeff4 50%, rgba(255, 255, 255, 0) 100%)" }}
      >
        <Container>
          <Reveal stagger={60} className="mx-auto grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((dept) => (
              <DepartmentCard key={dept.slug} dept={dept} />
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="bg-sky-teal/25 py-8 sm:py-10">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 sm:flex-row sm:items-start">
            <div
              className="flex aspect-[3/2] w-full max-w-sm flex-1 items-center justify-center rounded-2xl border-2 border-dashed border-sky-navy/20 bg-white/40"
              data-reveal
            >
              <span className="text-sm font-bold uppercase tracking-wider text-sky-navy/40">Carousel</span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-4 text-center sm:items-start sm:text-left">
              <SectionHeading>What&rsquo;s a deputy?</SectionHeading>
              <p className="prose-body text-muted-foreground" data-reveal>
                A department deputy role is a year-long journey with your department family &mdash; you&rsquo;ll
                train together, build close bonds, and get deployed to support or lead multiple projects
                throughout the year. Every department runs its own pool with its own roadmap and
                responsibilities, so take a look before you apply.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl">
            <SectionHeading>Timeline</SectionHeading>
            <div className="mt-10" data-reveal>
              <TimelineFlow items={HUB_TIMELINE} />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-sky-teal/25 py-10 sm:py-14">
        <Container>
          <Reveal className="mx-auto w-full max-w-2xl">
            <SectionHeading>How to apply</SectionHeading>
            <ol className="prose-body mt-6 flex flex-col gap-2.5 text-sky-navy/80" data-reveal>
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
            <p className="prose-body mt-4 text-sm text-sky-navy/70" data-reveal>
              Some departments have their own additional requirements &mdash; check the department&rsquo;s own
              page for details before you apply.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 sm:flex-row sm:items-center">
            <div className="flex flex-1 flex-col gap-6">
              <h2 className="sky-display flex items-center gap-2 text-2xl font-semibold text-sky-navy sm:text-3xl" data-reveal>
                <span aria-hidden>&#10067;</span> FAQs
              </h2>
              <div className="flex flex-col gap-4">
                {HUB_FAQS.map((faq) => (
                  <div key={faq.q} data-reveal>
                    <p className="font-bold text-sky-navy">{faq.q}</p>
                    <p className="prose-body mt-1.5 rounded-xl bg-muted p-4 text-sky-navy/80">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
            <Image
              src={asset("/internal/faq-panda.png")}
              alt=""
              width={340}
              height={447}
              data-reveal
              className="h-auto w-40 shrink-0 sm:w-48"
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-sky-navy py-10 sm:py-14">
        <Container>
          <Reveal className="mx-auto w-full max-w-5xl">
            <SectionHeading tone="white">Testimonials</SectionHeading>
            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              {HUB_TESTIMONIALS.map((t) => (
                <div key={t.name} className="flex gap-5" data-reveal>
                  {t.photo ? (
                    <Image
                      src={asset(t.photo)}
                      alt={t.name}
                      width={112}
                      height={112}
                      className="h-24 w-24 shrink-0 rounded-full object-cover sm:h-28 sm:w-28"
                    />
                  ) : (
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white/15 sm:h-28 sm:w-28">
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
          </Reveal>
        </Container>
      </section>
    </>
  );
}
