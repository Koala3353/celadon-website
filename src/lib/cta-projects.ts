/**
 * Detail-page content for individual Core Team Applications Wave 1
 * projects. Only Chinese New Year has a page so far — add the others here
 * as their own instructions PDFs come in, following the same shape.
 */
import type { AboutRun, DeptContact, DeptGroup, DeptTimelineItem } from "@/lib/deputy-departments";

export interface CtaProjectTestimonial {
  name: string;
  role: string;
  quote: string;
  photo?: string;
}

export interface CtaProjectDetail {
  slug: string;
  name: string;
  fullName: string;
  thrust: string;
  accent: { base: string; tint: string; ink: string };
  heroImage: { src: string; alt: string };
  /** Short hero blurb, shown under the title. */
  about: string;
  /** "Dear Applicant" letter from the PMs, as paragraphs — the "Dear
   * Applicant," heading itself is rendered separately, not part of this. */
  letter: AboutRun[][];
  letterSignoff: { highlighted: string; name: string };
  whatIsIt: { heading: string; body: AboutRun[][]; images?: { src: string; alt: string }[] };
  vision: string;
  /** A single designed graphic (as the source PDF shows it) takes priority
   * over structured cards when both are given — a project's own testimonial
   * artwork is worth keeping as-is rather than pulling it apart. */
  testimonialsImage?: { src: string; alt: string };
  testimonials?: CtaProjectTestimonial[];
  timeline: DeptTimelineItem[];
  committees: DeptGroup[];
  faqs: { q: string; a: string }[];
  contacts: DeptContact[];
}

export const CHINESE_NEW_YEAR: CtaProjectDetail = {
  slug: "chinese-new-year",
  name: "CNY '27",
  fullName: "Chinese New Year 2027",
  thrust: "A Home in Every Hue: Celebrating Culture in Full Color",
  accent: { base: "#DC2626", tint: "#FEF2F2", ink: "#7F1D1D" },
  heroImage: {
    src: "/internal/cta-wave1/cny-hero.webp",
    alt: "Chinese New Year '27 — A Home in Every Hue: Celebrating Culture in Full Color",
  },
  about:
    "Join us in welcoming the Year of the Fire Goat this February 2–5, 2027! A vibrant celebration where traditions, festive customs, and cherished childhood memories come to life.",
  letter: [
    [
      {
        text: "We’re so happy to see you here! Thank you for your interest in being part of ",
      },
      { text: "Chinese New Year 2027, one of Celadon’s major cultural projects", bold: true, highlight: true },
      { text: "." },
    ],
    [
      {
        text: "Through this celebration we hope to bring Filipino-Chinese culture closer to the Ateneo community by creating a space where everyone can learn, participate, and celebrate together. From ",
      },
      { text: "interactive booths and cultural activities to performances, exhibits, and food", bold: true, highlight: true },
      {
        text: ", CNY is more than just a celebration, it is an opportunity to share the traditions, stories, and values that continue to shape our culture.",
      },
    ],
    [
      { text: "“CNY 2027: A Home in Every Hue: Celebrating Culture in Full Color”", bold: true, highlight: true },
      {
        text: " is inspired by the warmth of childhood memories, familiar traditions, and festive food. We hope to create a celebration that feels welcoming, meaningful, and familiar. We’d love to have you be part of the team that brings this vision to life!",
      },
    ],
    [{ text: "Join us in welcoming the Year of the Fire Goat this February 2–5, 2027! ✨🧧🐐" }],
  ],
  letterSignoff: { highlighted: "With joy in every hue,", name: "Claire and Jenny" },
  whatIsIt: {
    heading: "🧧 What is Chinese New Year?",
    body: [
      [
        { text: "Chinese New Year is a celebration rooted in " },
        { text: "tradition, family, and community", bold: true, highlight: true },
        { text: ", marking the start of a new year and welcoming it with hopes of " },
        { text: "prosperity, luck, and renewal", bold: true, highlight: true },
        {
          text: ". In the Filipino-Chinese community, these traditions have become part of a rich cultural heritage that continues to shape our communities today.",
        },
      ],
      [
        {
          text: "Beyond the festivities, CNY is an opportunity to learn about the stories behind traditions, appreciate cultural heritage, and come together across different backgrounds. It reminds us that ",
        },
        { text: "culture can be both something we inherit and something we share with others", bold: true, highlight: true },
        { text: "." },
      ],
    ],
    images: [
      { src: "/internal/cta-wave1/cny-event-p6.webp", alt: "A past Ateneo Celadon Chinese New Year celebration's decorated campus walkway" },
      { src: "/internal/cta-wave1/cny-event-p9.webp", alt: "Members playing mahjong at a past CNY celebration" },
      { src: "/internal/cta-wave1/cny-event-p10.webp", alt: "A guzheng performance at a past CNY celebration" },
      { src: "/internal/cta-wave1/cny-event-p5.webp", alt: "Members in red at a past CNY celebration" },
      { src: "/internal/cta-wave1/cny-event-p7.webp", alt: "An activity booth at a past CNY celebration" },
      { src: "/internal/cta-wave1/cny-event-p11.webp", alt: "A booth activity at a past CNY celebration" },
    ],
  },
  vision:
    "To bring Chinese-Filipino culture to life through a celebration that inspires appreciation, strengthens community, and creates meaningful memories for the Ateneo community.",
  testimonialsImage: {
    src: "/internal/cta-wave1/cny-testimonials.webp",
    alt: "Testimonials — CNY '26 PM Franzelle Yulangco and CNY '26 PM Therese Yap",
  },
  timeline: [
    { date: "September 25, 2026", label: "Release of Wave 1 Results" },
    { date: "September 30, 2026", label: "Heads Onboarding" },
    { date: "October 8, 2026", label: "First General Assembly" },
    { date: "October 9–November 25, 2026", label: "Working Timeline for 1st Semester" },
    { date: "January 4–30, 2027", label: "Working Timeline for 2nd Semester" },
    { date: "February 2–5, 2027", label: "Chinese New Year Project Proper" },
  ],
  committees: [
    {
      label: "Programs 🎉 · 2 heads, 5 cores",
      items: [
        [
          {
            text: "The Programs (Prog) Committee is responsible for conceptualizing and implementing the activities and overall event flow of CNY. They work to ensure that each activity is engaging, culturally meaningful, and runs smoothly throughout the celebration.",
            italic: true,
          },
        ],
        "Conceptualize and develop activity booth mechanics and cultural activities",
        "Plan the event flow and program for the whole of CNY",
        "Coordinate with performers and other committees for program requirements",
        "Oversee the execution of activities and onsite gimmicks",
      ],
    },
    {
      label: "Logistics 📦 · 2 heads, 5 cores",
      items: [
        [
          {
            text: "The Logistics (Log) Committee works behind the scenes to ensure that all venues, materials, equipment, and other physical requirements are secured and ready for CNY.",
            italic: true,
          },
        ],
        "Reserve venues and coordinate necessary requirements",
        "Source and procure materials, equipment, and supplies",
        "Coordinate transportation and delivery of materials",
        "Assist with venue and booth setup and prepare contingency plans",
      ],
    },
    {
      label: "Food 🥟 · 2 heads, 5 cores",
      items: [
        [
          {
            text: "The Food Committee handles the planning and operations of CNY's food offerings, from finalizing the menu to coordinating suppliers and managing inventory.",
            italic: true,
          },
        ],
        "Plan and finalize food items and pricing",
        "Coordinate with food suppliers and estimate required quantities",
        "Secure cooking equipment, utensils, and food supplies",
        "Ensure compliance with food safety requirements",
        "Monitor food inventory and coordinate food operations",
      ],
    },
    {
      label: "External Relations 🤝 · 2 heads, 4 cores",
      items: [
        [
          {
            text: "The External Relations (ExRel) Committee builds and manages partnerships with sponsors, concessionaires, and other external partners to support CNY.",
            italic: true,
          },
        ],
        "Research and contact potential sponsors and partners",
        "Prepare partnership proposals, packages, and agreements",
        "Communicate and negotiate with potential partners",
        "Process and monitor partnership requirements and deliverables",
        "Coordinate with internal committees to fulfill partner commitments",
      ],
    },
    {
      label: "Fundraising 🤑 · 2 heads, 5 cores",
      items: [
        [
          {
            text: "The Fundraising (FR) Committee develops and manages initiatives that help support the financial goals of CNY while creating engaging ways for the community to participate.",
            italic: true,
          },
        ],
        "Set fundraising targets and develop fundraising initiatives",
        "Plan products, pricing, inventory, and selling strategies",
        "Manage fundraising booths and selling operations",
        "Track revenue, expenses, and profits",
        "Coordinate operational, promotional, and logistical needs for fundraising activities",
      ],
    },
    {
      label: "Operations ⚙️ · 2 heads, 4 cores",
      items: [
        [
          {
            text: "The Operations (Ops) Committee creates and manages the systems needed to keep CNY's sales, inventory, and other onsite operations organized and efficient.",
            italic: true,
          },
        ],
        "Create and maintain sales and inventory trackers",
        "Monitor fundraising, food, activity booth sales and inventory",
        "Coordinate with committees to ensure information is accurate and updated",
        "Address onsite operational concerns and discrepancies",
      ],
    },
    {
      label: "Volunteers 👤 · 2 heads, 2 cores",
      items: [
        [
          {
            text: "The Volunteers (Vol) Committee recruits, organizes, and supports the volunteers who help run CNY's activities and booths throughout the celebration.",
            italic: true,
          },
        ],
        "Recruit and assign volunteers to activities and booths",
        "Conduct volunteer orientations and briefings",
        "Manage volunteer schedules and attendance",
        "Keep volunteers updated on their roles and responsibilities",
        "Help foster engagement and camaraderie among CNY volunteers",
      ],
    },
    {
      label: "Digital Creatives 🎨 · 2 heads, 3 cores",
      items: [
        [
          {
            text: "The Digital Creatives (DigiC) Committee develops CNY's visual identity and creates digital materials that communicate and promote the celebration.",
            italic: true,
          },
        ],
        "Develop CNY's brand book, logo, and visual identity",
        "Design digital promotional materials and templates",
        "Create materials such as posters, primers, and digital frames",
        "Maintain consistency across CNY's visual materials",
        "Coordinate with other committees on their creative needs",
        [
          {
            text: "Note: There will be additional requirements for DigiC committee applicants. Kindly follow all pertinent instructions sent to you.",
            italic: true,
          },
        ],
      ],
    },
    {
      label: "Production Design 🖼 · 2 heads, 5 cores",
      items: [
        [
          {
            text: "The Production Design (Prod) Committee brings CNY's theme to life through physical decorations, booth designs, props, and other onsite visual elements.",
            italic: true,
          },
        ],
        "Conceptualize and design booths, venues, and physical decorations",
        "Create props and materials for activities and photoshoots",
        "Develop the main event area and other possible event spaces",
        "Coordinate with other relevant committees regarding onsite gimmicks, designs, and materials",
        [
          {
            text: "Note: There will be additional requirements for Prod committee applicants. Kindly follow all pertinent instructions sent to you.",
            italic: true,
          },
        ],
      ],
    },
    {
      label: "Documentation and Publications 📸 · 2 heads, 8 cores",
      items: [
        [
          {
            text: "The Documentation and Publications (DocPub) Committee captures and shares the CNY experience through Photos, Videos, and Writing before, during, and after the celebration.",
            italic: true,
          },
        ],
        [{ text: "Photos", bold: true }],
        "Covers all CNY activities and important moments",
        "Conduct DP blast photoshoots",
        "Edit and organize photos for publication",
        [{ text: "Videos", bold: true }],
        "Create teaser and promotional videos",
        "Produce content featuring CNY activities and booths",
        "Create a post-event video or montage",
        [{ text: "Writing", bold: true }],
        "Write captions and spiels",
        "Develop written content for CNY publications",
        "Coordinate with other committees for necessary information and content",
        [
          {
            text: "Note: There will be additional requirements for DocPub committee applicants. Kindly follow all pertinent instructions sent to you.",
            italic: true,
          },
        ],
      ],
    },
  ],
  faqs: [
    {
      q: "Who can apply for the CNY Core Team?",
      a: "Any interested Celadonean who is willing to contribute to the project may apply. Previous experience is not required.",
    },
    {
      q: "Can I apply for more than one committee?",
      a: "Yes! You may apply for up to two committees.",
    },
    {
      q: "What is the difference between a Core Member and a Head?",
      a: "Core Members work closely with their committee to accomplish assigned tasks and contribute to the planning and execution of CNY. Heads oversee their committee, delegate responsibilities, track progress, and coordinate with the PMs and other committees.",
    },
    {
      q: "What if I don't have a lot of knowledge about Chinese-Filipino culture?",
      a: "That's completely okay! CNY is also an opportunity to learn. What matters most is your willingness to understand, appreciate, and respectfully engage with the culture.",
    },
    {
      q: "Is the workload for CNY heavy, and how much commitment is expected?",
      a: "CNY is a major project that involves preparation before and throughout the celebration. Members are expected to actively participate in committee meetings, assigned tasks, and event days, but the PMs will be there to guide you every step of the way — just stay engaged and be transparent with your availability.",
    },
  ],
  contacts: [
    {
      name: "Claire Chiu",
      role: "Chinese New Year Project Manager",
      email: "claire.chiu@student.ateneo.edu",
      facebook: "https://fb.com/claireyoungchiu",
    },
    {
      name: "Jenny Wang",
      role: "Chinese New Year Project Manager",
      email: "jenny.wang@student.ateneo.edu",
      facebook: "https://fb.com/jenny.wang.232730",
    },
  ],
};

export const JADE_BUSINESS_SUMMIT: CtaProjectDetail = {
  slug: "jade-business-summit",
  name: "JADE '27",
  fullName: "Jade Business Summit 2026–2027",
  thrust: "Heirlooms & Headstarts",
  accent: { base: "#0F766E", tint: "#F0FDFA", ink: "#134E4A" },
  heroImage: {
    src: "/internal/cta-wave1/jade-hero.webp",
    alt: "Jade Business Summit 2026–2027 — Heirlooms & Headstarts",
  },
  about:
    "Join us for the Jade Business Summit this November 7, 2026 at Escaler Hall — a one-day summit bringing seasoned Chinese-Filipino business leaders and rising young entrepreneurs together with business-minded students through lectures, panels, and a pitch workshop.",
  letter: [
    [
      {
        text: "We’d like to thank you so much for your interest in being part of the core team for the Jade Business Summit AY 2026-2027!",
      },
    ],
    [
      {
        text: "This year marks the second iteration since the revival of the Jade Business Summit, and with it comes an opportunity to rebuild the project into something bigger, bolder, and more impactful on the next generation of leaders and entrepreneurs. JADE is envisioned as a space where people can step beyond what they already know, and discover new perspectives, connect with the industries, ideas, and people shaping the future of Filipino-Chinese business.",
      },
    ],
    [
      {
        text: "We know that each of you brings your very own creativity, competence, passion, and perspective to the table. As we reinvent JADE, we hope to give you the opportunity to turn those qualities into something tangible, whether through the experiences we create, the people we bring together, or the ideas we leave behind.",
      },
    ],
    [
      {
        text: "We’re so excited to have you with us as we continue to bring JADE back to life. Thank you for believing in this revival and for choosing to be part of the journey. We can’t wait to see what we build together.",
      },
    ],
  ],
  letterSignoff: { highlighted: "All the best,", name: "Lorien Lee and Princess Datu" },
  whatIsIt: {
    heading: "💼 What is the Jade Business Summit?",
    body: [
      [
        {
          text: "The Jade Business Summit is Ateneo Celadon's flagship business event: a one-day summit at Escaler Hall that brings seasoned Chinese-Filipino business leaders and rising young founders together with business-minded students from Ateneo and partner schools through insightful lectures, panel discussions, a networking opportunity, and a pitch workshop that challenges participants to collaborate in developing and presenting SMART business ideas before a panel of ADMU professors.",
        },
      ],
    ],
    images: [
      { src: "/internal/cta-wave1/jade-event-1.webp", alt: "The JADE Business Summit core team and participants group photo from a past iteration" },
      { src: "/internal/cta-wave1/jade-event-2.webp", alt: "A group photo from a past JADE Business Summit" },
    ],
  },
  vision:
    "The JADE Business Summit 2026-2027 envisions a gathering that celebrates the enterprises, values, and stories that have shaped our community, while empowering the next generation to build upon what came before. The project is guided by the Chinese principle 承先启后 (Chéngxiānqǐhòu) — to carry forward the legacy of the past while opening the way for the future. This year's summit explores the relationship between heritage and entrepreneurship, recognizing that every new venture begins with something inherited, learned, or passed down. Through conversations with established and emerging founders alike, alongside opportunities to explore the realities of building a business, JADE aims to pass on the lessons behind enduring legacies while giving aspiring entrepreneurs the knowledge, networks, and perspective to take their first steps. This year's thrust, “Heirlooms & Headstarts,” represents this balance through the heirlooms we inherit and the headstarts that allow us to build on and innovate with the past.",
  timeline: [
    { date: "September 24, 2026", label: "Release of Wave 1 Application Results" },
    { date: "October 2, 2026", label: "Core Team 1st General Assembly" },
    { date: "October 2 – November 6, 2026", label: "Wave 1 Working Timeline" },
    { date: "October 27, 2026", label: "Core-wide Dry Run" },
    { date: "November 7, 2026", label: "Jade Business Summit Proper" },
  ],
  committees: [
    {
      label: "Programs 🎤 · 6 Core",
      items: [
        "Design and ideate the overall program flow, talk topics, and case activity/interactive segment mechanics",
        "Liaise with speakers and judges, manage the host script, and oversee timekeeping on the day",
        "Serve as the main point of contact for all committee heads during the event",
      ],
    },
    {
      label: "Logistics 📦 · 2 Heads, 1 Core",
      items: [
        "Handle venue reservations, room setup, and procurement of all event materials",
        "Manage food and catering, distribute participant and core team IDs, and oversee core team-wide coordination",
        "Handle all technical necessities during the event, including sound systems and slide changes",
      ],
    },
    {
      label: "Recruitment and Strategy 📝 · 3 Core",
      items: [
        "Manage participant registration, confirmation, attendance tracking, and certificate preparation",
        "Establish and manage the ambassadorship system to target high school student councils and college organizations",
        "Handle sector assignments for the pitch competition and manage the ambassadorship tracking system",
        "Serve as the point of contact for participant/judge/speaker recruitment, attendance and ushering alongside ExRel on the event proper",
      ],
    },
    {
      label: "External Relations 🤝 · 1 Head, 5 Core",
      items: [
        "Build and maintain relationships with sponsors, partner schools, and organizations",
        "Draft partner packages and emails, and coordinate with assigned speakers and judges before and during the event",
        "Assist with hosting duties and serve as point of contact for specific partner organizations",
      ],
    },
    {
      label: "Fundraising 🤑 · 1 Head, 6 Core",
      items: [
        "Brainstorm, plan, and execute fundraising initiatives and gimmicks to supplement the project budget",
        "Man the fundraising booth throughout its runtime",
        "Track all cash flows across fundraising activities and transfer profits to Logistics as needed",
        "Serve as extra manpower during D-Day for any logistical needs",
      ],
    },
    {
      label: "Digital Creatives 🎨 · 4 Core",
      items: [
        "Design and produce all visual assets for JBS, including posters, brochures, pubmats, and event signage, in line with the project's visual identity and theme",
        "Lead marketing efforts across digital and on-ground channels, including social media content, school outreach materials, and promotional campaigns",
        "Design the official event powerpoint template and support DocPub with visual assets for documentation and publications",
      ],
    },
    {
      label: "Documentation & Publications 📸 · 1 Head, 4 Core",
      items: [
        "Handle all photo and video documentation throughout the event, including a possible SDE",
        "Organize and facilitate core team DP shoots",
        "Prepare image and video assets for promotional and social media use",
        "Writing accompanying post spiels for all social media posts",
      ],
    },
    {
      label: "Production Design 🖼 · 2 Heads, 4 Core",
      items: [
        "Coordinate with the Logistics and Programs core teams for the event proper to ensure that the set is aptly designed according to the branding of JADE",
        "Manage DP Shoots with the help of the Digital Creatives team and combine digital assets with actual production pieces",
        "Ideate and execute the project booth designs alongside its gimmicks during fundraising initiatives",
      ],
    },
    {
      label: "Facilitators 🧑‍🏫 · 1 Head, 10 Facilitators",
      items: [
        "Accompany and engage participants throughout the summit, especially during transitions and interactive segments",
        "Facilitate the pitch workshop activity and mentor participants during breakouts when requested",
      ],
    },
  ],
  faqs: [],
  contacts: [
    {
      name: "Lorien Lee",
      role: "Jade Business Summit Project Manager",
      email: "lorien.stefan.lee@student.ateneo.edu",
      facebook: "https://fb.com/lorien.lee.33",
    },
    {
      name: "Princess Datu",
      role: "Jade Business Summit Project Manager",
      email: "princess.jhode.datu@student.ateneo.edu",
    },
  ],
};

export const SPRING_FILM_FESTIVAL: CtaProjectDetail = {
  slug: "spring-film-festival",
  name: "SFF '27",
  fullName: "21st Spring Film Festival",
  thrust: "Year of the Fire Goat",
  accent: { base: "#9F1239", tint: "#FFF1F2", ink: "#4C0519" },
  heroImage: {
    src: "/internal/cta-wave1/sff-hero.webp",
    alt: "21st Spring Film Festival 2026-2027 — Year of the Fire Goat",
  },
  about:
    "Join us for the 21st Spring Film Festival — a three-day celebration bridging tradition and modernity through cultural workshops, film viewing, and performances for the Year of the Fire Goat.",
  letter: [
    [
      {
        text: "Thank you very much for your interest in joining us in the planning and celebration of the 21st Spring Film Festival. We, project managers, hope to bridge the gap between the past and present into an interwoven story of performance, workshops and film viewing for the audience to see and experience the elegance of the Chinese-Filipino culture, values, and art.",
      },
    ],
    [
      {
        text: "Every activity, film, and performance showcases a story, an experience, a memory, a loved one. May the memories, love, time, and people in the Spring Film Festival be joyous and unforgettable. The 21st Spring Film Festival is an invitation to leave a legacy of connection in harmony to your hearts and to the Filipino-Chinese community.",
      },
    ],
    [{ text: "We can’t wait to see you there!" }],
  ],
  letterSignoff: { highlighted: "Cheers to a legacy,", name: "Chelsea Morales & Raeka Tan" },
  whatIsIt: {
    heading: "🎞️ What is the Spring Film Festival?",
    body: [
      [
        {
          text: "The Spring Film Festival is a three-day event that bridges both tradition and modernity by celebrating traditional values, art, and culture while integrating modern touches and elements to engage the present generation. The activities that encompass the Spring Film Festival consist of community-building opportunities not limited to cultural workshops, movie screenings, diverse performances, and social media engagement in order to attract a wide audience to interact with the Filipino-Chinese culture.",
        },
      ],
      [
        {
          text: "The Spring Film Festival is divided into three events: (1) Gala Night, featuring performances of dancing, singing, and music talents; (2) Workshop Day, which places cultural workshops in the spotlight; and (3) Culminating Night, which concludes the festival through workshops and performances.",
        },
      ],
      [
        { text: "The 21st Spring Film Festival marks the 21st iteration of the event by " },
        { text: "Ateneo Celadon", bold: true },
        { text: " in collaboration with the " },
        { text: "Ateneo Ricardo Leong Center for Chinese Studies (RLCCS)", bold: true },
        { text: ", each occurrence bearing a legacy of bringing the Filipino-Chinese culture to broader audiences. The theme for the 21st Spring Film Festival mainly revolves around the " },
        { text: "Year of the Fire Goat", bold: true },
        { text: ", which symbolizes " },
        { text: "harmonious connection in new beginnings", bold: true },
        { text: ". Thus, the activities to be featured aim to emphasize the theme of " },
        { text: "forming and nurturing stronger relationships", bold: true },
        { text: " in the celebration of " },
        { text: "creative and innovative activities", bold: true },
        { text: "." },
      ],
    ],
  },
  vision:
    "The Year of the Fire Goat aims to represent the progression of the Chinese Zodiac for 2027. Just like the fire goat, this year's Spring Film Festival aims to represent striving towards a future of hope while leaving a lasting impression and impact on the beauty of Chinese values, art, and culture. Our mission is to leave a lasting impression on the community through colorful performances, Chinese film viewing, and cultural workshops — so that audiences carry a piece of Chinese art, culture, and values with them, to their homes, to the new year, and to their community, and a piece of Chinese history in their hearts and present lives.",
  timeline: [
    { date: "September 9, 2026", label: "Opening of Wave 1 Core Team Applications" },
    { date: "September 14–22, 2026", label: "Interview Period for SFF Core Team Applications" },
    { date: "September 25, 2026", label: "Release of Results" },
    { date: "September 28, 2026", label: "Core Team Heads Onboarding" },
    { date: "October 2, 2026", label: "Core Team General Assembly" },
    { date: "October 5, 2026 – February 4, 2027", label: "Project Planning, Organizing, Leading, and Controlling" },
    { date: "February 5, 2027", label: "Gala Night" },
    { date: "February 6, 2027", label: "Workshop Day" },
    { date: "February 7, 2027", label: "Culminating Night" },
    { date: "February 8 – March 1, 2027", label: "Project Evaluation" },
  ],
  committees: [
    {
      label: "Communications and Publications 📣",
      items: [
        [
          {
            text: "One of the key committees in the Spring Film Festival, responsible for creatively communicating information and events to the broader audience — a chance to sharpen written and verbal communication skills, including comprehensive framing of information.",
            italic: true,
          },
        ],
        [{ text: "Responsibilities", bold: true }],
        "Creating and writing spiels to accompany publication materials",
        "Utilizing artistic elements created by the Creatives Department to communicate announcements, events, and other relevant information",
        "Managing the Facebook Page of the Spring Film Festival",
        "Interacting with stakeholders who may communicate through official pages",
      ],
    },
    {
      label: "Digital Creatives 🎨",
      items: [
        [
          {
            text: "Among the most crucial committees in developing the artistic and creative concept of the event — exposes members to digital art mediums like Canva and Procreate, working closely with other stakeholders to uphold a unified creative vision.",
            italic: true,
          },
        ],
        [{ text: "Responsibilities", bold: true }],
        "Developing a Creative Brandbook that depicts the creative concept of the Spring Film Festival",
        "Designing event flyers and posters",
        "Designing publication materials",
        "Designing and editing program slides",
      ],
    },
    {
      label: "Documentations 📸",
      items: [
        [
          {
            text: "Material towards the preservation of memory through photo and video mediums — a chance to sharpen photography and videography skills, as well as framing, lighting, and visualization techniques.",
            italic: true,
          },
        ],
        [{ text: "Responsibilities", bold: true }],
        "Photography for DP Shoots",
        "Photography for publication materials",
        "Videography of trailers and promotional videos",
        "Photo and video documentation of project execution",
        "Photo and video editing and grading prior to publication",
      ],
    },
    {
      label: "Production Design 🎭",
      items: [
        [
          {
            text: "Distinguished from Digital Creatives and Programs by its focus on the physically onsite activities of the Spring Film Festival, working closely with both departments to apply creative and interactive onsite plans during production and execution.",
            italic: true,
          },
        ],
        [{ text: "Responsibilities", bold: true }],
        "Coordinating with the Programs Department for the provision of onsite gimmicks, if there are any",
        "Coordinating with the Digital Creatives Department in developing and applying creative concepts in an onsite setting",
        "Coordinating with the Logistics Department in the procurement of physically tangible materials, whether for creative or practical application (e.g. decorations for DP shoot, materials for workshop)",
        "Visualizing event layout, if applicable",
        "Visualizing onsite promotions",
      ],
    },
    {
      label: "External Relations 🤝",
      items: [
        [
          {
            text: "Forms and strengthens bonds with parties external to Ateneo Celadon — an opportunity to develop communication and negotiation skills, and build knowledge of agreements, obligations, and protecting the organization's interests.",
            italic: true,
          },
        ],
        [{ text: "Responsibilities", bold: true }],
        "Reaching out to external organizations",
        "Meeting and coordinating with external organizations",
        "Drafting Memorandum of Agreement",
        "Claiming monetary and non-monetary sponsorships",
        "Ensuring compliance of both Ateneo Celadon and the external party to confirmed agreements (i.e. with signatures from both ends)",
      ],
    },
    {
      label: "Logistics 📦",
      items: [
        [
          {
            text: "Responsible for the procurement of materials for the project's use — rooms, transportation, consumables, gimmick materials, decorations, and other miscellaneous materials — highly important to every department, especially those dependent on physical materials.",
            italic: true,
          },
        ],
        [{ text: "Responsibilities", bold: true }],
        "Room reservation through CFMO",
        "Coordination with other committees for material procurement",
        "Sourcing transportation to the event venue",
      ],
    },
    {
      label: "Programs 🎤",
      items: [
        [
          {
            text: "Entertains all concerns related to the progression of the program presented to guests and stakeholders — one of the most demanding committees, but one that offers a mix of creative concept development, clear communication, and organized planning.",
            italic: true,
          },
        ],
        [{ text: "Responsibilities", bold: true }],
        "Planning onsite and online gimmicks",
        "Planning event flow",
        "Planning event contingencies",
        "Event scriptwriting",
        "Performer and Volunteer Coordination",
      ],
    },
    {
      label: "Recruitment and Secretariat 📝",
      items: [
        [
          {
            text: "Works towards the data collection, interpretation, and evaluation of the project to determine whether its accomplishments align with its goals, compiling a sustainability report to help the organization improve future initiatives — alongside recruitment manuals, orientation, and volunteer coordination.",
            italic: true,
          },
        ],
        [{ text: "Responsibilities", bold: true }],
        "Creation of recruitment forms for volunteers",
        "Creation of evaluation forms",
        "Creation of volunteer and RecSec Manuals",
        "Orientation of volunteers prior to event execution",
        "Supervision of guest registration",
        "Creating the sustainability report",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I need to submit extra requirements?",
      a: "Yes, applicants for Digital Creatives, Production Design, and Documentation & Publications will be asked to submit an additional requirement, as outlined by COMMPUB and the Project Managers.",
    },
    {
      q: "Can I apply to more than one committee?",
      a: "Yes! You may apply to a maximum of two committees. However, please note that you will only be assigned to one committee.",
    },
    {
      q: "Can I apply to more than one project aside from the Spring Film Festival?",
      a: "Yes, all applicants are allowed to apply for more than one project regardless of the date of its execution, provided that you're able to properly manage your workload and account for the events arising from commitment in two or more projects.",
    },
    {
      q: "Can I apply as a Department Deputy as well as a Core Team Member at the same time?",
      a: "Yes, it's possible to be a department deputy as well as a core team member at the same time. Keep in mind that deputies take on a year-long role supporting Ateneo Celadon across its departments, mainly through project deployment as a core team member of other projects and other additional tasks within your chosen department. If you're interested in applying as a Department Deputy, more information can be found at /internal/dept-apps.",
    },
    {
      q: "Where will the Spring Film Festival be located?",
      a: "The Spring Film Festival will be located in Shangri-La Plaza (EDSA corner Shaw Boulevard, Ortigas Center, Mandaluyong City). Transportation from Ateneo de Manila University to the venue will be meticulously planned as we progress through the planning phase.",
    },
    {
      q: "Do I need to be present all three days in Shangri-La for the project execution?",
      a: "It's highly encouraged to be present all three days, both to assist when needed and to interact with the event's other stakeholders. That said, we understand everyone has personal and academic commitments — as long as these are communicated to the project managers and heads in a duly and timely manner, we'll be lenient about absences.",
    },
    {
      q: "How heavy is the workload?",
      a: "The workload is manageable and can be balanced with your academic, social, and personal life, though it may become more demanding as deadlines and the event draw near. With proper time management, communication, and team effort, it'll be manageable alongside your other commitments.",
    },
    {
      q: "Will I be working with other people outside of the Spring Film Festival?",
      a: "Likely, yes. Internally, SFF may closely work alongside Ateneo Celadon's Cultural Affairs Department (CUL) and other departments. Externally, it partners with the Ateneo Ricardo Leong Center for Chinese Studies (RLCCS), and committees like External Relations and Logistics may coordinate with outside partners — though project execution will most likely involve interacting with guests and employees regardless of committee.",
    },
  ],
  contacts: [
    {
      name: "Chelsea Marie Morales",
      role: "Spring Film Festival Project Manager",
      email: "chelsea.marie.morales@student.ateneo.edu",
      facebook: "https://fb.com/chelseamarie0908",
    },
    {
      name: "Raeka Eirene Tan",
      role: "Spring Film Festival Project Manager",
      email: "eirene.tan@student.ateneo.edu",
      facebook: "https://fb.com/raekaeirene",
    },
  ],
};

export const ROSE_SALE: CtaProjectDetail = {
  slug: "rose-sale",
  name: "RS '27",
  fullName: "Rose Sale 2027",
  thrust: "Celadon's annual Valentine's fundraising project",
  accent: { base: "#DB2777", tint: "#FDF2F8", ink: "#831843" },
  heroImage: {
    src: "/internal/cta-wave1/rs-hero.webp",
    alt: "Rose Sale '27 — Wave 1 Applications",
  },
  about:
    "Rose Sale, Celadon's annual Valentine's fundraising project, celebrates love in all its forms within the Ateneo community while supporting its advocacy program — running February 9–15, 2027.",
  letter: [
    [
      {
        text: "Thank you for your interest in joining this year's Rose Sale 2027! We know that applying takes time, courage, and commitment, and we're truly grateful that you chose to share that with us.",
      },
    ],
    [
      {
        text: "We look forward to having you as part of our little Rose Sale family, and we hope that this opportunity inspires you to spread a little bit more love in the world, of course, including yourself! We're excited to share this journey with all of our future core team members, and we hope to see you soon!",
      },
    ],
  ],
  letterSignoff: { highlighted: "With much love,", name: "Ailyse and Chels" },
  whatIsIt: {
    heading: "💐 What is Rose Sale?",
    body: [
      [
        {
          text: "Rose Sale, Celadon's annual Valentine's fundraising project, celebrates love in all its forms within the Ateneo community while supporting its advocacy program.",
        },
      ],
      [
        {
          text: "Through customizable bouquets and other love-centered products, the project provides members and non-members of Ateneo Celadon alike a chance to express appreciation for one another.",
        },
      ],
    ],
    images: [
      { src: "/internal/cta-wave1/rs-event-1.webp", alt: "A past Rose Sale flower-archway booth with Celadon Rose Sale signage" },
      { src: "/internal/cta-wave1/rs-event-2.webp", alt: "Flowers being arranged for a past Rose Sale" },
      { src: "/internal/cta-wave1/rs-event-3.webp", alt: "Rose Sale core team members documenting the event" },
      { src: "/internal/cta-wave1/rs-event-4.webp", alt: "A candid moment at a past Rose Sale selling week" },
      { src: "/internal/cta-wave1/rs-event-5.webp", alt: "Core team members wrapping a bouquet at a past Rose Sale" },
      { src: "/internal/cta-wave1/rs-event-6.webp", alt: "Two Rose Sale core team members holding pink flowers" },
    ],
  },
  vision:
    "This year, we want to slow down, step away from the 2x speed we've been moving at for most of our lives, and take a moment to notice the things we've passed along the way. We want this year's Rose Sale to break this cycle and take time to appreciate love in all forms — because in all of them, one thing remains constant: the quiet acts of care that nurtured who we are today, filling our hearts with nostalgia for the little things that weave our story of love. At its heart, Rose Sale is about pausing to cherish the little things, the quiet gestures of care that make love meaningful and leave us with memories to hold onto.",
  testimonials: [
    {
      name: "Ailyse",
      role: "Rose Sale Project Manager",
      quote:
        "Rose Sale has been such a big part of my Celadon journey. It has given me so many opportunities to learn, grow, and discover myself as both a leader and a member of the organization. From the preparations and selling week to the advocacy, every part of the experience has been nothing short of special. The people I have met, the lessons I have learned, and the memories we have made will always hold a special place in my college journey. As I look back on everything Rose Sale has given me, I can only hope to give that same sense of fulfillment, fun, and cherished memories to the next team of RS '27. May you find in Rose Sale the same joy, growth, and people that made this experience so meaningful to me.",
    },
    {
      name: "Chels",
      role: "Rose Sale Project Manager",
      quote:
        "Unlike what I was expecting, Rose Sale honestly really made a mark on what work and organization, specifically Celadon, means to me. It's a recurring thing I always say, but to me, Celadon has really become a family who brings meaning to what I do and motivates me for what's next.",
    },
  ],
  timeline: [
    { date: "September 21, 2026", label: "Release of Wave 1 Results" },
    { date: "September 24, 2026", label: "Heads Onboarding" },
    { date: "September 28, 2026", label: "1st General Assembly" },
    { date: "October 12–16, 2026", label: "Committees Onboarding (Online)" },
    { date: "TBA", label: "Wave 2 Applications (Florists, Deliveries)" },
    { date: "TBA", label: "Flower-Wrapping Workshop" },
    { date: "November 16–20, 2026", label: "Finalize Product List, Prices, Sponsorships, and Publication Materials" },
    { date: "December 12, 2026", label: "Order Non-Flower Products" },
    { date: "TBA", label: "Wave 3 Applications (Sales)" },
    { date: "January 25 – February 8, 2027", label: "Implement Marketing Strategies" },
    { date: "January 25, 2027", label: "Release of Pre-Order Form" },
    { date: "January 30, 2027", label: "Systems Orientation" },
    { date: "February 2, 2027", label: "Sales Workshop" },
    { date: "February 9–15, 2027", label: "Valentine's Onsite Selling Week" },
    { date: "February 27, 2027", label: "Advocacy Program" },
    { date: "March 3, 2027", label: "Post Documentation Album" },
  ],
  committees: [
    {
      label: "Logistics 🪻",
      items: [
        [{ text: "Competencies", bold: true }],
        "Strong negotiation skills",
        "Venue reservation knowledge",
        "Rapid response",
        [{ text: "Deliverables", bold: true }],
        "Handle project preparation",
        "Source and purchase needed materials (flowers, products, etc.)",
        "Book and manage the event venue",
        "Assist onsite operations as manpower (e.g., crowd control)",
      ],
    },
    {
      label: "Operations 🌸",
      items: [
        [{ text: "Competencies", bold: true }],
        "Attentive to detail",
        "Ensures the integrity of data",
        "Optimizes project-wide systems",
        [{ text: "Deliverables", bold: true }],
        "Design trackers and encoders for sales, inventory, shifts, deliveries, etc.",
        "Manage the online order channel or the Rose Sale website",
        "Handle onsite operations (pick-ups, inventory, etc.)",
        "Assist in data analysis and project-end report",
        [
          {
            text: "Technical Requirement: during the interview, applicants will be given a task on Google Sheets — based on willingness to learn and analyze.",
            italic: true,
          },
        ],
      ],
    },
    {
      label: "External Relations 🌻",
      items: [
        [{ text: "Competencies", bold: true }],
        "Determined to accomplish their tasks and goals",
        "Organized and have good time management",
        "Communicative and open",
        [{ text: "Deliverables", bold: true }],
        "Contact companies and organizations for sponsorship deals and/or partnerships",
        "Draft Memorandums of Agreement and create packages for partnerships and sponsorships",
        "Contact and handle advocacy partners",
        "Serve internal and external stakeholders for visibility and support",
      ],
    },
    {
      label: "Digital Creatives 🌼",
      items: [
        [{ text: "Competencies", bold: true }],
        "Detail-oriented",
        "Diligent attention to deadlines",
        "Digital design proficiency, artistic abilities (drawing, painting, etc.)",
        "Proficient or familiar with (or eager to learn!) Canva, Adobe Photoshop, Adobe Illustrator, or other graphic design software",
        "Open to changes and constructive criticism",
        [{ text: "Deliverables", bold: true }],
        "Design visual elements of the project (branding, logo, publication materials, DP frame, etc.)",
        "Conceptualize, create, and develop content for online promotions",
        "Ensure consistent and effective branding across all materials",
        [
          {
            text: "Additional Requirement: there will be additional requirements for Digital Creatives, Production Design, and Documentation & Publications applicants (for Documentation & Publications, choose ONE: Writing, Photos, or Videos) — details will be shared directly with applicants. Please follow all instructions carefully; failure to do so may result in your application being voided.",
            italic: true,
          },
        ],
      ],
    },
    {
      label: "Documentations and Publications 🌺",
      items: [
        [{ text: "Competencies", bold: true }],
        "Proficient in photo and video editing",
        "Creative writing skills",
        "Open to feedback",
        "Diligent attention to deadlines",
        [{ text: "Deliverables", bold: true }],
        "Write captions and spiels for publication materials",
        "Create and manage video content for promotional purposes",
        "Document the event and compile content for post-event use",
        [
          {
            text: "Additional Requirement: there will be additional requirements for Digital Creatives, Production Design, and Documentation & Publications applicants (for Documentation & Publications, choose ONE: Writing, Photos, or Videos) — details will be shared directly with applicants. Please follow all instructions carefully; failure to do so may result in your application being voided.",
            italic: true,
          },
        ],
      ],
    },
    {
      label: "Production Design 🌷",
      items: [
        [{ text: "Competencies", bold: true }],
        "Awareness of current design trends",
        "Resourcefulness and crafty",
        "Open to changes and constructive criticism",
        "Innovative and logical, organized with plans",
        [{ text: "Deliverables", bold: true }],
        "Direct creative strategies for Rose Sale physical/onsite promotions (e.g., DP shoot, promotional videos, product shooting)",
        "Conceptualize set design during onsite selling",
        [
          {
            text: "Additional Requirement: there will be additional requirements for Digital Creatives, Production Design, and Documentation & Publications applicants (for Documentation & Publications, choose ONE: Writing, Photos, or Videos) — details will be shared directly with applicants. Please follow all instructions carefully; failure to do so may result in your application being voided.",
            italic: true,
          },
        ],
      ],
    },
  ],
  faqs: [
    {
      q: "Will we have to sign up for onsite shifts?",
      a: "Yes! Each core member will have their chance to handle various sales, shopkeeping, flower-wrapping, and roving roles throughout Valentine's week, as the highlight of the Rose Sale Core experience!",
    },
    {
      q: "Can I join multiple core team committees?",
      a: "You can apply to a maximum of two core team committees or positions for the entire project. However, you will only be accepted into one committee or position.",
    },
    {
      q: "Do we need to submit any additional requirements?",
      a: "No need! Just let your passion and personality shine through your interview.",
    },
    {
      q: "How often will we meet as a core team? Will there be work during the break?",
      a: "We'll only meet a maximum of once a week, conducted hybrid/online. Meetings with core team committees will be at the discretion of the core team heads. Online work during the break will be minimal and voluntary — the work may sometimes feel heavy, but we promise a healthy work environment!",
    },
    {
      q: "What would my workload look like as a core team member?",
      a: "The workload will inevitably get heavier as the Rose Sale week gets closer, but it should still be more than manageable with the support and consideration of your heads and project managers!",
    },
  ],
  contacts: [
    {
      name: "Ailyse Lim",
      role: "Rose Sale Project Manager",
      email: "ailyse.erlisha.lim@student.ateneo.edu",
      facebook: "https://fb.com/lyse.lim.3",
    },
    {
      name: "Chels Dagdag",
      role: "Rose Sale Project Manager",
      email: "chelsea.linder.dagdag@student.ateneo.edu",
      facebook: "https://fb.com/chelsea.dagdag.9",
    },
  ],
};
