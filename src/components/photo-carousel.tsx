"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/** Below this, a touch drag is read as a tap/scroll rather than a swipe. */
const SWIPE_THRESHOLD_PX = 40;

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
  imageClassName,
  fit = "cover",
  ...props
}: {
  /** A plain src string uses the carousel's own `fit`; pass an object to
   * override `fit` for just that one photo — for a carousel where most
   * photos crop fine but a poster-shaped outlier needs its full frame
   * visible. */
  photos: (string | { src: string; fit?: "cover" | "contain" })[];
  alt: string;
  className?: string;
  /** Extra classes on each `<Image>` itself — e.g. matching corner rounding
   * for a "contain"-fit photo, whose own edges sit inside the (possibly
   * larger, letterboxed) container rather than filling it, so the
   * container's own rounded corners don't reach the photo's visible edges. */
  imageClassName?: string;
  /** "contain" shows the full photo, letterboxed, instead of cropping it to
   * fill the frame — for content like sample-work photos where cropping
   * would cut off part of what's being shown. */
  fit?: "cover" | "contain";
} & React.HTMLAttributes<HTMLDivElement>) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (photos.length === 0) return null;

  const items = photos.map((p) => (typeof p === "string" ? { src: p, fit: undefined } : p));
  const hasLetterbox = items.some((item) => (item.fit ?? fit) === "contain");

  const go = (delta: number) => {
    setIndex((i) => (i + delta + photos.length) % photos.length);
  };

  return (
    <div
      className={cn(
        "group relative w-full touch-pan-y select-none overflow-hidden",
        hasLetterbox ? "bg-transparent" : "bg-navy/[0.06]",
        className
      )}
      {...props}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (delta > SWIPE_THRESHOLD_PX) go(-1);
        else if (delta < -SWIPE_THRESHOLD_PX) go(1);
      }}
    >
      {items.map((item, i) => (
        <Image
          key={item.src}
          src={item.src}
          alt={`${alt} — photo ${i + 1} of ${items.length}`}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          priority={i === 0}
          loading={i === 0 ? undefined : "lazy"}
          className={cn(
            (item.fit ?? fit) === "contain" ? "object-contain" : "object-cover",
            "transition-opacity duration-500",
            i === index ? "opacity-100" : "pointer-events-none opacity-0",
            imageClassName
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
