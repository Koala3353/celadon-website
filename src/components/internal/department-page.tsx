import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { PhotoCarousel } from "@/components/photo-carousel";
import { SkeletonImage } from "@/components/ui/skeleton-image";
import { DeptHero } from "@/components/internal/dept-hero";
import { RoleAccordion } from "@/components/internal/role-accordion";
import { ListAccordion } from "@/components/internal/list-accordion";
import { AboutRunText, LabeledItemText, RichParagraphs } from "@/components/internal/rich-text";
import { Timeline } from "@/components/internal/timeline";
import { TestimonialCard } from "@/components/testimonial-card";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { APPLICATION_FORM_URL, APPLICATION_STEPS, type Department } from "@/lib/deputy-departments";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Heading({ children, normalCase }: { children: React.ReactNode; normalCase?: boolean }) {
  return (
    <h2
      className="display text-2xl text-dept-ink sm:text-3xl"
      style={normalCase ? { textTransform: "none" } : undefined}
      data-reveal
    >
      {children}
    </h2>
  );
}

/**
 * Shared layout for every /internal/dept-apps/[slug] page. Colored by the
 * department's own accent (set as CSS variables here, once, so every child
 * component can just use bg-dept-accent/text-dept-ink/etc.) — deliberately
 * not the CelaSkies theme, which is reserved for the hub page.
 */
/** A section is short enough to sit side-by-side with a sibling instead of
 * taking the full width alone: a single, unlabeled, short bullet list. */
function isShortSection(section: Department["sections"][number]): boolean {
  return (
    section.groups.length === 1 &&
    !section.groups[0].label &&
    section.groups[0].items.length <= 4 &&
    !section.image &&
    !section.images &&
    !section.richText
  );
}

export function DepartmentPage({ dept }: { dept: Department }) {
  // The last two sections of a department's list (e.g. "Who are we looking
  // for?" + "What can you expect?") are often a short, complementary pair —
  // pairing them side by side instead of stacking two more full-width blocks
  // is what keeps departments with several sections from reading as one
  // long unbroken column. Only pair when both genuinely are short; otherwise
  // fall back to the plain stacked layout so nothing looks lopsided.
  const canPairTail =
    dept.sections.length >= 2 &&
    isShortSection(dept.sections[dept.sections.length - 2]) &&
    isShortSection(dept.sections[dept.sections.length - 1]);
  const soloSections = canPairTail ? dept.sections.slice(0, -2) : dept.sections;
  const tailPair = canPairTail ? dept.sections.slice(-2) : [];

  // Timeline pairs naturally with whichever compact companion content a
  // department also has (Committees for FIN, Projects for EXREL) — both are
  // already-visited data, so its overall length varies without hurting the
  // pairing.
  const timelinePartner = dept.timeline ? (dept.committees ? "committees" : dept.projects ? "projects" : null) : null;

  const hasIntro =
    dept.photos.length > 0 || !!dept.visionThrust || !!(dept.roles && dept.roles.length > 0) || !!dept.whatToExpect;
  const hasSections = soloSections.length > 0 || canPairTail;
  const hasTimelineGroup = !!dept.timeline || !!dept.committees || !!dept.projects;
  const hasTestimonials = dept.testimonials.length > 0;
  const hasFaqs = dept.faqs.length > 0;

  // Bands alternate white/dept-tint in render order, but only counting bands
  // that actually render for this department — a department missing a
  // section (e.g. no testimonials) still gets a clean alternation instead of
  // a color repeated back-to-back where the skipped band would have been.
  let bandIndex = 0;
  const nextBand = () => (bandIndex++ % 2 === 0 ? "bg-white" : "bg-dept-tint");

  return (
    <div
      style={
        {
          "--dept-accent": dept.accent.base,
          "--dept-tint": dept.accent.tint,
          "--dept-ink": dept.accent.ink,
        } as React.CSSProperties
      }
    >
      <DeptHero dept={dept} />

      {hasIntro && (
        <section className={cn("relative overflow-x-hidden py-8 sm:py-10", nextBand())}>
          <Image
            src={asset("/internal/motif-crane-real.webp")}
            alt=""
            width={262}
            height={203}
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 hidden h-48 w-auto rotate-12 object-contain opacity-20 sm:block lg:h-64"
          />
          <Container className="relative flex flex-col gap-10 sm:gap-14">
          {dept.photos.length > 0 && dept.visionThrust ? (
            <Reveal className="mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-2 md:items-start">
              <PhotoCarousel
                photos={dept.photos.map((src) => asset(src))}
                alt={`${dept.name} deputy pool`}
                data-reveal
                className="aspect-[4/3] w-full rounded-2xl"
              />
              <div data-reveal>
                <Heading>Vision and Thrust</Heading>
                <p className="prose-body mt-4 text-muted-foreground">{dept.visionThrust}</p>
              </div>
            </Reveal>
          ) : (
            <>
              {dept.photos.length > 0 && (
                <Reveal className="mx-auto w-full max-w-3xl">
                  <Heading>Photos</Heading>
                  <PhotoCarousel
                    photos={dept.photos.map((src) => asset(src))}
                    alt={`${dept.name} deputy pool`}
                    data-reveal
                    className="mt-6 aspect-[16/9] w-full rounded-2xl"
                  />
                </Reveal>
              )}

              {dept.visionThrust && (
                <Reveal className="mx-auto w-full max-w-3xl">
                  <Heading>Vision and Thrust</Heading>
                  <p className="prose-body mt-4 text-muted-foreground" data-reveal>
                    {dept.visionThrust}
                  </p>
                </Reveal>
              )}
            </>
          )}

          {dept.roles && dept.roles.length > 0 && (
            <Reveal className="mx-auto w-full max-w-3xl">
              <Heading>Available Positions</Heading>
              <div className="mt-6" data-reveal>
                <RoleAccordion roles={dept.roles} />
              </div>
            </Reveal>
          )}

          {dept.whatToExpect && (
            <Reveal className="mx-auto w-full max-w-3xl">
              <Heading>What can you expect?</Heading>
              <p className="prose-body mt-4 text-muted-foreground" data-reveal>
                {dept.whatToExpect}
              </p>
            </Reveal>
          )}
          </Container>
        </section>
      )}

      {hasSections && (
        <section className={cn("py-8 sm:py-10", nextBand())}>
          <Container className="flex flex-col gap-10 sm:gap-14">
          {soloSections.map((section) => {
            const hasMedia = Boolean(section.image || section.images);
            const media = section.images ? (
              <PhotoCarousel
                photos={section.images.map((img) => ({ src: asset(img.src), fit: img.fit }))}
                alt={section.heading}
                className="aspect-[4/3] w-full rounded-2xl"
                imageClassName="rounded-2xl"
              />
            ) : (
              section.image && (
                <SkeletonImage
                  src={asset(section.image.src)}
                  alt={section.image.alt}
                  width={1600}
                  height={400}
                  reveal
                  containerClassName="w-full rounded-2xl"
                  className="w-full rounded-2xl"
                />
              )
            );
            const stacked = hasMedia && section.layout === "stacked";
            const groupsList = section.groupsAsCards ? (
              <div className={cn("grid gap-4", section.groups.length > 1 && "sm:grid-cols-2")}>
                {section.groups.map((group, i) => (
                  <div key={group.label ?? i} className="rounded-2xl bg-dept-tint p-5">
                    {group.label && (
                      <p className="mb-2 text-sm font-bold uppercase tracking-wider text-dept-ink/70">
                        {group.label}
                      </p>
                    )}
                    <ul className="flex flex-col gap-2.5">
                      {group.items.map((item, j) => (
                        <li key={j} className="prose-body flex gap-2.5 text-muted-foreground">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-dept-accent" />
                          <span>{section.colorLabels ? <LabeledItemText text={item} /> : item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {section.groups.map((group, i) => (
                  <div key={group.label ?? i}>
                    {group.label && (
                      <p className="mb-2 text-sm font-bold uppercase tracking-wider text-dept-ink/70">
                        {group.label}
                      </p>
                    )}
                    <ul
                      className={cn(
                        "flex flex-col gap-2.5",
                        stacked && !group.label && "sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2.5"
                      )}
                    >
                      {group.items.map((item, j) => (
                        <li key={j} className="prose-body flex gap-2.5 text-muted-foreground">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-dept-accent" />
                          <span>{section.colorLabels ? <LabeledItemText text={item} /> : item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
            const textBlock = (
              <div className="flex flex-col gap-4">
                <Heading normalCase={section.normalCaseHeading}>{section.heading}</Heading>
                {section.richText ? (
                  <RichParagraphs
                    paragraphs={section.richText}
                    className="flex flex-col gap-4"
                    paragraphClassName="prose-body text-muted-foreground"
                  />
                ) : (
                  groupsList
                )}
              </div>
            );

            return (
              <Reveal
                key={section.heading}
                className={cn("mx-auto w-full", hasMedia || section.groupsAsCards ? "max-w-5xl" : "max-w-3xl")}
              >
                {stacked ? (
                  <div className="flex flex-col gap-8">
                    <Heading normalCase={section.normalCaseHeading}>{section.heading}</Heading>
                    {media}
                    {groupsList}
                  </div>
                ) : hasMedia ? (
                  <div className="grid gap-8 md:grid-cols-2 md:items-center">
                    {section.imagePosition === "left" ? (
                      <>
                        {media}
                        {textBlock}
                      </>
                    ) : (
                      <>
                        {textBlock}
                        {media}
                      </>
                    )}
                  </div>
                ) : (
                  textBlock
                )}
              </Reveal>
            );
          })}

          {canPairTail && (
            <Reveal className="mx-auto grid w-full max-w-5xl gap-10 sm:grid-cols-2">
              {tailPair.map((section) => (
                <div key={section.heading} data-reveal>
                  <Heading normalCase={section.normalCaseHeading}>{section.heading}</Heading>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {section.groups[0].items.map((item, j) => (
                      <li key={j} className="prose-body flex gap-2.5 text-muted-foreground">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-dept-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          )}
          </Container>
        </section>
      )}

      {dept.techShowcase && (
        <section className={cn("py-8 sm:py-10", nextBand())}>
          <Container>
            <Reveal className="mx-auto w-full max-w-4xl">
              <div
                className="rounded-[1.75rem] bg-white p-8 shadow-[var(--shadow-md)] ring-1 ring-inset ring-dept-accent/15 sm:p-10"
                data-reveal
              >
                <h2 className="display text-2xl text-dept-ink sm:text-3xl">{dept.techShowcase.heading}</h2>
                <p className="prose-body mt-4 text-muted-foreground">{dept.techShowcase.blurb}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {dept.techShowcase.items.map((item) => {
                    const body = (
                      <>
                        <p className="font-extrabold text-dept-ink">{item.name}</p>
                        <p className="prose-body mt-1.5 text-sm text-muted-foreground">{item.description}</p>
                        {item.href && (
                          <span className="mt-3 inline-block text-xs font-bold uppercase tracking-wider text-dept-accent">
                            Visit &#8599;
                          </span>
                        )}
                      </>
                    );
                    return item.href ? (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pressable rounded-2xl bg-dept-tint p-5 transition-colors hover:bg-dept-accent/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dept-accent"
                      >
                        {body}
                      </a>
                    ) : (
                      <div key={item.name} className="rounded-2xl bg-dept-tint p-5">
                        {body}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {hasTimelineGroup && (
        <section className={cn("py-8 sm:py-10", nextBand())}>
          <Container>
          {dept.timeline && timelinePartner && (
            <Reveal className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-2 lg:items-start">
              <div data-reveal>
                <Heading>Timeline</Heading>
                <div className="mt-6">
                  <Timeline items={dept.timeline} />
                </div>
              </div>
              {timelinePartner === "committees" && dept.committees && (
                <div data-reveal>
                  <Heading>{dept.committeesHeading ?? "Committees"}</Heading>
                  {dept.committeesIntro && (
                    <p className="prose-body mt-4 text-muted-foreground">
                      {dept.committeesIntro.map((run, i) => (
                        <AboutRunText key={i} run={run} />
                      ))}
                    </p>
                  )}
                  <div className="mt-6">
                    <ListAccordion groups={dept.committees} />
                  </div>
                  {dept.committeesNote && (
                    <RichParagraphs
                      paragraphs={dept.committeesNote}
                      className="mt-4 flex flex-col gap-2"
                      paragraphClassName="prose-body text-sm text-muted-foreground"
                    />
                  )}
                </div>
              )}
              {timelinePartner === "projects" && dept.projects && (
                <div data-reveal>
                  <Heading>Projects &amp; Initiatives</Heading>
                  <div className="mt-6 flex flex-col gap-4">
                    {dept.projects.map((p) => (
                      <div key={p.name} className="rounded-2xl bg-white p-5 shadow-[var(--shadow-sm)]">
                        <p className="font-extrabold text-dept-ink">{p.name}</p>
                        <p className="prose-body mt-1.5 text-sm text-muted-foreground">{p.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Reveal>
          )}

          {!timelinePartner && dept.committees && (
            <Reveal className="mx-auto w-full max-w-3xl">
              <Heading>{dept.committeesHeading ?? "Committees"}</Heading>
              {dept.committeesIntro && (
                <p className="prose-body mt-4 text-muted-foreground" data-reveal>
                  {dept.committeesIntro.map((run, i) => (
                    <AboutRunText key={i} run={run} />
                  ))}
                </p>
              )}
              <div className="mt-6">
                <ListAccordion groups={dept.committees} />
              </div>
              {dept.committeesNote && (
                <RichParagraphs
                  paragraphs={dept.committeesNote}
                  className="mt-4 flex flex-col gap-2"
                  paragraphClassName="prose-body text-sm text-muted-foreground"
                  data-reveal
                />
              )}
            </Reveal>
          )}

          {!timelinePartner && dept.timeline && (
            <Reveal className="mx-auto w-full max-w-3xl">
              <Heading>Timeline</Heading>
              <div className="mt-6" data-reveal>
                <Timeline items={dept.timeline} />
              </div>
            </Reveal>
          )}

          {!timelinePartner && dept.projects && (
            <Reveal className="mx-auto w-full max-w-3xl">
              <Heading>Projects & Initiatives</Heading>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {dept.projects.map((p) => (
                  <div key={p.name} className="rounded-2xl bg-white p-5 shadow-[var(--shadow-sm)]" data-reveal>
                    <p className="font-extrabold text-dept-ink">{p.name}</p>
                    <p className="prose-body mt-1.5 text-sm text-muted-foreground">{p.description}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
          </Container>
        </section>
      )}

      {dept.showApplicationInstructions && (
        <section className={cn("py-8 sm:py-10", nextBand())}>
          <Container>
            <Reveal className="mx-auto w-full max-w-3xl">
              <Heading>Application Instructions</Heading>
              <ol className="prose-body mt-6 flex flex-col gap-2.5 text-muted-foreground" data-reveal>
                {APPLICATION_STEPS.map((step, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="font-bold text-dept-ink">{i + 1}.</span>
                    <span>
                      {i === 0 ? (
                        <>
                          Fill out and submit the{" "}
                          <a
                            href={APPLICATION_FORM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-link underline-offset-2 hover:underline"
                          >
                            Application Google Form
                          </a>
                          .
                          {dept.applicationNote?.href && (
                            <>
                              {" "}
                              Submit the{" "}
                              <a
                                href={dept.applicationNote.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-link underline-offset-2 hover:underline"
                              >
                                additional requirements
                              </a>{" "}
                              for the corresponding pool you are applying to.
                            </>
                          )}
                        </>
                      ) : (
                        step
                      )}
                    </span>
                  </li>
                ))}
              </ol>
              {dept.applicationNote && (
                <p className="prose-body mt-4 text-sm text-muted-foreground" data-reveal>
                  {dept.applicationNote.text}
                </p>
              )}
            </Reveal>
          </Container>
        </section>
      )}

      {hasTestimonials && (
        <section className={cn("py-8 sm:py-10", nextBand())}>
          <Container>
            <Reveal className="mx-auto w-full max-w-3xl">
              <Heading>Testimonials</Heading>
              <div className="mt-6 grid gap-8 sm:grid-cols-2">
                {dept.testimonials.map((t) => (
                  <TestimonialCard
                    key={t.name}
                    name={t.name}
                    role={t.role}
                    imageSrc={t.photo ? asset(t.photo) : null}
                    testimonialText={t.quote}
                  />
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {hasFaqs && (
        <section className={cn("py-8 sm:py-10", nextBand())}>
          <Container>
            <Reveal className="mx-auto w-full max-w-3xl">
              <Heading>FAQs</Heading>
              <div className="mt-6 flex flex-col gap-6">
                {dept.faqs.map((faq) => (
                  <div key={faq.q} data-reveal>
                    <p className="font-bold text-dept-ink">{faq.q}</p>
                    <p className="prose-body mt-1.5 text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      <section className={cn("py-8 sm:py-10", nextBand())}>
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl">
            <Heading>Contact Us!</Heading>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dept.contacts.map((contact) => (
                <div key={contact.name} className="flex flex-col items-center gap-2 text-center" data-reveal>
                  {contact.photo ? (
                    <SkeletonImage
                      src={asset(contact.photo)}
                      alt={contact.name}
                      width={112}
                      height={112}
                      containerClassName="h-28 w-28 rounded-full"
                      className="h-28 w-28 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-dept-accent/15">
                      <span className="display text-2xl text-dept-ink/60">{initials(contact.name)}</span>
                    </div>
                  )}
                  <p className="font-bold text-dept-ink">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.role}</p>
                  <p className="text-sm">
                    {contact.facebook && (
                      <a
                        href={contact.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link underline-offset-2 hover:underline"
                      >
                        Facebook
                      </a>
                    )}
                    {contact.facebook && contact.email && " | "}
                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-link underline-offset-2 hover:underline"
                      >
                        Email
                      </a>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
