import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import type { CoreTeamProject } from "@/lib/core-team-wave";

function ProjectCardCover({ project, linked }: { project: CoreTeamProject; linked: boolean }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-dept-tint">
      {project.photo ? (
        <Image
          src={asset(project.photo.src)}
          alt={project.photo.alt}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className={cn("object-cover", linked && "transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-105")}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 border-2 border-dashed border-dept-ink/15 text-dept-ink/40">
          <span aria-hidden className="text-2xl">
            🖼️
          </span>
          <span className="sky-display eyebrow">Photo coming soon</span>
        </div>
      )}
    </div>
  );
}

function ProjectCardBody({ project }: { project: CoreTeamProject }) {
  return (
    <div className="flex flex-1 flex-col gap-1 p-5">
      <span className="sky-display text-lg font-semibold text-dept-ink">
        {project.name} {project.emoji && <span aria-hidden>{project.emoji}</span>}
      </span>
      <p className="prose-body mt-2 text-sm text-dept-ink/80">{project.blurb}</p>
      {project.href && (
        <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-bold text-dept-accent">
          View project
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      )}
    </div>
  );
}

/**
 * Same card shape as DepartmentCard, themed the same way too — the
 * project's own `accent` (the same one its detail page uses) set once as
 * CSS variables, so the card and the page it links to read as one thread
 * of color rather than a generic navy tile. Becomes a link with a "View
 * project" arrow once a project has its own detail page (`project.href`),
 * otherwise a plain info tile. Most projects don't have a photo yet
 * either, so the cover area shows a placeholder until `project.photo` is
 * filled in.
 */
export function ProjectCard({ project }: { project: CoreTeamProject }) {
  const accentStyle = {
    "--dept-accent": project.accent.base,
    "--dept-tint": project.accent.tint,
    "--dept-ink": project.accent.ink,
  } as React.CSSProperties;

  if (project.href) {
    return (
      <Link
        href={project.href}
        data-reveal
        style={accentStyle}
        className="lift pressable group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-navy"
      >
        {/* overflow-hidden lives here, not on the <a> itself — the hover
            lift's box-shadow is painted on the <a>, and an element clips
            its own shadow if overflow-hidden sits on that same box. */}
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-dept-tint">
          <ProjectCardCover project={project} linked />
          <ProjectCardBody project={project} />
        </div>
      </Link>
    );
  }

  return (
    <div data-reveal style={accentStyle} className="flex h-full flex-col overflow-hidden rounded-2xl bg-dept-tint">
      <ProjectCardCover project={project} linked={false} />
      <ProjectCardBody project={project} />
    </div>
  );
}
