"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll, utils } from "animejs";

/**
 * Counts a stat up when it scrolls into view.
 *
 * The final value is rendered server-side as the element's text, so the number
 * is correct without JavaScript and correct for screen readers — the animation
 * only overwrites it after hydration, and only while counting.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  className,
  duration = 1100,
}: {
  value: number;
  /** Rendered outside the animated span, e.g. "₱" or "+". */
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const state = { n: 0 };
    const animation = animate(state, {
      n: value,
      duration,
      ease: "out(3)",
      autoplay: onScroll({ enter: "bottom-=40 top", repeat: false }),
      onUpdate: () => {
        el.textContent = utils.round(state.n, 0).toLocaleString("en-US");
      },
      onComplete: () => {
        el.textContent = value.toLocaleString("en-US");
      },
    });

    return () => {
      animation.revert();
      el.textContent = value.toLocaleString("en-US");
    };
  }, [value, duration]);

  return (
    <>
      {prefix}
      <span ref={ref} className={className}>
        {value.toLocaleString("en-US")}
      </span>
      {suffix}
    </>
  );
}
