import { cn } from "@/lib/cn";

const TONES = {
  neutral: "bg-muted text-muted-foreground",
  open: "bg-green text-cream",
  closed: "bg-muted text-muted-foreground",
  gold: "bg-gold/25 text-ink",
  sky: "bg-sky/40 text-ink",
} as const;

export function Badge({
  tone = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof TONES }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-display text-xs font-bold",
        TONES[tone],
        className
      )}
      {...props}
    />
  );
}
