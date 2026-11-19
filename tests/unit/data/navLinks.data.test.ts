import { describe, it, expect } from "vitest"
import navLinks from "~/data/navLinks.data"

describe("navLinks data", () => {
  it("has unique values and matching section anchors", () => {
    const values = navLinks.map((l) => l.value)
    expect(new Set(values).size).toBe(values.length)
    navLinks.forEach((link) => {
      expect(link.targetId).toBe(`#${link.value}`)
      expect(link.icon.startsWith("mdi-")).toBe(true)
    })
  })

  it("includes the contacts section used by the Hire me action", () => {
    expect(navLinks.some((l) => l.value === "contacts")).toBe(true)
  })
})
