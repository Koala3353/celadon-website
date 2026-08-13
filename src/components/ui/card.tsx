import { cn } from "@/lib/cn";

/**
 * Nested "double-bezel" surface: an outer tray with a hairline ring, holding
 * an inner plate with its own concentric radius. Reads as a machined object
 * rather than a rectangle with a border.
 */
export function Card({
  className,
  innerClassName,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { innerClassName?: string }) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] bg-navy/[0.035] p-1.5 ring-1 ring-inset ring-navy/[0.07]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-[1.375rem] bg-white shadow-[var(--shadow-sm)]",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
