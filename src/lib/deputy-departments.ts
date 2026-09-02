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
  items: string[];
}

export interface DeptSection {
  heading: string;
  groups: DeptGroup[];
  image?: { src: string; alt: string };
}

/** A distinct applicant-facing position — only departments with more than
 * one of these (COMMPUB's five pools) render as an accordion; everything
 * else just has a single implicit role described by `sections`. */
export interface DeptRole {
  slug: string;
  emoji?: string;
  title: string;
  description: string;
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
}

export interface Department {
  slug: string;
  emoji: string;
  name: string;
  fullName: string;
  accent: DeptAccent;
  /** Illustrated banner from the department's own PDF. Not every department
   * has one — OSR's source material never included one. */
  heroImage?: { src: string; alt: string };
  /** Photo cover shown on the hub's department card — distinct from
   * `heroImage`, which is the department's own page banner. */
  cardCover: { src: string; alt: string };
  /** Short blurb shown on the hub's department card — distinct from `about`,
   * which is the longer bio on the department's own page. */
  cardBlurb: string;
  about: string;
  /** COMMPUB's PDF has a distinct "Vision and Thrust" blurb beyond the
   * plain department description; nobody else does. */
  visionThrust?: string;
  /** Multiple distinct applicant-facing positions. Only populated where a
   * department's PDF actually lists more than one (COMMPUB's five pools) —
   * everything else is a single role covered by `sections` instead. */
  roles?: DeptRole[];
  sections: DeptSection[];
  /** FIN MITs get deployed into one of four committees; shown as an
   * informational breakdown, not a role choice. */
  committees?: DeptGroup[];
  timeline?: DeptTimelineItem[];
  /** EXREL's four flagship projects/initiatives. */
  projects?: DeptProject[];
  /** OSR-only: real tools/products OSR members have built for Celadon (this
   * site included) — a concrete "if you want to build things like this,
   * this is the department" hook, distinct from `projects`, which covers
   * org-wide event/campaign projects rather than built software. */
  techShowcase?: {
    heading: string;
    blurb: string;
    items: { name: string; description: string; href?: string }[];
  };
  /** Extra note alongside the (uniform, 3-step) application instructions —
   * e.g. a link to additional requirements, or "none needed" for clarity. */
  applicationNote?: { text: string; href?: string };
  testimonials: DeptTestimonial[];
  faqs: DeptFaq[];
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
      "The Communications and Publications Department handles branding, social media, and creative content in graphic, physical design, photo, video, and writing. It aims to bring Celadon’s voice and stories to life.",
    about:
      "The Communications and Publications (COMMPUB) Department produces creative media in various forms and is also responsible for training and developing its members' creative abilities and other relevant skills. As a COMMPUB staffer, you will become a part of the department for the whole school year, selecting one (1) out of our five (5) pools: Digital Creatives, Production Design, Photos, Videos, and Writing. As a member of the department, you will be participating in bonding activities and meaningful workshops, be given the chance to contribute creative outputs to CelaZine, COMMPUB's official online magazine, and be deployed to Celadon projects, giving you plenty of chances for exploration and growth. Meet fellow artists, engage in fun activities, and unleash your creative side by joining the COMMPUB department!",
    visionThrust:
      "COMMPUB aims to engage its members' creative interests by providing opportunities to grow in skill-building, leadership, and community, through the maintenance and promotion of comprehensive systems, COMMPUB-led workshops, and the integration of members in concrete talent-cultivating initiatives and Celadon projects.",
    roles: [
      {
        slug: "digital-creatives",
        emoji: "🎨",
        title: "Digital Creatives Pool",
        description:
          "Digital Creatives Staffers design digital creative and graphic design outputs for Celadon projects and other promotional materials, working in collaboration with other pools or project teams to conceptualize and create cohesive outputs. If you are interested in graphic design, as well as innovative and willing to explore new themes and artistic directions, then this is the pool for you! Experience in Canva, Adobe Photoshop, Adobe Illustrator, or other graphic design softwares is highly preferred, but not required.",
      },
      {
        slug: "production-design",
        emoji: "🛠️",
        title: "Production Design Pool",
        description:
          "Production Design Staffers create and conceptualize physical props, onsite gimmicks, set/booth designs, and more for Celadon projects and initiatives. If you are interested in physical crafts and design, bursting with ideas for marketing gimmicks, and excited to work with something hands-on, then this is the pool for you! Experience in onsite design layout, prop crafting, and gimmicks is highly preferred, but not required.",
      },
      {
        slug: "photos",
        emoji: "📸",
        title: "Photos Pool",
        description:
          "Photos Staffers document various Celadon projects and initiatives, and participate in the making of DP shoots and photo collages. If you are interested in photography, and eager to explore new concepts and artistic directions, then this is the pool for you! Experience in photography and photo editing software is highly preferred, but not required. Owning a good camera is likewise highly preferred, but also not required.",
      },
      {
        slug: "videos",
        emoji: "🎥",
        title: "Videos Pool",
        description:
          "Videos Staffers capture and edit engaging video content for Celadon projects and initiatives, such as short edits, event recaps, promotional videos, and Reels. If you are interested in video production (whether shooting, editing, or both), and driven to exploring new artistic directions, then this is the pool for you! Experience in video production and editing is highly preferred, but not required. Owning a good camera is likewise highly preferred, but also not required.",
      },
      {
        slug: "writing",
        emoji: "✍️",
        title: "Writing Pool",
        description:
          "Writing Staffers create various writing-based outputs including but not limited to: spiels/captions, poems, articles, and more. As a Writing Staffer, you will also be required to contribute at least one output to CelaZine, COMMPUB's official online magazine. If you are interested in exploring new writing styles and working with a variety of content, as well as detail-oriented, witty, and able to create emphatic written pieces, then this is the pool for you! Experience in writing a variety of written content and creative outputs is highly preferred, but not required.",
      },
    ],
    sections: [],
    applicationNote: {
      text: "You must submit additional requirements for every pool you apply to (find them in the Additional Requirements doc) — but whether you apply to one or two pools, you only need to sign up for ONE interview.",
      href: "https://docs.google.com/document/d/1fvO5nr9ze-vnwbelc_XBSIeTkzUQafuuC6CE_nVD5Ow/edit?usp=sharing",
    },
    testimonials: [],
    faqs: [],
    contacts: [
      { name: "Jillian Yu", role: "VP for Communications and Publications", facebook: "http://fb.com/jillian.yu.758", email: "jillian.yu@student.ateneo.edu", photo: "/internal/ebcb/commpub-jillian-yu.webp" },
      { name: "Jillian Dy", role: "AVP for Creative Branding and Design", facebook: "http://fb.com/jillian.dy.961", email: "jillian.dy@student.ateneo.edu", photo: "/internal/ebcb/commpub-jillian-dy.webp" },
      { name: "Dia Fernando", role: "AVP for Creative Branding and Design", facebook: "http://fb.com/dia.fernando.9", email: "dia.ainsly.fernando@student.ateneo.edu", photo: "/internal/ebcb/commpub-dia-fernando.webp" },
      { name: "Simone Chua", role: "AVP for Documentation and Publications", facebook: "http://fb.com/simoneabigailc", email: "simone.chua@student.ateneo.edu", photo: "/internal/ebcb/commpub-simone-chua.webp" },
      { name: "Abby Tan", role: "AVP for Documentation and Publications", facebook: "http://fb.com/abbytann", email: "elise.tan@student.ateneo.edu", photo: "/internal/ebcb/commpub-abby-tan.webp" },
    ],
    photos: ["/internal/commpub-ga.webp"],
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
      "The Cultural Affairs Department is the heart of Celadon. It promotes Filipino-Chinese culture through meaningful events and builds on relevance, appreciation, and cultural connection.",
    about:
      "The Cultural Affairs (CUL) Department is the heart of Celadon as it spearheads the cultivation of awareness, understanding, and appreciation of the Chinese-Filipino culture both inside and outside the organization through various projects and initiatives. Given this, the department seeks to enrich active culture-sharing and encourage passive discourse and provide proper leadership training and engagement opportunities to better equip members in leading cultural initiatives under the department.",
    sections: [
      {
        heading: "CUL Trainee Roadmap",
        image: { src: "/internal/cul-roadmap.webp", alt: "CUL Trainee year-long roadmap, from the first CUL GA in September through the second CUL GA and bonding in April" },
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
        groups: [
          {
            items: [
              "Spearhead the planning and execution of CUL Mini Events (e.g., workshops, talks)",
              "Contribute to CUL projects by heading Logistics or Programs committees in core teams",
              "Honing leadership skills by attending skills-development workshops spearheaded by CUL and other departments",
            ],
          },
        ],
      },
      {
        heading: "Who are we looking for?",
        groups: [
          {
            items: [
              "Individuals who are passionate and want to enhance their project management skills",
              "Members with a strong passion and love for culture-sharing",
              "People who are proactive in sharing visions and bringing them to life",
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
        q: "Why CUL over other departments?",
        a: "In an organization that builds discourse between the Filipino-Chinese culture and that of the larger Ateneo community and society, the CUL department serves as a direct avenue toward this goal with its many culturally-focused initiatives.",
      },
    ],
    contacts: [
      { name: "Therese Yap", role: "VP for Cultural Affairs", facebook: "http://fb.com/yap.reese04", email: "anne.therese.yap@student.ateneo.edu", photo: "/internal/ebcb/cul-therese-yap.webp" },
    ],
    photos: ["/internal/cul-dragon-dance.webp"],
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
      "The External Relations Department serves as the liaison of Ateneo Celadon towards external organizations and corporations. The department aims to provide value to both the internal and external stakeholders of the organization through engaging in strategic, mutually-beneficial and sustainable partnerships.",
    about:
      "The External Relations (EXREL) Department is the matchmaker of Celadon, aiming to strengthen on and off-campus partnerships by creating sustainable and beneficial relationships between the organization and renowned sponsors and partners through systematic contacting and negotiating, as well as flagship projects — Binondo Amazing Race (BAR) and Jade Business Summit (JADE) — and in-house initiatives such as Celadon's AlumNight and Advocacy Outreach. These endeavours help improve Celadon's visibility to the general public and provide either monetary or product-based sponsorship. As such, EXREL aims to develop and cultivate its associates into leaders knowledgeable in Celadon's EXREL systems for database contacting, negotiating, and package drafting, with a minor understanding of project management.",
    sections: [
      {
        heading: "EXREL Associate Role",
        groups: [
          {
            items: [
              "EXREL Associates are to be the official liaison of Ateneo Celadon towards external organizations (e.g. student organizations, corporate sponsors, advocacy communities, Chinese-Filipino organizations)",
              "EXREL Associates aim to provide value to both internal and external stakeholders of the organization through sustainable and mutually beneficial partnerships",
              "EXREL Associates seek to generate, develop, and maintain the relationships and networks of the organization",
            ],
          },
        ],
      },
      {
        heading: "Positions and Responsibilities",
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
    testimonials: [
      {
        name: "Ashley",
        role: "Associate Vice President for External Relations",
        quote:
          "Of course! This role is open to everyone, no matter your experience level. When I applied to become an ExRel Associate, there were so many systems and processes that I wasn't aware of. However, throughout the year, I was able to slowly learn these things through the projects I joined and the people I worked with. It's important that you keep an open mind and are ready to learn new things.",
        photo: "/internal/ebcb/exrel-ashley-yu.webp",
      },
      {
        name: "Kyle",
        role: "Associate Vice President for External Relations",
        quote:
          "Absolutely! When I applied for the role, I genuinely had zero clue on anything about ExRel. What I did get right, though, is that there would be a lot of networking and getting to know people inside and outside of Celadon. The most important thing we look for is your willingness to learn. Even if you don't have any experience, as long as you have the initiative and drive to learn, go for it!",
        photo: "/internal/ebcb/exrel-kyle-tan.webp",
      },
      {
        name: "Yomi",
        role: "Vice President for External Relations",
        quote:
          "Speaking as a former ExRel Associate, the workload has always been very manageable within the department as ample support is provided by the people you work with (Managers and EBCB). You also get the freedom to choose how many commitments you'd like to take on throughout the year across projects and initiatives of your choice!",
      },
      {
        name: "Vin",
        role: "Associate Vice President for External Relations",
        quote:
          "Choosing EXREL means choosing to learn and immerse yourself in skills that you can surely use anywhere you go. Interpersonal, negotiation, and communication skills are among these skills you can use in your personal life, future career or business, group work, and so much more.",
        photo: "/internal/ebcb/exrel-vin-ong.webp",
      },
    ],
    faqs: [
      {
        q: "How much commitment is expected when being an EXREL Associate?",
        a: "The EXREL EBCB expects each individual to prioritize their academics and well-being above organization-related work. In exchange, the EXREL EBCB also expects each individual to communicate their concerns as soon as possible to their respective teams, managers or EBCB.",
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
    cardCover: { src: "/internal/fin-card-cover.webp", alt: "FIN" },
    cardBlurb:
      "The Financial Affairs Department manages Celadon’s finances and major fundraising projects. We train members holistically — both financially and entrepreneurially.",
    about:
      "The Financial Affairs Department is responsible for all the organization's financial matters including major fundraising projects for the organization and financial transactions of all ongoing initiatives within Celadon. Our department is known for our flagship fundraising projects such as Celadon Rose Sale (RS), Celadon Merchandise (Merch), and Lunar Lotus Market (LLM), as well as our Tent Rental Service. By sustainable innovation and entrepreneurship amongst the members and leaders of the organization, we are able to supply the entire financial ecosystem for all projects of Celadon. From fundraising to budget allocation, our department aims to foster a more open community by initiating purpose-driven and relational bonding opportunities for FIN deputies (FIN MITs), managers, and EBCB through workshops, dinners, and outings.",
    sections: [
      {
        heading: "FIN Manager-In-Training (FIN MIT)",
        groups: [
          {
            items: [
              "An MIT, or a manager in training, is what we call our deputies in the Finance Department — we do our best to prepare you for being a manager in either Celadon, or in other organizations you want to be a part of. When becoming an MIT, we will do our best to properly train and mentor you in fields like logistics and project financials while overseeing your development to make sure you find fulfillment in your college org journey.",
            ],
          },
        ],
      },
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
    testimonials: [
      {
        name: "Marcus Castro",
        role: "Lunar Lotus Market Project Manager '26-'27, Financial Affairs Manager-In-Training '25-'26",
        quote:
          "Being a Celadon deputy was a welcoming and fun jumpstart into being active in Celadon projects. In the FIN MIT program, I was able to learn the fundamentals of fundraising and budgeting. It taught me the importance of keeping records and how to make sales. It is also a great place to make new friends!",
      },
    ],
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
    heroImage: { src: "/internal/hr-hero.webp", alt: "Ateneo Celadon Human Resources Department" },
    cardCover: { src: "/departments/hr-general-assembly.jpg", alt: "HR" },
    cardBlurb:
      "The Human Resources Department develops membership development and leadership through meaningful formation and community-building efforts.",
    about:
      "The Human Resources (HR) Department is the foundation of Celadon's members that works to promote member welfare, engagement, and development. The department seeks to foster a supportive and inclusive environment where members can grow and build meaningful connections while providing opportunities for personal and leadership development.",
    sections: [
      {
        heading: "HR Roadmap",
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
    photos: ["/internal/hr-bonding.webp"],
  },

  // ----------------------------------------------------------------------- OSR
  {
    slug: "osr",
    emoji: "📊",
    name: "OSR",
    fullName: "Organization Strategies and Research",
    accent: { base: "#7C3AED", tint: "#F5F3FF", ink: "#4C1D95" },
    cardCover: { src: "/internal/osr-card-cover.webp", alt: "OSR" },
    cardBlurb:
      "The Organization Strategies and Research Department develops evaluative and data-driven project and organizational strategies for Celadon’s sustainable growth. The department handles the internal systems and research initiatives for the organization.",
    about:
      "The Organization Strategies and Research Department (OSR) supervises and maintains the overall welfare of the organization by spearheading and administering various evaluations and research. The department collects qualitative and quantitative data through consultations and questionnaires to make data-driven assessments and recommendations for Celadon's projects and departments. Moreover, OSR provides technical support through assigned liaison teams and project deployments. By optimizing organizational systems and workflows, the department continuously improves the organization's operational efficiency. Ultimately, OSR ensures that Celadon is grounded in data-driven decision-making to ensure that its members are strategically engaged and that organizational goals are achieved.",
    techShowcase: {
      heading: "Built by OSR",
      blurb:
        "This website, the Mahjong Leaderboard, and CelaWrapped were all designed and built by OSR members — not outsourced, not assigned from outside the department, just members who decided to build something the org needed. If you've ever wanted to make something like this for Celadon, OSR is where that starts.",
      items: [
        {
          name: "ateneoceladon.com",
          description:
            "The public website and this deputy application portal you're reading right now — designed, coded, and maintained end-to-end by OSR.",
          href: "https://ateneoceladon.com",
        },
        {
          name: "Mahjong Leaderboard",
          description: "A live leaderboard for Celadon's mahjong community, tracking standings across the year.",
        },
        {
          name: "CelaWrapped",
          description: "Celadon's own year-in-review, Spotify Wrapped-style, built from scratch for the org.",
        },
      ],
    },
    sections: [
      {
        heading: "Junior Analyst (Deputy-level Role)",
        groups: [
          {
            items: [
              "Deployment as RecSec/Operations Core to different Celadon projects",
              "Assist the OSR Consultant Managers with evaluations, data gathering, ICs, and completing the sustainability report",
              "Participate in different OSR workshops and events!",
            ],
          },
        ],
      },
      {
        heading: "What's in store for you?",
        groups: [
          {
            label: "As a member of OSR, you may expect to…",
            items: [
              "Improve your technical skills as you work and familiarize yourself with data collection and Google Workspace.",
              "Hone your critical thinking and analytical skills in supporting other departments and/or projects.",
              "Develop your interpersonal skills as you work collaboratively with other members of the Celadonean community.",
            ],
          },
        ],
      },
      {
        heading: "Who are we looking for?",
        groups: [
          {
            items: [
              "Driven & Proactive: Individuals who will dutifully accomplish their tasks by providing technical support and insights and find purpose in doing consultations and meticulous work for the improvement of Celadon.",
              "Analytical & Eager to Learn: Team players who have experience working with Google Sheets and Workspace and are eager to develop their soft skills alongside their technical capabilities.",
            ],
          },
        ],
      },
    ],
    applicationNote: { text: "OSR has no additional requirements for Junior Analysts." },
    testimonials: [
      {
        name: "Keene Brigado",
        role: "RecWeek & Welcome Week Project Manager '26-'27, OSR Junior Analyst '25-'26",
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
  { date: "September 3–12, 2026", label: "Deputy Application Duration" },
  { date: "September 8–16, 2026", label: "Interview Dates" },
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
    a: "A department deputy role is a year-long journey with your department family, where you'll be able to train together, build close bonds, and get deployed to support or lead multiple projects throughout the year. Being on a project core team is a short-term role (a few months) focused on one specific project or event, where you may serve as a core member or head.",
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
