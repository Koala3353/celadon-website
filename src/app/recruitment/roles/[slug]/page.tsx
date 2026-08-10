import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { getAllRoleSlugs, getRoleBySlug } from "@/lib/data";

export const revalidate = 900;

export async function generateStaticParams() {
  const slugs = await getAllRoleSlugs().catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = await getRoleBySlug(slug).catch(() => null);
  if (!role) return {};
  return {
    title: role.title,
    description: role.description_rich_text ?? undefined,
  };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-muted-foreground">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function RoleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = await getRoleBySlug(slug).catch(() => null);
  if (!role) notFound();

  const parentHref = role.project ? `/projects/${role.project.slug}` : null;
  const parentLabel = role.project?.title ?? role.department?.name;

  return (
    <>
      <section className="bg-brand text-brand-foreground">
        <Container className="flex flex-col gap-4 py-16">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={role.status === "open" ? "bg-highlight text-highlight-foreground" : undefined}>
              {role.status === "open" ? "Open" : "Closed"}
            </Badge>
            {parentLabel && parentHref ? (
              <Link href={parentHref}>
                <Badge>{parentLabel}</Badge>
              </Link>
            ) : (
              parentLabel && <Badge>{parentLabel}</Badge>
            )}
          </div>
          <h1 className="font-display text-4xl font-medium tracking-tight text-brand-foreground sm:text-5xl">
            {role.title}
          </h1>
          {role.application_deadline && (
            <p className="text-sm text-brand-muted-foreground">
              Application deadline:{" "}
              {new Date(role.application_deadline).toLocaleDateString("en", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="flex flex-col gap-8 lg:col-span-2">
            {role.description_rich_text && (
              <div>
                <h2 className="mb-3 font-display text-2xl font-medium">Overview</h2>
                <p className="whitespace-pre-line text-muted-foreground">
                  {role.description_rich_text}
                </p>
              </div>
            )}

            {role.responsibilities.length > 0 && (
              <div>
                <h2 className="mb-3 font-display text-2xl font-medium">Roles & Responsibilities</h2>
                <BulletList items={role.responsibilities} />
              </div>
            )}

            {role.common_deliverables.length > 0 && (
              <div>
                <h2 className="mb-3 font-display text-2xl font-medium">Common Tasks & Deliverables</h2>
                <BulletList items={role.common_deliverables} />
              </div>
            )}

            {role.qualities.length > 0 && (
              <div>
                <h2 className="mb-3 font-display text-2xl font-medium">Relevant Qualities & Competencies</h2>
                <BulletList items={role.qualities} />
              </div>
            )}

            {role.visual_examples.length > 0 && (
              <div>
                <h2 className="mb-3 font-display text-2xl font-medium">What the work looks like</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {role.visual_examples.map((image, i) => (
                    <div key={i} className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
                      <Image src={image.url} alt={image.alt} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-border p-6 h-fit sticky top-24">
            <p className="text-sm font-medium">Ready to apply?</p>
            {role.status === "open" ? (
              role.project ? (
                <>
                  {role.core_application_link ? (
                    <a
                      href={role.core_application_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Apply as Core
                    </a>
                  ) : null}
                  {role.head_application_link ? (
                    <a
                      href={role.head_application_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-border px-5 py-3 text-center text-sm font-medium transition-colors hover:bg-muted"
                    >
                      Apply as Head
                    </a>
                  ) : null}
                  {!role.core_application_link && !role.head_application_link && (
                    <p className="text-sm text-muted-foreground">Application link coming soon.</p>
                  )}
                </>
              ) : role.application_link ? (
                <a
                  href={role.application_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-foreground px-5 py-3 text-center text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Apply Now
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">Application link coming soon.</p>
              )
            ) : (
              <p className="text-sm text-muted-foreground">This role is currently closed.</p>
            )}
            <Link
              href="/recruitment"
              className="text-center text-sm text-muted-foreground hover:text-foreground"
            >
              &larr; Back to all roles
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
