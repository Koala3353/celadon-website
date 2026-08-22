import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExpandableList } from "@/components/expandable-list";
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

  return (
    <>
      <PageHero eyebrow="Recruitment" title={copy("recruitment_heading")} />

      {/* ---- Stay tuned / application dates --------------------------- */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
            <p className="eyebrow text-accent-ink" data-reveal>
              {copy("recruitment_stay_tuned_heading")}
            </p>
            <h2 className="display text-4xl text-navy sm:text-5xl" data-reveal>
              {copy("recruitment_stay_tuned_body")}
            </h2>
          </Reveal>

          <Reveal stagger={70} className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
            <div data-reveal>
              <Card innerClassName="flex h-full flex-col gap-2 p-8 text-center">
                <p className="eyebrow text-accent-ink">Deputy applications</p>
                <p className="display text-3xl text-navy">{copy("recruitment_deputy_date")}</p>
              </Card>
            </div>
            <div data-reveal>
              <Card innerClassName="flex h-full flex-col gap-2 p-8 text-center">
                <p className="eyebrow text-accent-ink">Core Team applications</p>
                <p className="display text-3xl text-navy">{copy("recruitment_core_date")}</p>
              </Card>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---- Glossary --------------------------------------------- */}
      <section className="bg-navy/[0.035] py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow text-accent-ink" data-reveal>
              While you wait
            </p>
            <h2 className="display mt-4 text-3xl text-navy sm:text-4xl" data-reveal>
              Know the roles
            </h2>
          </Reveal>
          <Reveal
            stagger={50}
            className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {glossaryTerms.map((g) => (
              <div key={g.term} data-reveal>
                <Card className="h-full" innerClassName="flex h-full flex-col gap-2 p-6">
                  <p className="text-sm font-extrabold uppercase tracking-wide text-navy">
                    {g.term}
                  </p>
                  <p className="prose-body text-sm text-muted-foreground">{g.definition}</p>
                </Card>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ---- Core Team committees ----------------------------------- */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow text-accent-ink" data-reveal>
              Core Team
            </p>
            <h2 className="display mt-4 text-3xl text-navy sm:text-4xl" data-reveal>
              The committees
            </h2>
            <p className="prose-body mt-4 text-muted-foreground" data-reveal>
              Every project&rsquo;s Core Team is built from these committees. Open one to see
              what the work actually involves.
            </p>
          </Reveal>
          <Reveal
            stagger={40}
            className="mx-auto mt-10 grid max-w-6xl items-start gap-4 lg:grid-cols-2"
          >
            {coreTeamCommittees.map((c) => (
              <details
                key={c.abbr}
                className="group open:col-span-2 rounded-[1.75rem] bg-navy/[0.035] p-1.5 ring-1 ring-inset ring-navy/[0.07]"
                data-reveal
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[1.375rem] bg-white p-6 shadow-[var(--shadow-sm)] [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    <Badge>{c.abbr}</Badge>
                    <span className="text-lg font-extrabold text-navy">{c.name}</span>
                  </span>
                  <span
                    className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                    aria-hidden
                  >
                    &#8964;
                  </span>
                </summary>

                <div className="flex flex-col gap-6 rounded-b-[1.375rem] bg-white px-6 pb-6">
                  {c.description && (
                    <p className="prose-body text-muted-foreground">{c.description}</p>
                  )}
                  <div className="grid gap-6 sm:grid-cols-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-accent-ink">
                        Responsibilities
                      </p>
                      <ExpandableList items={c.responsibilities} cap={c.listCap ?? 4} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-accent-ink">
                        Common deliverables
                      </p>
                      <ExpandableList items={c.deliverables} cap={c.listCap ?? 4} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-accent-ink">
                        Relevant qualities
                      </p>
                      <ExpandableList items={c.qualities} cap={c.listCap ?? 4} />
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </Reveal>
        </Container>
      </section>
    </>
  );
}
