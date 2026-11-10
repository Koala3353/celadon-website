import { DEPARTMENTS, type Department } from "@/lib/deputy-departments";

export type MaterialType = "slides" | "doc" | "sheet" | "pdf" | "video" | "other";

export type WorkshopMaterial = {
  label: string;
  type: MaterialType;
  /** A full URL (Google Drive, Docs, etc.) or a site path like "/internal/workshops/file.pdf". */
  href: string;
};

export type Workshop = {
  /** Used as the anchor id, so keep it short and unique. */
  slug: string;
  title: string;
  /** ISO date, "YYYY-MM-DD". */
  date: string;
  time: string;
  venue: string;
  /** Slug of the department that ran it — must match a DEPARTMENTS entry. */
  dept: string;
  description: string;
  topics?: string[];
  poster: { src: string; width: number; height: number };
  materials: WorkshopMaterial[];
};

export const MATERIAL_META: Record<MaterialType, { emoji: string; noun: string }> = {
  slides: { emoji: "📊", noun: "Slides" },
  doc: { emoji: "📄", noun: "Doc" },
  sheet: { emoji: "🧮", noun: "Google Sheet" },
  pdf: { emoji: "📕", noun: "PDF" },
  video: { emoji: "🎥", noun: "Recording" },
  other: { emoji: "📎", noun: "File" },
};

/**
 * Every workshop here is already completed, so this is a repository, not a
 * schedule. Add new ones anywhere in the list — the page sorts newest first.
 */
const WORKSHOPS: Workshop[] = [
  {
    slug: "marketing-pitches-workshop",
    title: "Marketing Packages & Advertising Pitches Workshop",
    date: "2026-10-20",
    time: "5:00 – 7:00 PM",
    venue: "CTC 216",
    dept: "exrel",
    description:
      "The External Relations Department's first workshop of the year, on how to excel in ExRel: putting together agreements and packages that partners say yes to.",
    topics: [
      "Drafting comprehensive Memorandums of Agreement (MOAs)",
      "Ideating attractive Marketing Packages (MPs)",
      "Pitching projects to potential partners",
    ],
    poster: { src: "/internal/workshops/marketing-pitches-workshop.webp", width: 900, height: 1125 },
    materials: [],
  },
  {
    slug: "logistics-workshop",
    title: "Logistics Workshop",
    date: "2026-10-23",
    time: "5:00 – 7:00 PM",
    venue: "CTC 216",
    dept: "fin",
    description:
      "For fresh deputies and logistics core team members of any Celadon project: everything you need to get ahead in the venue-reservation game, so venue stress never gets the best of you.",
    topics: ["CFMO reservation", "CSMO coordination", "FSQA approval", "Product procurement"],
    poster: { src: "/internal/workshops/logistics-workshop.webp", width: 900, height: 1273 },
    materials: [],
  },
  {
    slug: "sheets-workshop",
    title: "Google Sheets Workshop",
    date: "2026-10-27",
    time: "5:00 – 7:00 PM",
    venue: "SOM 304",
    dept: "osr",
    description:
      "OSR's annual Google Sheets workshop, back with brand-new tips, tricks and shortcuts to make you unstoppable at org life and acads.",
    topics: [
      "How formulas work and everyday math",
      "Logical decisions and lookups: IF, COUNTIF, SUMIFS, VLOOKUP and XLOOKUP",
      "Cleaning up text and dates",
      "Data validation: dropdowns, checkboxes and custom formulas",
      "A common-errors cheat sheet and handy keyboard shortcuts",
    ],
    poster: { src: "/internal/workshops/sheets-workshop.webp", width: 900, height: 1125 },
    materials: [
      {
        label: "Workshop spreadsheet",
        type: "sheet",
        href: "https://docs.google.com/spreadsheets/d/15NqJJUEDsjLm-QFfET6Yek-12boLMUHu99ssunbtAFU/edit?usp=sharing",
      },
    ],
  },
  {
    slug: "writing-workshop",
    title: "Writing Workshop",
    date: "2026-11-03",
    time: "5:00 – 7:00 PM",
    venue: "SEC A-210",
    dept: "commpub",
    description:
      "An evening of creative ideation with COMMPUB, with guest speakers and a challenge to make unique writing outputs.",
    topics: ["Talks from guest speakers", "Spiel writing", "CelaZine tips and tricks"],
    poster: { src: "/internal/workshops/writing-workshop.webp", width: 900, height: 1125 },
    materials: [],
  },
  {
    slug: "operations-workshop",
    title: "Operations Workshop: Think in Systems",
    date: "2026-11-06",
    time: "5:00 – 7:30 PM",
    venue: "SOM 205",
    dept: "fin",
    description:
      "The tools that keep a project running smoothly, from the first customer sale to the transaction and finally to pick-up. Work smarter, not harder.",
    topics: ["POS systems", "Automation", "E-commerce", "Profit tracking"],
    poster: { src: "/internal/workshops/operations-workshop.webp", width: 900, height: 1273 },
    materials: [
      {
        label: "Build It Like It's Going to Break",
        type: "pdf",
        href: "/internal/workshops/operations-build-it-like-its-going-to-break.pdf",
      },
    ],
  },
  {
    slug: "ppf-workshop",
    title: "Project Proposal Form (PPF) Workshop",
    date: "2026-11-09",
    time: "5:00 – 7:30 PM",
    venue: "B-206",
    dept: "cul",
    description:
      "How a project gets brought to life. Learn to cook up the perfect Project Proposal Form and kickstart large-scale projects in Celadon, or any initiative you want to push for in an Ateneo organization.",
    poster: { src: "/internal/workshops/ppf-workshop.webp", width: 900, height: 1125 },
    materials: [],
  },
];

export function getWorkshops(): Workshop[] {
  return [...WORKSHOPS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getWorkshopDepartment(workshop: Workshop): Department | undefined {
  return DEPARTMENTS.find((d) => d.slug === workshop.dept);
}

/** "2026-09-14" -> "September 14, 2026". Parsed by hand so the date never
 * shifts a day through a timezone conversion. */
export function formatWorkshopDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Date(year, month - 1, day).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
