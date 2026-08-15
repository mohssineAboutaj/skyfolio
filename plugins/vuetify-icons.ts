import { aliases, nuxtIcon } from "~/iconsets/nuxt-icon"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("vuetify:before-create", ({ vuetifyOptions }) => {
    vuetifyOptions.icons = {
      defaultSet: "nuxtIcon",
      aliases,
      sets: { nuxtIcon },
    }
  })
})
