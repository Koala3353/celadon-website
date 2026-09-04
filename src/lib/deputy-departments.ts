/**
 * Deputy Pool application content for A-yi's Corner's dept-apps hub
 * (/internal/dept-apps). Sourced from this year's "Deputy Pool Application
 * Instructions 2627" PDFs, one per department, plus EBCB rosters copied
 * from the current manager-applications site where a department's own PDF
 * didn't include them. One-off, seasonal dataset — not part of the
 * Sheet-driven content pipeline in content.ts.
 */

export interface DeptAccent {
  /** Primary brand color for this department's page. */
  base: string;
  /** Pale tint of `base`, for section backgrounds. */
  tint: string;
  /** Darker ink derived from `base`, for body text on light backgrounds. */
  ink: string;
}

export interface DeptGroup {
  label?: string;
  /** A plain string renders as-is; pass an `AboutRun[]` instead for an item
   * that needs bold/italic/accent spans mid-sentence (a leading "Label:" is
   * better served by the section's `colorLabels` instead). */
  items: (string | AboutRun[])[];
}

/** One run of text within a rich-text `about` paragraph — plain by default,
 * or emphasized via `bold`/`italic`. */
export interface AboutRun {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  /** Renders in the department's own accent color instead of the default ink
   * — for a word/phrase a department's own PDF highlights in color. */
  accent?: boolean;
}

export interface DeptSection {
  heading: string;
  /** Renders the heading in normal sentence case instead of the shared
   * all-caps display style — for a heading that's a full quoted sentence
   * (e.g. a department's own tagline) rather than a short label. */
  normalCaseHeading?: boolean;
  groups: DeptGroup[];
  /** Rich-text paragraphs shown instead of `groups`' bulleted lists — for
   * prose content like a welcome letter. Leave `groups` empty when using
   * this. */
  richText?: AboutRun[][];
  image?: { src: string; alt: string };
  /** Multiple photos shown as a carousel beside the section's text, instead
   * of the single static `image`. */
  images?: { src: string; alt: string; fit?: "cover" | "contain" }[];
  /** Which side the image/carousel sits on next to the text — defaults to
   * "right". Ignored when `layout` is "stacked". */
  imagePosition?: "left" | "right";
  /** "sideBySide" (default) pairs the image/carousel next to the text in two
   * columns. "stacked" runs the image full-width above the heading's single
   * group of bullets, which then splits across two columns below it — for a
   * wide banner-shaped image (like a roadmap graphic) that would be cramped
   * next to text. */
  layout?: "sideBySide" | "stacked";
  /** When an item follows a "Label: rest of sentence" pattern, bolds and
   * accent-colors the label portion — for a department's PDF that
   * specifically highlights those leading labels in its own color. Off by
   * default so it never changes the look of sections that weren't asked for
   * this treatment. */
  colorLabels?: boolean;
  /** Renders each labeled group as its own tinted card, laid out in a
   * two-column grid instead of stacked — for a section whose groups read as
   * parallel/comparable categories rather than one continuous list. */
  groupsAsCards?: boolean;
}

/** A distinct applicant-facing position — only departments with more than
 * one of these (COMMPUB's five pools) render as an accordion; everything
 * else just has a single implicit role described by `sections`. */
export interface DeptRole {
  slug: string;
  emoji?: string;
  title: string;
  /** A plain string renders as-is; pass an `AboutRun[]` instead for bold/
   * italic/underline/accent spans. */
  description: string | AboutRun[];
  /** Sample-work photos shown under the description once the pool's
   * accordion item is opened — currently only COMMPUB's five pools have any.
   * Rendered as a carousel when there's more than one (e.g. Digital
   * Creatives' three samples). */
  images?: { src: string; alt: string }[];
}

export interface DeptTimelineItem {
  date: string;
  label: string;
}

export interface DeptProject {
  name: string;
  description: string;
}

export interface DeptTestimonial {
  name: string;
  role: string;
  quote: string;
  photo?: string;
}

export interface DeptFaq {
  q: string;
  a: string;
}

export interface DeptContact {
  name: string;
  role: string;
  facebook?: string;
  email?: string;
  photo?: string;
  /** Sub-heading to cluster contacts under within "Contact Us!" — e.g.
   * separating EBCB from Managers. Contacts without one render in a single
   * flat grid, as every department but COMMPUB does. */
  groupLabel?: string;
}

export interface Department {
  slug: string;
  emoji: string;
  name: string;
  fullName: string;
  accent: DeptAccent;
  /** Illustrated banner from the department's own PDF. Not every department
   * has one. */
  heroImage?: { src: string; alt: string };
  /** Insets the hero banner from the viewport edges on desktop instead of
   * running full-bleed — for a banner whose art doesn't read as well
   * stretched edge-to-edge. The gutter is filled with a faded, full-bleed
   * echo of the same banner (rather than a flat color) so it still reads as
   * one continuous image. Mobile (and narrow tablet widths, for `large`)
   * stays full-bleed either way. */
  heroImagePadding?: {
    /** Bumps the inset size up and delays it to a wider breakpoint (`md`
     * instead of `sm`) — for a banner that needs a roomier frame. */
    large?: boolean;
    /** CSS `object-position` for the crisp centered copy — shift it off
     * dead-center when the source art has real content (not just ambient
     * background) sitting close to an edge, so the crop favors hiding that
     * content instead of leaving a sliver of it sitting right in the fade.
     * Defaults to centered. */
    objectPosition?: string;
  };
  /** Photo cover shown on the hub's department card — distinct from
   * `heroImage`, which is the department's own page banner. */
  cardCover: { src: string; alt: string };
  /** Short blurb shown on the hub's department card — distinct from `about`,
   * which is the longer bio on the department's own page. */
  cardBlurb: string;
  /** Plain text for most departments. A department can instead use an array
   * of paragraphs (each an array of `AboutRun`s) for bold/italic emphasis and
   * paragraph breaks — currently only EXREL's does. */
  about: string | AboutRun[][];
  /** Widens the hero's `about` paragraph (and the column it sits in) for
   * departments whose description runs long enough that the default column
   * wraps awkwardly. Defaults to "normal". */
  aboutWidth?: "normal" | "wide";
  /** COMMPUB's PDF has a distinct "Vision and Thrust" blurb beyond the
   * plain department description; nobody else does. A plain string renders
   * as-is; pass an `AboutRun[]` instead for bold/italic/accent spans. */
  visionThrust?: string | AboutRun[];
  /** A "What can you expect?" blurb, distinct from the shorter `about` shown
   * in the hero — currently only COMMPUB's PDF spells this out separately. */
  whatToExpect?: string;
  /** Multiple distinct applicant-facing positions. Only populated where a
   * department's PDF actually lists more than one (COMMPUB's five pools) —
   * everything else is a single role covered by `sections` instead. */
  roles?: DeptRole[];
  sections: DeptSection[];
  /** FIN MITs get deployed into one of four committees; shown as an
   * informational breakdown, not a role choice. */
  committees?: DeptGroup[];
  /** Heading shown above the committees accordion. Defaults to "Committees". */
  committeesHeading?: string;
  /** Rich-text blurb shown above the committees grid, introducing it. */
  committeesIntro?: AboutRun[];
  /** Rich-text paragraph(s) shown below the committees grid — e.g. a
   * follow-up note about related responsibilities. */
  committeesNote?: AboutRun[][];
  timeline?: DeptTimelineItem[];
  /** EXREL's four flagship projects/initiatives. */
  projects?: DeptProject[];
  /** OSR-only so far: a `sections`-shaped block (typically a short,
   * `groupsAsCards` one like "Who are we looking for?") pulled out of the
   * normal section flow and shown side by side with `timeline` instead —
   * same idea as `committees`/`projects` pairing with the timeline, for a
   * department whose natural companion is one of its own sections rather
   * than a dedicated committees/projects list. Rendered as a single column
   * of stacked cards (vs. the two-column grid a `groupsAsCards` section
   * gets when shown solo), since it's now sharing the row with the
   * timeline. */
  timelineCompanion?: Pick<DeptSection, "heading" | "groupsAsCards" | "groups">;
  /** OSR-only: real tools/products OSR members have built for Celadon (this
   * site included) — a concrete "if you want to build things like this,
   * this is the department" hook, distinct from `projects`, which covers
   * org-wide event/campaign projects rather than built software. */
  techShowcase?: {
    heading: string;
    blurb: string;
    items: { name: string; description: string; href?: string }[];
  };
  /** When set, shows a small floating "Apply" pill fixed to the bottom of
   * the viewport for this department's whole page, linking straight to its
   * own application form — a persistent CTA for pages long enough that the
   * hero's apply button has scrolled well out of view. Off by default; only
   * departments that ask for it get one. */
  floatingApplyUrl?: string;
  /** Shows the shared Application Instructions section on this department's
   * page. Off by default — COMMPUB is the only department that needs it
   * spelled out, since its multi-pool applications have per-pool additional
   * requirements that the other departments' single-role flow doesn't. */
  showApplicationInstructions?: boolean;
  /** Extra note alongside the (uniform, 3-step) application instructions —
   * e.g. a link to additional requirements, or "none needed" for clarity. A
   * plain string renders as-is; pass an `AboutRun[]` instead for bold/
   * underline/accent spans. */
  applicationNote?: { text: string | AboutRun[]; href?: string };
  testimonials: DeptTestimonial[];
  faqs: DeptFaq[];
  /** A combined "FAQs & Testimonials" format — a question followed by one or
   * more named answers (each its own personal quote), plus an optional
   * unattributed closing note — for a department whose own material presents
   * it this way instead of separate plain-FAQ and testimonial-grid sections.
   * When set, this renders in place of (not alongside) `testimonials`/`faqs`,
   * so those should be left empty. */
  qaTestimonials?: {
    q: string;
    answers: { name: string; role: string; quote: string }[];
    note?: string;
  }[];
  contacts: DeptContact[];
  /** Real event photos beyond the hero banner. */
  photos: string[];
}

// Shared by every department this cycle.
export const APPLICATION_FORM_URL = "https://ateneoceladon.com/deputy-appform";

// The uniform 3-step flow (per explicit instruction — supersedes whatever
// a given department's own PDF says its process is).
export const APPLICATION_STEPS = [
  "Fill out and submit the Application Google Form.",
  "Schedule and attend your interview.",
  "Wait for your application results!",
];

// The Office of the President — org-wide leadership, distinct from any one
// department's own VP/AVP roster.
export const EBCB_LEADERSHIP: DeptContact[] = [
  { name: "Josh Lee", role: "President", facebook: "http://fb.com/joshanthony.lee.9", email: "josh.anthony.lee@student.ateneo.edu", photo: "/internal/ebcb/leadership-josh-lee.webp" },
  { name: "Bern Chua", role: "Executive Vice President", facebook: "http://fb.com/bernsteinjoachim.chua", email: "bernstein.joachim.chua@student.ateneo.edu", photo: "/internal/ebcb/leadership-bern-chua.webp" },
];

export const DEPARTMENTS: Department[] = [
  // ------------------------------------------------------------------ COMMPUB
  {
    slug: "commpub",
    emoji: "🎨",
    name: "COMMPUB",
    fullName: "Communications and Publications",
    accent: { base: "#D97706", tint: "#FDF1E3", ink: "#7C3A0D" },
    heroImage: { src: "/internal/commpub-hero.webp", alt: "COMMPUB Staffers SY 2026-2027" },
    cardCover: { src: "/internal/commpub-card-cover.webp", alt: "COMMPUB" },
    cardBlurb:
      "COMMPUB produces creative media and documentation as well as promotional material and event design for Celadon. It also oversees the branding and public relations of the organization by managing the organization’s official social media channels.",
    about:
      "The Communications and Publications (COMMPUB) Department produces creative media in various forms and is also responsible for training and developing its members' creative abilities and other relevant skills.",
    visionThrust: [
      { text: "COMMPUB aims to engage its " },
      { text: "members' creative interests", bold: true },
      { text: " by providing opportunities to grow in " },
      { text: "skill-building", bold: true },
      { text: ", leadership, and " },
      { text: "community", bold: true },
      { text: ", through the " },
      { text: "maintenance and promotion", bold: true },
      { text: " of comprehensive systems, COMMPUB" },
      { text: "-led", bold: true },
      { text: " workshops, and the integration of members in " },
      { text: "concrete talent-cultivating", bold: true },
      { text: " initiatives and Celadon projects." },
    ],
    whatToExpect:
      "As a COMMPUB staffer, you will become a part of the department for the whole school year, selecting one (1) out of our five (5) pools: Digital Creatives, Production Design, Photos, Videos, and Writing. As a member of the department, you will be participating in bonding activities and meaningful workshops, be given the chance to contribute creative outputs to CelaZine, COMMPUB's official online magazine, and be deployed to Celadon projects, giving you plenty of chances for exploration and growth. Meet fellow artists, engage in fun activities, and unleash your creative side by joining the COMMPUB department!",
    roles: [
      {
        slug: "digital-creatives",
        emoji: "🎨",
        title: "Digital Creatives Pool",
        description: [
          {
            text: "Digital Creatives Staffers design digital creative and graphic design outputs for Celadon projects and other promotional materials, working in collaboration with other pools or project teams to conceptualize and create cohesive outputs. If you are interested in graphic design, as well as innovative and willing to explore new themes and artistic directions, then this is the pool for you! Experience in Canva, Adobe Photoshop, Adobe Illustrator, or other graphic design softwares is highly preferred, but ",
          },
          { text: "not required", bold: true },
          { text: "." },
        ],
        images: [
          { src: "/internal/commpub-pool-digital-creatives.webp", alt: "Digital Creatives Pool sample output 1" },
          { src: "/internal/commpub-pool-digital-creatives-2.webp", alt: "Digital Creatives Pool sample output 2" },
          { src: "/internal/commpub-pool-digital-creatives-3.webp", alt: "Digital Creatives Pool sample output 3" },
        ],
      },
      {
        slug: "production-design",
        emoji: "🛠️",
        title: "Production Design Pool",
        description: [
          {
            text: "Production Design Staffers create and conceptualize physical props, onsite gimmicks, set/booth designs, and more for Celadon projects and initiatives. If you are interested in physical crafts and design, bursting with ideas for marketing gimmicks, and excited to work with something hands-on, then this is the pool for you! Experience in onsite design layout, prop crafting, and gimmicks is highly preferred, but ",
          },
          { text: "not required", bold: true },
          { text: "." },
        ],
        images: [
          { src: "/internal/commpub-pool-production-design.webp", alt: "Production Design Pool sample output" },
        ],
      },
      {
        slug: "photos",
        emoji: "📸",
        title: "Photos Pool",
        description: [
          {
            text: "Photos Staffers document various Celadon projects and initiatives, and participate in the making of DP shoots and photo collages. If you are interested in photography, and eager to explore new concepts and artistic directions, then this is the pool for you! Experience in photography and photo editing software is highly preferred, but ",
          },
          { text: "not required", bold: true },
          { text: ". Owning a good camera is likewise highly preferred, but also " },
          { text: "not required", bold: true },
          { text: "." },
        ],
        images: [{ src: "/internal/commpub-pool-photos.webp", alt: "Photos Pool sample output" }],
      },
      {
        slug: "videos",
        emoji: "🎥",
        title: "Videos Pool",
        description: [
          {
            text: "Videos Staffers capture and edit engaging video content for Celadon projects and initiatives, such as short edits, event recaps, promotional videos, and Reels. If you are interested in video production (whether shooting, editing, or both), and driven to exploring new artistic directions, then this is the pool for you! Experience in video production and editing is highly preferred, but ",
          },
          { text: "not required", bold: true },
          { text: ". Owning a good camera is likewise highly preferred, but also " },
          { text: "not required", bold: true },
          { text: "." },
        ],
        images: [{ src: "/internal/commpub-pool-videos.webp", alt: "Videos Pool sample output" }],
      },
      {
        slug: "writing",
        emoji: "✍️",
        title: "Writing Pool",
        description: [
          {
            text: "Writing Staffers create various writing-based outputs including but not limited to: spiels/captions, poems, articles, and more. As a Writing Staffer, you will also be required to contribute at least one output to CelaZine, COMMPUB's official online magazine. If you are interested in exploring new writing styles and working with a variety of content, as well as detail-oriented, witty, and able to create emphatic written pieces, then this is the pool for you! Experience in writing a variety of written content and creative outputs is highly preferred, but ",
          },
          { text: "not required", bold: true },
          { text: "." },
        ],
        images: [{ src: "/internal/commpub-pool-writing.webp", alt: "Writing Pool sample output" }],
      },
    ],
    sections: [],
    showApplicationInstructions: true,
    applicationNote: {
      text: [
        { text: "Note", bold: true, underline: true },
        { text: ": You must submit additional requirements for " },
        { text: "ALL", bold: true, underline: true },
        {
          text: " pools that you are applying for. However, whether you are applying to one or two pools, you only need to sign up for ",
        },
        { text: "ONE", bold: true, underline: true },
        { text: " interview." },
      ],
      href: "https://docs.google.com/document/d/1fvO5nr9ze-vnwbelc_XBSIeTkzUQafuuC6CE_nVD5Ow/edit?usp=sharing",
    },
    testimonials: [],
    faqs: [],
    contacts: [
      { name: "Jillian Yu", role: "VP for Communications and Publications", facebook: "http://fb.com/jillian.yu.758", email: "jillian.yu@student.ateneo.edu", photo: "/internal/ebcb/commpub-jillian-yu.webp", groupLabel: "COMMPUB EBCB" },
      { name: "Jillian Dy", role: "AVP for Creative Branding and Design", facebook: "http://fb.com/jillian.dy.961", email: "jillian.dy@student.ateneo.edu", photo: "/internal/ebcb/commpub-jillian-dy.webp", groupLabel: "COMMPUB EBCB" },
      { name: "Dia Fernando", role: "AVP for Creative Branding and Design", facebook: "http://fb.com/dia.fernando.9", email: "dia.ainsly.fernando@student.ateneo.edu", photo: "/internal/ebcb/commpub-dia-fernando.webp", groupLabel: "COMMPUB EBCB" },
      { name: "Simone Chua", role: "AVP for Documentation and Publications", facebook: "http://fb.com/simoneabigailc", email: "simone.chua@student.ateneo.edu", photo: "/internal/ebcb/commpub-simone-chua.webp", groupLabel: "COMMPUB EBCB" },
      { name: "Abby Tan", role: "AVP for Documentation and Publications", facebook: "http://fb.com/abbytann", email: "elise.tan@student.ateneo.edu", photo: "/internal/ebcb/commpub-abby-tan.webp", groupLabel: "COMMPUB EBCB" },
      { name: "Lina Syjueco", role: "Digital Creatives Manager", facebook: "https://www.facebook.com/angelina.syjueco.2024", email: "angelina.syjueco@student.ateneo.edu", photo: "/internal/ebcb/commpub-lina-syjueco.webp", groupLabel: "COMMPUB Managers" },
      { name: "Megan Tan", role: "Digital Creatives Manager", facebook: "https://www.facebook.com/megantan23", email: "megan.ashley.tan@student.ateneo.edu", photo: "/internal/ebcb/commpub-megan-tan.webp", groupLabel: "COMMPUB Managers" },
      { name: "Erica Lee", role: "Production Design Manager", facebook: "https://www.facebook.com/ericajoy.lee.90", email: "erica.joy.lee@student.ateneo.edu", photo: "/internal/ebcb/commpub-erica-lee.webp", groupLabel: "COMMPUB Managers" },
      { name: "Trisha Li", role: "Production Design Manager", facebook: "https://www.facebook.com/trisha.maxene.1", email: "trisha.maxene.li@student.ateneo.edu", photo: "/internal/ebcb/commpub-trisha-li.webp", groupLabel: "COMMPUB Managers" },
      { name: "Casey Cham", role: "Photos Manager", facebook: "https://www.facebook.com/cirelandcc", email: "casey.ireland.cham@student.ateneo.edu", photo: "/internal/ebcb/commpub-casey-cham.webp", groupLabel: "COMMPUB Managers" },
      { name: "Sabrina Tan", role: "Photos Manager", facebook: "https://www.facebook.com/sabrina.tan.963", email: "sabrina.mikaela.tan@student.ateneo.edu", photo: "/internal/ebcb/commpub-sabrina-tan.webp", groupLabel: "COMMPUB Managers" },
      { name: "Rafa Belo", role: "Videos Manager", facebook: "https://www.facebook.com/rafabelooo", email: "rafael.belo@student.ateneo.edu", photo: "/internal/ebcb/commpub-rafa-belo.webp", groupLabel: "COMMPUB Managers" },
      { name: "Claire Mayol", role: "Writing Manager", facebook: "https://www.facebook.com/francisca.claire.mayol", email: "francisca.claire.assisi.mayol@student.ateneo.edu", photo: "/internal/ebcb/commpub-claire-mayol.webp", groupLabel: "COMMPUB Managers" },
      { name: "Moira Son", role: "Writing Manager", facebook: "https://www.facebook.com/moiraason", email: "moira.genevieve.son@student.ateneo.edu", photo: "/internal/ebcb/commpub-moira-son.webp", groupLabel: "COMMPUB Managers" },
      { name: "Sophia Cu", role: "Writing Manager", facebook: "https://www.facebook.com/sophia.cu.106", email: "sophia.louise.cu@student.ateneo.edu", photo: "/internal/ebcb/commpub-sophia-cu.webp", groupLabel: "COMMPUB Managers" },
    ],
    photos: [
      "/internal/commpub-photo-ga-2526.webp",
      "/internal/commpub-photo-ga-2425.webp",
      "/internal/commpub-photo-bonding.webp",
      "/internal/commpub-photo-workshop.webp",
      "/internal/commpub-photo-celazine.webp",
    ],
  },

  // ---------------------------------------------------------------------- CUL
  {
    slug: "cul",
    emoji: "🐉",
    name: "CUL",
    fullName: "Cultural Affairs",
    accent: { base: "#DC2626", tint: "#FEF2F2", ink: "#7F1D1D" },
    heroImage: { src: "/internal/cul-hero.webp", alt: "Ateneo Celadon Cultural Affairs Department" },
    cardCover: { src: "/covers/chinese-new-year.jpg", alt: "CUL" },
    cardBlurb:
      "CUL spearheads the cultivation of the awareness, understanding, and appreciation of Chinese-Filipino culture to both Celadon and the greater Philippine community. It establishes connections and interactions to encourage a mutual acknowledgment of culture.",
    aboutWidth: "wide",
    about: [
      [
        { text: "The Cultural Affairs (CUL) Department is the heart of Celadon as it spearheads the " },
        {
          text: "cultivation of awareness, understanding, and appreciation of the Chinese-Filipino culture",
          bold: true,
        },
        {
          text: " both inside and outside the organization through various projects and initiatives. Given this, the department seeks to ",
        },
        { text: "enrich active culture-sharing and encourage passive discourse", bold: true },
        { text: " and " },
        { text: "provide proper leadership training and engagement opportunities", bold: true },
        { text: " to better equip members in leading cultural initiatives under the department." },
      ],
    ],
    sections: [
      {
        heading: "CUL Trainee Roadmap",
        image: { src: "/internal/cul-roadmap.webp", alt: "CUL Trainee year-long roadmap, from the first CUL GA in September through the second CUL GA and bonding in April" },
        layout: "stacked",
        groups: [
          {
            items: [
              "CUL trainees learn project management skills, foster cultural sensitivity, and develop a knack for cultural sharing and discourse. With this, CUL Trainees are trained as future leaders of Celadon and taught to manage Cultural Affairs projects in the upcoming year.",
              "Down the line, CUL trainees are given the path toward further leadership as project managers, Associate Vice Presidents, or even Vice President of the Cultural Affairs Department!",
            ],
          },
        ],
      },
      {
        heading: "CUL Trainee Responsibilities",
        images: [
          { src: "/internal/cul-responsibilities-1.webp", alt: "CUL trainees at a department bonding" },
          { src: "/internal/cul-responsibilities-2.webp", alt: "CUL trainees at a department bonding" },
          { src: "/internal/cul-responsibilities-3.webp", alt: "CUL trainees at a department bonding" },
        ],
        groups: [
          {
            items: [
              [
                { text: "Spearhead the " },
                { text: "planning and execution of CUL Mini Events", bold: true },
                { text: " (e.g., workshops, talks)" },
              ],
              [
                { text: "Contribute to CUL projects by " },
                { text: "heading Logistics or Programs committees in core teams", bold: true },
              ],
              [
                { text: "Honing leadership skills by " },
                { text: "attending skills-development workshops", bold: true },
                { text: " spearheaded by CUL and other departments" },
              ],
            ],
          },
        ],
      },
      {
        heading: "Who are we looking for?",
        imagePosition: "left",
        images: [
          { src: "/internal/cul-looking-for-1.webp", alt: "CUL trainees hanging out" },
          { src: "/internal/cul-looking-for-2.webp", alt: "CUL trainees hanging out" },
          { src: "/internal/cul-looking-for-3.webp", alt: "CUL trainees hanging out" },
          { src: "/internal/cul-looking-for-4.webp", alt: "CUL trainees hanging out" },
        ],
        groups: [
          {
            items: [
              [
                { text: "Individuals who are " },
                { text: "passionate and want to enhance", bold: true },
                { text: " their project management skills" },
              ],
              [
                { text: "Members with a " },
                { text: "strong passion and love for culture-sharing", bold: true },
              ],
              [
                { text: "People who are " },
                { text: "proactive in sharing visions and bringing them to life", bold: true },
              ],
            ],
          },
        ],
      },
      {
        heading: "What can you expect in CUL?",
        groups: [
          {
            items: [
              "Deputy training and development through deployments and skills workshops",
              "Engaging and fun cultural initiatives and talks",
              "Off-site bonding!",
              "More opportunities to get to know people!",
            ],
          },
        ],
      },
    ],
    testimonials: [],
    faqs: [
      {
        q: "Do I need to be knowledgeable about Chinese-Filipino traditions and culture to join CUL?",
        a: "You don't need to be fluent in Chinese, be Chinese-Filipino, or know every aspect of the culture to join! However, the CUL department requires, at a minimum, basic knowledge, awareness, and understanding of at least a few aspects of Chinese culture and traditions.",
      },
      {
        q: "How much commitment is expected when being a CUL Trainee?",
        a: "As CUL trainees, you are expected to take initiative in your core team deployments and execution of CUL Mini Events year-long. Despite this, you are still students first at the end of the day. The CUL EBCB and Managers will try our best to accommodate your pacing, and we hope for your full transparency in communicating any of your potential concerns to us.",
      },
      {
        q: "Why CUL?",
        a: "In an organization that builds discourse between the Filipino-Chinese culture and that of the larger Ateneo community and society, the CUL department serves as a direct avenue toward this goal with its many culturally-focused initiatives.",
      },
    ],
    contacts: [
      { name: "Therese Yap", role: "VP for Cultural Affairs", facebook: "http://fb.com/yap.reese04", email: "anne.therese.yap@student.ateneo.edu", photo: "/internal/ebcb/cul-therese-yap.webp" },
    ],
    photos: [],
  },

  // -------------------------------------------------------------------- EXREL
  {
    slug: "exrel",
    emoji: "📬",
    name: "EXREL",
    fullName: "External Relations",
    accent: { base: "#2563EB", tint: "#EFF6FF", ink: "#1E3A8A" },
    heroImage: { src: "/internal/exrel-hero.webp", alt: "External Relations Department" },
    cardCover: { src: "/internal/exrel-card-cover.webp", alt: "EXREL" },
    cardBlurb:
      "EXREL serves as the official liaison of Ateneo Celadon towards external organizations and corporations. It aims to provide value to both the internal and external stakeholders of the organization through sponsorships and partnerships.",
    about: [
      [
        {
          text: "The External Relations (EXREL) Department is the matchmaker of Celadon, aiming to strengthen on and off-campus partnerships. It does this by ",
        },
        { text: "creating sustainable and beneficial relationships", bold: true },
        { text: " between the organization and " },
        { text: "renowned sponsors and partners", bold: true },
        { text: " through " },
        { text: "systematic contacting and negotiating", bold: true },
        { text: ". It also spearheads " },
        { text: "flagship projects and in-house initiatives", bold: true },
        { text: " that keep the organization's network active year-round." },
      ],
      [
        { text: "These endeavours help " },
        { text: "improve Celadon's visibility", bold: true },
        { text: " to the general public and " },
        { text: "provide either monetary or product-based sponsorship", bold: true },
        {
          text: ". As such, EXREL aims to develop and cultivate its associates into leaders knowledgeable in Celadon's EXREL systems for database contacting, negotiating, and package drafting, with a minor understanding of project management.",
        },
      ],
    ],
    aboutWidth: "wide",
    sections: [
      {
        heading: "EXREL Associate Role",
        imagePosition: "left",
        images: [
          { src: "/internal/exrel-jade-1.webp", alt: "EXREL deputies at Jade Business Summit" },
          { src: "/internal/exrel-jade-2.webp", alt: "EXREL deputies at Jade Business Summit" },
          { src: "/internal/exrel-jade-3.webp", alt: "EXREL deputies at Jade Business Summit" },
          { src: "/internal/exrel-jade-4.webp", alt: "EXREL deputies at Jade Business Summit" },
        ],
        groups: [
          {
            items: [
              [
                { text: "EXREL Associates are to be the " },
                { text: "official liaison of Celadon", bold: true },
                {
                  text: " towards external organizations (e.g. student organizations, corporate sponsors, advocacy communities, Chinese-Filipino organizations)",
                },
              ],
              [
                { text: "EXREL Associates aim to " },
                { text: "provide value to both internal and external stakeholders", bold: true },
                { text: " of the organization through sustainable and mutually beneficial partnerships" },
              ],
              [
                { text: "EXREL Associates seek to " },
                { text: "generate, develop, and maintain the relationships and networks", bold: true },
                { text: " of the organization" },
              ],
            ],
          },
        ],
      },
      {
        heading: "Tasks and Responsibilities",
        groups: [
          {
            label: "Navigate External Relations for various projects by:",
            items: [
              "Ideate Marketing Package (MP) prices and benefit inclusions",
              "Draft Memorandum of Agreements (MoA) for signing",
              "Assist in email blasts and negotiating with partners",
              "Assist in compliance with responsibilities to partners",
              "Coordinate with other committees to accomplish requirements by administrative offices (e.g. OFSQA, CSMO)",
            ],
          },
          {
            label: "Assist Partnerships Managers in:",
            items: [
              "Coordinating and maintaining alumni relations",
              "Communication with advocacy groups and beneficiary communities",
              "Other relevant functions that may be assigned to you",
            ],
          },
        ],
      },
      {
        heading: "Who are we looking for?",
        images: [
          { src: "/internal/exrel-bar-1.webp", alt: "EXREL deputies at Binondo Amazing Race" },
          { src: "/internal/exrel-bar-2.webp", alt: "EXREL deputies at Binondo Amazing Race" },
          { src: "/internal/exrel-bar-3.webp", alt: "EXREL deputies at Binondo Amazing Race" },
          { src: "/internal/exrel-bar-4.webp", alt: "EXREL deputies at Binondo Amazing Race" },
        ],
        groups: [
          {
            items: [
              "Individuals who are determined to accomplish their tasks and goals",
              "Individuals who are organized and have good time management",
              "Individuals who are communicative and open",
              "Individuals who can handle rejection well",
            ],
          },
        ],
      },
    ],
    timeline: [
      { date: "September 29, 2026", label: "Department General Assembly" },
      { date: "October 20, 2026", label: "Workshop 1: Advertising Pitches" },
      { date: "October 2026", label: "First Department Hangout" },
      { date: "November 7, 2026", label: "Jade Business Summit" },
      { date: "November 10, 2026", label: "Workshop 2: Negotiation Skills" },
      { date: "November 21, 2026", label: "AlumNight" },
      { date: "January 2027", label: "Second Department Hangout" },
      { date: "March 13, 2027", label: "Binondo Amazing Race" },
      { date: "April 3, 2027", label: "Advocacy Outreach" },
    ],
    projects: [
      {
        name: "Binondo Amazing Race",
        description:
          "An interactive competition consisting of team-based challenges set in various locations within the Old Chinatown area, fostering cultural awareness through the historical significance of Binondo.",
      },
      {
        name: "Jade Business Summit",
        description:
          "A one-day seminar and interactive workshop event bringing together seasoned Chinese-Filipino business leaders and business-minded students, with a morning lecture series open to the public.",
      },
      {
        name: "AlumNight",
        description:
          "A casual dinner event for Celadon's alumni, aiming to reconnect with them and strengthen their relationships with Celadon — and giving associates a chance to plan and execute the event.",
      },
      {
        name: "Advocacy Outreach",
        description:
          "Inspired by REACH, Celadon's past advocacy program, conducted in partnership with either OSCI or the KAISA Foundation to build sustainable relationships with advocacy partners and beneficiary communities.",
      },
    ],
    applicationNote: { text: "The EXREL Department does not require any additional requirements." },
    testimonials: [],
    faqs: [],
    qaTestimonials: [
      {
        q: "Can I be an EXREL Associate despite having no prior EXREL experience?",
        answers: [
          {
            name: "Ashley",
            role: "Associate Vice President",
            quote:
              "Of course! This role is open to everyone, no matter your experience level. When I applied to become an ExRel Associate, there were so many systems and processes that I wasn't aware of. However, throughout the year, I was able to slowly learn these things through the projects I joined and the people I worked with. It's important that you keep an open mind and are ready to learn new things.",
          },
          {
            name: "Kyle",
            role: "Associate Vice President",
            quote:
              "Absolutely! When I applied for the role, I genuinely had zero clue on anything about ExRel (I'm pretty sure my interviewer thought I accidentally signed up for ExRel instead of Cul). What I did get right, though, is that there would be a lot of networking and getting to know people inside and outside of Celadon. The most important thing we look for is your willingness to learn. Even if you don't have any experience, as long as you have the initiative and drive to learn, go for it! That's what I did, and it ended up being one of the best choices I've made so far in college.",
          },
        ],
      },
      {
        q: "How much commitment is expected when being an EXREL Associate?",
        answers: [
          {
            name: "Yomi",
            role: "Vice President",
            quote:
              "Speaking as a former ExRel Associate, the workload has always been very manageable within the department as ample support is provided by the people you work with (Managers and EBCB). You also get the freedom to choose how many commitments you'd like to take on throughout the year across projects and initiatives of your choice!",
          },
        ],
        note: "The EXREL EBCB expects each individual to prioritize their academics and well-being above organization-related work. In exchange, the EXREL EBCB also expects each individual to communicate their concerns as soon as possible to their respective teams, managers or EBCB.",
      },
      {
        q: "Why Choose EXREL?",
        answers: [
          {
            name: "Bern",
            role: "Former Associate Vice President",
            quote:
              "EXREL had always been the place I would love to call my second home when I got into university. Coming from a science background, EXREL imbued me with the corporate skills I would need to engage with the real world at the university level. From engaging in various company meetings, whether emailing them or attending onsite agendas, to simply bonding with the EXREL team and the partner university communities. I believe this is one of the best departments if you are looking to grow your corporate career and learn lifelong lessons, while making meaningful connections between outside partners and simply your fellow associates.",
          },
          {
            name: "Vin",
            role: "Associate Vice President",
            quote:
              "Choosing EXREL means choosing to learn and immerse yourself in skills that you can surely use anywhere you go. Interpersonal, negotiation, and communication skills are among these skills you can use in your personal life, future career or business, group work, and so much more. Being a part of EXREL also means that you get an early start as an associate to learn the ins and outs of this type of work as you continuously receive guidance and support from all of us. You can gradually build your exposure and confidence in handling communications and collaborations with all types of people and all of our partners in different capacities.",
          },
        ],
      },
    ],
    contacts: [
      { name: "Yomi Tan", role: "VP for External Relations", facebook: "http://fb.com/share/1FUBkQijF4/", email: "caoimhe.elise.tan@student.ateneo.edu", photo: "/internal/ebcb/exrel-yomi-tan.webp" },
      { name: "Vin Ong", role: "AVP for External Relations", facebook: "http://fb.com/vin.cedric.ong.2024/", email: "vin.cedric.ong@student.ateneo.edu", photo: "/internal/ebcb/exrel-vin-ong.webp" },
      { name: "Kyle Tan", role: "AVP for External Relations", facebook: "http://fb.com/Kyle.Bennett.Tan", email: "kyle.bennett.tan@student.ateneo.edu", photo: "/internal/ebcb/exrel-kyle-tan.webp" },
      { name: "Ashley Yu", role: "AVP for External Relations", facebook: "http://fb.com/ashley.yu.327309/", email: "ashley.denise.yu@student.ateneo.edu", photo: "/internal/ebcb/exrel-ashley-yu.webp" },
    ],
    photos: [],
  },

  // ----------------------------------------------------------------------- FIN
  {
    slug: "fin",
    emoji: "💸",
    name: "FIN",
    fullName: "Financial Affairs",
    accent: { base: "#16A34A", tint: "#F0FDF4", ink: "#14532D" },
    heroImage: { src: "/internal/fin-hero.webp", alt: "Welcome to the FINance Farmily 2026-2027" },
    heroImagePadding: {},
    cardCover: { src: "/internal/fin-card-cover.webp", alt: "FIN" },
    cardBlurb:
      "FIN is responsible for all Celadon financial matters including major fundraising projects for the organization and other financial transactions. It is in charge of instilling financial responsibility as well as encouraging sustainable innovation.",
    about: [
      [
        {
          text: "The Financial Affairs Department is responsible for all the organization's financial matters including ",
        },
        { text: "major fundraising projects for the organization and financial transactions", bold: true },
        {
          text: " of all ongoing initiatives within Celadon. Our department is known for our flagship fundraising projects such as Celadon Rose Sale (RS), Celadon Merchandise (Merch), and Lunar Lotus Market (LLM), as well as our Tent Rental Service. By ",
        },
        { text: "sustainable innovation and entrepreneurship", bold: true },
        {
          text: " amongst the members and leaders of the organization, we are able to supply the entire financial ecosystem for all projects of Celadon.",
        },
      ],
    ],
    sections: [
      {
        heading: "Fostering collaboration interdepartmentally and intradepartmentally.",
        normalCaseHeading: true,
        groups: [],
        richText: [
          [
            {
              text: "From fundraising to budget allocation, our department aims to foster a more open community by initiating purpose-driven and relational bonding opportunities for FIN deputies (FIN MITs), managers, and EBCB through workshops, dinners, and outings. Through which, we are able to maintain better relationships within ourselves and across the departments we work with.",
            },
          ],
        ],
        imagePosition: "left",
        images: [
          { src: "/internal/fin-dept-1.webp", alt: "Ateneo Celadon FIN department members" },
          { src: "/internal/fin-dept-2.webp", alt: "Ateneo Celadon FIN department members" },
          { src: "/internal/fin-dept-3.webp", alt: "Ateneo Celadon FIN department members" },
          { src: "/internal/fin-dept-4.webp", alt: "Ateneo Celadon FIN department members" },
        ],
      },
      {
        heading: "FIN Manager-In-Training (FIN MIT)",
        images: [
          { src: "/internal/fin-mit-project-1.webp", alt: "FIN deputies deployed to a fundraising project" },
          { src: "/internal/fin-mit-project-2.webp", alt: "FIN deputies deployed to a fundraising project", fit: "contain" },
          { src: "/internal/fin-mit-project-3.webp", alt: "FIN deputies deployed to a fundraising project" },
          { src: "/internal/fin-mit-project-4.webp", alt: "FIN deputies deployed to a fundraising project", fit: "contain" },
          { src: "/internal/fin-mit-project-5.webp", alt: "FIN deputies deployed to a fundraising project" },
          { src: "/internal/fin-mit-project-6.webp", alt: "FIN deputies deployed to a fundraising project" },
          { src: "/internal/fin-mit-project-7.webp", alt: "FIN deputies deployed to a fundraising project" },
          { src: "/internal/fin-mit-project-8.webp", alt: "FIN deputies deployed to a fundraising project" },
        ],
        groups: [
          {
            items: [
              "An MIT, or a manager in training, is what we call our deputies in the Finance Department — we do our best to prepare you for being a manager in either Celadon, or in other organizations you want to be a part of. When becoming an MIT, we will do our best to properly train and mentor you in fields like logistics and project financials while overseeing your development to make sure you find fulfillment in your college org journey.",
            ],
          },
        ],
      },
    ],
    committeesHeading: "Project and Systems Deployment",
    committeesIntro: [
      { text: "MITs will be " },
      { text: "deployed to projects", bold: true },
      { text: " within and outside the Financial Affairs Department in either of the following committees:" },
    ],
    committees: [
      {
        label: "Operations",
        items: [
          "Manage inventory and financial tracking through Google Sheets and Forms, sharpening organization, attention to detail, and financial literacy.",
          "Deployments: Rose Sale (1), Celadon Merchandise (1)",
        ],
      },
      {
        label: "Logistics",
        items: [
          "Handle venue reservations, procurement, and manpower, building skills in time management, supplier coordination, and adaptability.",
          "Deployments: Rose Sale (1), Celadon Merchandise (1)",
        ],
      },
      {
        label: "Sales",
        items: [
          "Market products, engage with customers, and record transactions, developing interpersonal skills, confidence, and practical sales experience.",
          "Deployments: Rose Sale (1), Celadon Merchandise (1)",
        ],
      },
      {
        label: "Fundraising",
        items: [
          "Lead small-scale fundraisers to provide the deployed project with an additional source of revenue.",
          "Deployments: Binondo Amazing Race (2), Chinese New Year (2), Celadon Ball (1), Jade Business Summit (2)",
        ],
      },
    ],
    committeesNote: [
      [
        { text: "MITs will also be assisting in " },
        { text: "tracking expenses and collecting receipts", bold: true },
        { text: ", both during fundraising activities and throughout the project proper." },
      ],
      [
        {
          text: "Don't worry! Your FIN Systems Managers will be the main people in charge of reimbursements per project. You will be helping from time to time but will always be guided by the Managers.",
        },
      ],
    ],
    timeline: [
      { date: "September 15, 2026", label: "First Departmental General Assembly" },
      { date: "September 22, 2026", label: "Logistics Workshop" },
      { date: "October 19-23, 2026", label: "Lunar Lotus Market" },
      { date: "January 14, 2027", label: "Second Departmental General Assembly" },
      { date: "February 2, 2027", label: "Sales Workshop" },
      { date: "February 9-13, 2027", label: "Celadon Rose Sale" },
      { date: "March 2, 2027", label: "Financial Analysis Workshop" },
      { date: "April 6-8, 2027", label: "FIN Deputy Culminating Event" },
      { date: "Year-Long (2026-2027)", label: "Celadon Merchandise" },
    ],
    applicationNote: { text: "The Financial Affairs Department does NOT require any additional requirements." },
    testimonials: [],
    faqs: [
      {
        q: "How much time commitment should I expect?",
        a: "Tasks will be delegated equally across the MITs. As long as you get your assigned tasks done, you have all the freedom of your time. The FIN EBCB will ensure that your tasks are doable and we will always be giving our guidance and support to fit your pace and availability.",
      },
      {
        q: "Will I be trained before getting assigned work?",
        a: "We will be giving you an overview of the work you will be doing, and it's easily learnable. You will be deployed to projects or finance systems while learning more about different roles through the workshop series.",
      },
      {
        q: "Do I need to be in SOM or have prior finance experience?",
        a: "Not at all! We welcome people from all courses and backgrounds. As long as you have an interest in finance/fundraising and a willingness to learn, we highly encourage that you apply and will be more than happy to guide you as an MIT.",
      },
      {
        q: "Do I need to be good at math?",
        a: "Not necessarily — basic arithmetic is sufficient. Being organized, detail-oriented and responsible are often more important with the work you will be doing here.",
      },
    ],
    contacts: [
      { name: "Jill Lee", role: "VP for Financial Affairs", facebook: "http://fb.com/jillian.lee.7789", email: "jillian.lee@student.ateneo.edu", photo: "/internal/ebcb/fin-jill-lee.webp" },
      { name: "Leander Lee", role: "AVP for Financial Affairs", facebook: "http://fb.com/leandermarcus.lee", email: "leander.marcus.lee@student.ateneo.edu", photo: "/internal/ebcb/fin-leander-lee.webp" },
      { name: "Andrew Tan", role: "AVP for Financial Affairs", facebook: "http://fb.com/andrewkyletan", email: "andrew.k.tan@student.ateneo.edu", photo: "/internal/ebcb/fin-andrew-tan.webp" },
      { name: "Dy Sia", role: "AVP for Financial Affairs", facebook: "http://fb.com/share/19jeVi42AH/", email: "dyanne.rachel.sia@student.ateneo.edu", photo: "/internal/ebcb/fin-dy-sia.webp" },
    ],
    photos: [],
  },

  // ------------------------------------------------------------------------ HR
  {
    slug: "hr",
    emoji: "🫂",
    name: "HR",
    fullName: "Human Resources",
    accent: { base: "#CA8A04", tint: "#FEFCE8", ink: "#713F12" },
    heroImage: { src: "/internal/hr-hero.webp", alt: "Ateneo Celadon Human Resources Department, 2026-2027" },
    cardCover: { src: "/departments/hr-general-assembly.jpg", alt: "HR" },
    cardBlurb:
      "HR centers on projects that provide membership development and leadership formation. It is responsible for fostering an internal organization culture that is embedded with modern Chinese-Filipino values.",
    aboutWidth: "wide",
    about:
      "The Human Resources (HR) Department is the foundation of Celadon's members that works to promote member welfare, engagement, and development. Our department seeks to foster a supportive and inclusive environment where members of Celadon can grow and build meaningful connections while providing opportunities for personal and leadership development.",
    sections: [
      {
        heading: "A Letter From HR",
        groups: [],
        richText: [
          [{ text: "Dear Applicant!", bold: true }],
          [
            { text: "Hey there! If you love connecting with people, bringing out the best in others, and making a room full of strangers feel like family, you've found your home in " },
            { text: "HR", accent: true },
            { text: " \u{1F49B}✨." },
          ],
          [
            {
              text: "In our department, you can be the heart of Celadon. You'll be the Achi or Ahia someone looks up to, the warm welcome a new member needs, and the driving force that helps our community grow together. Join us in shaping an inclusive and vibrant space where everyone belongs. We can't wait to see the incredible impact you'll make! \u{1F680}",
            },
          ],
          [{ text: "Sincerely, your " }, { text: "HR", accent: true }, { text: " Family." }],
        ],
        images: [
          { src: "/internal/hr-photo-1.webp", alt: "Ateneo Celadon HR department members" },
          { src: "/internal/hr-photo-2.webp", alt: "Ateneo Celadon HR department members" },
          { src: "/internal/hr-photo-3.webp", alt: "Ateneo Celadon HR department members" },
          { src: "/internal/hr-photo-4.webp", alt: "Ateneo Celadon HR department members" },
          { src: "/internal/hr-photo-5.webp", alt: "Ateneo Celadon HR department members" },
        ],
      },
      {
        heading: "HR Roadmap",
        colorLabels: true,
        imagePosition: "left",
        images: [
          { src: "/internal/hr-project-1.webp", alt: "HR deputies at the Leadership Development Program" },
          { src: "/internal/hr-project-2.webp", alt: "HR deputies at the Leadership Development Program" },
          { src: "/internal/hr-project-3.webp", alt: "HR deputies at the Leadership Development Program" },
          { src: "/internal/hr-project-4.webp", alt: "HR deputies at the Leadership Development Program" },
        ],
        groups: [
          {
            label: "What to expect in HR?",
            items: [
              "Active Project Deployment: You will be deployed as an HR representative across interdepartmental projects to monitor team rapport and safeguard member welfare.",
              "Leadership & Event Management: Opportunities to co-organize and manage org-wide bonding events (e.g., sports, recreational hangouts). Manage Birthday Greetings initiative led by HR by writing greeting captions every month.",
              "Hands-On Systems Experience: Direct involvement in managing member welfare tools, facilitating project GAs/onboardings, leading team-building exercises, and facilitating Individual Consultations (ICs).",
              "A Supportive Environment: A safe space designed to balance making mistakes, taking accountability, and learning alongside peers and Executive Board/Central Board (EBCB) members.",
            ],
          },
        ],
      },
      {
        heading: "HR Deputy Responsibilities",
        groupsAsCards: true,
        groups: [
          {
            label: "Systems Management Duties",
            items: [
              "Serve as project HR representatives, handling member welfare requests (Leaves of Absence, Resignations, and Concerns).",
              "Co-lead project onboardings by introducing HR services and running 15–20 minute team-building activities.",
              "Track project team dynamics by reminding leaders to schedule mid-project and post-project Individual Consultations (ICs).",
              "Assist the system managers and participate in the ICs as transcribers or as interviewers in the latter part of the school year.",
            ],
          },
          {
            label: "Strategic Impact Duties",
            items: [
              "Co-organize at least one monthly org-wide bonding initiative or event (e.g., watch parties, sports, recreational hangouts).",
              "Provide logistical and manpower support during department initiatives (e.g., Mahjong Mixers/Tambay Weeks).",
              "Assist SIMPs (strategic impact managers) in COA-M sportsfest arrangements.",
            ],
          },
        ],
      },
      {
        heading: "Who are we looking for?",
        groups: [
          {
            items: [
              "Empathetic & Accessible Leaders: Individuals who prioritize member well-being and act as approachable support systems for project teams.",
              "Proactive Collaborators: Team players ready to work with various project managers, committee heads, and fellow deputies to foster an inclusive community.",
              "Initiative & Passion: Members eager to take ownership of projects, initiate engaging activities, and drive student growth and retention.",
              "Growth-Minded Individuals: Dedicated members open to learning, adapting, and growing as student leaders while upholding accountability.",
            ],
          },
        ],
      },
      {
        heading: "Why join HR?",
        groups: [
          {
            items: [
              "HR is the heart of the organization. You are directly responsible for building Celadon's culture, organizing social hangouts, and making the org feel like a welcoming home for every single member. It's the perfect place to hone your leadership and communication skills!",
            ],
          },
        ],
      },
    ],
    testimonials: [],
    faqs: [
      {
        q: "Do I need previous HR experience in order to apply?",
        a: "Not at all! What matters most is being people-oriented, proactive, and flexible. Previous experience in HR may help; however, you may use this opportunity to learn more about it!",
      },
      {
        q: "How much commitment is expected in being an HR Deputy?",
        a: "As an HR Deputy you will be deployed to various events and projects that will occur all year round. You will serve as a co-organizer or support for these projects, but don't worry — we will always ensure that the workload is manageable!",
      },
    ],
    contacts: [
      { name: "Bianca Ysabel Yu", role: "VP for HR", facebook: "http://fb.com/share/1B52TUZ4wv/?mibextid=wwXIfr", email: "bianca.ysabel.yu@student.ateneo.edu", photo: "/internal/ebcb/hr-yzzie-yu.webp" },
      { name: "John Andre Lee", role: "AVP for Human Resources", facebook: "http://fb.com/johnandrelee36", email: "john.andre.lee@student.ateneo.edu", photo: "/internal/ebcb/hr-andre-lee.webp" },
      { name: "Keng Wei Lin", role: "AVP for Human Resources", facebook: "http://fb.com/mxrphem/", email: "keng.wei.lin@student.ateneo.edu", photo: "/internal/ebcb/hr-keng-lin.webp" },
    ],
    photos: [],
  },

  // ----------------------------------------------------------------------- OSR
  {
    slug: "osr",
    emoji: "📊",
    name: "OSR",
    fullName: "Organization Strategies and Research",
    accent: { base: "#7C3AED", tint: "#F5F3FF", ink: "#4C1D95" },
    heroImage: { src: "/internal/osr-hero.webp", alt: "Organization Strategies and Research — loading, panda mascot" },
    // Biased right so the crop hides more of the left-edge chart panel —
    // that panel otherwise leaves a sliver of real content sitting right in
    // the fade-to-backdrop zone at the crisp copy's left edge.
    heroImagePadding: { large: true, objectPosition: "65% center" },
    cardCover: { src: "/internal/osr-card-cover.webp", alt: "OSR" },
    cardBlurb:
      "OSR develops evaluative and data-driven projects and organizational strategies for Celadon’s sustainable growth. The department handles research initiatives and back-end work for the organization.",
    aboutWidth: "wide",
    about: [
      [
        { text: "The " },
        { text: "Organization Strategies and Research Department (OSR)", bold: true },
        {
          text: " supervises and maintains the overall welfare of the organization by ",
        },
        { text: "spearheading and administering various evaluations and research", bold: true },
        {
          text: ". The department collects qualitative and quantitative data through consultations and questionnaires to make data-driven assessments and recommendations for Celadon's projects and departments. Moreover, OSR provides technical support through assigned liaison teams and project deployments. By ",
        },
        { text: "optimizing organizational systems and workflows", bold: true },
        { text: ", the department continuously improves the organization's operational efficiency. Ultimately, OSR ensures that Celadon is grounded in " },
        { text: "data-driven decision-making", bold: true },
        {
          text: " to ensure that its members are strategically engaged and that organizational goals are achieved.",
        },
      ],
    ],
    techShowcase: {
      heading: "This website is OSR's work!",
      blurb:
        "To improve the experiences of Celadon's members, OSR built this website, together with the Mahjong Leaderboard and CelaWrapped, during RecWeek & Welcome Week. If you want to have the opportunity to learn from us hands-on and try to build similar initiatives, then OSR may be the department for you!",
      items: [
        {
          name: "ateneoceladon.com",
          description:
            "We prepared this website, both its public-facing front and this internal portal, Ayi's Corner! The entire site is designed, coded, and maintained end-to-end by us.",
          href: "https://ateneoceladon.com",
        },
        {
          name: "Mahjong Leaderboard",
          description:
            "This is a live leaderboard, which was first implemented during Welcome Week, for tracking standings and engagements among Celadon's mahjong community!",
          href: "https://script.google.com/a/student.ateneo.edu/macros/s/AKfycbxNNdxbleontXs4X_-kB4lK_9qLV5Me6YnPvzjpzTnuyZj0xTwwbNkJ2XKow3PICsst/exec?table=A4&pli=1",
        },
        {
          name: "CelaWrapped",
          description:
            "At the end of each school year, we feature fun statistics and information we've collected on Celadon throughout the year, Spotify Wrapped-style! You may also expect to receive your own personalized CelaWrapped based on the information gathered over RecWeek and Welcome Week.",
        },
      ],
    },
    sections: [
      {
        heading: "Junior Analyst (Deputy-level Role)",
        groups: [],
        imagePosition: "left",
        images: [
          { src: "/internal/osr-photo-1.webp", alt: "Ateneo Celadon OSR department members" },
          { src: "/internal/osr-photo-2.webp", alt: "Ateneo Celadon OSR department members" },
          { src: "/internal/osr-photo-3.webp", alt: "Ateneo Celadon OSR department members" },
          { src: "/internal/osr-photo-4.webp", alt: "Ateneo Celadon OSR department members" },
          { src: "/internal/osr-photo-5.webp", alt: "Ateneo Celadon OSR department members" },
        ],
        richText: [
          [{ text: "Available Slots: 8–10", bold: true }],
          [
            { text: "OSR Junior Analysts work together with Consultants & Senior Analysts on projects, being " },
            { text: "directly deployed", bold: true },
            {
              text: " to Core Teams as Operations and/or Recruitment & Secretariat core members. The role encompasses assisting the managers in facilitating ",
            },
            { text: "consultations", bold: true },
            { text: ", administering " },
            { text: "evaluations", bold: true },
            { text: ", writing " },
            { text: "project sustainability reports", bold: true },
            { text: ", and gathering other " },
            { text: "relevant data", bold: true },
            {
              text: ". Moreover, they also get to participate in the department's internal efforts, such as the Google Sheets/Excel ",
            },
            { text: "workshop", bold: true },
            { text: ", AppScript " },
            { text: "tutorials", bold: true },
            { text: ", and execution of small-scale " },
            { text: "research initiatives", bold: true },
            { text: "." },
          ],
        ],
      },
      {
        heading: "What's in store for you?",
        images: [
          { src: "/internal/osr-recweek-celaville.webp", alt: "OSR EBCB at RecWeek 2026-2027 Celaville" },
        ],
        groups: [
          {
            label: "As a member of OSR, you may expect to…",
            items: [
              "Improve your technical skills as you work and familiarize yourself with data collection and Google Workspace.",
              "Hone your critical thinking and analytical skills in supporting other departments and/or projects.",
              "Develop your interpersonal skills as you work collaboratively with other members of OSR and the Celadonean community.",
            ],
          },
        ],
      },
    ],
    timelineCompanion: {
      heading: "Who are we looking for?",
      groupsAsCards: true,
      groups: [
        {
          label: "Driven & Proactive",
          items: [
            "Individuals who will dutifully accomplish their tasks by providing technical support and insights and find purpose in doing consultations and meticulous work for the improvement of Celadon.",
          ],
        },
        {
          label: "Analytical & Eager to Learn",
          items: [
            "Team players who have experience working with Google Sheets and Workspace and are eager to develop their soft skills alongside their technical capabilities.",
          ],
        },
      ],
    },
    timeline: [
      { date: "Late September 2026", label: "Department General Assembly" },
      { date: "September to November 2026", label: "First Semester Project Deployments" },
      { date: "Early to Mid October 2026", label: "Workshop 1: Google Sheets and Appscript" },
      { date: "Mid October 2026", label: "First Department Hangout" },
      { date: "Late October 2026", label: "Workshop 2: Email Blasting & Sustainability Report Creation" },
      { date: "January 2027", label: "Second Department Hangout" },
      { date: "Mid January 2027", label: "Workshop 3: Advanced Appscript" },
      { date: "January to May 2027", label: "Second Semester Project Deployments" },
      { date: "March 2027", label: "Third Department Hangout" },
    ],
    floatingApplyUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSflXsyvOgmISRO9kSDI1229_oRkr6wmSbBoaKKjrbvUWcwf_w/viewform",
    applicationNote: { text: "OSR has no additional requirements for Junior Analysts." },
    testimonials: [
      {
        name: "Sofia Diño",
        role: "OSR Associate Vice President '26-'27, OSR Junior Analyst '25-'26",
        photo: "/internal/ebcb/osr-sofia-dino.webp",
        quote:
          "OSR taught me that our work extends far beyond numbers, questionnaires, and evaluations. All the data we gather serves a purpose: to better understand our members, projects, departments—and most importantly, to develop strategies for the Celadon we want to build. And, unlike what one may typically assume, being a Junior Analyst isn't about having a secondary role; rather, it is about having the opportunity to ask questions, contribute ideas, and recommend solutions. I not only improved my technical skills and knowledge, but I found a space that provided me with avenues for growth and helped me build meaningful relationships with those who make everything worthwhile.",
      },
      {
        name: "Keene Brigado",
        role: "RecWeek & Welcome Week Project Manager '26-'27, OSR Junior Analyst '25-'26",
        photo: "/internal/ebcb/osr-keene-brigado.webp",
        quote:
          "Before OSR, I didn't know much about Google Apps Script, and I was still trying to find a place where I belonged. Joining this department taught me so many technical things, gave me amazing friends along the way, and opened up a lot of doors for me. OSR really made me who I am today. Without this department, I definitely wouldn't have what it takes to make it this far.",
      },
    ],
    faqs: [
      {
        q: "Do I need to be knowledgeable about Google Sheets or data analysis to join OSR?",
        a: "While preferred, no prior experience is needed. It's great if you already know these tools, but what matters most is your commitment to the role and willingness to learn!",
      },
      {
        q: "How much commitment is expected when being an OSR Analyst?",
        a: "Being an OSR Junior Analyst requires a consistent but manageable level of commitment. While the workload varies depending on several factors like project timelines, the role is designed to be flexible and balanced with your academic priorities. Commitment is more about reliability, teamwork, and delivering quality work on schedule rather than a fixed number of hours.",
      },
    ],
    contacts: [
      { name: "Kyle Co", role: "VP for Organization Strategies and Research", facebook: "http://fb.com/Kyledominic.co", email: "kyle.dominic.co@student.ateneo.edu", photo: "/internal/ebcb/osr-kyle-co.webp" },
      { name: "Sofia Diño", role: "AVP for Organization Strategies and Research", facebook: "http://fb.com/sofiag.dino", email: "sofia.giulia.dino@student.ateneo.edu", photo: "/internal/ebcb/osr-sofia-dino.webp" },
      { name: "Lyss Orquina", role: "AVP for Organization Strategies and Research", facebook: "http://fb.com/alyssa.orquina", email: "alyssa.andrea.orquina@student.ateneo.edu", photo: "/internal/ebcb/osr-lyss-orquina.webp" },
      { name: "Keene Brigado", role: "AVP for Organization Strategies and Research", facebook: "https://www.facebook.com/kbrigado", email: "keene.xander.bridgado@student.ateneo.edu", photo: "/internal/ebcb/osr-keene-brigado.webp" },
    ],
    photos: [],
  },
];

export function getDepartment(slug: string): Department | undefined {
  return DEPARTMENTS.find((d) => d.slug === slug);
}

// ------------------------------------------------------------------- Hub content
// From this year's dept-apps hub outline PDF.

export const HUB_TIMELINE: DeptTimelineItem[] = [
  { date: "September 4–12, 2026", label: "Deputy Application Duration" },
  { date: "September 8–15, 2026", label: "Interview Dates" },
  { date: "September 18, 2026", label: "Release of Results" },
];

export const HUB_FAQS: DeptFaq[] = [
  {
    q: "Can I apply to more than one department?",
    a: "Yes, you may apply to as many departments as you want, but you will only get accepted by one department at most! Applying for multiple positions in the same department is counted as one department, so you can still apply for another department.",
  },
  {
    q: "Can I apply for two positions under one department?",
    a: "Yes, you can apply for two positions under one department, but you will only be accepted into ONE position.",
  },
  {
    q: "What's the difference between being a department deputy versus a project core team member?",
    a: "A department deputy role is a year-long commitment and journey with your department, where you'll be able to work together, build close bonds, and be deployed to support or lead projects throughout the year. On the other hand, being a project core team member entails holding a short-term role across a few months, that is focused on one specific project.",
  },
];

export const HUB_TESTIMONIALS: DeptTestimonial[] = [
  {
    name: "Claire Chiu",
    role: "Chinese New Year Project Manager '26-'27, External Relations Partnerships Manager '26-'27, External Relations Associate '25-'26",
    photo: "/internal/testimonial-claire.webp",
    quote:
      "Joining Celadon as a freshman was one of the best decisions I have made, and joining one of its departments as an External Relations Deputy made the experience all the more memorable. ExRel was a space where I was given the opportunity to grow and learn, whether through project deployments or simply meeting and getting to know new people along the way. So, if you've been waiting for a sign to give it a shot, this is it — submit that application form, put yourself out there, and see where it takes you!",
  },
  {
    name: "Marcus Castro",
    role: "Lunar Lotus Market Project Manager '26-'27, Financial Affairs Manager-In-Training '25-'26",
    photo: "/internal/testimonial-marcus.webp",
    quote:
      "Being a Celadon deputy was a welcoming and fun jumpstart into being active in Celadon projects. In the FIN MIT program, I was able to learn the fundamentals of fundraising and budgeting. It taught me the importance of keeping records and how to make sales. It is also a great place to make new friends!",
  },
];
