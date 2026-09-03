import { SkeletonImage } from "@/components/ui/skeleton-image";
import { cn } from "@/lib/cn";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function TestimonialCard({
  name,
  role,
  imageSrc,
  testimonialText,
  tone = "light",
  className,
  headerClassName,
}: {
  name: string;
  role: string;
  imageSrc?: string | null;
  testimonialText: string;
  /** "light" for a white/tinted page background, "dark" for the navy hub sections. */
  tone?: "light" | "dark";
  className?: string;
  /** Override for the overlapping avatar+pill header's vertical position —
   * e.g. to nudge one particular testimonial's header a little higher than
   * the rest. Replaces the default `top-0`, so pass a full top-* class. */
  headerClassName?: string;
}) {
  const isDark = tone === "dark";
  const roleLines = role.split(", ");

  return (
    <div className="relative pt-10" data-reveal>
      {/* Overlapping header assembly: avatar circle + name/role pill, sitting
       * on top of the card's top border. The pill is always fully opaque so
       * the name/role stay legible regardless of what's behind the card. */}
      <div className={cn("absolute left-6 z-10 flex items-center", headerClassName ?? "top-0")}>
        {imageSrc ? (
          <SkeletonImage
            src={imageSrc}
            alt={name}
            width={80}
            height={80}
            containerClassName={cn(
              "h-20 w-20 shrink-0 rounded-full ring-4",
              isDark ? "ring-sky-navy" : "ring-white"
            )}
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <div
            className={cn(
              "flex h-20 w-20 shrink-0 items-center justify-center rounded-full ring-4",
              isDark ? "bg-white/15 ring-sky-navy" : "bg-dept-accent/15 ring-white"
            )}
          >
            <span className={cn("text-base font-semibold", isDark ? "text-white/80" : "text-dept-ink/60")}>
              {initials(name)}
            </span>
          </div>
        )}
        <div className="-ml-4 rounded-full bg-white py-2 pl-7 pr-5 shadow-[var(--shadow-sm)]">
          <p className={cn("text-sm font-bold", isDark ? "text-sky-navy" : "text-dept-ink")}>{name}</p>
          {roleLines.map((line) => (
            <p key={line} className="text-xs leading-tight text-muted-foreground">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Main card: solid background + border, quote text inside. */}
      <div
        className={cn(
          "rounded-2xl border p-6 pt-14",
          isDark ? "border-white/15 bg-white/5" : "border-border bg-white",
          className
        )}
      >
        <p className={cn("prose-body text-sm italic", isDark ? "text-white/90" : "text-muted-foreground")}>
          &ldquo;{testimonialText}&rdquo;
        </p>
      </div>
    </div>
  );
}
