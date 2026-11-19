import type { Link } from "../types/general"

/** Home page sections shown in the toolbar and drawer navigation. */
const navLinks: Link[] = [
  { icon: "mdi-home", title: "Home", value: "home", targetId: "#home" },
  { icon: "mdi-account", title: "About", value: "about", targetId: "#about" },
  {
    icon: "mdi-chart-bar",
    title: "Statistics",
    value: "statistics",
    targetId: "#statistics",
  },
  {
    icon: "mdi-view-list",
    title: "Services",
    value: "services",
    targetId: "#services",
  },
  {
    icon: "mdi-code-tags",
    title: "Skills",
    value: "skills",
    targetId: "#skills",
  },
  {
    icon: "mdi-folder-multiple",
    title: "Projects",
    value: "projects",
    targetId: "#projects",
  },
  {
    icon: "mdi-email",
    title: "Contacts",
    value: "contacts",
    targetId: "#contacts",
  },
]

export default navLinks
