import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { CloudBlob, PaperAirplane, PaperCrane } from "./sky-motifs";

/**
 * The CelaSkies hero band — used only on the dept-apps hub
 * (/internal/dept-apps). Individual department pages use DeptHero instead,
 * themed by their own accent color rather than this sky palette.
 *
 * `heroImage`, when given the actual branded CelaSkies banner, runs full-
 * width above the text instead of the generated wordmark+motifs — that
 * artwork already carries the "Celadon / Deputy Applications" title, so
 * showing the script wordmark on top of it would just repeat it.
 */
export function SkyHero({
  eyebrow,
  title,
  description,
  heroImage,
  backgroundImage,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  heroImage?: { src: string; alt: string };
  /** A photo behind the usual title/description text, in place of the
   * sky-field gradient — unlike `heroImage`, the text still renders on top. */
  backgroundImage?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={cn("relative overflow-hidden text-sky-navy", !backgroundImage && "sky-field")}
      style={
        backgroundImage
          ? { backgroundImage: `url(${asset(backgroundImage)})`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      {heroImage ? (
        <Reveal>
          <Image
            src={asset(heroImage.src)}
            alt={heroImage.alt}
            width={1920}
            height={1080}
            priority
            data-reveal
            className="max-h-[70vh] w-full object-cover"
          />
        </Reveal>
      ) : (
        !backgroundImage && (
          <>
            <CloudBlob className="pointer-events-none absolute -bottom-6 left-[-8%] h-32 w-[45%] text-white/70 sm:h-40" />
            <CloudBlob className="pointer-events-none absolute -bottom-10 right-[-10%] h-36 w-[50%] text-white/60 sm:h-48" />
            <PaperCrane className="pointer-events-none absolute right-[8%] top-10 h-14 w-auto text-sky-navy/25 sm:h-20" />
            <PaperAirplane className="pointer-events-none absolute left-[6%] top-16 h-10 w-auto -rotate-6 text-sky-navy/25 sm:h-14" />
          </>
        )
      )}

      {(!heroImage || description || children) && (
        <Container className={heroImage ? "relative py-12 sm:py-16" : "relative py-20 sm:py-28"}>
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
            {!heroImage && eyebrow && (
              <p className="sky-display eyebrow text-sky-navy/70" data-reveal>
                {eyebrow}
              </p>
            )}
            {!heroImage && (
              <h1 className="sky-display text-4xl font-semibold text-sky-navy sm:text-6xl" data-reveal>
                {title}
              </h1>
            )}
            {description && (
              <p className="prose-body max-w-xl text-lg text-sky-navy/80" data-reveal>
                {description}
              </p>
            )}
            {children && (
              <div className="mt-2" data-reveal>
                {children}
              </div>
            )}
          </Reveal>
        </Container>
      )}
    </section>
  );
}
