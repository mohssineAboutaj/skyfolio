export const skillsTab = {
  top: "Core stack",
  all: "All",
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile & Desktop",
  ai: "AI",
  testing: "Unit Testing",
  tools: "Tools",
} as const

export type SkillsTabKey = keyof typeof skillsTab

/** Real skill tags (excludes special tabs: top / all). Same idea as categories.data for projects. */
export type SkillCategory = Exclude<
  (typeof skillsTab)[SkillsTabKey],
  (typeof skillsTab)["top"] | (typeof skillsTab)["all"]
>

export type SkillCategoryKey = Exclude<SkillsTabKey, "top" | "all">

export const skillCategoryKeys = (
  Object.keys(skillsTab) as SkillsTabKey[]
).filter((key): key is SkillCategoryKey => key !== "top" && key !== "all")

/** Category labels for tagging skills — use like categories.webapp on projects. */
export const skillCategories = {
  frontend: skillsTab.frontend,
  backend: skillsTab.backend,
  mobile: skillsTab.mobile,
  ai: skillsTab.ai,
  testing: skillsTab.testing,
  tools: skillsTab.tools,
} as const satisfies Record<SkillCategoryKey, SkillCategory>
