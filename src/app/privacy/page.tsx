import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { copy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Ateneo Celadon's website handles your information.",
  alternates: { canonical: "/privacy/" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-extrabold text-navy">{title}</h2>
      <div className="prose-body flex flex-col gap-3 text-sm text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />

      <Container className="py-16 sm:py-20">
        <Reveal className="mx-auto max-w-3xl">
          <Card innerClassName="flex flex-col gap-8 p-8 sm:p-10">
            <p className="prose-body text-sm text-muted-foreground" data-reveal>
              This page covers the whole ateneoceladon.com website, including the
              internal recruitment portal that current members sign into with
              Google.
            </p>

            <div data-reveal>
              <Section title="The public website">
                <p>
                  Browsing ateneoceladon.com doesn&rsquo;t collect any personal
                  information. There&rsquo;s no analytics, no tracking scripts, and no
                  cookies set for anyone just reading the site.
                </p>
              </Section>
            </div>

            <div data-reveal>
              <Section title="Signing into the internal portal">
                <p>
                  The internal recruitment portal, under /recruitment/internal, is
                  restricted to current Celadon members. Signing in uses Google&rsquo;s
                  own sign-in flow, which shares your Google account&rsquo;s email
                  address with us.
                </p>
                <p>That email is used only to:</p>
                <ul className="flex flex-col gap-1.5">
                  <li className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-ink" />
                    <span>
                      Check it against Celadon&rsquo;s current member list, to confirm
                      you&rsquo;re allowed into the portal.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-ink" />
                    <span>
                      Keep you signed in for 24 hours, via a signed cookie stored in
                      your browser, so you don&rsquo;t have to sign in again on every
                      visit.
                    </span>
                  </li>
                </ul>
                <p>
                  We don&rsquo;t see your Google password, and we don&rsquo;t request access
                  to your Drive, Calendar, or anything else in your account — only
                  your email address.
                </p>
              </Section>
            </div>

            <div data-reveal>
              <Section title="What we store">
                <p>
                  The member list used for that check is a roster of Celadon
                  member emails. We don&rsquo;t retain a log of sign-ins beyond the
                  24-hour session cookie itself.
                </p>
              </Section>
            </div>

            <div data-reveal>
              <Section title="Questions">
                <p>
                  Reach out to{" "}
                  <a
                    href={`mailto:${copy("org_email")}`}
                    className="text-link underline-offset-2 hover:underline"
                  >
                    {copy("org_email")}
                  </a>{" "}
                  with any questions about this policy.
                </p>
              </Section>
            </div>
          </Card>
        </Reveal>
      </Container>
    </>
  );
}
