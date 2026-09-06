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
  /** "Dear Applicant" letter from the PMs, as paragraphs. */
  letter: AboutRun[][];
  letterSignoff: string;
  whatIsIt: { heading: string; body: string; images?: { src: string; alt: string }[] };
  vision: string;
  testimonials: CtaProjectTestimonial[];
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
    [{ text: "Dear Applicant,", bold: true }],
    [
      {
        text: "We’re so happy to see you here! Thank you for your interest in being part of Chinese New Year 2027, one of Celadon’s major cultural projects.",
      },
    ],
    [
      {
        text: "Through this celebration we hope to bring Filipino-Chinese culture closer to the Ateneo community by creating a space where everyone can learn, participate, and celebrate together. From interactive booths and cultural activities to performances, exhibits, and food, CNY is more than just a celebration, it is an opportunity to share the traditions, stories, and values that continue to shape our culture.",
      },
    ],
    [
      { text: "“CNY 2027: A Home in Every Hue: Celebrating Culture in Full Color”", bold: true },
      {
        text: " is inspired by the warmth of childhood memories, familiar traditions, and festive food. We hope to create a celebration that feels welcoming, meaningful, and familiar. We’d love to have you be part of the team that brings this vision to life!",
      },
    ],
    [{ text: "Join us in welcoming the Year of the Fire Goat this February 2–5, 2027! ✨🧧🐐" }],
  ],
  letterSignoff: "With joy in every hue, Claire and Jenny",
  whatIsIt: {
    heading: "What is Chinese New Year?",
    body: "Chinese New Year is a celebration rooted in tradition, family, and community, marking the start of a new year and welcoming it with hopes of prosperity, luck, and renewal. In the Filipino-Chinese community, these traditions have become part of a rich cultural heritage that continues to shape our communities today. Beyond the festivities, CNY is an opportunity to learn about the stories behind traditions, appreciate cultural heritage, and come together across different backgrounds. It reminds us that culture can be both something we inherit and something we share with others.",
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
  testimonials: [
    {
      name: "Franzelle Yulangco",
      role: "CNY '26 PM",
      photo: "/internal/cta-wave1/cny-franzelle-yulangco.webp",
      quote:
        "Chinese New Year has always been a special day for me to spend time with my family, enjoying good food and fun activities. Being the CNY PM for 2026 gave me the unique opportunity to share this experience with my schoolmates and friends! Each and every activity and stall came to life through everyone's hard work as we worked together to create something for the entire Ateneo community to enjoy, and I'm so grateful to everyone who made it possible. I can't wait to see what this year's CNY will hold!",
    },
    {
      name: "Therese Yap",
      role: "CNY '26 PM",
      photo: "/internal/cta-wave1/cny-therese-yap.webp",
      quote:
        "Chinese New Year has been part of my Ateneo journey even before I became a Celadonean. The festivities has been a way for me to bring the celebration despite being away from home, and I've always enjoyed participating in the different activities that this project brings every year. Being a project manager for this project brought me great memories, and I have great pride that being part of this core team made an unforgettable mark in my life.",
    },
  ],
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
