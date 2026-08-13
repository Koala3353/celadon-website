import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import { RoleCard } from "@/components/role-card";
import { Reveal } from "@/components/motion/reveal";
import { copy, getRoles } from "@/lib/content";
import type { RoleWithParent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Every Core Team committee and department role at Ateneo Celadon — what " +
    "the work involves, before you apply.",
};

function group<T extends string>(
  roles: RoleWithParent[],
  key: (r: RoleWithParent) => { slug: string; label: T } | null
) {
  const out = new Map<string, { label: T; roles: RoleWithParent[] }>();
  for (const role of roles) {
    const k = key(role);
    if (!k) continue;
    const existing = out.get(k.slug);
    if (existing) existing.roles.push(role);
    else out.set(k.slug, { label: k.label, roles: [role] });
  }
  return out;
}

export default function RecruitmentPage() {
  const roles = getRoles();
  const openCount = roles.filter((r) => r.status === "open").length;

  const byProject = group(roles, (r) =>
    r.project ? { slug: r.project.slug, label: r.project.title } : null
  );
  const byDepartment = group(roles, (r) =>
    r.department ? { slug: r.department.slug, label: r.department.name } : null
  );

  return (
    <>
      <PageHero
        eyebrow="Recruitment"
        title={copy("recruitment_heading")}
        description={copy("recruitment_body")}
      >
        <p className="text-sm font-bold uppercase tracking-wider text-link-navy">
          {openCount > 0
            ? `${openCount} open now · ${roles.length} documented`
            : `Applications aren't open yet · all ${roles.length} roles documented`}
        </p>
      </PageHero>

      <Container className="flex flex-col gap-20 py-20">
        {byProject.size > 0 && (
          <section className="flex flex-col gap-12">
            <Reveal>
              <h2 className="display text-3xl text-navy sm:text-4xl" data-reveal>
                Core Team committees
              </h2>
            </Reveal>

            {Array.from(byProject.entries()).map(([slug, g]) => (
              <Reveal key={slug} stagger={50} className="flex flex-col gap-4">
                <Link
                  href={`/projects/${slug}`}
                  data-reveal
                  className="w-fit text-lg font-extrabold text-link underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                  {g.label}
                </Link>
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {g.roles.map((role) => (
                    <li key={role.slug}>
                      <RoleCard role={role} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </section>
        )}

        {byDepartment.size > 0 && (
          <section className="flex flex-col gap-12">
            <Reveal>
              <h2 className="display text-3xl text-navy sm:text-4xl" data-reveal>
                Department pools
              </h2>
            </Reveal>

            {Array.from(byDepartment.entries()).map(([slug, g]) => (
              <Reveal key={slug} stagger={50} className="flex flex-col gap-4">
                <Link
                  href={`/departments#${slug}`}
                  data-reveal
                  className="w-fit text-lg font-extrabold text-link underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                  {g.label}
                </Link>
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {g.roles.map((role) => (
                    <li key={role.slug}>
                      <RoleCard role={role} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </section>
        )}

        {roles.length === 0 && (
          <p className="text-muted-foreground">No roles published yet.</p>
        )}
      </Container>
    </>
  );
}
