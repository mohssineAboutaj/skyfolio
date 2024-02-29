// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module", "@pinia/nuxt", "nuxt-swiper", "nuxt-icon"],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: "./vuetify.config.ts",
  },
  swiper: {
    // Swiper options
    //----------------------
    // prefix: 'Swiper',
    // styleLang: 'css',
    // modules: ['navigation', 'pagination'], // all modules are imported by default
  },
})
