import { defineStore } from "pinia"
import info from "~/data/about/info.data"

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    title: info.fullName,
  }),
  getters: {
    getTitle: (state) => state.title,
  },
  actions: {
    updateTitle(title: string) {
      this.title = title
    },
    resetTitle() {
      this.title = info.fullName
    },
  },
})
