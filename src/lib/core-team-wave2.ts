/**
 * Content for the Core Team Applications Wave 2 hub (/internal/cta-wave2) —
 * same shape as Wave 1's (core-team-wave.ts), so the hub and its project
 * cards reuse Wave 1's components unchanged.
 *
 * Four projects: Rose Sale, Celadon Merch, Mandopop and CelaBall.
 */
import type { CoreTeamProject, CoreTeamTimelineItem } from "@/lib/core-team-wave";
import type { AboutRun } from "@/lib/deputy-departments";
import { CELABALL, CELADON_MERCH, MANDOPOP } from "@/lib/cta-projects-wave2";
import { ROSE_SALE } from "@/lib/cta-projects";

export const CTA_WAVE2_APPLICATION_FORM_URL = "https://forms.gle/VTQZpGMPMekgwhck8";

export const CORE_TEAM_WAVE2_PROJECTS: CoreTeamProject[] = [
  {
    slug: "rose-sale",
    name: "Rose Sale",
    emoji: "🌹",
    dates: "February 9–13, 2027",
    accent: ROSE_SALE.accent,
    blurb:
      "Rose Sale, Celadon’s annual Valentine’s fundraising project, celebrates love in all its forms within the Ateneo community while supporting its advocacy program. Through customizable bouquets and other love-centered products, it gives members and non-members alike a chance to express appreciation for one another.",
    photo: { src: "/internal/cta-wave2/rs-hero.webp", alt: "Rose Sale '27 — Wave 2 Applications" },
    photoPosition: "90% center",
    href: "/internal/cta-wave2/rose-sale",
  },
  {
    slug: "celadon-merch",
    name: "Celadon Merch",
    // Merch Selling, from the project timeline.
    dates: "February 2–5, 2027",
    accent: CELADON_MERCH.accent,
    photo: { src: "/internal/cta-wave2/cm-hero.webp", alt: "Celadon Merchandise" },
    blurb:
      "Celadon Merchandise promotes Chinese culture within the Ateneo community while portraying Celadon’s organizational identity. Through creative, culture-inspired products, it empowers people to express themselves and their style freely.",
    href: "/internal/cta-wave2/celadon-merch",
  },
  {
    slug: "mandopop",
    name: "Mandopop Music Festival",
    emoji: "🎤",
    dates: "March 7, 2027 (tentative)",
    accent: MANDOPOP.cardAccent,
    blurb:
      "The Mandopop Music Festival is a one-day concert held outside Ateneo, free and open to the public. Under the theme “Beyond the Final Note,” it celebrates Chinese and Filipino-Chinese music through live performances of familiar favorites and fresh takes on classic songs.",
    photo: { src: "/internal/cta-wave2/mdp-hero.webp", alt: "Mandopop 2027 — Wave 2 Applications" },
    href: "/internal/cta-wave2/mandopop",
  },
  {
    slug: "celaball",
    name: "Celadon Ball",
    emoji: "🪩",
    dates: "June 12, 2027",
    accent: CELABALL.cardAccent,
    blurb:
      "Celaball is Ateneo Celadon’s premier culminating event: an elegant night of dining and cultural appreciation celebrating Chinese-Filipino culture, community, and milestones. It brings active members, executive boards, and alumni together as one pamilya.",
    photo: { src: "/internal/cta-wave2/cb-hero.webp", alt: "Celadon Ball — Jia Yuan: Home Across Horizons" },
    href: "/internal/cta-wave2/celaball",
  },
];

/** The hub card's short description, reused at the top of the project's
 * own page so both say the same thing. */
export function wave2Blurb(slug: string): string {
  return CORE_TEAM_WAVE2_PROJECTS.find((project) => project.slug === slug)?.blurb ?? "";
}

export const CTA_WAVE2_TIMELINE: CoreTeamTimelineItem[] = [
  { date: "October 12–19, 2026", label: "CTA Wave 2 Duration" },
  { date: "October 19–21, 2026", label: "CTA Wave 2 Extension" },
  { date: "October 15–22, 2026", label: "Interview Dates" },
  { date: "October 24, 2026", label: "Release of Results" },
];

// Wave 1's FAQ, minus its cross-project cap: Wave 2 has no limit on how
// many positions one applicant can be accepted into across projects.
export const CTA_WAVE2_FAQS: { q: string; a: string | AboutRun[][] }[] = [
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
    a: "Yes, it is possible for a member of Ateneo Celadon to be a department deputy as well as a core team member at the same time.",
  },
];
