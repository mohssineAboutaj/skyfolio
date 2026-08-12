import { describe, it, expect } from "vitest"
import skills from "~/data/skills.data"
import { skillCategories, skillsTab } from "~/data/skillsTab.data"
import { filterSkillsByTab } from "~/utils/filterSkillsByTab"
import { scoreToStars } from "~/utils/scoreToStars"

describe("skillsTab data", () => {
  it("includes top, all, and category tabs including testing", () => {
    expect(skillsTab.top).toBe("Top")
    expect(skillsTab.all).toBe("All")
    expect(skillsTab.frontend).toBe("Frontend")
    expect(skillsTab.backend).toBe("Backend")
    expect(skillsTab.mobile).toBe("Mobile & Desktop")
    expect(skillsTab.ai).toBe("AI")
    expect(skillsTab.testing).toBe("Unit Testing")
    expect(skillsTab.tools).toBe("Tools")
  })
})

describe("filterSkillsByTab", () => {
  const all = Object.values(skills)

  it("returns only 5-star skills for top", () => {
    const top = filterSkillsByTab(all, "top")
    expect(top.length).toBeGreaterThan(0)
    top.forEach((skill) => {
      expect(scoreToStars(skill.score)).toBe(5)
    })
  })

  it("returns all skills for all", () => {
    expect(filterSkillsByTab(all, "all").length).toBe(all.length)
  })

  it("filters frontend skills", () => {
    const frontend = filterSkillsByTab(all, "frontend")
    expect(frontend.length).toBeGreaterThan(0)
    frontend.forEach((skill) => {
      expect(skill.categories).toContain(skillCategories.frontend)
    })
  })

  it("filters testing skills (Jest, Jasmine, Vitest)", () => {
    const testing = filterSkillsByTab(all, "testing")
    const names = testing.map((s) => s.name)
    expect(names).toEqual(expect.arrayContaining(["Jest", "Jasmine", "Vitest"]))
    testing.forEach((skill) => {
      expect(skill.categories).toContain(skillCategories.testing)
    })
  })

  it("filters AI skills", () => {
    const ai = filterSkillsByTab(all, "ai")
    expect(ai.length).toBeGreaterThan(0)
    ai.forEach((skill) => {
      expect(skill.categories).toContain(skillCategories.ai)
    })
  })

  it("allows a skill in multiple category tabs", () => {
    const js = all.find((s) => s.name === "JavaScript")
    expect(js?.categories).toEqual(
      expect.arrayContaining([skillCategories.frontend, skillCategories.backend]),
    )
    expect(filterSkillsByTab(all, "frontend").some((s) => s.name === "JavaScript")).toBe(true)
    expect(filterSkillsByTab(all, "backend").some((s) => s.name === "JavaScript")).toBe(true)
  })
})
