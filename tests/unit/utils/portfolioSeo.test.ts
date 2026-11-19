import { describe, it, expect } from "vitest"
import type { Project } from "~/types/general"
import {
  absoluteSiteUrl,
  buildProjectSchema,
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

  it("resolves site-relative paths to absolute URLs", () => {
    expect(absoluteSiteUrl("/projects/foo")).toBe(
      "https://mohssineaboutaj.com/projects/foo",
    )
    expect(absoluteSiteUrl("/images/a.png")).toBe(
      "https://mohssineaboutaj.com/images/a.png",
    )
  })

  describe("buildProjectSchema", () => {
    const base: Project = {
      id: "1",
      title: "Demo",
      slug: "demo",
      description: "<b>Demo</b> project",
      imgs: ["/images/demo.png"],
      visible: true,
      featured: false,
      types: ["WebApp"],
      tech: ["Vue.js"],
      platforms: [{ label: "live", icon: "mdi:web", url: "https://demo.dev" }],
    }

    it("builds a CreativeWork node with absolute URLs", () => {
      const schema = buildProjectSchema(base)
      expect(schema["@type"]).toBe("CreativeWork")
      expect(schema.name).toBe("Demo")
      expect(schema.description).toBe("Demo project")
      expect(schema.url).toBe("https://mohssineaboutaj.com/projects/demo")
      expect(schema.image).toEqual(["https://mohssineaboutaj.com/images/demo.png"])
      expect(schema.keywords).toBe("WebApp, Vue.js")
      expect(schema.sameAs).toBe("https://demo.dev")
    })

    it("omits image and sameAs when the project has none", () => {
      const schema = buildProjectSchema({ ...base, imgs: [], platforms: [] })
      expect(schema).not.toHaveProperty("image")
      expect(schema).not.toHaveProperty("sameAs")
    })
  })
})
