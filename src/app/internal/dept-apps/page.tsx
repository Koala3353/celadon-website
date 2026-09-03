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
      <div className="sky-tint-field flex flex-col gap-14 py-14 sm:gap-20 sm:py-20">
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
                <SectionHeading>What&rsquo;s a deputy?</SectionHeading>
                <p className="prose-body text-muted-foreground">
                  A department deputy role is a year-long journey with your department family &mdash;
                  you&rsquo;ll train together, build close bonds, and get deployed to support or lead
                  multiple projects throughout the year. Every department runs its own pool with its own
                  roadmap and responsibilities, so take a look before you apply.
                </p>
              </div>
            </Reveal>
          </Container>
        </section>

        <section>
          <Container>
            <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-2 lg:items-start">
              <Reveal>
                <Card innerClassName="p-6 sm:p-8" data-reveal>
                  <SectionHeading>Timeline</SectionHeading>
                  <div className="mt-6">
                    <TimelineFlow items={HUB_TIMELINE} />
                  </div>
                </Card>
              </Reveal>

              <Reveal>
                <Card className="bg-sky-teal/20" innerClassName="p-8 sm:p-10" data-reveal>
                  <SectionHeading>How to apply</SectionHeading>
                  <ol className="prose-body mt-6 flex flex-col gap-2.5 text-sky-navy/80">
                    <li className="flex gap-2.5">
                      <span className="font-bold text-sky-navy">1.</span>
                      <span>Fill out and submit the Application Google Form.</span>
                    </li>
                    <li className="flex gap-2.5">
                      <span className="font-bold text-sky-navy">2.</span>
                      <span>Schedule and attend your interview.</span>
                    </li>
                    <li className="flex gap-2.5">
                      <span className="font-bold text-sky-navy">3.</span>
                      <span>Wait for your application results!</span>
                    </li>
                  </ol>
                  <p className="prose-body mt-4 text-sm text-sky-navy/70">
                    Note: COMMPUB has an additional requirement for applicants. Check COMMPUB&rsquo;s page
                    before you apply.
                  </p>
                </Card>
              </Reveal>
            </div>
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

        <section>
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
