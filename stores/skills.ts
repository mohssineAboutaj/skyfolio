import { defineStore } from "pinia"
import skills from "~/data/skills.data"

export const useSkillsStore = defineStore("skills", {
  state: () => ({ skills }),
  getters: {
    getAll: (state) => Object.values(state.skills),
  },
})
