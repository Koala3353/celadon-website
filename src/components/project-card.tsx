import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ProjectWithDepartment } from "@/lib/types";

/** Rotating roof colours so a grid of cards reads like a row of houses. */
const ROOFS = ["bg-red", "bg-gold", "bg-green", "bg-sky", "bg-peach"] as const;

export function ProjectCard({
  project,
  index = 0,
}: {
  project: ProjectWithDepartment;
  index?: number;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
    >
      <Card className="flex h-full flex-col overflow-hidden transition-transform group-hover:-translate-y-1 group-hover:border-green">
        <div aria-hidden className={`h-2 w-full ${ROOFS[index % ROOFS.length]}`} />

        {project.coverImageUrl ? (
          <div className="relative aspect-video bg-muted">
            <Image
              src={project.coverImageUrl}
              alt={project.coverImageAlt || project.title}
              fill
              sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="gold">{project.year}</Badge>
            {project.department && <Badge tone="sky">{project.department.name}</Badge>}
          </div>

          <h3 className="font-display text-xl font-bold text-ink">{project.title}</h3>

          {project.description && (
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
