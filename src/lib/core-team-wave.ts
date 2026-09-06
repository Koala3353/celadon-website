/**
 * Content for the Core Team Applications hub (/internal/cta-wave1) —
 * structured the same way as the deputy hub's own data (deputy-departments.ts),
 * but far smaller since Core Team applicants pick a project + committee
 * rather than reading a whole department page.
 *
 * Project name/blurb text is adapted from each project's entry in
 * content/projects.csv, so it stays consistent with what's already published
 * elsewhere on the site. Card photos are intentionally left unset — real
 * artwork for this wave hasn't been finalized yet — and the UI shows a
 * placeholder in their place until `photo` is filled in per project.
 */

export interface CoreTeamProject {
  slug: string;
  name: string;
  blurb: string;
  /** Left unset until this wave's project photos are ready — the project
   * card renders a placeholder instead of a broken image in the meantime. */
  photo?: { src: string; alt: string };
}

// TODO: replace with the real Wave 1 Google Form link once applications open.
export const CTA_APPLICATION_FORM_URL = "#";

export const CORE_TEAM_PROJECTS: CoreTeamProject[] = [
  {
    slug: "talab-x-faculty-appreciation-week",
    name: "TALAB x Faculty Appreciation Week",
    blurb:
      "TALAB is a yearly school-wide event exploring Chinese-Filipino perspectives under one shared theme, paired with Faculty Appreciation Week, where students thank Ateneo's faculty with gifts and letters.",
  },
  {
    slug: "lunar-lotus-market",
    name: "Lunar Lotus Market",
    blurb:
      "Celadon's week-long cultural bazaar, bringing together artists, local businesses, and concessionaires in a curated marketplace on campus.",
  },
  {
    slug: "leadership-development-program",
    name: "Leadership Development Program",
    blurb:
      "A 3-day, off-campus program that builds members' leadership skills through activity-based modules, experiential learning, and cultural awareness.",
  },
  {
    slug: "binondo-amazing-race",
    name: "Binondo Amazing Race",
    blurb:
      "An interactive competition of team-based challenges set across the Old Chinatown area, highlighting Binondo's significance to Chinese-Filipino culture.",
  },
  {
    slug: "commpub-staffers",
    name: "COMMPUB Staffers",
    blurb:
      "COMMPUB produces creative media and documentation as well as promotional material and event design for Celadon, and oversees the branding and public relations of the organization.",
  },
];

export interface CoreTeamTimelineItem {
  date: string;
  label: string;
}

// TODO: real dates once Wave 1's schedule is finalized.
export const CTA_TIMELINE: CoreTeamTimelineItem[] = [
  { date: "TBD", label: "Application Duration" },
  { date: "TBD", label: "Interview Dates" },
  { date: "TBD", label: "Release of Results" },
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
