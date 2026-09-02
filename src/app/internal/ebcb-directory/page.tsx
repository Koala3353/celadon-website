import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { SkyHero } from "@/components/internal/sky-hero";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { DEPARTMENTS, EBCB_LEADERSHIP, type DeptContact } from "@/lib/deputy-departments";

// Deterministic per-name tilt so the wall of avatars doesn't read as a rigid
// grid — same "broken grid" technique the brand book's sub-brand allows for
// a fun, application-oriented section, applied with a tiny, non-distracting
// range so it stays readable and doesn't feel jittery.
function tiltFor(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return ((hash % 5) - 2) * 0.6; // -2.4deg .. 2.4deg
}

export const metadata: Metadata = {
  title: "EBCB Directory",
  robots: { index: false, follow: false },
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function ContactCard({ contact }: { contact: DeptContact }) {
  const tilt = tiltFor(contact.name);
  return (
    <div
      data-reveal
      className="lift group flex flex-col items-center gap-2.5 rounded-[1.5rem] bg-white/70 p-5 text-center ring-1 ring-inset ring-sky-navy/10 backdrop-blur-sm"
    >
      <div
        className="rounded-full bg-white p-1 shadow-[var(--shadow-sm)] ring-1 ring-inset ring-sky-navy/10 transition-transform duration-300 ease-[var(--ease-out)] group-hover:rotate-0"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        {contact.photo ? (
          <Image
            src={asset(contact.photo)}
            alt={contact.name}
            width={112}
            height={112}
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sky-navy/10">
            <span className="sky-display text-2xl text-sky-navy/60">{initials(contact.name)}</span>
          </div>
        )}
      </div>
      <p className="font-bold text-sky-navy">{contact.name}</p>
      <p className="text-sm text-muted-foreground">{contact.role}</p>
      <p className="text-sm">
        {contact.facebook && (
          <a
            href={contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link underline-offset-2 hover:underline"
          >
            Facebook
          </a>
        )}
        {contact.facebook && contact.email && " | "}
        {contact.email && (
          <a href={`mailto:${contact.email}`} className="text-link underline-offset-2 hover:underline">
            Email
          </a>
        )}
      </p>
    </div>
  );
}

function DirectorySection({
  emoji,
  heading,
  contacts,
  tone,
}: {
  emoji: string;
  heading: string;
  contacts: DeptContact[];
  tone: "white" | "tint";
}) {
  return (
    <section className={cn("py-14 sm:py-16", tone === "tint" && "bg-sky-blue/[0.06]")}>
      <Container className="flex flex-col gap-8">
        <Reveal className="mx-auto w-full max-w-5xl">
          <h2 className="sky-display flex items-center gap-2 text-2xl font-semibold text-sky-navy sm:text-3xl" data-reveal>
            <span aria-hidden>{emoji}</span> {heading}
          </h2>
        </Reveal>
        <Reveal stagger={60} className="mx-auto grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <ContactCard key={contact.name} contact={contact} />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

export default function EbcbDirectoryPage() {
  return (
    <>
      <SkyHero
        title="EBCB Directory"
        description="Everyone who keeps Celadon running — reach out any time."
        backgroundImage="/internal/ebcb/directory-hero.webp"
      />

      <div className="sky-tint-field">
        <DirectorySection emoji="👑" heading="Office of the President" contacts={EBCB_LEADERSHIP} tone="white" />

        {DEPARTMENTS.map((dept, i) => (
          <DirectorySection
            key={dept.slug}
            emoji={dept.emoji}
            heading={`${dept.fullName} Department`}
            contacts={dept.contacts}
            tone={i % 2 === 0 ? "tint" : "white"}
          />
        ))}
      </div>
    </>
  );
}
