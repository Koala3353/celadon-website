"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, cubicBezier } from "animejs";

/**
 * Scroll-entry reveal, driven by anime.js.
 *
 * Children marked `data-reveal` start hidden (see globals.css) and are
 * animated in once, staggered, as each one individually enters the
 * viewport. Only `transform` and `opacity` are touched, so this stays on
 * the compositor.
 *
 * Reduced motion is honoured by skipping the animation entirely and clearing
 * the hidden starting state — the content simply is there.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  stagger: staggerMs = 70,
  distance = 20,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  distance?: number;
  as?: "div" | "section" | "ul" | "header";
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const targets = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      targets.forEach((t) => {
        t.style.opacity = "1";
        t.style.transform = "none";
      });
      return;
    }

    // Each target is observed independently, rather than triggering the
    // whole group off one enter/exit event on the (possibly very tall)
    // container — a long list, like a department's full contacts grid,
    // could have items sitting hundreds of pixels past the container's own
    // trigger edge. Those items would run their fade-in on a fixed
    // wall-clock stagger schedule while still off-screen, and if that
    // schedule was ever interrupted (e.g. the tab backgrounded mid-run)
    // before the user actually scrolled to them, they'd be stuck at
    // whatever opacity the animation happened to be paused at. Observing
    // per-target sidesteps this entirely: an item only starts animating
    // once it's actually about to be visible, and IntersectionObserver
    // reports elements that are already on-screen the moment observation
    // starts, so there's no separate "already entered at mount" case to
    // special-case either.
    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting && !e.target.hasAttribute("data-revealed"))
          .map((e) => e.target as HTMLElement);
        if (entering.length === 0) return;

        entering.forEach((t) => {
          observer.unobserve(t);
          t.setAttribute("data-revealed", "");
        });

        animate(entering, {
          opacity: [0, 1],
          translateY: [distance, 0],
          duration: 620,
          delay: stagger(staggerMs, { start: delay }),
          ease: cubicBezier(0.23, 1, 0.32, 1),
          onComplete: () => {
            entering.forEach((t) => (t.style.willChange = "auto"));
          },
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );

    targets.forEach((t) => observer.observe(t));

    return () => {
      observer.disconnect();
    };
  }, [delay, staggerMs, distance]);

  return (
    <Tag ref={root as never} className={className}>
      {children}
    </Tag>
  );
}
