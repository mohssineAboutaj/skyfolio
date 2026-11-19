import { expect, test, type Page } from "@playwright/test"
import info from "../../data/about/info.data"
import projects from "../../data/projects.data"

const visibleProjects = projects.filter((p) => p.visible)
const sampleProject = visibleProjects[0]!

/** Collect uncaught page exceptions so each test can assert there were none. */
function trackPageErrors(page: Page) {
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  return errors
}

test.describe("home page", () => {
  test("renders the hero and statistics without errors", async ({ page }) => {
    const errors = trackPageErrors(page)
    const response = await page.goto("/")

    expect(response?.status()).toBe(200)
    await expect(page.locator("h1").first()).toHaveText(info.fullName)

    const statistics = page.locator("#statistics")
    await statistics.scrollIntoViewIfNeeded()
    await expect(statistics.getByText("Projects Count")).toBeVisible()
    await expect(statistics.getByText("Experience in Years")).toBeVisible()

    expect(errors).toEqual([])
  })

  test("toolbar tab scrolls to its section", async ({ page, isMobile }) => {
    test.skip(isMobile, "toolbar tabs are hidden on small screens")
    await page.goto("/")

    await page.locator(".v-toolbar .v-tab", { hasText: "Skills" }).click()

    const toolbarHeight = await page
      .locator(".v-toolbar")
      .evaluate((el) => el.clientHeight)
    await expect
      .poll(() =>
        page
          .locator("#skills")
          .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
      )
      .toBeLessThanOrEqual(toolbarHeight + 2)
  })

  test("downloads the resume PDF", async ({ page, isMobile }) => {
    test.skip(isMobile, "the toolbar Resume tab is desktop only")
    await page.goto("/")

    const downloadPromise = page.waitForEvent("download")
    await page.locator(".v-toolbar .v-tab", { hasText: "Resume" }).click()
    const download = await downloadPromise

    expect(download.suggestedFilename()).toMatch(/^Resume_.+\.pdf$/)
  })

  test("mobile drawer Hire me goes to contacts", async ({ page, isMobile }) => {
    test.skip(!isMobile, "drawer navigation is mobile only")
    await page.goto("/projects")

    await page.getByRole("button", { name: "Menu" }).click()
    const drawer = page.locator(".v-navigation-drawer")
    await expect(drawer).toBeVisible()
    await drawer.getByText("Hire me").click()

    await expect(page).toHaveURL(/\/#contacts$/)
    await expect(page.locator("#contacts")).toBeVisible()
  })
})

test.describe("projects", () => {
  test("project list is part of the prerendered HTML", async ({ request }) => {
    const response = await request.get("/projects")
    expect(response.status()).toBe(200)

    const html = await response.text()
    for (const project of visibleProjects) {
      expect(html, `link to ${project.slug}`).toContain(
        `href="/projects/${project.slug}"`,
      )
    }
  })

  test("filters by project type", async ({ page }) => {
    await page.goto("/projects")
    const cards = page.locator(".project-card")
    await expect(cards).toHaveCount(visibleProjects.length)

    const type = sampleProject.types[0]!
    await page.locator(".v-tab", { hasText: type }).click()

    const expected = visibleProjects.filter((p) => p.types.includes(type))
    await expect(cards).toHaveCount(expected.length)
  })

  test("project page shows details and SEO tags", async ({ page }) => {
    const errors = trackPageErrors(page)
    const response = await page.goto(`/projects/${sampleProject.slug}`)

    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(new RegExp(sampleProject.title))
    await expect(
      page.locator(".v-card-title", { hasText: sampleProject.title }).first(),
    ).toBeVisible()
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      new RegExp(`/projects/${sampleProject.slug}$`),
    )

    expect(errors).toEqual([])
  })

  test("clicking a card opens the project page", async ({ page }) => {
    await page.goto("/projects")
    await page.locator(".project-card").first().click()
    await expect(page).toHaveURL(/\/projects\/[^/]+$/)
  })
})

test.describe("not found", () => {
  for (const path of ["/this-page-does-not-exist", "/projects/not-a-real-project"]) {
    test(`${path} returns 404 with the error page`, async ({ page }) => {
      const response = await page.goto(path)

      expect(response?.status()).toBe(404)
      await expect(page.getByText("Page not found")).toBeVisible()

      await page.getByRole("button", { name: "Go to home" }).click()
      await expect(page).toHaveURL(/\/$/)
      await expect(page.locator("h1").first()).toHaveText(info.fullName)
    })
  }
})
