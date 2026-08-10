import { Container } from "@/components/ui/container";

/**
 * The band every page opens with: sky wash, faint exercise-book grid, and a
 * grass horizon at the foot — the brand book's slide furniture.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  size = "default",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  size?: "default" | "large";
}) {
  return (
    <section className="sky-wash relative isolate overflow-hidden">
      <div aria-hidden className="paper-grid absolute inset-0 opacity-60" />

      <Container
        className={
          size === "large"
            ? "relative flex flex-col gap-6 pb-28 pt-20 sm:pb-36 sm:pt-28"
            : "relative flex flex-col gap-5 pb-24 pt-14 sm:pb-28 sm:pt-20"
        }
      >
        {eyebrow && (
          <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-red-ink">
            {eyebrow}
          </p>
        )}
        <h1
          className={
            size === "large"
              ? "max-w-4xl font-poster text-5xl leading-[1.05] text-red sm:text-7xl"
              : "max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
          }
        >
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
        {children}
      </Container>

      {/* Horizon. The fence sits on the hill's crown, as on the sample poster. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0">
        <div className="fence h-4 w-full opacity-70" />
        <div className="hill h-10 w-full" />
      </div>
    </section>
  );
}
