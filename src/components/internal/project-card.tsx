import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import type { CoreTeamProject } from "@/lib/core-team-wave";

function ProjectCardCover({ project, linked }: { project: CoreTeamProject; linked: boolean }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-sky-navy/5">
      {project.photo ? (
        <Image
          src={asset(project.photo.src)}
          alt={project.photo.alt}
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className={cn("object-cover", linked && "transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-105")}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 border-2 border-dashed border-sky-navy/15 text-sky-navy/40">
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
      <span className="sky-display text-lg font-semibold text-sky-navy">
        {project.name} {project.emoji && <span aria-hidden>{project.emoji}</span>}
      </span>
      <p className="prose-body mt-2 text-sm text-muted-foreground">{project.blurb}</p>
      {project.href && (
        <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-bold text-sky-blue">
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
 * Same card shape as DepartmentCard — becomes a link with a "View project"
 * arrow once a project has its own detail page (`project.href`), otherwise
 * a plain info tile. Most projects don't have a photo yet either, so the
 * cover area shows a placeholder until `project.photo` is filled in.
 */
export function ProjectCard({ project }: { project: CoreTeamProject }) {
  if (project.href) {
    return (
      <Link
        href={project.href}
        data-reveal
        className="lift pressable group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-sky-navy/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-navy"
      >
        <ProjectCardCover project={project} linked />
        <ProjectCardBody project={project} />
      </Link>
    );
  }

  return (
    <div data-reveal className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-sky-navy/10">
      <ProjectCardCover project={project} linked={false} />
      <ProjectCardBody project={project} />
    </div>
  );
}
