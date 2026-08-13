import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ProjectWithDepartment } from "@/lib/types";

export function ProjectCard({ project }: { project: ProjectWithDepartment }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-reveal
      className="group rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
    >
      <Card
        className="lift h-full"
        innerClassName="flex h-full flex-col overflow-hidden"
      >
        {project.coverImageUrl ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.375rem] bg-navy-tint">
            <Image
              src={project.coverImageUrl}
              alt={project.coverImageAlt || project.title}
              fill
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        ) : (
          // No cover art: a navy plate carrying the crest as a watermark. The
          // year is already on the badge below, so repeating it here just said
          // the same thing twice in every card.
          <div className="navy-field relative aspect-[16/10] overflow-hidden rounded-t-[1.375rem]">
            <Image
              src={asset("/brand/dreagle-white.png")}
              alt=""
              width={800}
              height={670}
              className="absolute -bottom-6 -right-4 h-[130%] w-auto opacity-[0.09]"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="navy">{project.year}</Badge>
            {project.department && <Badge>{project.department.name}</Badge>}
          </div>

          <h3 className="text-lg font-extrabold leading-tight text-navy">
            {project.title}
          </h3>

          {project.description && (
            <p className="prose-body line-clamp-3 text-sm text-muted-foreground">
              {project.description}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
