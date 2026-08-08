import { defineStore } from "pinia"
import skills from "~/data/skills.data"
import { skillsTab, type SkillsTabKey } from "~/data/skillsTab.data"
import type { Skill } from "~/types/general"
import { filterSkillsByTab } from "~/utils/filterSkillsByTab"

export const useSkillsStore = defineStore("skills", {
  state: () => ({ skills }),
  getters: {
    getAll: (state) => Object.values(state.skills),
    getTabs: () => skillsTab,
    getByTab:
      (state) =>
      (tab: SkillsTabKey): Skill[] =>
        filterSkillsByTab(Object.values(state.skills), tab),
  },
})
