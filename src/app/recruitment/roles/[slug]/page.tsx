import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/page-hero";
import { formatDeadline } from "@/components/role-card";
import { getAllRoleSlugs, getRoleBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllRoleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) return {};
  return { title: role.title, description: role.description || undefined };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-muted-foreground">
          <span
            aria-hidden
            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <h2 className="mb-4 font-display text-2xl font-bold text-ink">
        <span className="underline-sketch">{title}</span>
      </h2>
      <BulletList items={items} />
    </section>
  );
}

export default async function RoleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  const deadline = formatDeadline(role.applicationDeadline);
  const isOpen = role.status === "open";

  return (
    <>
      <PageHero title={role.title}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={isOpen ? "open" : "closed"}>
            {isOpen ? "Open" : "Closed"}
          </Badge>
          {role.project ? (
            <Link href={`/projects/${role.project.slug}`}>
              <Badge tone="sky">{role.project.title}</Badge>
            </Link>
          ) : (
            role.department && <Badge tone="sky">{role.department.name}</Badge>
          )}
          {deadline && <Badge tone="gold">Apply by {deadline}</Badge>}
        </div>
      </PageHero>

      <Container className="grid gap-12 py-16 lg:grid-cols-3">
        <div className="flex flex-col gap-10 lg:col-span-2">
          {role.description && (
            <section>
              <h2 className="mb-4 font-display text-2xl font-bold text-ink">
                <span className="underline-sketch">Overview</span>
              </h2>
              <p className="whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
                {role.description}
              </p>
            </section>
          )}

          <Block title="Roles & responsibilities" items={role.responsibilities} />
          <Block title="Common tasks & deliverables" items={role.commonDeliverables} />
          <Block title="Qualities & competencies" items={role.qualities} />
        </div>

        <aside className="sticky top-28 flex h-fit flex-col gap-3 rounded-3xl border-2 border-border bg-muted/60 p-6">
          <p className="font-display text-base font-bold text-ink">
            {isOpen ? "Ready to apply?" : "Not open yet"}
          </p>

          {isOpen ? (
            <ApplyLinks role={role} />
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Applications for this role aren&apos;t open. Read through the
              responsibilities above so you&apos;re ready when they are.
            </p>
          )}

          <Link
            href="/recruitment"
            className="pt-2 text-center text-sm text-muted-foreground underline-offset-4 hover:text-ink hover:underline"
          >
            ← All roles
          </Link>
        </aside>
      </Container>
    </>
  );
}

function ApplyLinks({
  role,
}: {
  role: NonNullable<ReturnType<typeof getRoleBySlug>>;
}) {
  const primary = "rounded-full bg-red px-5 py-3 text-center font-display text-sm font-bold text-cream transition-transform hover:-translate-y-0.5";
  const secondary = "rounded-full border-2 border-green px-5 py-3 text-center font-display text-sm font-bold text-green-ink transition-colors hover:bg-green hover:text-cream";

  // Project committees recruit Core and Head separately; department pools
  // use a single link.
  const links = role.project
    ? [
        role.coreApplicationLink && { href: role.coreApplicationLink, label: "Apply as Core", className: primary },
        role.headApplicationLink && { href: role.headApplicationLink, label: "Apply as Head", className: secondary },
      ]
    : [role.applicationLink && { href: role.applicationLink, label: "Apply now", className: primary }];

  const available = links.filter(Boolean) as {
    href: string;
    label: string;
    className: string;
  }[];

  if (available.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Application link coming soon.
      </p>
    );
  }

  return (
    <>
      {available.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={link.className}
        >
          {link.label}
        </a>
      ))}
    </>
  );
}
