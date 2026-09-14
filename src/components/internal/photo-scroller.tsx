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

// Ambient drift speed, in pixels per second — slow enough to read as
// "alive" rather than a ticker, same spirit as the hero's own float-slow
// corner motifs.
const AUTO_SCROLL_PX_PER_SECOND = 16;

/**
 * A horizontally scrollable wall of event photos, three fixed-height rows
 * tall — tiles vary in column/row span so it reads as a curated mosaic
 * (like the hero's own asymmetric bento) rather than a uniform thumbnail
 * strip, while still scaling to any number of photos the same way a plain
 * strip would.
 *
 * The list is rendered three times in a row, starting scrolled to the
 * middle copy — whenever the scroll position drifts into the copy on
 * either side, it's silently shifted back by exactly one copy's width, so
 * the wall loops forever in both directions instead of hitting a hard end.
 * It also drifts on its own via a slow scrollLeft increment (paused
 * whenever the user is actually touching or hovering it, and skipped
 * entirely under prefers-reduced-motion), so it never sits static waiting
 * to be noticed as scrollable.
 */
export function PhotoScroller({ photos, className }: { photos: ScrollerPhoto[]; className?: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || photos.length === 0) return;

    const setWidth = el.scrollWidth / 3;
    el.scrollLeft = setWidth;

    const onScroll = () => {
      if (el.scrollLeft < setWidth * 0.5) {
        el.scrollLeft += setWidth;
      } else if (el.scrollLeft > setWidth * 1.5) {
        el.scrollLeft -= setWidth;
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let hovered = false;
    let pressed = false;
    let last = performance.now();

    // A timer, not requestAnimationFrame — rAF can go quiet on a page with
    // no other activity (some browsers throttle it until something else
    // forces a paint, e.g. mouse movement), which made this drift stall
    // whenever the cursor held still. setInterval keeps ticking regardless.
    const TICK_MS = 50;
    const tick = () => {
      const now = performance.now();
      const dt = now - last;
      last = now;
      if (!hovered && !pressed) {
        el.scrollLeft += (AUTO_SCROLL_PX_PER_SECOND * dt) / 1000;
      }
    };

    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };

    if (!reduced) {
      last = performance.now();
      intervalId = setInterval(tick, TICK_MS);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    }

    return () => {
      el.removeEventListener("scroll", onScroll);
      if (intervalId !== null) clearInterval(intervalId);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
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
