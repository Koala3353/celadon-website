/**
 * Content for the Core Team Applications Wave 2 hub (/internal/cta-wave2) —
 * same shape as Wave 1's (core-team-wave.ts), so the hub and its project
 * cards reuse Wave 1's components unchanged.
 *
 * Wave 2's fourth project, CelaBall, is deliberately absent until its
 * content arrives — add it to CORE_TEAM_WAVE2_PROJECTS then.
 */
import type { CoreTeamProject, CoreTeamTimelineItem } from "@/lib/core-team-wave";
import type { AboutRun } from "@/lib/deputy-departments";
import { CELADON_MERCH, MANDOPOP } from "@/lib/cta-projects-wave2";
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
      "Rose Sale, Celadon’s annual Valentine’s fundraising project, celebrates love in all its forms within the Ateneo community. Through customizable bouquets and other love-centered products, it gives everyone a chance to express appreciation for one another.",
    photo: { src: "/internal/cta-wave1/rs-hero.webp", alt: "Rose Sale '27" },
    photoPosition: "90% center",
    href: "/internal/cta-wave2/rose-sale",
  },
  {
    slug: "celadon-merch",
    name: "Celadon Merch",
    // Placeholder until CelaMerch's timeline is sent.
    dates: "Dates to be announced",
    accent: CELADON_MERCH.accent,
    blurb:
      "Celadon Merchandise is a fundraising project that promotes Chinese culture within the Ateneo Community, simultaneously portraying Celadon’s organizational identity.",
    href: "/internal/cta-wave2/celadon-merch",
  },
  {
    slug: "mandopop",
    name: "Mandopop Music Festival",
    emoji: "🎤",
    dates: "March 7, 2027 (tentative)",
    accent: MANDOPOP.cardAccent,
    blurb:
      "Mandopop Music Festival is a one-day concert held outside Ateneo, open to everyone at no cost. Organized by Celadon’s Cultural Affairs Department, the festival celebrates Chinese and Filipino-Chinese music through live performances of familiar favorites and contemporary interpretations of classic songs.",
    photo: { src: "/internal/cta-wave2/mdp-hero.webp", alt: "Mandopop 2027 — Wave 2 Applications" },
    href: "/internal/cta-wave2/mandopop",
  },
];

export const CTA_WAVE2_TIMELINE: CoreTeamTimelineItem[] = [
  { date: "October 7–13, 2026", label: "CTA Wave 2 Duration" },
  { date: "October 13–16, 2026", label: "CTA Wave 2 Extension" },
  { date: "October 9–19, 2026", label: "Interview Dates" },
  { date: "October 21, 2026", label: "Release of Results" },
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
