import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  tone = "surface",
  size = "md",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  /** "invert" for use on a navy field. */
  tone?: "surface" | "invert";
  size?: "md" | "lg";
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p
          className={cn(
            "eyebrow",
            tone === "invert" ? "text-link-navy" : "text-accent-ink"
          )}
          data-reveal
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "display mt-4",
          size === "lg" ? "text-4xl sm:text-6xl" : "text-3xl sm:text-5xl",
          tone === "invert" ? "text-white" : "text-navy"
        )}
        data-reveal
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "prose-body mt-5 text-lg",
            tone === "invert" ? "text-on-navy" : "text-muted-foreground"
          )}
          data-reveal
        >
          {description}
        </p>
      )}
    </div>
  );
}
