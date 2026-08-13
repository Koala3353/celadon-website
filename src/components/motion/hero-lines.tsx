"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

/**
 * The hero headline, revealed line by line from behind a mask.
 *
 * Each line sits in its own `overflow-hidden` box and slides up from below it,
 * so the type appears to be uncovered rather than to fade in from nowhere.
 * This runs on mount rather than on scroll — it is the first thing on the page.
 */
export function HeroLines({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-line]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      targets.forEach((t) => {
        t.style.transform = "none";
        t.style.opacity = "1";
      });
      return;
    }

    const animation = animate(targets, {
      translateY: ["110%", "0%"],
      opacity: [0, 1],
      duration: 900,
      delay: stagger(90),
      ease: "cubicBezier(0.23, 1, 0.32, 1)",
    });

    return () => {
      animation.revert();
    };
  }, []);

  return (
    <h1 ref={root} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <span
            data-line
            className="block will-change-transform"
            style={{ transform: "translateY(110%)", opacity: 0 }}
          >
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}
