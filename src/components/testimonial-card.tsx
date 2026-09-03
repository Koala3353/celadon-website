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
    <div className="flex flex-col gap-4 sm:relative sm:block sm:gap-0 sm:pt-10" data-reveal>
      {/* Header assembly: avatar circle + name/role. A long, multi-role name
       * (several comma-separated titles) wraps to several lines inside the
       * narrow overlapping pill the sm+ layout uses below, which on a phone-
       * width single-column card was tall enough to run into the quote text.
       * So on mobile this instead sits in normal flow, full card width, as a
       * plain rounded card strip — from sm up it's the usual pill elevated
       * over the card's top border, where there's room for the text to stay
       * on one line. The pill/strip is always fully opaque so the name/role
       * stay legible regardless of what's behind the card. */}
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[var(--shadow-sm)]",
          "sm:absolute sm:left-6 sm:z-10 sm:gap-0 sm:rounded-none sm:bg-transparent sm:p-0 sm:shadow-none",
          headerClassName ?? "sm:top-0"
        )}
      >
        {imageSrc ? (
          <SkeletonImage
            src={imageSrc}
            alt={name}
            width={80}
            height={80}
            containerClassName={cn(
              "h-14 w-14 shrink-0 rounded-full ring-4 sm:h-20 sm:w-20",
              isDark ? "ring-sky-navy" : "ring-white"
            )}
            className="h-14 w-14 rounded-full object-cover sm:h-20 sm:w-20"
          />
        ) : (
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-4 sm:h-20 sm:w-20",
              isDark ? "bg-white/15 ring-sky-navy" : "bg-dept-accent/15 ring-white"
            )}
          >
            <span className={cn("text-base font-semibold", isDark ? "text-white/80" : "text-dept-ink/60")}>
              {initials(name)}
            </span>
          </div>
        )}
        <div className="sm:-ml-4 sm:rounded-full sm:bg-white sm:py-2 sm:pl-7 sm:pr-5 sm:shadow-[var(--shadow-sm)]">
          <p className={cn("text-sm font-bold", isDark ? "text-sky-navy" : "text-dept-ink")}>{name}</p>
          {roleLines.map((line) => (
            <p key={line} className="text-xs leading-tight text-muted-foreground">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Main card: solid background + border, quote text inside. Only needs
       * the extra top padding that clears the overlapping header from sm up
       * — on mobile the header already sits above it in normal flow. */}
      <div
        className={cn(
          "rounded-2xl border p-6 sm:pt-14",
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
