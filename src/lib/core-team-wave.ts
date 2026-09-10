/**
 * Content for the Core Team Applications hub (/internal/cta-wave1) —
 * structured the same way as the deputy hub's own data (deputy-departments.ts),
 * but far smaller since Core Team applicants pick a project + committee
 * rather than reading a whole department page.
 *
 * Card photos are intentionally left unset — real artwork for this wave
 * hasn't been finalized yet — and the UI shows a placeholder in their place
 * until `photo` is filled in per project.
 */
import { CHINESE_NEW_YEAR, JADE_BUSINESS_SUMMIT, ROSE_SALE, SPRING_FILM_FESTIVAL } from "@/lib/cta-projects";
import type { AboutRun } from "@/lib/deputy-departments";

export interface CoreTeamProject {
  slug: string;
  name: string;
  /** Shown beside the name on the project card — not every project has one. */
  emoji?: string;
  blurb: string;
  /** Same accent a project's own detail page is themed with (see
   * cta-projects.ts) — reused here so its card matches, the same way a
   * department's card is themed with its own accent on the deputy hub. */
  accent: { base: string; tint: string; ink: string };
  /** Left unset until this wave's project photos are ready — the project
   * card renders a placeholder instead of a broken image in the meantime. */
  photo?: { src: string; alt: string };
  /** CSS object-position for the card's cover crop — for a banner whose own
   * title text isn't centered in the source art (e.g. Rose Sale's sits
   * toward the right), so the card's narrower 16:10 crop keeps it centered
   * instead of defaulting to the image's literal center. */
  photoPosition?: string;
  /** Set once a project has its own detail page (see cta-projects.ts) — the
   * card becomes a link to it instead of a plain info tile. */
  href?: string;
}

// TODO: replace with the real Wave 1 Google Form link once applications open.
export const CTA_APPLICATION_FORM_URL = "#";

export const CORE_TEAM_PROJECTS: CoreTeamProject[] = [
  {
    slug: "spring-film-festival",
    name: "Spring Film Festival",
    emoji: "🌸",
    accent: SPRING_FILM_FESTIVAL.accent,
    blurb:
      "The Spring Film Festival (SFF) is a three-day event in Shangri-La that showcases cultural workshops, movie screenings, and diverse performances to promote Chinese culture, art, and history to the Filipino-Chinese community.",
    photo: { src: "/internal/cta-wave1/sff-hero.webp", alt: "21st Spring Film Festival 2026-2027 — Year of the Fire Goat" },
    href: "/internal/cta-wave1/spring-film-festival",
  },
  {
    slug: "rose-sale",
    name: "Rose Sale",
    emoji: "🌹",
    accent: ROSE_SALE.accent,
    blurb:
      "Rose Sale, Celadon’s annual Valentine’s fundraising project, celebrates love in all its forms within the Ateneo community. Through customizable bouquets and other love-centered products, it gives everyone a chance to express appreciation for one another.",
    photo: { src: "/internal/cta-wave1/rs-hero.webp", alt: "Rose Sale '27 — Wave 1 Applications" },
    photoPosition: "90% center",
    href: "/internal/cta-wave1/rose-sale",
  },
  {
    slug: "chinese-new-year",
    name: "Chinese New Year",
    emoji: "🧧",
    accent: CHINESE_NEW_YEAR.accent,
    blurb: "Xīn nián kuài lè! 🧧✨ A vibrant celebration where Chinese-Filipino traditions, festive customs, and cherished childhood memories come to life.",
    photo: { src: "/internal/cta-wave1/cny-hero.webp", alt: "Chinese New Year '27 — A Home in Every Hue: Celebrating Culture in Full Color" },
    href: "/internal/cta-wave1/chinese-new-year",
  },
  {
    slug: "jade-business-summit",
    name: "Jade Business Summit",
    accent: JADE_BUSINESS_SUMMIT.accent,
    blurb:
      "Ateneo Celadon's flagship business event: a one-day summit at Escaler Hall bringing seasoned Chinese-Filipino business leaders and rising young founders together with business-minded students.",
    photo: { src: "/internal/cta-wave1/jade-hero.webp", alt: "Jade Business Summit 2026–2027 — Heirlooms & Headstarts" },
    href: "/internal/cta-wave1/jade-business-summit",
  },
];

export interface CoreTeamTimelineItem {
  date: string;
  label: string;
}

export const CTA_TIMELINE: CoreTeamTimelineItem[] = [
  { date: "September 9–18, 2026", label: "Application Duration" },
  { date: "September 12–22, 2026", label: "Interview Dates" },
  { date: "September 25, 2026", label: "Release of Results" },
];

export const CTA_FAQS: { q: string; a: string | AboutRun[][] }[] = [
  {
    q: "Can I apply to more than one project?",
    a: "Yes — there's no limit on how many of the projects above you can apply to.",
  },
  {
    q: "Can I apply to more than one committee?",
    a: "You may apply to up to two committees per project, but you'll only be accepted into one.",
  },
  {
    q: "Do all committees have additional requirements?",
    a: "It depends on the project and committee you're applying to — check each project's own instructions before you apply.",
  },
  {
    q: "What is the difference between a Core Member and a Head?",
    a: "Core Members work closely with their committee to accomplish assigned tasks and contribute to the planning and execution of the project. Heads oversee their committee, delegate responsibilities, track progress, and coordinate with the PMs and other committees.",
  },
  {
    q: "Can I apply as a Department Deputy as well as a Core Team Member at the same time?",
    a: [
      [
        { text: "Yes, it is possible for a member of Ateneo Celadon to be a department deputy as well as a core team member at the same time. However, keep in mind that deputies take on a year-long role in supporting Ateneo Celadon in its different departments which mainly consists of " },
        { text: "project deployment as a core team member of other projects", bold: true },
        { text: " and " },
        { text: "other additional tasks within your chosen department", bold: true },
        { text: "." },
      ],
      [
        { text: "If you are interested in applying as a Department Deputy, more information could be found in this link: " },
        { text: "https://ateneoceladon.com/internal/dept-apps/", href: "https://ateneoceladon.com/internal/dept-apps/" },
        { text: ". Applications are open until September 12, 2026 unless extended." },
      ],
    ],
  },
];
