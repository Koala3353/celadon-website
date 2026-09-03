"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";

/**
 * next/image, lazy-loaded, with a shimmering skeleton shown in its place
 * until the image actually finishes loading — instead of either a blank gap
 * or an instant pop-in once it scrolls into view. The skeleton keeps the
 * image's own shape (circle avatar, rounded card, etc.) so nothing jumps
 * when the real photo replaces it.
 *
 * Two modes, matching how `next/image` itself is called:
 * - `fill`: no wrapper of our own — the caller already has a positioned,
 *   `overflow-hidden` box (every existing `fill` usage in this codebase
 *   does), so the skeleton is just an absolutely-positioned sibling inside
 *   it.
 * - explicit `width`/`height`: we own the sizing wrapper, via
 *   `containerClassName` (e.g. `"h-24 w-24 rounded-full"`) — the same
 *   shape classes that used to sit directly on the `<Image>`.
 */
export function SkeletonImage({
  className,
  containerClassName,
  fill,
  onLoad,
  reveal,
  ...props
}: ImageProps & {
  containerClassName?: string;
  /** Puts `data-reveal` on our own wrapper (non-`fill` mode only) instead of
   * on the `<Image>` itself — the scroll-reveal animation and our own
   * load-triggered fade both drive `opacity`, and only one of them can own
   * a given element without fighting over it. */
  reveal?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  const skeleton = (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 bg-muted transition-opacity duration-300",
        loaded ? "pointer-events-none opacity-0" : "opacity-100"
      )}
    />
  );

  const image = (
    <Image
      {...props}
      fill={fill}
      loading={props.priority ? undefined : "lazy"}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      // Bare `transition` (not `transition-opacity`) so it composes with a
      // caller's own `duration-*`/`ease-*`/hover-transform classes instead
      // of fighting them over `transition-property` — Tailwind's default
      // transition-property list already includes both opacity and
      // transform.
      className={cn("transition duration-500", loaded ? "opacity-100" : "opacity-0", className)}
    />
  );

  if (fill) {
    return (
      <>
        {skeleton}
        {image}
      </>
    );
  }

  return (
    <div data-reveal={reveal ? "" : undefined} className={cn("relative overflow-hidden", containerClassName)}>
      {skeleton}
      {image}
    </div>
  );
}
