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

export interface CoreTeamProject {
  slug: string;
  name: string;
  blurb: string;
  /** Left unset until this wave's project photos are ready — the project
   * card renders a placeholder instead of a broken image in the meantime. */
  photo?: { src: string; alt: string };
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
    blurb:
      "Spring Film Festival (SFF) bridges both tradition and modernity by celebrating traditional values, art, and culture while integrating modern touches and elements to engage the present generation.",
    photo: { src: "/internal/cta-wave1/sff-hero.webp", alt: "21st Spring Film Festival 2026-2027 — Year of the Fire Goat" },
    href: "/internal/cta-wave1/spring-film-festival",
  },
  {
    slug: "rose-sale",
    name: "Rose Sale",
    blurb:
      "Rose Sale, Celadon’s annual Valentine’s fundraising project, celebrates love in all its forms within the Ateneo community while supporting its advocacy program. Through customizable bouquets and other love centered products, the project provides members and non members of Ateneo Celadon alike a chance to express appreciation for one another.",
    photo: { src: "/internal/cta-wave1/rs-hero.webp", alt: "Rose Sale '27 — Wave 1 Applications" },
    href: "/internal/cta-wave1/rose-sale",
  },
  {
    slug: "chinese-new-year",
    name: "Chinese New Year",
    blurb:
      "Xīn nián kuài lè! 🧧✨ Chinese New Year 2027 presents: “A Home in Every Hue: Celebrating Culture in Full Color,” a vibrant celebration where traditions, festive customs, and cherished childhood memories come to life.",
    photo: { src: "/internal/cta-wave1/cny-hero.webp", alt: "Chinese New Year '27 — A Home in Every Hue: Celebrating Culture in Full Color" },
    href: "/internal/cta-wave1/chinese-new-year",
  },
  {
    slug: "jade-business-summit",
    name: "Jade Business Summit",
    blurb:
      "The Jade Business Summit is Ateneo Celadon's flagship business event: a one-day summit at Escaler Hall that brings seasoned Chinese-Filipino business leaders and rising young founders together with business-minded students from Ateneo and partner schools through insightful lectures, panel discussions, a networking opportunity, and a pitch workshop that challenges participants to collaborate in developing and presenting SMART business ideas before a panel of ADMU professors.",
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

export const CTA_FAQS: { q: string; a: string }[] = [
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
];
