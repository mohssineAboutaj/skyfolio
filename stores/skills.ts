import { defineStore } from "pinia"
import skills from "~/data/skills.data"

export const useSkillsStore = defineStore("skills", {
  state: () => ({ skills }),
  getters: {
    getAll: (state) => Object.values(state.skills),
    getSortedByScore() {
      return this.getAll.sort((a, b) => b.score - a.score)
    },
  },
  actions: {
    getTopSkills(count: number = 5) {
      return this.getSortedByScore.slice(0, count)
    },
  },
})
