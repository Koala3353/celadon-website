import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { FloatingApplyButton } from "@/components/internal/floating-apply-button";
import { BackLink } from "@/components/internal/back-link";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";
import { CTA_WAVE2_APPLICATION_FORM_URL } from "@/lib/core-team-wave2";
import { CELABALL } from "@/lib/cta-projects-wave2";

export const metadata: Metadata = {
  title: "Celaball — Core Team Applications Wave 2",
  robots: { index: false, follow: false },
};

// The doc is set in Garamond throughout; EB Garamond is its web stand-in.
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

/*
 * Sunset palette from the doc: amber, orange, coral and a soft teal on
 * white and cream. Those exact values stay on fills, dividers and the big
 * decorative characters; text that has to be read at body size uses a
 * deeper shade of the same hue, since the originals are too light on white.
 */
const P = CELABALL.palette;
const INK = "#1F1F1F";
const TEXT = {
  amber: "#B8641A",
  orange: "#B8641A",
  coral: "#C4503C",
  teal: "#3F7F8B",
};
const TILE = [
  { bg: "#FDE5DF", rule: P.coral, ink: TEXT.coral },
  { bg: "#E4F1F3", rule: P.teal, ink: TEXT.teal },
  { bg: "#FDEBCF", rule: P.amber, ink: TEXT.amber },
];

function Heading({
  children,
  color,
  className,
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
}) {
  return (
    <h2 className={cn("text-3xl font-bold sm:text-4xl", className)} style={{ color }} data-reveal>
      {children}
    </h2>
  );
}

function Stars({ color, className }: { color: string; className?: string }) {
  return (
    <p aria-hidden className={cn("select-none tracking-[0.3em]", className)} style={{ color }}>
      ✮ ⋆ ˚｡ ⋆｡°✩
    </p>
  );
}

function Bullets({ items, color = INK }: { items: string[]; color?: string }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 leading-snug" style={{ color }}>
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "currentColor" }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CelaballProjectPage() {
  const project = CELABALL;
  const [aboutLead, aboutRest] = project.about;

  return (
    <div
      className={cn(ebGaramond.className, "text-[17px] leading-relaxed")}
      style={
        {
          // Read by the floating Apply button and BackLink.
          "--dept-accent": "#B5601A",
          "--dept-tint": P.cream,
          "--dept-ink": "#4A2A0E",
          color: INK,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <section className="relative overflow-hidden" style={{ backgroundColor: P.cream }}>
        <BackLink href="/internal/cta-wave2" label="All Projects" />
        <Reveal>
          <Image
            src={asset(project.heroImage.src)}
            alt={project.heroImage.alt}
            width={1600}
            height={900}
            priority
            data-reveal
            className="max-h-[60vh] w-full object-cover"
          />
        </Reveal>
      </section>

      {/* What is Celaball? */}
      <section className="relative overflow-hidden bg-white py-12 sm:py-16">
        {/* The doc's drifting sunset clouds, behind this section's text. */}
        <Image
          src={asset("/internal/cta-wave2/cb-cloud.webp")}
          alt=""
          aria-hidden
          width={487}
          height={360}
          className="pointer-events-none absolute -right-10 -top-6 w-[22rem] opacity-50 mix-blend-multiply sm:w-[30rem]"
        />
        <Container className="relative">
          <Reveal className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-12">
            <div className="flex flex-col gap-4 text-left">
              <Heading color={TEXT.amber}>What is Celaball?</Heading>
              <p className="font-bold italic" data-reveal>
                <span aria-hidden style={{ color: P.amber }}>
                  ★{" "}
                </span>
                {project.date}
              </p>
              <p data-reveal>
                {aboutLead.map((run, i) =>
                  run.bold ? (
                    <strong
                      key={i}
                      className="text-xl font-bold"
                      style={{ color: run.text === "Celaball" ? TEXT.amber : TEXT.teal }}
                    >
                      {run.text}
                    </strong>
                  ) : (
                    <span key={i}>{run.text}</span>
                  )
                )}
              </p>
              <p data-reveal>{aboutRest.map((run) => run.text).join("")}</p>
              <div className="pt-2" data-reveal>
                <a
                  href={CTA_WAVE2_APPLICATION_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable inline-flex items-center gap-2 rounded-full px-7 py-3 text-base font-bold uppercase tracking-wider shadow-[var(--shadow-md)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ backgroundColor: P.amber, color: "#3B2207", outlineColor: TEXT.amber }}
                >
                  Apply Now <span aria-hidden>&#8599;</span>
                </a>
              </div>
            </div>
            <div className="relative aspect-[1654/962] w-full overflow-hidden rounded-2xl shadow-[var(--shadow-md)]" data-reveal>
              <Image
                src={asset("/internal/cta-wave2/cb-what-is.webp")}
                alt="Guests seated at round tables under a draped ceiling at a past Celadon Ball"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Dear Applicant */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: P.cream }}>
        <Container>
          <Reveal className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-[1fr_1.2fr] md:gap-12">
            <div className="flex flex-col gap-5">
              <Heading color={TEXT.orange}>Dear Applicant,</Heading>
              <div className="relative aspect-[1648/962] w-full overflow-hidden rounded-2xl shadow-[var(--shadow-md)]" data-reveal>
                <Image
                  src={asset("/internal/cta-wave2/cb-letter.webp")}
                  alt="Celadon members dancing in formal wear at a past Celadon Ball"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 text-left md:pt-14">
              {project.letter.map((p) => (
                <p key={p} data-reveal>
                  {p}
                </p>
              ))}
              <p className="mt-2" data-reveal>
                {project.letterSignoff.closing}
              </p>
              <p className="text-lg font-bold" style={{ color: TEXT.amber }} data-reveal>
                {project.letterSignoff.names}
              </p>
              <p className="-mt-3 italic" data-reveal>
                {project.letterSignoff.role}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Jia Yuan — this year's theme */}
      <section className="bg-white py-12 sm:py-16">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <div className="flex items-center gap-3" data-reveal>
              <Image
                src={asset("/internal/cta-wave2/cb-butterfly.webp")}
                alt=""
                aria-hidden
                width={736}
                height={736}
                className="h-16 w-16 mix-blend-multiply sm:h-20 sm:w-20"
              />
              <div className="text-left">
                <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: TEXT.amber }}>
                  {project.theme.name} ({project.theme.chinese})
                </h2>
                <p className="text-xl font-bold" style={{ color: TEXT.amber }}>
                  {project.theme.subtitle}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal stagger={80} className="mx-auto mt-10 grid w-full max-w-4xl gap-10 sm:grid-cols-2">
            {project.theme.parts.map((part) => {
              const glyphColor = part.tone === "teal" ? P.teal : P.coral;
              const labelColor = part.tone === "teal" ? TEXT.teal : TEXT.coral;
              return (
                <div key={part.romanized} className="flex flex-col gap-3 text-left" data-reveal>
                  <p className="flex items-end gap-2">
                    <span lang="zh-Hant" className="text-7xl leading-none" style={{ color: glyphColor }}>
                      {part.glyph}
                    </span>
                    <span className="pb-1 text-lg font-bold" style={{ color: labelColor }}>
                      {part.romanized} <span aria-hidden>♡</span>
                      <span className="sr-only">—</span> {part.meaning}
                    </span>
                  </p>
                  <p>{part.body}</p>
                </div>
              );
            })}
          </Reveal>
          <Reveal className="mx-auto mt-10 w-full max-w-4xl">
            <p className="rounded-2xl px-6 py-5 text-center" style={{ backgroundColor: P.cream }} data-reveal>
              {project.theme.together[0].map((run, i) =>
                run.bold ? (
                  <strong key={i} className="font-bold">
                    {run.text}
                  </strong>
                ) : (
                  <span key={i}>{run.text}</span>
                )
              )}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Our Objectives */}
      <section className="bg-white pb-12 sm:pb-16">
        <Container>
          <Reveal className="mx-auto w-full max-w-4xl">
            <Stars color={P.amber} className="text-center text-lg" />
            <div className="mt-6 text-left">
              <Heading color={TEXT.coral}>Our Objectives</Heading>
            </div>
          </Reveal>
          <Reveal stagger={80} className="mx-auto mt-6 grid w-full max-w-4xl gap-8 sm:grid-cols-2">
            {project.objectives.map((obj) => (
              <div key={obj.title} className="flex flex-col gap-2 text-left" data-reveal>
                <h3 className="text-xl font-bold" style={{ color: TEXT.teal }}>
                  {obj.title}:
                </h3>
                <Bullets items={[obj.body]} />
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Project Timeline */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: P.cream }}>
        <Container>
          <div className="mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
            <Reveal className="order-2 flex flex-col md:order-1">
              {project.timeline.map((row) =>
                row.proper ? (
                  <p
                    key={row.label}
                    className="border-y py-4 text-xl font-bold leading-snug sm:text-2xl"
                    style={{ color: TEXT.coral, borderColor: P.coral }}
                    data-reveal
                  >
                    {row.date} : {row.label}
                  </p>
                ) : (
                  <p key={row.label} className="border-b py-3 leading-snug" style={{ borderColor: `${P.amber}80` }} data-reveal>
                    <strong className="font-bold" style={{ color: TEXT.orange }}>
                      {row.date}:
                    </strong>{" "}
                    {row.label}
                  </p>
                )
              )}
            </Reveal>
            <Reveal className="order-1 flex flex-col items-center text-center md:order-2 md:items-end md:text-right">
              <h2 className="text-4xl font-bold leading-tight sm:text-5xl" style={{ color: TEXT.teal }} data-reveal>
                Project
                <br />
                Timeline
              </h2>
              <Stars color={TEXT.orange} className="mt-2 text-sm" />
              <Image
                src={asset("/internal/cta-wave2/cb-moon.webp")}
                alt=""
                aria-hidden
                width={700}
                height={700}
                data-reveal
                className="mt-4 hidden w-48 mix-blend-multiply md:block"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Who are we looking for? */}
      <section className="bg-white py-12 sm:py-16">
        <Container>
          <Reveal className="mx-auto w-full max-w-5xl text-left">
            <Heading color={TEXT.orange}>Who are we looking for?</Heading>
            <p className="mt-3" data-reveal>
              {project.lookingFor}
            </p>
          </Reveal>
          <Reveal stagger={60} className="mx-auto mt-8 grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.committees.map((committee, i) => {
              const tone = TILE[i % TILE.length];
              return (
                <div
                  key={committee.name}
                  className="flex flex-col gap-3 rounded-2xl border-t-4 p-5 text-left"
                  style={{ backgroundColor: tone.bg, borderColor: tone.rule }}
                  data-reveal
                >
                  <div>
                    <h3 className="text-xl font-bold leading-tight" style={{ color: tone.ink }}>
                      {committee.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold">{committee.count}</p>
                  </div>
                  <Bullets items={committee.items} />
                  {committee.requirement && (
                    <div className="mt-1 text-[15px]">
                      <p className="italic">Requirement:</p>
                      <ul className="mt-1 flex flex-col gap-1 pl-4">
                        <li className="list-[circle]">{committee.requirement.portfolio}</li>
                        <li className="list-[circle]">Alternative: {committee.requirement.alternative}</li>
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </Reveal>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: P.cream }}>
        <Container>
          <Reveal className="mx-auto w-full max-w-3xl text-left">
            <Heading color={TEXT.amber}>FAQs</Heading>
            <div className="mt-6 flex flex-col gap-6">
              {project.faqs.map((faq, i) => (
                <div key={faq.q} data-reveal>
                  <p className="rounded-lg px-4 py-2.5 font-bold" style={{ backgroundColor: P.coral, color: "#3B1A12" }}>
                    {i + 1}. {faq.q}
                  </p>
                  <p className="mt-3 px-1">{faq.a}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Flat white — last section, footer sits directly below. */}
      <section className="bg-white pb-14 pt-12 sm:pb-20 sm:pt-16">
        <Container>
          <Reveal className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
            <Heading color={TEXT.orange}>Contact Us!</Heading>
            <Stars color={P.amber} className="mt-1 text-sm" />
            <p className="mt-4" data-reveal>
              {project.contactsIntro}
            </p>
            <div className="mt-8 grid w-full gap-8 sm:grid-cols-2">
              {project.contacts.map((contact) => (
                <div key={contact.name} className="flex flex-col items-center gap-1" data-reveal>
                  <p>
                    <strong className="font-bold">{contact.name}</strong> | {contact.role}
                  </p>
                  {contact.email && (
                    <p className="text-[15px]">
                      <strong className="font-bold">Email:</strong>{" "}
                      <a
                        href={`mailto:${contact.email}`}
                        className="break-all underline-offset-2 hover:underline"
                        style={{ color: TEXT.teal }}
                      >
                        {contact.email}
                      </a>
                    </p>
                  )}
                  {contact.facebook && (
                    <p className="text-[15px]">
                      <strong className="font-bold">Facebook:</strong>{" "}
                      <a
                        href={contact.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all font-bold underline underline-offset-2 hover:opacity-80"
                        style={{ color: TEXT.teal }}
                      >
                        {contact.facebook.replace(/^https?:\/\/(www\.|web\.)?/, "").replace(/\/$/, "")}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <FloatingApplyButton href={CTA_WAVE2_APPLICATION_FORM_URL} label={`Apply to ${project.name} now`} />
    </div>
  );
}
