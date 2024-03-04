import { shortDescription, fullName, jobs } from "./data/about.info.json"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // SEO
    "@nuxtjs/seo",
    // vuetify nuxt
    "vuetify-nuxt-module",
    // pinia
    "@pinia/nuxt",
    // swiper
    "nuxt-swiper",
    // icon
    "nuxt-icon",
    // vee-validate
    "@vee-validate/nuxt",
    // particles
    "nuxt-particles",
    // google-fonts
    [
      "@nuxtjs/google-fonts",
      {
        families: { Quicksand: true, DancingScript: true },
        display: "swap", // 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
      },
    ],
    // mail
    [
      "nuxt-mail",
      {
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
    ],
    // google analytics
    "nuxt-gtag",
  ],
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
    name: `${fullName} Portfolio`,
    description: shortDescription,
    defaultLocale: "en", // not needed if you have @nuxtjs/i18n installed
    keywords: ["Mohssine Aboutaj", "Mohssine", "Aboutaj", "Portfolio", ...jobs],
  },
  gtag: {
    id: "G-KRLF8VEECK",
  },
})
