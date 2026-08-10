import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  tone = "surface",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  /** "invert" for use on a green band. */
  tone?: "surface" | "invert";
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p
          className={cn(
            "font-display text-sm font-bold uppercase tracking-[0.14em]",
            tone === "invert" ? "text-gold" : "text-red-ink"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl",
          tone === "invert" ? "text-cream" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            tone === "invert" ? "text-cream/85" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
