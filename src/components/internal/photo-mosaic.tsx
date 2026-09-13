import { SkeletonImage } from "@/components/ui/skeleton-image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

export interface MosaicPhoto {
  src: string;
  alt: string;
  /** Grid span classes applied from `sm:` up — mobile always shows a plain
   * square tile in a 2-column grid, so the asymmetric bento shape only
   * needs to be declared once per photo instead of per breakpoint. */
  span?: string;
}

/**
 * An asymmetric photo grid for decorating a hub page with real event
 * photography — a handful of varied tile sizes read as a curated gallery
 * rather than a uniform thumbnail wall. Reuses the same `lift`/`pressable`
 * hover language as ProjectCard so it feels like the same surface family.
 */
export function PhotoMosaic({ photos, className }: { photos: MosaicPhoto[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4 sm:auto-rows-[9rem] sm:grid-flow-dense sm:gap-4 md:auto-rows-[10.5rem]", className)}>
      {photos.map((photo) => (
        <div
          key={photo.src}
          data-reveal
          className={cn("group lift pressable relative aspect-square sm:aspect-auto", photo.span)}
        >
          <div className="absolute inset-0 overflow-hidden rounded-2xl bg-sky-peach/20">
            <SkeletonImage
              src={asset(photo.src)}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 32vw, 50vw"
              className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-105"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
