/**
 * Detail-page content for Core Team Applications Wave 2 projects. Wave 1's
 * projects live in cta-projects.ts and are left untouched; Rose Sale runs
 * in both waves, so its Wave 2 entry is derived from the Wave 1 one rather
 * than copied.
 */
import type { AboutRun, DeptContact, DeptGroup, DeptTimelineItem } from "@/lib/deputy-departments";
import { ROSE_SALE, type CtaProjectDetail } from "@/lib/cta-projects";

export const COMMPUB_REQUIREMENTS_GUIDE_URL =
  "https://docs.google.com/document/d/1v1f9fZvHbzmIBWXJKkLLCm43MOB3YDo-g0TW1P6c7Rw/edit?tab=t.0";

// ---------------------------------------------------------------- Rose Sale

/**
 * Rose Sale recruits a second, smaller set of committees in Wave 2. Only
 * `committees` changes, plus one FAQ dropped — everything else is Wave 1's
 * entry verbatim, so a later edit to the shared fields (letter, contacts…)
 * reaches both waves without being made twice.
 */
export const ROSE_SALE_WAVE2: CtaProjectDetail = {
  ...ROSE_SALE,
  // The additional-requirements FAQ covers Digital Creatives, Production
  // Design and DocPub, none of which Rose Sale recruits in Wave 2.
  faqs: ROSE_SALE.faqs.filter((faq) => !faq.q.startsWith("Do we need to submit any additional requirements")),
  committees: [
    {
      label: "Sales 🪻 · 2 Heads, 3 Core",
      items: [
        [{ text: "Competencies", bold: true }],
        "Product knowledge and communication skills",
        "Active listener, notices customer preferences, and gives the right recommendations",
        [{ text: "Deliverables", bold: true }],
        "Recruiting ambassadors and enticing curious customers",
        "Selling/roving around throughout the onsite week",
        "Reposting of pubmats, stories, and marketing strategies",
      ],
    },
    {
      label: "Deliveries 🌸 · 2 Heads, 6 Core",
      items: [
        [{ text: "Competencies", bold: true }],
        "Conscious of time",
        "Flexible schedule",
        "Quick to action and can navigate the campus",
        [{ text: "Deliverables", bold: true }],
        "Delivers anonymous orders to students before or after a class",
        "Help pack the bags for the advocacy donation program",
      ],
    },
    {
      label: "Florists 🌻 · 2 Heads, 6 Core",
      items: [
        [{ text: "Competencies", bold: true }],
        "Determined to accomplish their task at hand",
        "Knowledgeable about / willing to learn how to care for and handle flowers",
        "Organized with good time management and cleanliness",
        [{ text: "Deliverables", bold: true }],
        "Managing flower quality and inventory",
        "Communicating with the customer to help them arrange the bouquet they envision at the Bloom Bar, our custom flower bar",
        "Wrap bouquets for onsite and pickup orders",
      ],
    },
  ],
};

// ------------------------------------------------------------ Celadon Merch

export interface CelaMerchContent {
  slug: string;
  name: string;
  fullName: string;
  accent: { base: string; tint: string; ink: string };
  /** Unset until the header artwork arrives — the page shows a text hero. */
  heroImage?: { src: string; alt: string };
  whatIsIt: string;
  welcome: string;
  letter: AboutRun[][];
  letterSignoff: string;
  vision: string;
  thrust: string;
  /** Empty until the timeline arrives — the page shows a placeholder. */
  timeline: DeptTimelineItem[];
  committees: DeptGroup[];
  requirements: DeptGroup[];
  requirementsNote: string;
  faqs: { q: string; a: AboutRun[][] }[];
  contacts: DeptContact[];
}

export const CELADON_MERCH: CelaMerchContent = {
  slug: "celadon-merch",
  name: "Celadon Merch",
  fullName: "Celadon Merchandise",
  // PLACEHOLDER — CelaMerch hasn't chosen its colors yet. A neutral Celadon
  // blue so the page renders; replace with the project's own once sent.
  accent: { base: "#3D5A96", tint: "#EEF2F9", ink: "#1F2D52" },
  whatIsIt:
    "Celadon Merchandise is a fundraising project that promotes Chinese culture within the Ateneo Community, simultaneously portraying Celadon’s organizational identity. Through integrating creativity and culture into its products, this project empowers individuals to express themselves, their preferences, and fashion styles freely.",
  welcome: "Welcome to Celadon Merchandise!",
  letter: [
    [{ text: "Hey Celadoneans!" }],
    [
      {
        text: "Thank you for showing interest in joining our CelaMerch family. Merchandise is an important aspect of organizational publicity and pride. As such, we wish for Ateneans to wear our products with joy and comfort, celebrating the Filipino-Chinese experience.",
      },
    ],
    [
      {
        text: "But to achieve this, we need YOUR help. This project not only proudly showcases the creative identity of Celadoneans, but also nurtures growth and familiarity within and beyond the team, bringing together a holistic community.",
      },
    ],
    [
      {
        text: "We are very excited to see what we'll create together with all of you this year as we look forward to your applications!",
      },
    ],
  ],
  letterSignoff: "- Quisha & Iris",
  vision:
    "To promote Chinese Culture, nurture inclusivity, and create a lasting impact on the market through our merchandise collection.",
  thrust:
    "To elevate the project’s brand image and visibility in the Atenean Community, fostering a space for self-expression and growth",
  timeline: [],
  committees: [
    {
      label: "Logistics · 2 Heads, 4 Core",
      items: [
        "Handles preparing the products",
        "Main roles: Ideating product list, scouting for suppliers, and procuring the products",
        "Head must ensure that the deliverables are on time, the products are of high quality, and the receipts are collected",
        "Core must be knowledgeable in price comparison and negotiating with suppliers",
      ],
    },
    {
      label: "Operations · 3 Core",
      items: [
        "Handles the systems behind the project",
        "Main roles: Creation of the project’s master file, sales trackers, inventory trackers, deliverables tracker, expense trackers, on-site encoder, pick-up tracker, order forms, survey forms, and price list",
        "Core must have basic experience in using Excel, Google Sheets, and Google Forms",
      ],
    },
    {
      label: "Digital Creatives · 8 Core",
      items: [
        "Handles designing the merchandise and publication materials for the project",
        "Main roles: Merch catalogue, DP Blast design, and product designs",
        "Half will be focusing on the merchandise design, other half will be focusing on the publication materials and their postings",
        "Core must be experienced and passionate in drawing and designing",
      ],
    },
    {
      label: "Production Design · 1 Head, 3 Core",
      items: [
        "Handles the physical design materials, e.g., decorations",
        "Main roles: DP blast props, on-site gimmicks, and booth design",
        "Head must have a creative vision and experience",
        "Core must have experience or passion in designing",
      ],
    },
    {
      label: "Documentation & Publications · 4 Core",
      items: [
        "Handles the photo and video shoots of the project",
        "Main roles: Product photoshoot, ideating and recording trendy shorts, DP photoshoot, and publication captions",
        "Core must have experience in photography",
      ],
    },
    {
      label: "Sales · 2 Heads, 6 Core",
      items: [
        "Handles the on-site sales of merchandise",
        "Main roles: Roving around campus, introducing products to passersby, and driving transactions",
        "Must be experienced in sales to ensure foot traffic around the stall",
        "Both heads must be active during the entire selling week",
      ],
    },
  ],
  requirements: [
    {
      label: "Digital Creatives",
      items: ["Portfolio", "Alternative: Merchandise Design Submission (shirts, lanyards, stickers, etc.)"],
    },
    {
      label: "Production Design",
      items: ["Portfolio", "Alternative: Sample Booth Layout"],
    },
    {
      label: "Documentations & Publications",
      items: [
        "Portfolio",
        "Alternative — Photos: Model Shoot Photos (execute or include pegs)",
        "Alternative — Videos: Model Shoot Video Plan",
        "Alternative — Writing: Spiel for Merch Pre-orders Post",
      ],
    },
  ],
  requirementsNote: "Alternative requirements must adhere to the vision and theme of Celadon Merchandise Wave 2.",
  faqs: [
    {
      q: "How heavy is the workload of this project?",
      a: [
        [
          {
            text: "All members of the project will be required to work during the summer break, as starting early will provide us with an allowance for unexpected events in the timeline.",
          },
        ],
        [{ text: "As a core member, the workload per committee will vary." }],
      ],
    },
    {
      q: "What is the most important trait to have for this project?",
      a: [[{ text: "The best trait to have is a mindset focused on growth, discipline, and enjoying every moment!" }]],
    },
    {
      q: "How often will we meet as a core team?",
      a: [[{ text: "We will mostly be working online in the planning phase and on-site in the selling week." }]],
    },
  ],
  // Emails to follow — Facebook only for now.
  contacts: [
    { name: "Quisha Lim", role: "Project Manager", facebook: "https://www.facebook.com/quisha.lim.2025" },
    { name: "Iris Pabiloña", role: "Project Manager", facebook: "https://www.facebook.com/iris.pabilona.3" },
  ],
};

// ----------------------------------------------------------------- Mandopop

export interface MandopopContent {
  slug: string;
  name: string;
  fullName: string;
  /** The project's own 60/30/10 split: dominant navy, secondary red,
   * accent yellow. */
  palette: { dominant: string; secondary: string; accent: string };
  /** For the hub's project card, which sits on a light background. */
  cardAccent: { base: string; tint: string; ink: string };
  heroImage: { src: string; alt: string };
  about: AboutRun[][];
  targetDate: string;
  venue: string;
  letter: string[];
  letterSignoff: { closing: string; names: string; role: string };
  visionHeading: string;
  vision: AboutRun[][];
  whatsInStore: { title: string; body: string }[];
  lookingFor: string[];
  lookingForNote: string;
  timelineNote: string;
  timeline: { period: string; expect: string }[];
  committees: DeptGroup[];
  moodboard: { label: string; url: string };
  requirementsIntro: AboutRun[][];
  requirements: { committee: string; text: string }[];
  faqs: { q: string; a: AboutRun[][] }[];
  contactsIntro: string;
  contacts: DeptContact[];
  closingLine: string;
}

export const MANDOPOP: MandopopContent = {
  slug: "mandopop",
  name: "Mandopop",
  fullName: "Mandopop Music Festival",
  palette: { dominant: "#2A4072", secondary: "#9B3230", accent: "#FBD271" },
  cardAccent: { base: "#9B3230", tint: "#F5ECDA", ink: "#2A4072" },
  // Extracted from the instructions PDF (1095x615) — swap in the original
  // artwork file when it's available for a sharper header.
  heroImage: { src: "/internal/cta-wave2/mdp-hero.webp", alt: "Mandopop 2027 — Wave 2 Applications" },
  about: [
    [
      { text: "Mandopop Music Festival is a one-day concert held outside Ateneo, " },
      { text: "open to everyone at no cost", bold: true },
      {
        text: ". Organized by Celadon’s Cultural Affairs Department, the festival celebrates Chinese and Filipino-Chinese music through live performances of familiar favorites and contemporary interpretations of classic songs.",
      },
    ],
    [
      {
        text: "This year, we’re bringing together music, memories, and fresh perspectives to introduce younger audiences to this musical heritage and connect people of different backgrounds through a shared appreciation of music.",
      },
    ],
  ],
  targetDate: "March 7, 2027 — tentative",
  venue: "To be confirmed; Robinsons Magnolia is being considered.",
  letter: [
    "Whether you grew up hearing these songs at home or are discovering them for the first time, there’s a place for you in Mandopop.",
    "We’re looking for people who want to help bring a concert to life—from working with performers and planning the program to designing the space and capturing its best moments. You don’t have to know every song or have concert experience to contribute. Bring your ideas, curiosity, and willingness to work with others!",
    "We’re excited to build this project with you and create memories that last beyond the final note.",
  ],
  letterSignoff: { closing: "See you backstage,", names: "Aiden and Jerry", role: "Mandopop 2027 Project Managers" },
  visionHeading: "Beyond the Final Note",
  vision: [
    [
      {
        text: "Some songs stay with us long after they end. We hear them at family gatherings, on the radio, or through someone who wants to share a favorite from their younger years. Over time, these songs become part of how we remember people, places, and moments.",
      },
    ],
    [
      { text: "With " },
      { text: "“Beyond the Final Note,”", bold: true },
      {
        text: " we want to celebrate how Chinese and Filipino-Chinese music continues to live through the people who listen to it, share it, and make it their own. By bringing familiar songs and fresh interpretations to the same stage, Mandopop creates opportunities for younger audiences to discover this heritage and for longtime listeners to experience it anew.",
      },
    ],
    [
      {
        text: "Our goal is an enjoyable, welcoming concert that brings different generations and backgrounds together while keeping this musical legacy alive.",
      },
    ],
  ],
  whatsInStore: [
    {
      title: "A concert beyond campus",
      body: "Bring Celadon’s celebration of music to a wider audience through an external venue.",
    },
    {
      title: "Familiar songs, fresh interpretations",
      body: "Explore how performers can give well-loved music their own sound and style.",
    },
    {
      title: "A nostalgic atmosphere",
      body: "Help create a visual world inspired by vintage music posters, neon signage, vinyl records, and cassette tapes.",
    },
    {
      title: "An experience open to everyone at no cost",
      body: "Help make Chinese and Filipino-Chinese music accessible to listeners from different backgrounds.",
    },
  ],
  lookingFor: [
    "Enjoy music, creative projects, or working behind the scenes.",
    "Want to learn more about organizing a live event.",
    "Communicate clearly and follow through on commitments.",
    "Are willing to share ideas, learn new skills, and support their teammates.",
  ],
  lookingForNote: "You don’t need to speak Mandarin or be a performer to help make Mandopop happen!",
  timelineNote:
    "The preparation schedule below is proposed and may change as the venue, performers, and event date are finalized.",
  timeline: [
    { period: "October 7–13, 2026", expect: "CTA Wave 2 applications" },
    { period: "October 21, 2026", expect: "Release of application results" },
    { period: "Late October 2026", expect: "Core team onboarding, first general assembly, and committee planning" },
    {
      period: "November–December 2026",
      expect: "Performer and sponsor outreach, program development, and creative planning",
    },
    {
      period: "January–February 2027",
      expect: "Promotions, registration preparations, production work, and confirmation of event creative planning",
    },
    { period: "Early March 2027", expect: "Final Coordination, technical checks, and dry run" },
    { period: "March 7, 2027 — tentative", expect: "Mandopop Music Festival" },
    { period: "After the event", expect: "Documentation release, evaluation, and project turnover." },
  ],
  committees: [
    {
      label: "Programs (PROG) · 1 Head, 5 Core",
      items: ["Handles program flow", "Writes scripts for the host/s", "Manages stage cues, transitions, and event flow"],
    },
    {
      label: "Logistics (LOG) · 1 Head, 5 Core",
      items: [
        "Procures materials for production design",
        "Assists in transporting people/materials to the venue",
        "Handle ingress and egress during the event",
      ],
    },
    {
      label: "External Relations (ExRel) · 2 Heads, 4 Core",
      items: [
        "Find performers and communicate our event’s vision to them",
        "Main points of communication between the project team and the performers",
        "Find potential cash sponsors",
      ],
    },
    {
      label: "Recruitment and Secretariat (RecSec) · 2 Core",
      items: ["Manage core team onboarding", "Keeps track of attendance and meeting minutes"],
    },
    {
      label: "Production Design (PROD) · 1 Head, 3 Core",
      items: ["Develop a stage design for the event", "Create the background to be displayed for the performance"],
    },
    {
      label: "Digital Creatives (DC) · 1 Head, 4 Core",
      items: [
        "Designs promotional posters and performer feature posts",
        "Creates publication materials for announcements and reminders",
        "Ensures designs follow the event’s brandbook",
      ],
    },
    {
      label: "Documentation and Publications (DocPub) · 2 Heads, 4 Core",
      items: [
        "Takes photos and videos during the event",
        "Creates promotional videos and edits event highlights",
        "Writes captions for social media posts",
      ],
    },
  ],
  moodboard: {
    label: "MDP 2027 Moodboard",
    url: "https://drive.google.com/file/d/1parinSn45TwDDcnWwnXAXt4FAAJvQFZD/view?usp=sharing",
  },
  requirementsIntro: [
    [
      { text: "Applicants for " },
      { text: "Digital Creatives, Production Design, and Documentation and Publications", bold: true },
      { text: " should submit the additional requirements for their chosen committee through the CTA application form." },
    ],
    [
      { text: "A previous portfolio is not necessary:", bold: true },
      {
        text: " the COMMPUB guide provides alternatives for applicants without prior experience. Complete only the option that applies to you.",
      },
    ],
  ],
  requirements: [
    {
      committee: "Digital Creatives",
      text: "Submit 3–5 digital artworks, or create a sample Mandopop poster if you have no prior experience.",
    },
    {
      committee: "Production Design",
      text: "Submit photos of at least two physical art projects with explanations, or a presentation proposing an onsite gimmick, booth design, or DP shoot set.",
    },
    {
      committee: "DocPub",
      text: "Choose at least one area—Photos, Videos, or Writing—and complete its corresponding requirements.",
    },
  ],
  faqs: [
    {
      q: "Do I need to know Mandarin or Chinese music to join?",
      a: [
        [
          {
            text: "No! Familiarity can help, but curiosity and a willingness to learn are welcome. There are many ways to contribute beyond performing.",
          },
        ],
      ],
    },
    {
      q: "Will core team members be performing?",
      a: [
        [
          {
            text: "Core team roles focus on organizing the festival. Performer recruitment is a separate process.",
          },
        ],
      ],
    },
    {
      q: "How often will we meet?",
      a: [
        [
          {
            text: "We plan to hold project-wide general assemblies and committee meetings weekly or as needed. Your committee’s schedule will depend on its tasks and upcoming deadlines.",
          },
        ],
      ],
    },
    {
      q: "What will the workload look like?",
      a: [
        [
          {
            text: "Tasks will vary by committee. Expect more coordination and deliverables as the concert approaches, especially during final preparations, the dry run, and event day.",
          },
        ],
      ],
    },
    {
      q: "Who can apply, and who can attend?",
      a: [
        [
          { text: "Core Team Applications are for " },
          { text: "Celadon members", bold: true },
          { text: ". The concert itself will be " },
          { text: "open to everyone at no cost", bold: true },
          { text: "." },
        ],
      ],
    },
  ],
  contactsIntro: "Have a question about a committee or the project? Reach out to your Mandopop Project Managers!",
  contacts: [
    {
      name: "Aiden Duyongco",
      role: "Project Manager",
      email: "aiden.jaedrick.riley.duyongco@student.ateneo.edu",
      facebook: "https://www.facebook.com/share/1Js7CzdDEr/",
    },
    {
      name: "Jerry Señas",
      role: "Project Manager",
      email: "jerry.senas@student.ateneo.edu",
      facebook: "https://www.facebook.com/jerry.jet.158",
    },
  ],
  closingLine: "Help us create something worth remembering—beyond the final note.",
};
