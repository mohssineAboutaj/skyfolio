import { describe, it, expect, afterEach } from "vitest"
import { getToolbarHeight } from "~/utils/toolbar"

describe("getToolbarHeight", () => {
  afterEach(() => {
    document.body.innerHTML = ""
  })

  it("returns the fallback when there is no toolbar", () => {
    expect(getToolbarHeight()).toBe(0)
    expect(getToolbarHeight(64)).toBe(64)
  })

  it("returns the toolbar clientHeight when present", () => {
    const toolbar = document.createElement("div")
    toolbar.className = "v-toolbar"
    Object.defineProperty(toolbar, "clientHeight", { value: 72 })
    document.body.appendChild(toolbar)
    expect(getToolbarHeight(64)).toBe(72)
  })
})
