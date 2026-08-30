import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";

// Members-only — access is enforced at the edge by the Cloudflare Worker in
// /worker (Google sign-in checked against the member roster in KV), not in
// this app. This page has no auth logic of its own; it's just marked
// noindex and left out of sitemap.ts so it isn't offered to crawlers or
// the public nav.
export const metadata: Metadata = {
  title: "Internal Recruitment",
  robots: { index: false, follow: false },
};

export default function InternalRecruitmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Members only"
        title="Internal Recruitment"
        description="The process for current Celadoneans applying to Deputy and Core Team roles."
      />

      <Container className="py-20">
        <Reveal className="mx-auto max-w-3xl">
          <Card innerClassName="flex flex-col gap-3 p-8">
            <h2 className="display text-2xl text-navy">Details coming soon</h2>
            <p className="prose-body text-muted-foreground">
              This page will walk through the internal application process,
              timeline, and requirements for current members. Content is
              still being put together.
            </p>
          </Card>
        </Reveal>
      </Container>
    </>
  );
}
