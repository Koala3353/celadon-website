import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import type { Department } from "@/lib/deputy-departments";
import { RichParagraphs } from "@/components/internal/rich-text";

/**
 * Per-department hero — deliberately not the CelaSkies sky theme (that's
 * reserved for the dept-apps hub). Colored by `dept.accent`, set as inline
 * CSS variables so `bg-dept-tint`/`text-dept-ink` etc. resolve per page
 * without needing a Tailwind class per department.
 *
 * When the department has its own illustrated banner, it runs full-width
 * above the text — same reasoning as the old SkyHero: that art already
 * carries its own title text, so overlaying more would just compete with
 * it. OSR has no banner, so it gets a plain color-field hero instead.
 */
export function DeptHero({ dept }: { dept: Department }) {
  return (
    <section className="relative overflow-hidden bg-dept-tint text-dept-ink">
      {/* Ambient depth in the department's own accent — same radial-glow
          technique as the public site's navy hero, so every department page
          reads as one family even though the hue changes per department. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 85% 0%, color-mix(in srgb, var(--dept-accent) 20%, transparent) 0%, transparent 65%)",
        }}
      />

      {dept.heroImage && dept.heroImagePadding && (
        <div className="relative w-full overflow-hidden">
          {/* Full-bleed echo of the same banner, faded, filling the gutter
              either side of the crisp centered copy below — so the frame
              reads as one continuous image bleeding off-screen rather than
              empty color once the crisp copy is inset from the edges.
              `overflow-hidden` here clips the backdrop's `scale-105` so it
              doesn't peek out past the section's own bottom edge. */}
          <Image
            aria-hidden
            src={asset(dept.heroImage.src)}
            alt=""
            width={1920}
            height={1080}
            className="max-h-[60vh] w-full scale-105 object-cover opacity-35"
          />
          <div
            className={cn(
              "absolute inset-0",
              dept.heroImagePadding.large
                ? "md:px-12 lg:px-24 xl:px-40 2xl:px-56"
                : "sm:px-8 md:px-12 lg:px-20"
            )}
          >
            <Reveal className="relative h-full">
              <Image
                src={asset(dept.heroImage.src)}
                alt={dept.heroImage.alt}
                fill
                priority
                data-reveal
                className={cn(
                  "object-cover",
                  dept.heroImagePadding.large ? "md:rounded-2xl" : "sm:rounded-2xl"
                )}
                style={{
                  objectPosition: dept.heroImagePadding.objectPosition,
                  maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
              />
            </Reveal>
          </div>
        </div>
      )}

      {dept.heroImage && !dept.heroImagePadding && (
        <Reveal>
          <Image
            src={asset(dept.heroImage.src)}
            alt={dept.heroImage.alt}
            width={1920}
            height={1080}
            priority
            data-reveal
            className="max-h-[60vh] w-full object-cover"
          />
        </Reveal>
      )}

      <Container className="relative pb-10 pt-12 sm:pb-14 sm:pt-16">
        <Reveal
          className={cn(
            "mx-auto flex flex-col items-center gap-5 text-center",
            dept.aboutWidth === "wide" ? "max-w-3xl" : "max-w-2xl"
          )}
        >
          <h1 className="display text-5xl text-dept-ink sm:text-7xl" data-reveal>
            {dept.name} {dept.emoji}
          </h1>
          {typeof dept.about === "string" ? (
            <p
              className={cn(
                "prose-body text-lg text-dept-ink/80",
                dept.aboutWidth === "wide" ? "max-w-2xl" : "max-w-xl"
              )}
              data-reveal
            >
              {dept.about}
            </p>
          ) : (
            <RichParagraphs
              paragraphs={dept.about}
              className={cn(
                "flex flex-col gap-4 text-left",
                dept.aboutWidth === "wide" ? "max-w-2xl" : "max-w-xl"
              )}
              paragraphClassName="prose-body text-lg text-dept-ink/80"
              data-reveal
            />
          )}
          <div className="mt-2" data-reveal>
            <a
              href="https://ateneoceladon.com/deputy-appform"
              target="_blank"
              rel="noopener noreferrer"
              className="pressable group inline-flex items-center gap-3 rounded-full bg-dept-accent py-3 pl-6 pr-3 text-sm font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dept-accent"
            >
              <span>Apply {dept.name}</span>
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12 12 4M6 4h6v6" />
                </svg>
              </span>
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
