import { defineStore } from "pinia"
import info from "~/data/about/info.data"
import edu from "~/data/about/edu.data"
import cert from "~/data/about/cert.data"

// About info store
export const useAboutInfoStore = defineStore("about-info", {
  state: () => ({ info, edu, cert }),
  getters: {
    getInfo: (state) => state.info,
    getEducations: (state) => state.edu,
    getCertifications: (state) => state.cert,
  },
})
