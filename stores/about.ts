import { defineStore } from "pinia"
import info from "~/data/about.info.json"
import edu from "~/data/about.edu.json"
import cert from "~/data/about.cert.json"

// About info store
export const useAboutInfoStore = defineStore("about-info", {
  state: () => ({ info, edu, cert }),
  getters: {
    getInfo: (state) => state.info,
    getEducations: (state) => state.edu,
    getCertifications: (state) => state.cert,
  },
})
