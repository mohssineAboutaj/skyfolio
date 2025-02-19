import aboutInfo from "./data/about/info.data"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/seo",
    "vuetify-nuxt-module",
    "@pinia/nuxt",
    "nuxt-swiper",
    "nuxt-icon",
    "nuxt-particles",
    "@nuxtjs/google-fonts",
    "nuxt-gtag",
  ],

  /// extend the nuxt modules
  googleFonts: {
    families: { Quicksand: true, Charm: true },
    display: "swap", // 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
  },

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

  site: {
    url: "https://mohssineaboutaj.com/",
    name: `${aboutInfo.fullName} Portfolio`,
    description: aboutInfo.shortDescription,
    defaultLocale: "en", // not needed if you have @nuxtjs/i18n installed
    keywords: [
      "Mohssine Aboutaj",
      "Mohssine",
      "Aboutaj",
      "Portfolio",
      ...aboutInfo.jobs,
    ],
  },

  gtag: {
    id: "G-KRLF8VEECK",
  },

  compatibilityDate: "2025-02-19",
})