"use client";

import { useEffect, useRef } from "react";
import { SkeletonImage } from "@/components/ui/skeleton-image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

export interface ScrollerPhoto {
  src: string;
  alt: string;
}

function Tile({ photo }: { photo: ScrollerPhoto }) {
  return (
    <div data-reveal className="group lift pressable w-64 shrink-0 snap-start sm:w-72">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sky-peach/20 shadow-[var(--shadow-sm)]">
        <SkeletonImage
          src={asset(photo.src)}
          alt={photo.alt}
          fill
          sizes="(min-width: 640px) 288px, 256px"
          className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-105"
        />
      </div>
    </div>
  );
}

/**
 * A horizontally scrollable strip of event photos for decorating a hub
 * page — unlike a fixed grid, it scales to any number of photos without
 * needing its layout re-planned each time one is added or removed. Native
 * scroll-snap gives free momentum/snapping with no JS, and each tile reuses
 * the same lift/pressable hover language as ProjectCard.
 *
 * The list is rendered three times in a row, starting scrolled to the
 * middle copy — once the user drags far enough to settle inside the copy
 * on either side, the scroll position is silently shifted back by exactly
 * one copy's width. The jump only ever happens after scrolling has
 * stopped, so it's invisible: the strip just appears to loop forever in
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
      className={cn("no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-5", className)}
    >
      {[...photos, ...photos, ...photos].map((photo, i) => (
        <Tile key={`${photo.src}-${i}`} photo={photo} />
      ))}
    </div>
  );
}
