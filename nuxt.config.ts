// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "vuetify-nuxt-module",
    "@pinia/nuxt",
    "nuxt-swiper",
    "nuxt-icon",
    "@vee-validate/nuxt",
    [
      "nuxt-mail",
      {
        message: {
          // from .env
          to: process.env.SMTP_USERNAME,
        },
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
