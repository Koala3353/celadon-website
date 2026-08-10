import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stat } from "@/components/ui/stat";
import { getOrgStats } from "@/lib/data";
import { formatCompactNumber } from "@/lib/format";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About",
  description: "An overview of Celadon for sponsors and partners.",
};

export default async function AboutPage() {
  const stats = await getOrgStats().catch(() => null);

  return (
    <>
      <section className="bg-brand text-brand-foreground">
        <Container className="flex flex-col gap-6 py-20">
          <SectionHeading
            eyebrow="For Sponsors & Partners"
            title="About Celadon"
            description="Celadon plans and delivers year-round projects that engage the community and create measurable impact — COnstruct is where that work lives in one place."
            tone="brand"
          />
        </Container>
      </section>

      {stats && (
        <section className="py-16">
          <Container className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <Stat label="Projects delivered" value={String(stats.projectCount)} />
            <Stat label="Total impressions" value={formatCompactNumber(stats.totalImpressions)} />
            <Stat label="Participants engaged" value={formatCompactNumber(stats.totalParticipants)} />
            <Stat label="Beneficiaries reached" value={formatCompactNumber(stats.totalBeneficiaries)} />
          </Container>
        </section>
      )}

      <section className="border-t border-border py-16">
        <Container className="flex flex-col gap-6">
          <SectionHeading
            title="Partner with us"
            description="Interested in sponsoring or collaborating with Celadon? Browse our project archive to see the kind of work and impact your partnership would support."
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="w-fit rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              View Project Archive
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
