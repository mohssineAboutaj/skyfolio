import { defineStore } from "pinia"
import categores from "~/data/categories.data"
import projects from "~/data/projects.data"
import type { Project } from "~/types/general"

export const useProjectsStore = defineStore("projects", {
  state: () => ({ projects }),
  getters: {
    getVisible: (state) => state.projects.filter((p) => p.visible),
    getProjectsCount() {
      return this.getVisible.length
    },
    getProjectsTypes() {
      return Object.values(categores)
    },
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
