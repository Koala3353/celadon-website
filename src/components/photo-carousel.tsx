"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * A small crossfade carousel for department/project photo lists. All slides
 * are mounted at once (position: absolute, opacity-toggled) rather than
 * swapped in and out — with only a couple of photos per entry that's cheap,
 * and it avoids the remount flash a keyed swap would cause.
 */
export function PhotoCarousel({
  photos,
  alt,
  className,
  ...props
}: {
  photos: string[];
  alt: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [index, setIndex] = useState(0);

  if (photos.length === 0) return null;

  const go = (delta: number) => {
    setIndex((i) => (i + delta + photos.length) % photos.length);
  };

  return (
    <div
      className={cn("group relative w-full overflow-hidden bg-navy/[0.06]", className)}
      {...props}
    >
      {photos.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} — photo ${i + 1} of ${photos.length}`}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          priority={i === 0}
          loading={i === 0 ? undefined : "lazy"}
          className={cn(
            "object-cover transition-opacity duration-500",
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        />
      ))}

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy/70 text-2xl leading-none text-white transition-colors hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy/70 text-2xl leading-none text-white transition-colors hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            &#8250;
          </button>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
