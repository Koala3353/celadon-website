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

// Applications aren't open to the public yet this cycle. The date cards and
// committee reference that used to live here now live inside the internal
// portal (/internal), alongside the actual application flow — this page is
// just the public-facing "check back soon" notice.
export default function RecruitmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Recruitment"
        title={copy("recruitment_heading")}
        description={copy("recruitment_body")}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-2xl">
            <Card innerClassName="flex flex-col gap-3 p-8 text-center">
              <p className="eyebrow text-accent-ink">Stay tuned</p>
              <h2 className="display text-2xl text-navy">{copy("recruitment_stay_tuned_body")}</h2>
              <p className="prose-body text-muted-foreground">
                Stay posted with our internal Facebook Group to get the latest updates on opening for
                different projects!
              </p>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
