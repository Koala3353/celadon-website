import Image from "next/image";
import { asset } from "@/lib/asset";
import type { CoreTeamProject } from "@/lib/core-team-wave";

/**
 * Same card shape as DepartmentCard, minus the link — Core Team projects
 * don't have their own detail page (applicants pick a project + committee
 * directly off this hub), and most don't have a photo yet either, so the
 * cover area shows a placeholder until `project.photo` is filled in.
 */
export function ProjectCard({ project }: { project: CoreTeamProject }) {
  return (
    <div data-reveal className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-sky-navy/10">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-sky-navy/5">
        {project.photo ? (
          <Image
            src={asset(project.photo.src)}
            alt={project.photo.alt}
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover"
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
      <div className="flex flex-1 flex-col gap-1 p-5">
        <span className="sky-display text-lg font-semibold text-sky-navy">{project.name}</span>
        <p className="prose-body mt-2 text-sm text-muted-foreground">{project.blurb}</p>
      </div>
    </div>
  );
}
