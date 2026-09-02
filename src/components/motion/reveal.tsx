"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, onScroll, cubicBezier } from "animejs";

/**
 * Scroll-entry reveal, driven by anime.js.
 *
 * Children marked `data-reveal` start hidden (see globals.css) and are
 * animated in once, staggered, the first time the group enters the viewport.
 * Only `transform` and `opacity` are touched, so this stays on the compositor.
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

    const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      targets.forEach((t) => {
        t.style.opacity = "1";
        t.style.transform = "none";
      });
      return;
    }

    // animejs's onScroll autoplay only (re-)evaluates on scroll *events* — a
    // container that already satisfies the "enter" threshold the moment it
    // mounts (e.g. it sits just below a tall hero, so the page loads with it
    // already in view) never receives one, and is left permanently stuck at
    // its hidden starting state. Rather than autoplay:true (which races with
    // React StrictMode's dev-mode double-invoke of this effect — the first
    // animation starts, gets reverted by the simulated unmount before it can
    // finish, and the reveal never recovers), just skip the animation
    // entirely and show the content immediately, the same as reduced-motion.
    // Generous on purpose: this only has to distinguish "close enough to
    // load-bearing-visible that it should just be there" from "genuinely
    // requires scrolling to discover," not pixel-match the onScroll trigger
    // itself — content that's one small scroll away shouldn't depend on a
    // scroll event actually happening before it appears.
    const rect = el.getBoundingClientRect();
    const alreadyEntered = rect.top <= window.innerHeight + 300;
    if (alreadyEntered) {
      targets.forEach((t) => {
        t.style.opacity = "1";
        t.style.transform = "none";
      });
      return;
    }

    const animation = animate(targets, {
      opacity: [0, 1],
      translateY: [distance, 0],
      duration: 620,
      delay: stagger(staggerMs, { start: delay }),
      ease: cubicBezier(0.23, 1, 0.32, 1),
      // `enter` fires when the container crosses into view; `repeat: false`
      // stops it re-running on the way back up.
      autoplay: onScroll({ container: undefined, enter: "bottom-=80 top", repeat: false }),
      onComplete: () => {
        // Drop the compositor hint once the work is done.
        targets.forEach((t) => (t.style.willChange = "auto"));
      },
    });

    return () => {
      animation.revert();
    };
  }, [delay, staggerMs, distance]);

  return (
    <Tag ref={root as never} className={className}>
      {children}
    </Tag>
  );
}
