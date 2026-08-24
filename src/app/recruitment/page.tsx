import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { CommitteeExplorer } from "@/components/committee-explorer";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { copy, getCoreTeamCommittees, getGlossaryTerms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Recruitment",
  description:
    "Join Ateneo Celadon's departments and projects. Applications open soon — here's when to check back and what to expect.",
  alternates: { canonical: "/recruitment/" },
};

// Applications aren't open yet this cycle — the real role listing (grouped
// by Core Team committee and department pool) lives in git history; swap
// this placeholder back out once applications open.
export default function RecruitmentPage() {
  const glossaryTerms = getGlossaryTerms();
  const coreTeamCommittees = getCoreTeamCommittees();
  const deputyTerm = glossaryTerms.find((g) => g.term === "Deputy");
  const coreTeamTerm = glossaryTerms.find((g) => g.term === "Core Team");

  return (
    <>
      <PageHero
        eyebrow="Recruitment"
        title={copy("recruitment_heading")}
        description={copy("recruitment_body")}
      />

      {/* ---- Stay tuned / application dates --------------------------- */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={copy("recruitment_stay_tuned_heading")}
              title={copy("recruitment_stay_tuned_body")}
            />
          </Reveal>

          <Reveal stagger={70} className="mt-10 grid items-start gap-6 sm:grid-cols-2">
            <details className="group" data-reveal>
              <summary className="list-none [&::-webkit-details-marker]:hidden">
                <Card className="cursor-pointer" innerClassName="flex flex-col gap-2 p-8">
                  <p className="eyebrow text-accent-ink">Deputy applications</p>
                  <p className="display text-3xl text-navy">
                    {copy("recruitment_deputy_date")}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-link">
                    What&rsquo;s a deputy?
                    <span
                      className="inline-block transition-transform duration-200 group-open:rotate-180"
                      aria-hidden
                    >
                      &#8964;
                    </span>
                  </span>
                </Card>
              </summary>
              {deputyTerm && (
                <p className="prose-body mt-4 px-2 text-sm text-muted-foreground">
                  {deputyTerm.definition}
                </p>
              )}
            </details>
            <details className="group" data-reveal>
              <summary className="list-none [&::-webkit-details-marker]:hidden">
                <Card className="cursor-pointer" innerClassName="flex flex-col gap-2 p-8">
                  <p className="eyebrow text-accent-ink">Core Team applications</p>
                  <p className="display text-3xl text-navy">{copy("recruitment_core_date")}</p>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-link">
                    What&rsquo;s Core Team?
                    <span
                      className="inline-block transition-transform duration-200 group-open:rotate-180"
                      aria-hidden
                    >
                      &#8964;
                    </span>
                  </span>
                </Card>
              </summary>
              {coreTeamTerm && (
                <p className="prose-body mt-4 px-2 text-sm text-muted-foreground">
                  {coreTeamTerm.definition}
                </p>
              )}
            </details>
          </Reveal>
        </Container>
      </section>

      {/* ---- Core Team committees ----------------------------------- */}
      <section className="bg-navy/[0.035] py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Core Team"
              title="The committees"
              description="Every project’s Core Team is built from these committees. Open one to see what the work actually involves."
            />
          </Reveal>
          <Reveal className="mt-10">
            <div data-reveal>
              <CommitteeExplorer committees={coreTeamCommittees} />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
