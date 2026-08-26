import type { AboutExperience } from "~/types/general"

/** Newest first. Dates from GitHub activity / confirmed client work. */
const experiences: AboutExperience[] = [
  {
    id: "exp-freelance",
    title: "Freelance Full-Stack Developer",
    company: "Independent",
    location: "Remote / Marrakech",
    period: "2018 – Present",
    stack: ["Vue.js", "Nuxt", "Laravel", "Node.js", "TypeScript"],
    bullets: [
      "Delivered client and product work across web apps, landings, and full-stack systems (Digitalmania, CheckinPro, Me Travel, Tadris, Argons, Fatura, and others).",
      "Owned end-to-end delivery: UI, APIs, integrations, and deployment for freelance engagements.",
    ],
  },
  {
    id: "exp-die-berater",
    title: "Backend Developer",
    company: "die Berater",
    location: "Remote",
    period: "Jun 2024 – Jul 2025",
    stack: ["Node.js", "Real-time messaging", "Security"],
    bullets: [
      "Built backend infrastructure for a secure workplace communication platform focused on onboarding, collaboration, and encrypted messaging.",
      "Worked on real-time messaging, scalability, and feature integrations.",
    ],
  },
  {
    id: "exp-flowxtra",
    title: "Backend Developer",
    company: "Flowxtra",
    location: "Remote",
    period: "Mar 2025 – May 2025",
    stack: [
      "Node.js",
      "APIs",
      "Sentry",
      "Canva",
      "Discord",
      "Google Meet",
      "Zoom",
      "Jitsi",
    ],
    bullets: [
      "Integrated Canva, Discord notifications, Sentry monitoring, Google Meet, Zoom, and Jitsi into an AI recruitment platform.",
      "Created API documentation to support the platform development workflow.",
    ],
  },
  {
    id: "exp-fity",
    title: "Full-Stack Developer",
    company: "Fity",
    location: "Remote",
    period: "Oct 2022 – Jan 2025",
    stack: ["Vue.js", "Laravel", "Web apps"],
    bullets: [
      "Developed restaurant management systems covering menus, orders, and related workflows (fity-food, fity-webapp).",
      "Shipped full-stack features from UI through backend and operations support.",
    ],
  },
  {
    id: "exp-koooralive",
    title: "Full-Stack Developer",
    company: "Koooralive",
    location: "Remote",
    period: "Dec 2023 – Aug 2024",
    stack: ["Vue.js", "Streaming", "APIs"],
    bullets: [
      "Built a football match listing and streaming platform with live listings and media workflows.",
    ],
  },
  {
    id: "exp-hunterwind",
    title: "Full-Stack Developer",
    company: "Hunterwind",
    location: "Remote",
    period: "Oct 2022 – Apr 2023",
    stack: ["APIs", "Shopify", "Full-stack"],
    bullets: [
      "Built a Shopify store analysis platform and ad library API for targeting and competitor research.",
    ],
  },
]

export default experiences
