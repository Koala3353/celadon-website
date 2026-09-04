import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SkeletonImage } from "@/components/ui/skeleton-image";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { SkyHero } from "@/components/internal/sky-hero";
import { TimelineFlow } from "@/components/internal/timeline-flow";
import { DepartmentCard } from "@/components/internal/department-card";
import { PhotoCarousel } from "@/components/photo-carousel";
import { TestimonialCard } from "@/components/testimonial-card";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { getDepartments } from "@/lib/content";
import {
  APPLICATION_FORM_URL,
  DEPARTMENTS,
  HUB_FAQS,
  HUB_TESTIMONIALS,
  HUB_TIMELINE,
} from "@/lib/deputy-departments";

export const metadata: Metadata = {
  title: "Deputy Pool Applications",
  robots: { index: false, follow: false },
};

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

export default function DeptAppsHubPage() {
  const deputyCarouselPhotos = getDepartments()
    .map((dept) => dept.photos[0])
    .filter((photo): photo is string => Boolean(photo));

  return (
    <>
      <SkyHero
        title="CelaSkies"
        heroImage={{ src: "/internal/celaskies-hero.webp", alt: "CelaSkies — Deputy Applications, 2026-2027" }}
      />

      {/* One continuous ambient wash for the whole page body — sections
          below are spacing and content only, never a new flat background,
          so nothing reads as a stitched-together band. */}
      <div className="sky-tint-field flex flex-col gap-14 pt-14 sm:gap-20 sm:pt-20">
        <section>
          <Container>
            <Reveal>
              <Card
                className="mx-auto w-full max-w-4xl bg-sky-peach/25 ring-sky-navy/10"
                innerClassName="flex flex-col items-center gap-6 p-8 text-center md:flex-row md:gap-10 md:p-10 md:text-left"
                data-reveal
              >
                <SkeletonImage
                  src={asset("/internal/dept-pandas.gif")}
                  alt="The A-yi mascots of Celadon's departments"
                  width={272}
                  height={384}
                  unoptimized
                  containerClassName="h-auto w-40 shrink-0 sm:w-52"
                  className="h-auto w-40 shrink-0 sm:w-52"
                />
                <div className="flex flex-1 flex-col items-center gap-4 md:items-start">
                  <span className="sky-display eyebrow rounded-full bg-sky-peach/50 px-4 py-1.5 text-sky-navy/80">
                    2026&ndash;2027 applications
                  </span>
                  <p className="sky-display text-xl font-semibold text-sky-navy sm:text-2xl">
                    Get ready for take-off! Celadon Deputy Applications 2627 are officially open!
                    &#9992;&#65039; &#128153;
                  </p>
                  <ButtonLink href={APPLICATION_FORM_URL} external size="lg">
                    Apply Now
                  </ButtonLink>
                </div>
              </Card>
            </Reveal>
          </Container>
        </section>

        <section>
          <Container>
            <Reveal className="mx-auto w-full max-w-5xl">
              <SectionHeading size="lg">Meet the Departments!</SectionHeading>
            </Reveal>
            <Reveal stagger={60} className="mx-auto mt-10 grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {DEPARTMENTS.map((dept) => (
                <DepartmentCard key={dept.slug} dept={dept} />
              ))}
            </Reveal>
          </Container>
        </section>

        <section>
          <Container>
            <Reveal className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16">
              <PhotoCarousel
                photos={deputyCarouselPhotos}
                alt="Celadon departments"
                className="aspect-[4/3] rounded-[1.75rem] shadow-[var(--shadow-md)] md:order-2"
              />
              <div className="flex flex-col items-start gap-4 text-left">
                <SectionHeading>What are Deputies?</SectionHeading>
                <p className="prose-body text-muted-foreground">
                  Deputies take on a year-long role in supporting Celadon as members of its different
                  departments! Becoming a deputy is one of the best ways to kickstart your journey into
                  becoming an active member of the organization, as you develop your skills, step outside
                  of your comfort zone, and build friendships within your department. With each department
                  leading its deputies with specialized roadmaps and responsibilities, please read through
                  each department&rsquo;s sections before applying!
                </p>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Its own section now — the chevron flow was designed to run across
            a full row (see TimelineFlow), so it read as cramped squeezed
            into half of a two-column grid alongside "How to apply". */}
        <section>
          <Container>
            <Reveal className="mx-auto w-full max-w-4xl text-center">
              <SectionHeading>Timeline</SectionHeading>
            </Reveal>
            <Reveal className="mx-auto mt-10 w-full max-w-4xl">
              <TimelineFlow items={HUB_TIMELINE} />
            </Reveal>
          </Container>
        </section>

        {/* Also its own section — six steps plus several inline notes is a
            lot of content to balance against Timeline's three short dates in
            a shared row, and it was getting cramped into half the width. */}
        <section className="bg-sky-teal/20 py-12 sm:py-16">
          <Container>
            <Reveal className="mx-auto w-full max-w-2xl" data-reveal>
              <SectionHeading>How to apply</SectionHeading>
              <ol className="prose-body mt-6 flex flex-col gap-4 text-sky-navy/80">
                <li className="flex gap-2.5">
                  <span className="font-bold text-sky-navy">1.</span>
                  <span>
                    Browse through this <strong className="font-bold">website</strong> and the{" "}
                    <strong className="font-bold">pages for the department/s</strong> you are interested in
                    for information on deputy role/s, such as available positions, responsibilities, and
                    other expectations.
                    <br />
                    <em className="italic text-sky-navy/70">
                      Note: Deputy-level positions are unique to each department.
                    </em>
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-sky-navy">2.</span>
                  <span>
                    Fill out and submit this{" "}
                    <a
                      href={APPLICATION_FORM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-link underline-offset-2 hover:underline"
                    >
                      Google Form
                    </a>{" "}
                    using your <strong className="font-bold">Ateneo Student Account</strong> for your
                    application.
                    <br />
                    <em className="italic text-sky-navy/70">
                      Note: Make sure that you have submitted this{" "}
                      <strong className="font-bold">Membership Survey</strong> before submitting the Deputy
                      Application Form. The survey will close by{" "}
                      <strong className="font-bold">September 12, 11:59 PM</strong>.
                    </em>
                    <br />
                    <em className="italic text-sky-navy/70">
                      Note: You are also allowed to <strong className="font-bold">make edits</strong> to
                      your application until <strong className="font-bold">September 12, 11:59 PM</strong>{" "}
                      only.
                    </em>
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-sky-navy">3.</span>
                  <em className="italic">
                    If instructed, complete the <strong className="font-bold">additional requirements</strong>{" "}
                    for the department/s you are applying to.
                  </em>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-sky-navy">4.</span>
                  <span>
                    <strong className="font-bold">Schedule</strong> your{" "}
                    <strong className="font-bold">interview</strong> in this{" "}
                    <strong className="font-bold">Google Sheet</strong> by following the instructions found
                    in the landing tab.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-sky-navy">5.</span>
                  <span>
                    Wait for a <strong className="font-bold">confirmation message</strong> from your
                    interviewer. Then, <strong className="font-bold">attend your interview.</strong>
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-sky-navy">6.</span>
                  <span>Wait for your application results!</span>
                </li>
              </ol>
              <p className="prose-body mt-4 text-sm text-sky-navy/70">
                Note: COMMPUB has an additional requirement for applicants. Check COMMPUB&rsquo;s page before
                you apply.
              </p>
            </Reveal>
          </Container>
        </section>

        <section>
          <Container>
            <Reveal className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 md:flex-row md:items-center md:gap-10">
              <div className="flex flex-1 flex-col gap-6">
                <h2 className="sky-display text-2xl font-semibold text-sky-navy sm:text-3xl">FAQs</h2>
                <div className="flex flex-col gap-4">
                  {HUB_FAQS.map((faq) => (
                    <div key={faq.q}>
                      <p className="font-bold text-sky-navy">{faq.q}</p>
                      <p className="prose-body mt-1.5 rounded-xl bg-sky-peach/25 p-4 text-sky-navy/80">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <SkeletonImage
                src={asset("/internal/faq-panda.webp")}
                alt=""
                width={340}
                height={447}
                containerClassName="h-auto w-32 shrink-0 sm:w-40 md:w-48"
                className="h-auto w-32 shrink-0 sm:w-40 md:w-48"
              />
            </Reveal>
          </Container>
        </section>

        {/* Flat white, not the ambient wash — this is the last thing on the
            page, and its bottom padding is what sits directly above the
            footer's own margin gap (which is plain white too). Letting the
            wash show through here instead would cut off abruptly at that
            gap, right where the footer art needs to fade in cleanly. */}
        <section className="bg-white pb-14 sm:pb-20">
          <Container>
            <Reveal className="mx-auto w-full max-w-5xl overflow-hidden rounded-[1.75rem] bg-sky-navy shadow-[var(--shadow-lg)]">
              <div className="relative">
                <div className="relative p-8 sm:p-12" data-reveal>
                  <SectionHeading tone="white" size="lg">Testimonials</SectionHeading>
                  <div className="mt-10 grid gap-10 sm:grid-cols-2">
                    {HUB_TESTIMONIALS.map((t) => (
                      <TestimonialCard
                        key={t.name}
                        name={t.name}
                        role={t.role}
                        imageSrc={t.photo ? asset(t.photo) : null}
                        testimonialText={t.quote}
                        tone="dark"
                        headerClassName={t.name === "Claire Chiu" ? "-top-3" : undefined}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </div>
    </>
  );
}
