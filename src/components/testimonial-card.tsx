import { SkeletonImage } from "@/components/ui/skeleton-image";
import { cn } from "@/lib/cn";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

// Literal, fully-written class strings per breakpoint — Tailwind's build
// scans source text for whole utility names, so these can't be assembled by
// interpolating a breakpoint token into a template string. "sm" is the
// long-standing default (a short, one-role testimonial has room to spare).
// "xl" exists for a testimonial whose role is long enough (multiple stacked
// titles) that the pill would still run into the quote below it at sm/md/lg
// — measured directly against the hub's actual longest role text, the pill
// only clears the quote text once the shared max-w-5xl container's columns
// widen enough, which happens at xl and holds steady beyond it.
const PILL_BREAKPOINT_CLASSES = {
  sm: {
    wrapper: "sm:relative sm:block sm:gap-0 sm:pt-10",
    header:
      "sm:absolute sm:left-6 sm:z-10 sm:gap-0 sm:rounded-none sm:bg-transparent sm:p-0 sm:shadow-none sm:ring-0",
    top: "sm:top-0",
    bubble: "sm:-ml-4 sm:rounded-full sm:bg-white sm:py-2 sm:pl-7 sm:pr-5 sm:shadow-[var(--shadow-md)]",
    bubbleRing: "sm:ring-1 sm:ring-dept-ink/10",
    quotePad: "sm:pt-14",
  },
  xl: {
    wrapper: "xl:relative xl:block xl:gap-0 xl:pt-10",
    header:
      "xl:absolute xl:left-6 xl:z-10 xl:gap-0 xl:rounded-none xl:bg-transparent xl:p-0 xl:shadow-none xl:ring-0",
    top: "xl:top-0",
    bubble: "xl:-ml-4 xl:rounded-full xl:bg-white xl:py-2 xl:pl-7 xl:pr-5 xl:shadow-[var(--shadow-md)]",
    bubbleRing: "xl:ring-1 xl:ring-dept-ink/10",
    quotePad: "xl:pt-14",
  },
} as const;

export function TestimonialCard({
  name,
  role,
  imageSrc,
  testimonialText,
  tone = "light",
  className,
  headerClassName,
  pillFrom = "sm",
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
  /** Breakpoint at which the header switches from a plain stacked card
   * strip (normal flow, full card width) to the elevated pill that
   * overlaps the quote card's top border. Default "sm" is right for a
   * short, one-line role; a longer, multi-role name needs the extra room
   * "xl" gives it, below which it stays in the plain, always-safe layout.
   * When a group of cards is rendered together, pass the same value to
   * every card in the group — mixing the two looks inconsistent. */
  pillFrom?: keyof typeof PILL_BREAKPOINT_CLASSES;
}) {
  const isDark = tone === "dark";
  const roleLines = role.split(", ");
  const bp = PILL_BREAKPOINT_CLASSES[pillFrom];

  return (
    <div className={cn("flex flex-col gap-4", bp.wrapper)} data-reveal>
      {/* Header assembly: avatar circle + name/role. Below `pillFrom` this
       * sits in normal flow, full card width, as a plain rounded card
       * strip — at and above it, the usual pill elevated over the card's
       * top border, where there's room for the role text to stay clear of
       * the quote beneath it. The pill/strip is always fully opaque so the
       * name/role stay legible regardless of what's behind the card. */}
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[var(--shadow-md)]",
          isDark ? "" : "ring-1 ring-dept-ink/10",
          bp.header,
          headerClassName ?? bp.top
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
        <div className={cn(bp.bubble, !isDark && bp.bubbleRing)}>
          <p className={cn("text-sm font-bold", isDark ? "text-sky-navy" : "text-dept-ink")}>{name}</p>
          {roleLines.map((line) => (
            <p key={line} className="text-xs leading-tight text-muted-foreground">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Main card: solid background + border, quote text inside. Only needs
       * the extra top padding that clears the overlapping header from
       * `pillFrom` up — below it the header already sits above it in
       * normal flow. */}
      <div
        className={cn(
          "rounded-2xl border p-6",
          bp.quotePad,
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
