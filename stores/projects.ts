import { defineStore } from "pinia"
import projects from "~/data/projects.json"
import type { Project } from "~/types/home"

export const useProjectsStore = defineStore("projects", {
  state: () => ({ projects }),
  getters: {
    getVisible: (state) => state.projects.filter((p) => p.visible),
  },
  actions: {
    getAll(): Project[] {
      return this.getVisible
    },
    getFeatured(): Project[] {
      return this.getAll().filter((p) => p.featured)
    },
    getBySlug(slug: string): Project | undefined {
      return this.getAll().find((p) => p.slug === slug)
    },
  },
})
