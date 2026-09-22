import type { Metadata } from "next";
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
        <section className="pb-8 pt-16 sm:pb-10 sm:pt-20">
          <Container>
            <Reveal stagger={70} className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
              {/* Closed, so deliberately not a link — the hub and the
                  department pages behind it are no longer linked from
                  anywhere in the portal. */}
              <div data-reveal>
                <Card className="h-full ring-sky-navy/10" innerClassName="flex h-full flex-col gap-3 p-8 opacity-70">
                  <Badge tone="closed">Closed</Badge>
                  <h2 className="sky-display text-2xl font-semibold text-sky-navy">Deputy Applications</h2>
                  <p className="prose-body text-sm text-muted-foreground">
                    Applications for this year&rsquo;s department deputy pools are now closed. Thank you to
                    everyone who applied!
                  </p>
                </Card>
              </div>

              {/* Closed too, so the same treatment as Deputy Applications
                  above: a plain card rather than a link, with the hub and
                  the four project pages behind it unlinked portal-wide. */}
              <div data-reveal>
                <Card className="h-full ring-sky-navy/10" innerClassName="flex h-full flex-col gap-3 p-8 opacity-70">
                  <Badge tone="closed">Closed</Badge>
                  <h2 className="sky-display text-2xl font-semibold text-sky-navy">Core Team Applications</h2>
                  <p className="prose-body text-sm text-muted-foreground">
                    Wave 1 Core Team Applications are now closed. Thank you to everyone who applied &mdash;
                    watch out for Wave 2!
                  </p>
                </Card>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* ---- Core Team committees ----------------------------------- */}
        {/* Flat white, not the ambient wash — this is the last section on
            the page, and its bottom padding sits directly above the
            footer's own plain-white margin gap. Letting the wash show
            through here instead would cut off abruptly right where the
            footer needs to fade in cleanly (same fix as the dept-apps hub
            and EBCB directory pages). */}
        <section className="bg-white pb-16 pt-8 sm:pb-20 sm:pt-10">
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
