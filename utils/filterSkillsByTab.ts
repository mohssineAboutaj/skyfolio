import type { SkillsTabKey } from "~/data/skillsTab.data"
import type { Skill } from "~/types/general"
import { scoreToStars } from "~/utils/scoreToStars"

/** Filter skills for a skills tab (top / all / category). */
export function filterSkillsByTab(all: Skill[], tab: SkillsTabKey): Skill[] {
  if (tab === "top") {
    return all.filter((skill) => scoreToStars(skill.score) === 5)
  }
  if (tab === "all") {
    return all
  }
  return all.filter((skill) => skill.categories.includes(tab))
}
