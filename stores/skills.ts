import { defineStore } from "pinia"
import skills from "~/data/skills.json"

export const useSkillsStore = defineStore("skills", {
  state: () => ({ skills }),
  getters: {
    getAll: (state) => state.skills,
    getSortedByScore: (state) => state.skills.sort((a, b) => b.score - a.score),
  },
  actions: {
    getTopSkills(count: number = 5) {
      return this.getSortedByScore.slice(0, count)
    },
  },
})
