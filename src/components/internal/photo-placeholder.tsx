import { cn } from "@/lib/cn";

/**
 * Holds the space a photo carousel will occupy once a project's photos
 * arrive, so the page's layout is final now and the photos are a drop-in
 * later. Same dashed "coming soon" treatment as ProjectCard's empty cover.
 *
 * `tone="dark"` is for sections painted in a dark project color, where the
 * default `--dept-ink` dashes would disappear.
 */
export function PhotoPlaceholder({
  className,
  label = "Photos coming soon",
  tone = "light",
}: {
  className?: string;
  label?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      data-reveal
      className={cn(
        "flex flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed",
        tone === "dark" ? "border-white/25 text-white/55" : "border-dept-ink/15 bg-dept-tint text-dept-ink/40",
        className
      )}
    >
      <span aria-hidden className="text-2xl">
        🖼️
      </span>
      <span className="sky-display eyebrow">{label}</span>
    </div>
  );
}
