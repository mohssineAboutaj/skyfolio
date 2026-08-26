import { describe, it, expect, vi, beforeEach } from "vitest"
import { createPinia, setActivePinia } from "pinia"
import { useSettingsStore } from "~/stores/settings"
import info from "~/data/about/info.data"
import { mockSettingsStore } from "~/tests/mocks/stores.mock"
import { mockAboutInfoData } from "~/tests/mocks/data.mock"

describe("Settings Store", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
  })

  describe("Store structure", () => {
    it("should expose links and title getters", () => {
      const store = useSettingsStore()
      expect(store.getLinks.length).toBeGreaterThan(0)
      expect(store.getTitle).toBe(info.fullName)
    })
  })

  describe("resetTitle", () => {
    it("should restore title to info.fullName after updateTitle", () => {
      const store = useSettingsStore()
      store.updateTitle("Some Project")
      expect(store.getTitle).toBe("Some Project")

      store.resetTitle()
      expect(store.getTitle).toBe(info.fullName)
      expect(store.getTitle).toBe("Mohssine Aboutaj")
    })
  })

  describe("Mock parity", () => {
    it("mock resetTitle restores fullName", () => {
      mockSettingsStore.updateTitle("Temp")
      mockSettingsStore.resetTitle()
      expect(mockSettingsStore.title).toBe(mockAboutInfoData.fullName)
    })
  })
})
