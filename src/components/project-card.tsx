"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/card";
import { PhotoCarousel } from "@/components/photo-carousel";
import { formatExecutionDate } from "@/lib/format";
import type { ProjectWithDepartment } from "@/lib/types";

/** "September 2026" or, for a project that runs more than once, "September
 * 2026 · February 2027". Empty string if the Sheet hasn't set a date yet. */
function executionLabel(dates: string[]): string {
  return dates.map(formatExecutionDate).join(" · ");
}

/**
 * A grid tile that opens as an overlay on click — a bigger version of the
 * same picture-then-text layout, floating over a darkened backdrop, rather
 * than a separate page or an in-grid expansion.
 */
export function ProjectCard({ project }: { project: ProjectWithDepartment }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        data-reveal
        className="group block w-full rounded-[1.75rem] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
      >
        <Card className="lift h-full" innerClassName="flex h-full flex-col overflow-hidden">
          <ProjectImage project={project} className="aspect-[16/10]" />

          <div className="flex flex-1 flex-col gap-3 p-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-extrabold leading-tight text-navy">
                {project.title}
              </h3>
              {project.executionDates.length > 0 && (
                <span className="text-xs font-bold uppercase tracking-wider text-accent-ink">
                  {executionLabel(project.executionDates)}
                </span>
              )}
            </div>

            {project.description && (
              <p className="prose-body line-clamp-3 whitespace-pre-line text-sm text-muted-foreground">
                {project.description}
              </p>
            )}

            <p className="mt-auto pt-3 text-xs font-bold uppercase tracking-wider text-link">
              Read more
            </p>
          </div>
        </Card>
      </button>

      {open && <ProjectOverlay project={project} onClose={() => setOpen(false)} />}
    </>
  );
}

function ProjectOverlay({
  project,
  onClose,
}: {
  project: ProjectWithDepartment;
  onClose: () => void;
}) {
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-8"
      style={{ zIndex: "var(--z-overlay)" }}
    >
      {/* Darkened backdrop over the rest of the page. */}
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
      />

      <Card
        className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto"
        innerClassName="flex flex-col overflow-hidden"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="pressable absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-white backdrop-blur-sm transition-colors hover:bg-ink/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <ProjectGallery project={project} className="aspect-[16/10] sm:aspect-[2/1]" />

        <div className="flex flex-col gap-3 p-6 sm:p-8">
          <div className="flex flex-col gap-1">
            <h3 className="display text-2xl text-navy sm:text-3xl">{project.title}</h3>
            {project.executionDates.length > 0 && (
              <span className="text-xs font-bold uppercase tracking-wider text-accent-ink">
                {executionLabel(project.executionDates)}
              </span>
            )}
          </div>
          {project.description && (
            <p className="prose-body whitespace-pre-line text-base text-muted-foreground">
              {project.description}
            </p>
          )}
        </div>
      </Card>
    </div>,
    document.body
  );
}

function ProjectImage({
  project,
  className,
}: {
  project: ProjectWithDepartment;
  className?: string;
}) {
  if (!project.coverImageUrl) return <NoCoverPlate className={className} />;

  return (
    <div className={cn("relative shrink-0 overflow-hidden bg-navy-tint", className)}>
      <Image
        src={project.coverImageUrl}
        alt={project.coverImageAlt || project.title}
        fill
        sizes="(min-width: 640px) 36rem, 100vw"
        className="object-cover"
      />
    </div>
  );
}

/**
 * The overlay's image area: the cover photo plus any additional photos from
 * the Sheet's `photos` column, browsable as a carousel. The grid card behind
 * it keeps showing just the cover (via ProjectImage) — the carousel is only
 * for once someone has actually opened the project.
 */
function ProjectGallery({
  project,
  className,
}: {
  project: ProjectWithDepartment;
  className?: string;
}) {
  const gallery = [project.coverImageUrl, ...project.photos].filter(
    (url): url is string => Boolean(url)
  );

  if (gallery.length === 0) return <NoCoverPlate className={className} />;

  return (
    <PhotoCarousel
      photos={gallery}
      alt={project.coverImageAlt || project.title}
      className={cn("shrink-0", className)}
    />
  );
}

// No cover art: a navy plate carrying the crest as a watermark.
function NoCoverPlate({ className }: { className?: string }) {
  return (
    <div className={cn("navy-field relative shrink-0 overflow-hidden", className)}>
      <Image
        src={asset("/brand/dreagle-white.png")}
        alt=""
        width={800}
        height={670}
        className="absolute -bottom-6 -right-4 h-[130%] w-auto opacity-[0.09]"
      />
    </div>
  );
}
