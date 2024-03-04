import { defineStore } from "pinia"
import projects from "~/data/projects.json"
import type { Project } from "~/types/home"

export const useProjectsStore = defineStore("projects", {
  state: () => ({ projects }),
  getters: {
    getVisible: (state) => state.projects.filter((p) => p.visible),
    getProjectsCount() {
      return this.getVisible.length
    },
    getProjectsTypes() {
      const types: string[] = []

      this.getVisible.forEach((project) => {
        project.types.forEach((type) => {
          if (!types.includes(type)) {
            types.push(type)
          }
        })
      })

      return types
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
