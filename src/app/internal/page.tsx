import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommitteeExplorer } from "@/components/committee-explorer";
import { SkyHero } from "@/components/internal/sky-hero";
import { Reveal } from "@/components/motion/reveal";
import { getCoreTeamCommittees } from "@/lib/content";

// Members-only — access is enforced at the edge by the Cloudflare Worker in
// /worker (Google sign-in checked against the member roster in KV), not in
// this app. This page has no auth logic of its own; it's just marked
// noindex and left out of sitemap.ts so it isn't offered to crawlers or
// the public nav.
export const metadata: Metadata = {
  title: "A-yi's Corner",
  robots: { index: false, follow: false },
};

export default function InternalPortalHomePage() {
  const coreTeamCommittees = getCoreTeamCommittees();

  return (
    <>
      <SkyHero
        title="A-yi's Corner"
        heroImage={{ src: "/internal/ayis-corner-cover.webp", alt: "A-yi's Corner" }}
      />

      {/* One continuous ambient wash for the whole page body, same technique
          as the dept-apps hub — sections below are spacing and content only. */}
      <div className="sky-tint-field">
        {/* ---- Deputy / Core Team application cards --------------------- */}
        <section className="py-16 sm:py-20">
          <Container>
            <Reveal stagger={70} className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
              <Link href="/internal/dept-apps" data-reveal>
                <Card className="lift h-full ring-sky-navy/10" innerClassName="flex h-full flex-col gap-3 p-8">
                  <span className="sky-display eyebrow w-fit rounded-full bg-sky-blue px-3 py-1 text-[0.6875rem] text-white">
                    Open now
                  </span>
                  <h2 className="sky-display text-2xl font-semibold text-sky-navy">Deputy Applications</h2>
                  <p className="prose-body text-sm text-muted-foreground">
                    Apply to join a department&rsquo;s year-long deputy pool. Browse every department&rsquo;s
                    roles, timeline, and requirements.
                  </p>
                  <p className="mt-auto pt-3 text-xs font-bold uppercase tracking-wider text-sky-navy">
                    Explore departments →
                  </p>
                </Card>
              </Link>

              <div data-reveal>
                <Card className="h-full ring-sky-navy/10" innerClassName="flex h-full flex-col gap-3 p-8 opacity-70">
                  <Badge tone="closed">Coming soon</Badge>
                  <h2 className="sky-display text-2xl font-semibold text-sky-navy">Core Team Applications</h2>
                  <p className="prose-body text-sm text-muted-foreground">
                    Applications for project Core Team roles aren&rsquo;t open yet.
                  </p>
                  <p className="mt-auto pt-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Stay tuned for the 2nd week of September
                  </p>
                </Card>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* ---- Core Team committees ----------------------------------- */}
        <section className="py-16 sm:py-20">
          <Container>
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="sky-display eyebrow text-sky-navy/70" data-reveal>
                Core Team
              </p>
              <h2 className="sky-display mt-4 text-3xl font-semibold text-sky-navy sm:text-5xl" data-reveal>
                The committees
              </h2>
              <p className="prose-body mt-5 text-lg text-muted-foreground" data-reveal>
                Every project’s Core Team is built from these committees. Open one to see what the work
                actually involves.
              </p>
            </Reveal>
            <Reveal className="mt-10">
              <div data-reveal>
                <CommitteeExplorer committees={coreTeamCommittees} />
              </div>
            </Reveal>
          </Container>
        </section>
      </div>
    </>
  );
}
