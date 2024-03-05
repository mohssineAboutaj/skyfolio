import { shortDescription, fullName, jobs } from "./data/about.info.json"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/seo",
    "vuetify-nuxt-module",
    "@pinia/nuxt",
    "nuxt-swiper",
    "nuxt-icon",
    "@vee-validate/nuxt",
    "nuxt-particles",
    "@nuxtjs/google-fonts",
    "nuxt-mail",
    "nuxt-gtag",
  ],
  /// extend the nuxt modules
  googleFonts: {
    families: { Quicksand: true, DancingScript: true },
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
  mail: {
    message: { to: process.env.SMTP_USERNAME },
    smtp: {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
  },
  site: {
    url: "https://mohssineaboutaj.com/",
    name: `${fullName} Portfolio`,
    description: shortDescription,
    defaultLocale: "en", // not needed if you have @nuxtjs/i18n installed
    keywords: ["Mohssine Aboutaj", "Mohssine", "Aboutaj", "Portfolio", ...jobs],
  },
  gtag: {
    id: "G-KRLF8VEECK",
  },
})
