import { cn } from "@/lib/cn";

const TONES = {
  neutral: "bg-navy/[0.06] text-muted-foreground",
  navy: "bg-navy text-white",
  open: "bg-navy text-white",
  closed: "bg-navy/[0.06] text-muted-foreground",
  accent: "bg-accent/15 text-accent-ink",
  onNavy: "bg-white/10 text-on-navy",
} as const;

export function Badge({
  tone = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof TONES }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em]",
        TONES[tone],
        className
      )}
      {...props}
    />
  );
}
