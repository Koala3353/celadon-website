import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import type { Department } from "@/lib/deputy-departments";

export function DepartmentCard({ dept }: { dept: Department }) {
  return (
    <Link
      href={`/internal/dept-apps/${dept.slug}`}
      data-reveal
      className="pressable group flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-inset ring-sky-navy/10 transition-shadow hover:shadow-[var(--shadow-md)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-navy"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
        <Image
          src={asset(dept.cardCover.src)}
          alt=""
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{dept.emoji}</span>
          <span className="sky-display text-lg font-semibold text-sky-navy">{dept.name}</span>
        </div>
        <span className="text-sm text-muted-foreground">{dept.fullName}</span>
        <p className="prose-body mt-2 text-sm text-muted-foreground">{dept.cardBlurb}</p>
      </div>
    </Link>
  );
}
