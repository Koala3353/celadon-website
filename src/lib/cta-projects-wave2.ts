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
 * `committees` changes, plus one FAQ and the timeline's already-past
 * onboarding/application rows dropped — everything else is Wave 1's
 * entry verbatim, so a later edit to the shared fields (letter, contacts…)
 * reaches both waves without being made twice.
 */
export const ROSE_SALE_WAVE2: CtaProjectDetail & {
  committeePhotos: { src: string; alt: string }[];
} = {
  ...ROSE_SALE,
  heroImage: { src: "/internal/cta-wave2/rs-hero.webp", alt: "Rose Sale '27 — Wave 2 Applications" },
  // The additional-requirements FAQ covers Digital Creatives, Production
  // Design and DocPub, none of which Rose Sale recruits in Wave 2.
  faqs: ROSE_SALE.faqs.filter((faq) => !faq.q.startsWith("Do we need to submit any additional requirements")),
  // From the Wave 2 doc's own timeline, minus the rows that are already
  // behind Wave 2 applicants: Release of Wave 1 Results, Heads Onboarding,
  // 1st General Assembly, Committees Onboarding, and the Wave 2
  // Applications row itself. Emphasis follows the doc's colored rows.
  timeline: [
    { date: "November 5, 2026", label: "2nd General Assembly", emphasis: "notable" },
    { date: "TBA", label: "Flower-Wrapping Workshop", emphasis: "notable" },
    { date: "November 16–20, 2026", label: "Finalize Product List, Prices, Sponsorships, and Publication Materials" },
    { date: "December 12, 2026", label: "Order Non-Flower Products" },
    { date: "January 25 – February 8, 2027", label: "Implement Marketing Strategies" },
    { date: "January 25, 2027", label: "Release of Pre-Order Form", emphasis: "critical" },
    { date: "January 30, 2027", label: "Systems Orientation", emphasis: "notable" },
    { date: "February 2, 2027", label: "Sales Workshop", emphasis: "notable" },
    { date: "February 9–15, 2027", label: "Valentine's Onsite Selling Week", emphasis: "critical" },
    { date: "February 27, 2027", label: "Advocacy Program" },
    { date: "March 3, 2027", label: "Post Documentation Album" },
  ],
  // Paired with `committees` by index — the doc puts one photo beside each.
  committeePhotos: [
    { src: "/internal/cta-wave2/rs-committee-sales.webp", alt: "A Rose Sale seller helping a customer pick flowers" },
    { src: "/internal/cta-wave2/rs-committee-deliveries.webp", alt: "Rose Sale core members preparing orders at a table" },
    { src: "/internal/cta-wave2/rs-committee-florists.webp", alt: "A wrapped Rose Sale bouquet of pink carnations" },
  ],
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
  heroImage?: { src: string; alt: string };
  whatIsIt: string;
  welcome: string;
  letter: AboutRun[][];
  letterSignoff: string;
  vision: string;
  thrust: string;
  /** The page shows a placeholder if this is ever left empty. */
  timeline: DeptTimelineItem[];
  committees: DeptGroup[];
  requirements: DeptGroup[];
  requirementsNote: string;
  moodboard: { label: string; url: string };
  faqs: { q: string; a: AboutRun[][] }[];
  contacts: DeptContact[];
}

export const CELADON_MERCH: CelaMerchContent = {
  slug: "celadon-merch",
  name: "Celadon Merch",
  fullName: "Celadon Merchandise",
  // CelaMerch left the color table blank, so these come from the colors its
  // own content tab is styled in: brick red for headings, warm orange for
  // committee labels and notes, near-black brown for ink.
  accent: { base: "#BD433E", tint: "#FBF1EA", ink: "#220300" },
  heroImage: { src: "/internal/cta-wave2/cm-hero.webp", alt: "Celadon Merchandise" },
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
      { text: "But to achieve this, we need " },
      { text: "YOUR", italic: true, accent: true },
      {
        text: " help. This project not only proudly showcases the creative identity of Celadoneans but also nurtures growth and familiarity within and beyond the team, bringing together a holistic community.",
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
  timeline: [
    { date: "October 26 – December 14, 2026", label: "Merch Ideation" },
    { date: "January 8, 2027", label: "General Assembly" },
    // The doc reads "January 15, 2026", which would end before it starts —
    // read as 2027.
    { date: "December 14, 2026 – January 15, 2027", label: "Merch Preparation" },
    { date: "February 2–5, 2027", label: "Merch Selling!!" },
  ],
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
  requirementsNote:
    "Alternative requirements must adhere to the vision and theme of Celadon Merchandise Wave 2 as found in this drive:",
  moodboard: {
    label: "CM Wave 2 Moodboard",
    url: "https://drive.google.com/file/d/1su3nf-UMY4ZwtqX6ERhQG3Sp5Oy5-ds_/view?usp=sharing",
  },
  faqs: [
    {
      q: "How heavy is the workload of this project?",
      a: [
        [
          {
            text: "All members of the project will be required to work during the semester break, as starting early will provide us with an allowance for unexpected events in the timeline.",
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
  contacts: [
    {
      name: "Quisha Lim",
      photo: "/internal/cta-wave2/pm-quisha.webp",
      role: "Project Manager",
      email: "quisha.nicole.lim@student.ateneo.edu",
      facebook: "https://www.facebook.com/quisha.lim.2025",
    },
    {
      name: "Iris Pabiloña",
      photo: "/internal/cta-wave2/pm-iris.webp",
      role: "Project Manager",
      email: "iris.casey.pabilona@student.ateneo.edu",
      facebook: "https://www.facebook.com/iris.pabilona.3",
    },
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
      photo: "/internal/cta-wave2/pm-aiden.webp",
      role: "Project Manager",
      email: "aiden.jaedrick.riley.duyongco@student.ateneo.edu",
      facebook: "https://www.facebook.com/share/1Js7CzdDEr/",
    },
    {
      name: "Jerry Señas",
      photo: "/internal/cta-wave2/pm-jerry.webp",
      role: "Project Manager",
      email: "jerry.senas@student.ateneo.edu",
      facebook: "https://www.facebook.com/jerry.jet.158",
    },
  ],
  closingLine: "Help us create something worth remembering—beyond the final note.",
};

// ----------------------------------------------------------------- Celaball

export interface CelaballContent {
  slug: string;
  name: string;
  /** Pulled from the doc's own styling — its color table row was left blank. */
  palette: {
    amber: string;
    orange: string;
    coral: string;
    teal: string;
    cream: string;
  };
  cardAccent: { base: string; tint: string; ink: string };
  heroImage: { src: string; alt: string };
  date: string;
  about: AboutRun[][];
  letter: string[];
  letterSignoff: { closing: string; names: string; role: string };
  theme: {
    name: string;
    chinese: string;
    subtitle: string;
    parts: { glyph: string; romanized: string; meaning: string; body: string; tone: "teal" | "coral" }[];
    together: AboutRun[][];
  };
  objectives: { title: string; body: string }[];
  timeline: { date: string; label: string; proper?: boolean }[];
  lookingFor: string;
  committees: {
    name: string;
    count: string;
    items: string[];
    requirement?: { portfolio: string; alternative: string };
  }[];
  faqs: { q: string; a: string }[];
  contactsIntro: string;
  contacts: DeptContact[];
}

export const CELABALL: CelaballContent = {
  slug: "celaball",
  name: "Celaball",
  palette: {
    amber: "#F4A740",
    orange: "#D98530",
    coral: "#F08A78",
    teal: "#99C3CC",
    cream: "#FDF2D6",
  },
  cardAccent: { base: "#D98530", tint: "#FDF2D6", ink: "#6B3A10" },
  heroImage: {
    src: "/internal/cta-wave2/cb-hero.webp",
    alt: "Celadon Ball — Jia Yuan: Home Across Horizons",
  },
  date: "June 12, 2027",
  about: [
    [
      { text: "Celaball", bold: true },
      { text: " is the closing project of " },
      { text: "Ateneo Celadon", bold: true },
      {
        text: ", serving as a formal party that brings together the Celadon community for an evening of remembrance, connection, and celebration through curated programs, interactive game segments, performances, and a shared dining experience.",
      },
    ],
    [
      {
        text: "It acts as a milestone event marking the culmination of the organization’s many activities, projects, and initiatives throughout the school year—uniting members, the EBCB, and past Celadoneans to honor their shared achievements and reflect on the past year.",
      },
    ],
  ],
  letter: [
    "Welcome to Celadon Ball 2026–2027! As the school year draws to a close, Celaball stands as the moment where a whole academic year of hard work, shared laughter, and meaningful connections come together under one roof.",
    "Bringing a grand night like this to life takes a passionate, dedicated, and communicative core team. This year, we aim to elevate every aspect of Celaball and create a culture that allows each member to grow in their goals and feel more connected with the Celadon community at large.",
    "Whether you want to structure our event flow, establish our visual branding, build external partnerships, or capture the magic on camera, there is a place for you on our team. We can’t wait to see your applications and build this unforgettable night together!",
  ],
  letterSignoff: { closing: "Warmly,", names: "Reese & Chesea", role: "Celaball 2026–2027 Project Managers" },
  theme: {
    name: "Jia Yuan",
    chinese: "家緣",
    subtitle: "Home Across Horizons",
    parts: [
      {
        glyph: "家",
        romanized: "Jia",
        meaning: "Home",
        body: "Jia draws from the ancient wisdom of sì hǎi wéi jiā (四海為家): home is not a static place, but a sense of belonging that travels with us wherever we go.",
        tone: "teal",
      },
      {
        glyph: "緣",
        romanized: "Yuan",
        meaning: "Fate",
        body: "Yuan is the invisible thread of fate that brings relative strangers into one another’s orbits.",
        tone: "coral",
      },
    ],
    together: [
      [
        { text: "Together, " },
        { text: "Jia Yuan", bold: true },
        {
          text: " tells the story of Celadon: how people from different walks of life cross paths, build trust, and turn a shared space into a family. As the year closes, it gathers us under this sunset sky to honor where we started, reflect on how far we have come, and celebrate the bonds we built along the way.",
        },
      ],
    ],
  },
  objectives: [
    {
      title: "Community Building & Belonging",
      body: "Create an emotionally resonant milestone experience bringing together all years and positions.",
    },
    {
      title: "Core Development & Welfare",
      body: "Ensure every core member develops personal and professional leadership competencies in a supportive, organized space.",
    },
  ],
  timeline: [
    { date: "Late October 2026", label: "Core Team Onboarding & 1st General Assembly" },
    {
      date: "November 2026 – January 2027",
      label: "Early Venue Sourcing, Supplier Procurement & Sponsorship Package Drafting",
    },
    { date: "February – April 2027", label: "RecSec Interest Checks, Early Marketing Blasts & Ticket Sales Rollout" },
    { date: "May 2027", label: "Final Program Cues, Dry Runs, and Audio-Visual Checks" },
    { date: "June 12, 2027", label: "CELADON BALL 2026–2027 PROPER", proper: true },
    { date: "Late June 2027", label: "Post-Event Evaluations, Documentation Directory Release & Debriefing" },
  ],
  lookingFor:
    "We are looking for Celadoneans who are proactive, communicative, and passionate about creating a memorable experience for the community.",
  committees: [
    {
      name: "Programs (PROG)",
      count: "2 Heads, 4 Core Members",
      items: [
        "Conceptualize the program flow",
        "Create presentation slides and scripts for hosts for event proper",
        "Create games and icebreakers",
        "Procure performers",
      ],
    },
    {
      name: "Logistics (LOG)",
      count: "2 Heads, 3 Core Members",
      items: [
        "Procure the physical venue & complete related requirements",
        "Manage ingress and egress on event proper",
        "Reserve rooms for DP shoot and core team GAs",
      ],
    },
    {
      name: "Recruitment & Secretariat (RecSec)",
      count: "1 Head, 2 Core Members",
      items: [
        "Manage the Celadon-wide interest check and process the data",
        "Create the guest registration process",
        "Create the table grouping process",
        "Manage event day registration",
        "Manage the event evaluation form and process the data",
      ],
    },
    {
      name: "Digital Creatives (DC)",
      count: "2 Heads, 3 Core Members",
      items: [
        "Establish the visual identity of Celaball",
        "Design promotional pubmats",
        "Create the DP frames",
        "Create the presentation slides template",
      ],
      requirement: { portfolio: "Portfolio", alternative: "Make a sample sign-up poster for Celaball" },
    },
    {
      name: "Documentation & Publications (DocPub)",
      count: "1 Head, 3 Core Members",
      items: [
        "Handle event photo and video coverage",
        "Write social media captions",
        "Producing the Year-in-Review recap video.",
        "Manage the DP shoot set and picture taking",
      ],
      requirement: { portfolio: "Portfolio", alternative: "Make a sample DP shoot set up for Celaball" },
    },
    {
      name: "External Relations (ExRel)",
      count: "2 Heads, 3 Core Members",
      items: ["Reach out to corporate sponsors", "Negotiates x-deals for party favors", "Manage partner communication."],
    },
    {
      name: "Fundraising (FR)",
      count: "2 Heads, 4 Core Members",
      items: ["Brainstorm fundraising ideas to expand the project budget", "Operate fundraising booths and initiatives"],
    },
  ],
  faqs: [
    {
      q: "Do I need extensive experience to join?",
      a: "Not at all! We are looking for members who are eager to learn, collaborate, and contribute. Your PMs and Core Heads will guide and support you throughout the entire process.",
    },
    {
      q: "How heavy will the workload be?",
      a: "Workload will be structured and spread out across the school year to avoid exam season burnout. Tasks will pick up closer to the event in April/May, but clear role descriptions and weekly check-ins will ensure tasks remain manageable.",
    },
    {
      q: "Can I apply for COMMPUB committees (Digital Creatives / DocPub) if I don’t have a portfolio?",
      a: "Yes! If you don’t have a portfolio, you can fulfill the alternative challenge options specified in the COMMPUB guidelines (e.g., sample poster, sample caption, or photo plan).",
    },
    {
      q: "How often will we meet as a core team?",
      a: "We will hold regular online/hybrid syncs (mostly weekly or as needed per committee) to keep everyone updated without taking up too much of your personal schedule.",
    },
  ],
  contactsIntro: "Have any questions or concerns about the roles or the project? Reach out to us anytime!",
  contacts: [
    {
      name: "Beatrice Maxine D. Sy",
      photo: "/internal/cta-wave2/pm-reese.webp",
      role: "Project Manager",
      email: "beatrice.maxine.sy@student.ateneo.edu",
      facebook: "https://web.facebook.com/beatricemaxine.sy.7",
    },
    {
      name: "Francesca M. Tiu",
      photo: "/internal/cta-wave2/pm-chesea.webp",
      role: "Project Manager",
      email: "francesca.ean.alexis.tiu@student.ateneo.edu",
      facebook: "https://www.facebook.com/tiuchesea/",
    },
  ],
};
