import { SkeletonImage } from "@/components/ui/skeleton-image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

export interface ScrollerPhoto {
  src: string;
  alt: string;
}

/**
 * A horizontally scrollable strip of event photos for decorating a hub
 * page — unlike a fixed grid, it scales to any number of photos without
 * needing its layout re-planned each time one is added or removed. Native
 * scroll-snap gives free momentum/snapping with no JS, and each tile reuses
 * the same lift/pressable hover language as ProjectCard.
 */
export function PhotoScroller({ photos, className }: { photos: ScrollerPhoto[]; className?: string }) {
  return (
    <div className={cn("no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-5", className)}>
      {photos.map((photo) => (
        <div
          key={photo.src}
          data-reveal
          className="group lift pressable w-64 shrink-0 snap-start sm:w-72"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sky-peach/20 shadow-[var(--shadow-sm)]">
            <SkeletonImage
              src={asset(photo.src)}
              alt={photo.alt}
              fill
              sizes="(min-width: 640px) 288px, 256px"
              className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-105"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
