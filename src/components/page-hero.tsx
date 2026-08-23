import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

/**
 * The navy band every interior page opens with. The brandbook's own layout is
 * navy header → white body → navy footer, so these blocks are the structural
 * rhythm of the site rather than one-off dark sections.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  /** Optional photo shown beside the title on wide screens, stacked below it
   * on narrow ones. */
  image?: { src: string; alt: string };
}) {
  return (
    <section className="navy-field text-on-navy">
      <div className="navy-grid">
        <Container>
          <div
            className={cn(
              "py-20 sm:py-28",
              image && "grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:py-24"
            )}
          >
            <Reveal className="flex flex-col gap-5">
              {eyebrow && (
                <p className="eyebrow text-link-navy" data-reveal>
                  {eyebrow}
                </p>
              )}
              <h1
                className="display max-w-none text-4xl text-white sm:text-6xl lg:text-7xl"
                data-reveal
              >
                {title}
              </h1>
              {description && (
                <p className="prose-body max-w-2xl text-lg text-on-navy" data-reveal>
                  {description}
                </p>
              )}
              {children && <div data-reveal>{children}</div>}
            </Reveal>

            {image && (
              <Reveal delay={120} className="mt-2 lg:mt-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1284}
                  height={801}
                  data-reveal
                  className="h-auto w-full rounded-[1.75rem] shadow-[var(--shadow-lg)]"
                />
              </Reveal>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
