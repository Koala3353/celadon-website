import type { Metadata } from "next";
import { getImageProps } from "next/image";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SkeletonImage } from "@/components/ui/skeleton-image";
import { Reveal } from "@/components/motion/reveal";
import { asset } from "@/lib/asset";
import {
  MATERIAL_META,
  formatWorkshopDate,
  getWorkshopDepartment,
  getWorkshops,
  isWorkshopPast,
  type Workshop,
  type WorkshopMaterial,
} from "@/lib/workshops";

export const metadata: Metadata = {
  title: "Workshops",
  robots: { index: false, follow: false },
};

function DepartmentTag({ workshop }: { workshop: Workshop }) {
  const dept = getWorkshopDepartment(workshop);

  // A typo'd slug in workshops.ts should be visible on the page, not silently
  // dropped.
  if (!dept) return <Badge>{workshop.dept}</Badge>;

  return (
    <span
      style={{ "--dept-tint": dept.accent.tint, "--dept-ink": dept.accent.ink } as React.CSSProperties}
      className="inline-flex items-center gap-1.5 self-start rounded-full bg-dept-tint px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-dept-ink ring-1 ring-inset ring-dept-ink/10"
    >
      <span aria-hidden>{dept.emoji}</span>
      {dept.name}
      <span className="sr-only"> department ran this workshop</span>
    </span>
  );
}

function MaterialLink({ material }: { material: WorkshopMaterial }) {
  const meta = MATERIAL_META[material.type];
  const external = material.href.startsWith("http");
  const newTab = external || material.href.endsWith(".pdf");

  return (
    <a
      href={external ? material.href : asset(material.href)}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="pressable group flex items-center gap-3 rounded-2xl bg-lego-cream px-4 py-3 ring-1 ring-inset ring-lego-yellow transition-colors hover:bg-lego-yellow/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-navy"
    >
      <span aria-hidden className="text-xl">
        {meta.emoji}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-bold text-sky-navy">{material.label}</span>
        <span className="text-xs text-sky-navy/70">{meta.noun}</span>
      </span>
      <span
        aria-hidden
        className="inline-block text-sky-navy/50 transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-navy"
      >
        {newTab ? "↗" : "→"}
      </span>
    </a>
  );
}

function WorkshopBrick({ workshop }: { workshop: Workshop }) {
  // The brick takes the colour of the department that ran the workshop.
  const color = getWorkshopDepartment(workshop)?.accent.base ?? "var(--lego-blue)";

  return (
    <article id={workshop.slug} className="scroll-mt-28" data-reveal>
      {/* Hover lives on this inner wrapper, not the <article>: the scroll
          reveal leaves an inline transform on the article that would
          override any hover transform there. The brick lifts off the
          baseplate, its shadow deepens, and the studs pop up in sequence. */}
      <div className="group/brick relative pt-3 transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
        {/* The studs along the top edge are what make the card read as a brick. */}
        <div aria-hidden className="absolute left-7 top-0 flex gap-3 sm:left-9">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="h-3.5 w-9 rounded-t-lg shadow-[inset_0_-3px_0_rgba(0,0,0,0.12)] transition-transform duration-200 ease-[var(--ease-out)] group-hover/brick:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover/brick:translate-y-0"
              style={{ backgroundColor: color, transitionDelay: `${i * 40}ms` }}
            />
          ))}
        </div>

        <div
          className="rounded-[1.75rem] p-1.5 shadow-[0_6px_0_rgba(0,0,0,0.08)] transition-shadow duration-300 ease-[var(--ease-out)] group-hover/brick:shadow-[0_12px_0_rgba(0,0,0,0.1),0_28px_40px_-16px_rgba(0,40,90,0.35)]"
          style={{ backgroundColor: color }}
        >
          <div className="grid gap-6 rounded-[1.375rem] bg-white p-5 sm:p-7 md:grid-cols-[13rem_1fr] md:gap-8">
            <a
              href={asset(workshop.poster.src)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the ${workshop.title} poster`}
              className="group self-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-navy"
            >
              <SkeletonImage
                src={asset(workshop.poster.src)}
                alt={`Poster for the ${workshop.title}`}
                width={workshop.poster.width}
                height={workshop.poster.height}
                sizes="(min-width: 768px) 13rem, 11rem"
                containerClassName="mx-auto w-44 rounded-xl shadow-[var(--shadow-md)] ring-1 ring-black/5 transition-transform duration-300 ease-[var(--ease-out)] group-hover:-rotate-1 group-hover:scale-[1.02] md:w-full"
                className="h-auto w-full"
              />
            </a>

            <div className="flex min-w-0 flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <DepartmentTag workshop={workshop} />
                <h2 className="sky-display text-2xl font-semibold leading-tight text-sky-navy sm:text-3xl">
                  {workshop.title}
                </h2>
                <p className="text-sm font-bold text-sky-navy/70">
                  <time dateTime={workshop.date}>{formatWorkshopDate(workshop.date)}</time>
                  {!isWorkshopPast(workshop) && (
                    <>
                      <span aria-hidden> · </span>
                      {workshop.time}
                      <span aria-hidden> · </span>
                      {workshop.venue}
                    </>
                  )}
                </p>
                <p className="prose-body text-muted-foreground">{workshop.description}</p>
              </div>

              {workshop.topics && workshop.topics.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <p className="eyebrow text-sky-navy/60">What we covered</p>
                  <ul className="flex flex-col gap-2">
                    {workshop.topics.map((topic) => (
                      <li key={topic} className="prose-body flex gap-2.5 text-sm text-sky-navy/85">
                        <span
                          aria-hidden
                          className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-[3px]"
                          style={{ backgroundColor: color }}
                        />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col gap-2.5">
                <p className="eyebrow text-sky-navy/60">Materials</p>
                {workshop.materials.length > 0 ? (
                  <ul className="grid gap-2.5 lg:grid-cols-2">
                    {workshop.materials.map((m) => (
                      <li key={`${m.type}-${m.label}`}>
                        <MaterialLink material={m} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No materials uploaded yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function WorkshopsPage() {
  const workshops = getWorkshops();

  const headerCommon = { alt: "Celadon Workshops", sizes: "100vw", priority: true };
  // images.unoptimized is on (static export), so getImageProps returns a
  // plain src and no srcSet; fall back to src for the <source>.
  const { props: desktop } = getImageProps({
    ...headerCommon,
    src: asset("/internal/workshops/header-desktop.webp"),
    width: 1534,
    height: 344,
  });
  const desktopHeader = desktop.srcSet ?? desktop.src;
  const { props: mobileHeader } = getImageProps({
    ...headerCommon,
    src: asset("/internal/workshops/header.webp"),
    width: 2000,
    height: 1135,
  });

  return (
    <>
      {/* The header art carries the "Celadon Workshops" title itself. Full art
          on phones; from md up a separate wide banner, so the header doesn't
          fill the whole screen on wide displays. */}
      <h1 className="sr-only">Celadon Workshops</h1>
      <section className="bg-lego-blue">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopHeader} width={1534} height={344} />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
          <img {...mobileHeader} className="block h-auto w-full" />
        </picture>
      </section>

      <section className="lego-baseplate py-14 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p
              className="sky-display eyebrow inline-block rounded-full bg-lego-yellow px-4 py-1.5 text-sky-navy"
              data-reveal
            >
              Workshop Library
            </p>
            <h2
              className="sky-display mt-4 text-3xl font-semibold text-sky-navy sm:text-5xl"
              data-reveal
            >
              Welcome to Celadon&rsquo;s workshop library!
            </h2>
          </Reveal>

          <Reveal stagger={80} className="mx-auto mt-12 flex w-full max-w-4xl flex-col gap-10">
            {workshops.map((workshop) => (
              <WorkshopBrick key={workshop.slug} workshop={workshop} />
            ))}
          </Reveal>
        </Container>
      </section>
    </>
  );
}
