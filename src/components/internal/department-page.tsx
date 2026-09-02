import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { PhotoCarousel } from "@/components/photo-carousel";
import { DeptHero } from "@/components/internal/dept-hero";
import { RoleAccordion } from "@/components/internal/role-accordion";
import { Timeline } from "@/components/internal/timeline";
import { PaperAirplane, PaperCrane } from "@/components/internal/sky-motifs";
import { asset } from "@/lib/asset";
import { APPLICATION_FORM_URL, APPLICATION_STEPS, type Department } from "@/lib/deputy-departments";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="display text-2xl text-dept-ink sm:text-3xl" data-reveal>
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
export function DepartmentPage({ dept }: { dept: Department }) {
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

      <section className="bg-white py-16 sm:py-20">
        <Container className="flex flex-col gap-16">
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

          {dept.roles && dept.roles.length > 0 && (
            <Reveal className="mx-auto w-full max-w-3xl">
              <Heading>Available Positions</Heading>
              <div className="mt-6" data-reveal>
                <RoleAccordion roles={dept.roles} />
              </div>
            </Reveal>
          )}

          {dept.sections.map((section) => (
            <Reveal key={section.heading} className="mx-auto w-full max-w-3xl">
              <Heading>{section.heading}</Heading>
              <div className="mt-6 flex flex-col gap-6">
                {section.groups.map((group, i) => (
                  <div key={group.label ?? i}>
                    {group.label && (
                      <p className="mb-2 text-sm font-bold uppercase tracking-wider text-dept-ink/70">
                        {group.label}
                      </p>
                    )}
                    <ul className="flex flex-col gap-2.5">
                      {group.items.map((item, j) => (
                        <li key={j} className="prose-body flex gap-2.5 text-muted-foreground">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-dept-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {section.image && (
                  <Image
                    src={asset(section.image.src)}
                    alt={section.image.alt}
                    width={1600}
                    height={400}
                    data-reveal
                    className="w-full rounded-2xl"
                  />
                )}
              </div>
            </Reveal>
          ))}

          {dept.committees && (
            <Reveal className="mx-auto w-full max-w-3xl">
              <Heading>Committees</Heading>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {dept.committees.map((c) => (
                  <div key={c.label} className="rounded-2xl bg-dept-tint p-5" data-reveal>
                    <p className="font-extrabold text-dept-ink">{c.label}</p>
                    <ul className="mt-2 flex flex-col gap-1.5">
                      {c.items.map((item, i) => (
                        <li key={i} className="prose-body text-sm text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {dept.timeline && (
            <Reveal className="mx-auto w-full max-w-3xl">
              <Heading>Timeline</Heading>
              <div className="mt-6" data-reveal>
                <Timeline items={dept.timeline} />
              </div>
            </Reveal>
          )}

          {dept.projects && (
            <Reveal className="relative mx-auto w-full max-w-3xl">
              <PaperCrane className="pointer-events-none absolute -right-4 -top-8 h-14 w-auto rotate-12 text-dept-accent/20 sm:h-20" />
              <PaperAirplane className="pointer-events-none absolute -left-6 top-2 h-10 w-auto -rotate-12 text-dept-accent/20 sm:h-12" />
              <Heading>Projects & Initiatives</Heading>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {dept.projects.map((p) => (
                  <div key={p.name} className="rounded-2xl bg-dept-tint p-5" data-reveal>
                    <p className="font-extrabold text-dept-ink">{p.name}</p>
                    <p className="prose-body mt-1.5 text-sm text-muted-foreground">{p.description}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

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
                {dept.applicationNote.href ? (
                  <a
                    href={dept.applicationNote.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link underline-offset-2 hover:underline"
                  >
                    {dept.applicationNote.text}
                  </a>
                ) : (
                  dept.applicationNote.text
                )}
              </p>
            )}
          </Reveal>

          {dept.testimonials.length > 0 && (
            <Reveal className="mx-auto w-full max-w-3xl">
              <Heading>Deputy Testimonials</Heading>
              <div className="mt-6 flex flex-col gap-6">
                {dept.testimonials.map((t) => (
                  <div key={t.name} className="flex gap-4 rounded-2xl bg-dept-tint p-5" data-reveal>
                    {t.photo ? (
                      <Image
                        src={asset(t.photo)}
                        alt={t.name}
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-dept-accent/15">
                        <span className="text-sm font-semibold text-dept-ink/60">{initials(t.name)}</span>
                      </div>
                    )}
                    <div>
                      <p className="prose-body text-sm italic text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                      <p className="mt-2 text-sm font-bold text-dept-ink">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {dept.faqs.length > 0 && (
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
          )}

          <Reveal className="mx-auto w-full max-w-3xl">
            <Heading>Contact Us!</Heading>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dept.contacts.map((contact) => (
                <div key={contact.name} className="flex flex-col items-center gap-2 text-center" data-reveal>
                  {contact.photo ? (
                    <Image
                      src={asset(contact.photo)}
                      alt={contact.name}
                      width={112}
                      height={112}
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
