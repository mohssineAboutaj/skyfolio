import aboutInfo from "./data/about/info.data"
import projects from "./data/projects.data"
import vuetifyMdiClientIcons from "./iconsets/client-icons.json"

// Generate all project routes for prerendering
const projectRoutes = projects
  .filter((project) => project.visible)
  .map((project) => `/projects/${project.slug}`)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Enable SSG (Static Site Generation) - generates static HTML files
  ssr: true,

  // App configuration for proper asset paths
  app: {
    baseURL: '/',
    buildAssetsDir: '_nuxt/',
  },

  modules: [
    "@nuxtjs/seo",
    "vuetify-nuxt-module",
    "@pinia/nuxt",
    "nuxt-swiper",
    "@nuxtjs/google-fonts",
    "nuxt-gtag",
    "@nuxt/icon",
    "@nuxt/image",
  ],

  /// extend the nuxt modules
  googleFonts: {
    families: { Quicksand: true, "Space Grotesk": [400, 500, 600, 700] },
    display: "swap", // 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
  },

  icon: {
    // Static hosting: never fetch from api.iconify.design at runtime
    provider: "none",
    serverBundle: {
      collections: ["mdi", "simple-icons"],
    },
    clientBundle: {
      // Explicit list (data/ is outside default scan globs) + scan Vue/source for leftovers
      icons: [...vuetifyMdiClientIcons],
      scan: {
        globInclude: [
          "app.vue",
          "components/**/*.vue",
          "pages/**/*.vue",
          "layouts/**/*.vue",
          "data/**/*.{ts,js}",
          "stores/**/*.{ts,js}",
          "iconsets/**/*.{ts,js,json}",
        ],
      },
      sizeLimitKb: 512,
    },
  },

  vuetify: {
    moduleOptions: {
      // Nuxt 4.5 and Vuetify both export useLayout (NUXT_B6002)
      prefixComposables: ["useLayout"],
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

  // Netlify Image CDN — optimize via useImage(); keep existing v-img UI
  image: {
    provider: "netlify",
    quality: 80,
    format: ["webp"],
    densities: [1, 2],
  },

  compatibilityDate: "2025-02-19",

  // Nitro configuration for static site generation
  nitro: {
    prerender: {
      routes: [
        '/',
        '/projects',
        ...projectRoutes, // All project detail pages
        '/404'
      ],
      crawlLinks: true, // Automatically discover and prerender linked pages
      failOnError: false, // Don't fail build if some routes can't be prerendered
    },
    // Ensure static assets are properly generated
    output: {
      publicDir: '.output/public',
    },
  },

  // Testing configuration
  vite: {
    test: {
      environment: 'jsdom',
      globals: true,
    },
  },
})