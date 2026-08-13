import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

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
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="navy-field text-on-navy">
      <div className="navy-grid">
        <Container>
          <Reveal className="flex flex-col gap-5 py-20 sm:py-28">
            {eyebrow && (
              <p className="eyebrow text-link-navy" data-reveal>
                {eyebrow}
              </p>
            )}
            <h1
              className="display max-w-4xl text-4xl text-white sm:text-6xl lg:text-7xl"
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
        </Container>
      </div>
    </section>
  );
}
