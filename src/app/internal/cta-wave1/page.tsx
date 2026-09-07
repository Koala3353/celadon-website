import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { SkyHero } from "@/components/internal/sky-hero";
import { TimelineFlow } from "@/components/internal/timeline-flow";
import { ProjectCard } from "@/components/internal/project-card";
import { cn } from "@/lib/cn";
import { CTA_APPLICATION_FORM_URL, CORE_TEAM_PROJECTS, CTA_FAQS, CTA_TIMELINE } from "@/lib/core-team-wave";

export const metadata: Metadata = {
  title: "Core Team Applications",
  robots: { index: false, follow: false },
};

// Same helper as the deputy hub's own page — kept as a local copy rather
// than shared, since the two hubs are independent pages that happen to use
// the same CelaSkies visual system.
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

export default function CoreTeamApplicationsHubPage() {
  return (
    <>
      <SkyHero eyebrow="Wave 1" title="Core Team Applications" plain />

      {/* One continuous ambient wash for the whole page body, same technique
          as the deputy hub — sections below are spacing and content only. */}
      <div className="sky-tint-field flex flex-col gap-14 pt-14 sm:gap-20 sm:pt-20">
        <section>
          <Container>
            <Reveal>
              <Card
                className="mx-auto w-full max-w-4xl bg-sky-peach/25 ring-sky-navy/10"
                innerClassName="flex flex-col items-center gap-6 p-8 text-center"
                data-reveal
              >
                <span className="sky-display eyebrow rounded-full bg-sky-peach/50 px-4 py-1.5 text-sky-navy/80">
                  2026&ndash;2027 applications
                </span>
                <p className="sky-display text-xl font-semibold text-sky-navy sm:text-2xl">
                  Core Team Applications Wave 1 &mdash; join a project&rsquo;s core team!
                </p>
                <ButtonLink href={CTA_APPLICATION_FORM_URL} external size="lg">
                  Apply Now
                </ButtonLink>
              </Card>
            </Reveal>
          </Container>
        </section>

        <section>
          <Container>
            <Reveal className="mx-auto w-full max-w-5xl">
              <SectionHeading size="lg">Meet the Projects!</SectionHeading>
            </Reveal>
            <Reveal stagger={60} className="mx-auto mt-10 grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CORE_TEAM_PROJECTS.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </Reveal>
          </Container>
        </section>

        <section>
          <Container>
            <Reveal className="mx-auto w-full max-w-3xl text-center">
              <SectionHeading>What is a Core Team?</SectionHeading>
              <div className="mt-4 flex flex-col gap-3">
                <p className="prose-body text-muted-foreground">
                  A Core Team in Celadon is the heart of every project, made up of passionate members who
                  bring ideas to life and make things happen.
                </p>
                <p className="prose-body text-muted-foreground">
                  It is made up of committees, each led by a Core Team Head to focus on different parts of
                  the project, all working together under the guidance of the Project Managers.
                </p>
              </div>
            </Reveal>
          </Container>
        </section>

        <section>
          <Container>
            <Reveal className="mx-auto w-full max-w-4xl text-center">
              <SectionHeading>Timeline</SectionHeading>
            </Reveal>
            <Reveal className="mx-auto mt-10 w-full max-w-4xl">
              <TimelineFlow items={CTA_TIMELINE} />
            </Reveal>
          </Container>
        </section>

        <section className="bg-sky-teal/20 py-12 sm:py-16">
          <Container>
            <Reveal className="mx-auto w-full max-w-2xl" data-reveal>
              <SectionHeading>How to apply</SectionHeading>
              <ol className="prose-body mt-6 flex flex-col gap-4 text-sky-navy/80">
                <li className="flex gap-2.5">
                  <span className="font-bold text-sky-navy">1.</span>
                  <span>
                    Browse through the <strong className="font-bold">projects above</strong> and decide
                    which one/s and which <strong className="font-bold">committee/s</strong> you&rsquo;d
                    like to join.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-sky-navy">2.</span>
                  <span>
                    Fill out and submit the{" "}
                    <a
                      href={CTA_APPLICATION_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-link underline-offset-2 hover:underline"
                    >
                      Google Form
                    </a>{" "}
                    using your <strong className="font-bold">Ateneo Student Account</strong>, along with
                    any additional requirements your chosen project/s and committee/s ask for.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-sky-navy">3.</span>
                  <span>
                    <strong className="font-bold">Schedule</strong> your{" "}
                    <strong className="font-bold">interview</strong> once instructions are sent your way.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-sky-navy">4.</span>
                  <span>
                    Wait for a <strong className="font-bold">confirmation message</strong> from your
                    interviewer. Then, <strong className="font-bold">attend your interview.</strong>
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-sky-navy">5.</span>
                  <span>Wait for your application results!</span>
                </li>
              </ol>
            </Reveal>
          </Container>
        </section>

        {/* Flat white, not the ambient wash — this is the last thing on the
            page, and its bottom padding is what sits directly above the
            footer's own margin gap (which is plain white too). Letting the
            wash show through here instead would cut off abruptly at that
            gap, right where the footer art needs to fade in cleanly (same
            fix as the deputy hub). */}
        <section className="bg-white pb-14 pt-8 sm:pb-20 sm:pt-10">
          <Container>
            <Reveal className="mx-auto w-full max-w-3xl">
              <SectionHeading>FAQs</SectionHeading>
              <div className="mt-6 flex flex-col gap-4">
                {CTA_FAQS.map((faq) => (
                  <div key={faq.q}>
                    <p className="font-bold text-sky-navy">{faq.q}</p>
                    <p className="prose-body mt-1.5 rounded-xl bg-sky-peach/25 p-4 text-sky-navy/80">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
      </div>
    </>
  );
}
