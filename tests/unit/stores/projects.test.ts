import { describe, it, expect, beforeEach } from "vitest"
import { createPinia, setActivePinia } from "pinia"
import { useProjectsStore } from "~/stores/projects"
import categories from "~/data/categories.data"

describe("Projects Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe("getProjectsTypesWithProjects", () => {
    it("returns only types used by visible projects", () => {
      const store = useProjectsStore()
      const typesWithProjects = store.getProjectsTypesWithProjects

      expect(typesWithProjects.length).toBeGreaterThan(0)
      expect(typesWithProjects.length).toBeLessThanOrEqual(
        store.getProjectsTypes.length,
      )

      typesWithProjects.forEach((type) => {
        expect(store.getProjectCountByType(type)).toBeGreaterThan(0)
      })
    })

    it("excludes types with no visible projects", () => {
      const store = useProjectsStore()

      if (!store.getProjectCountByType(categories.meeting)) {
        expect(store.getProjectsTypesWithProjects).not.toContain(
          categories.meeting,
        )
      }
    })
  })

  describe("getProjectCountByType", () => {
    it("counts visible projects for a type", () => {
      const store = useProjectsStore()
      const webappCount = store.getProjectCountByType(categories.webapp)

      expect(webappCount).toBeGreaterThan(0)
      expect(webappCount).toBe(
        store
          .getVisible.filter((project) => project.types.includes(categories.webapp))
          .length,
      )
    })

    it("returns zero for unused types", () => {
      const store = useProjectsStore()
      expect(store.getProjectCountByType(categories.meeting)).toBe(0)
    })
  })
})
