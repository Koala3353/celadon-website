import { cn } from "@/lib/cn";

/** Warm paper card: thick rounded corners and a soft edge, like the
 *  textbook panels in the moodboard. */
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border-2 border-border bg-cream shadow-[0_2px_0_0_var(--border)]",
        className
      )}
      {...props}
    />
  );
}
