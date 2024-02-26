import { defineStore } from "pinia"
import info from "~/data/about.info.json"

// About info store
export const useAboutInfoStore = defineStore("about-info", {
  state: () => ({ info }),
  getters: {
    getInfo: (state) => state.info,
  },
})
