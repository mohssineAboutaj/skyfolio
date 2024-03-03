// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
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
        families: { Quicksand: true },
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
})
