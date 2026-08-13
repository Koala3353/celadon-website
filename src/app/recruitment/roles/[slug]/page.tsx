import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { formatDeadline } from "@/components/role-card";
import { getAllRoleSlugs, getRoleBySlug } from "@/lib/content";
import type { RoleWithParent } from "@/lib/types";

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

function Block({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <Reveal as="section" stagger={40}>
      <h2 className="display text-2xl text-navy" data-reveal>
        {title}
      </h2>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item, i) => (
          <li
            key={i}
            data-reveal
            className="prose-body flex gap-4 text-muted-foreground"
          >
            <span
              aria-hidden
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-ink"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Reveal>
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
      <PageHero eyebrow={role.project?.title ?? role.department?.name} title={role.title}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="onNavy">
            {isOpen ? "Open" : "Closed"}
          </Badge>
          {deadline && <Badge tone="onNavy">Apply by {deadline}</Badge>}
        </div>
      </PageHero>

      <Container className="grid gap-14 py-20 lg:grid-cols-3">
        <div className="flex flex-col gap-14 lg:col-span-2">
          {role.description && (
            <Reveal as="section">
              <h2 className="display text-2xl text-navy" data-reveal>
                Overview
              </h2>
              <p
                className="prose-body mt-5 whitespace-pre-line text-lg text-muted-foreground"
                data-reveal
              >
                {role.description}
              </p>
            </Reveal>
          )}

          <Block title="Roles & responsibilities" items={role.responsibilities} />
          <Block title="Common tasks & deliverables" items={role.commonDeliverables} />
          <Block title="Qualities & competencies" items={role.qualities} />
        </div>

        <aside className="sticky top-28 flex h-fit flex-col gap-4 rounded-[1.75rem] bg-navy/[0.035] p-1.5 ring-1 ring-inset ring-navy/[0.07]">
          <div className="flex flex-col gap-4 rounded-[1.375rem] bg-white p-6 shadow-[var(--shadow-sm)]">
            <p className="display text-lg text-navy">
              {isOpen ? "Ready to apply?" : "Not open yet"}
            </p>

            {isOpen ? (
              <ApplyLinks role={role} />
            ) : (
              <p className="prose-body text-sm text-muted-foreground">
                Applications for this role aren&apos;t open. Read the
                responsibilities above so you&apos;re ready when they are.
              </p>
            )}

            <Link
              href="/recruitment"
              className="pt-1 text-center text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-navy hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              All roles
            </Link>
          </div>
        </aside>
      </Container>
    </>
  );
}

function ApplyLinks({ role }: { role: RoleWithParent }) {
  // Project committees recruit Core and Head separately; department pools use
  // a single link.
  const links = (
    role.project
      ? [
          role.coreApplicationLink && {
            href: role.coreApplicationLink,
            label: "Apply as Core",
            variant: "primary" as const,
          },
          role.headApplicationLink && {
            href: role.headApplicationLink,
            label: "Apply as Head",
            variant: "outline" as const,
          },
        ]
      : [
          role.applicationLink && {
            href: role.applicationLink,
            label: "Apply now",
            variant: "primary" as const,
          },
        ]
  ).filter(Boolean) as { href: string; label: string; variant: "primary" | "outline" }[];

  if (links.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Application link coming soon.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <ButtonLink
          key={link.href}
          href={link.href}
          variant={link.variant}
          external
          className="justify-between"
        >
          {link.label}
        </ButtonLink>
      ))}
    </div>
  );
}
