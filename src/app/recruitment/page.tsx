import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { copy } from "@/lib/content";

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
  return (
    <>
      <PageHero eyebrow="Recruitment" title={copy("recruitment_heading")} />

      <Container className="py-20">
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
    </>
  );
}
