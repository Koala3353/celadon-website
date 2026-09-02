import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { asset } from "@/lib/asset";
import type { Department } from "@/lib/deputy-departments";

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

      {dept.heroImage && (
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

      <Container className="relative py-20 sm:py-28">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <span
            className="eyebrow rounded-full bg-white/70 px-4 py-1.5 text-dept-ink/80 ring-1 ring-inset ring-dept-accent/20 backdrop-blur-sm"
            data-reveal
          >
            {dept.fullName} • Deputy Pool
          </span>
          <h1 className="display text-5xl text-dept-ink sm:text-7xl" data-reveal>
            {dept.name} {dept.emoji}
          </h1>
          <p className="prose-body max-w-xl text-lg text-dept-ink/80" data-reveal>
            {dept.about}
          </p>
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
