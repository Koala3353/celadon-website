"use client";

import { useEffect, useRef } from "react";
import { SkeletonImage } from "@/components/ui/skeleton-image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

export interface ScrollerPhoto {
  src: string;
  alt: string;
  /** Grid span classes — varying these per photo is what makes the wall
   * read as a curated mosaic instead of a uniform thumbnail strip. */
  span?: string;
}

function Tile({ photo }: { photo: ScrollerPhoto }) {
  return (
    <div data-reveal className={cn("group lift pressable relative", photo.span)}>
      <div className="absolute inset-0 overflow-hidden rounded-2xl bg-sky-peach/20 shadow-[var(--shadow-sm)]">
        <SkeletonImage
          src={asset(photo.src)}
          alt={photo.alt}
          fill
          sizes="(min-width: 640px) 280px, 224px"
          className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-105"
        />
      </div>
    </div>
  );
}

/**
 * A horizontally scrollable wall of event photos, three fixed-height rows
 * tall — tiles vary in column/row span so it reads as a curated mosaic
 * (like the hero's own asymmetric bento) rather than a uniform thumbnail
 * strip, while still scaling to any number of photos the same way a plain
 * strip would.
 *
 * The list is rendered three times in a row, starting scrolled to the
 * middle copy — once the user drags far enough to settle inside the copy
 * on either side, the scroll position is silently shifted back by exactly
 * one copy's width. The jump only ever happens after scrolling has
 * stopped, so it's invisible: the wall just appears to loop forever in
 * both directions instead of hitting a hard end.
 */
export function PhotoScroller({ photos, className }: { photos: ScrollerPhoto[]; className?: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || photos.length === 0) return;

    const setWidth = el.scrollWidth / 3;
    el.scrollLeft = setWidth;

    let settleTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        if (el.scrollLeft < setWidth * 0.5) {
          el.scrollLeft += setWidth;
        } else if (el.scrollLeft > setWidth * 1.5) {
          el.scrollLeft -= setWidth;
        }
      }, 120);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearTimeout(settleTimer);
    };
  }, [photos]);

  if (photos.length === 0) return null;

  return (
    <div
      ref={scrollerRef}
      className={cn(
        "no-scrollbar grid grid-flow-col-dense auto-cols-[7rem] grid-rows-[repeat(3,7rem)] gap-3 overflow-x-auto pb-2 sm:auto-cols-[8.75rem] sm:grid-rows-[repeat(3,8.75rem)] sm:gap-4",
        // A permanent edge fade, not just a first-load hint — it signals
        // there's always more to scroll to on both sides, which is true
        // here since the wall loops endlessly in either direction.
        "[mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%_-_2rem),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%_-_2rem),transparent)]",
        className
      )}
    >
      {[...photos, ...photos, ...photos].map((photo, i) => (
        <Tile key={`${photo.src}-${i}`} photo={photo} />
      ))}
    </div>
  );
}
