import { describe, it, expect } from "vitest"
import {
  getPortfolioKnowsAbout,
  getPortfolioSameAs,
  portfolioSiteDescription,
  truncateMetaDescription,
} from "~/utils/portfolioSeo"

describe("portfolioSeo utils", () => {
  it("builds sameAs links from public contact URLs", () => {
    const sameAs = getPortfolioSameAs()
    expect(sameAs.length).toBeGreaterThan(0)
    expect(sameAs.every((url) => url.startsWith("http"))).toBe(true)
    expect(sameAs).toContain("https://github.com/mohssineAboutaj")
  })

  it("builds knowsAbout from skill names", () => {
    const knowsAbout = getPortfolioKnowsAbout()
    expect(knowsAbout.length).toBeGreaterThan(0)
    expect(knowsAbout).toContain("Vue.js")
  })

  it("truncates long meta descriptions", () => {
    const long = "word ".repeat(40).trim()
    const result = truncateMetaDescription(long, 160)
    expect(result.length).toBeLessThanOrEqual(160)
    expect(result.endsWith("…")).toBe(true)
  })

  it("strips HTML from meta descriptions", () => {
    expect(truncateMetaDescription("<b>Hello</b> <i>world</i>")).toBe(
      "Hello world",
    )
  })

  it("mentions freelance availability when enabled", () => {
    expect(portfolioSiteDescription.toLowerCase()).toContain("freelance")
  })
})
