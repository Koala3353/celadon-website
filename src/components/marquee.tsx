import Image from "next/image";
import { asset } from "@/lib/asset";

/**
 * The brandbook lists a marquee as one of Celadon's elements: the wordmark
 * running as a continuous band.
 *
 * The track holds the sequence twice and translates by -50%, so the loop is
 * seamless. It's a CSS animation rather than a JS one — constant linear motion
 * with no interaction, which is exactly the case where staying off the main
 * thread matters most.
 */
export function Marquee({
  repeat = 8,
  duration = 44,
}: {
  repeat?: number;
  duration?: number;
}) {
  const run = Array.from({ length: repeat });

  return (
    <div
      className="relative flex overflow-hidden border-y border-white/10 bg-navy py-6"
      // Decorative: the wordmark is already in the header and footer.
      aria-hidden
    >
      <div
        className="marquee-track flex shrink-0 items-center gap-16 pr-16"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {run.concat(run).map((_, i) => (
          <Image
            key={i}
            src={asset("/brand/celadon-wordmark-white.png")}
            alt=""
            width={1000}
            height={200}
            className="h-7 w-auto shrink-0 opacity-70"
          />
        ))}
      </div>

      {/* Feather the ends so the band reads as continuous rather than clipped. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy to-transparent" />
    </div>
  );
}
