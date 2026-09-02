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
    <section className="bg-dept-tint text-dept-ink">
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

      <Container className="py-16 sm:py-20">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="eyebrow text-dept-accent" data-reveal>
            {dept.fullName} • Deputy Pool
          </p>
          <h1 className="display text-4xl text-dept-ink sm:text-6xl" data-reveal>
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
              className="pressable inline-flex items-center gap-2 rounded-full bg-dept-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dept-accent"
            >
              Apply {dept.name}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
