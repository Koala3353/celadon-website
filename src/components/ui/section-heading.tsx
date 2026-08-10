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
  /** "brand" for use inside a navy hero band, "surface" elsewhere. */
  tone?: "surface" | "brand";
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p
          className={cn(
            "text-sm font-medium uppercase tracking-wider",
            tone === "brand" ? "text-highlight" : "text-accent"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl",
          tone === "brand" && "text-brand-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-base",
            tone === "brand" ? "text-brand-muted-foreground" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
