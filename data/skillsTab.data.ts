export const skillsTab = {
  top: "Top",
  all: "All",
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  ai: "AI",
  testing: "Testing",
  tools: "Tools",
} as const

export type SkillsTabKey = keyof typeof skillsTab

/** Real skill tags (excludes special tabs: top / all). */
export type SkillCategory = Exclude<SkillsTabKey, "top" | "all">

export const skillCategories = Object.keys(skillsTab).filter(
  (key): key is SkillCategory => key !== "top" && key !== "all",
)
