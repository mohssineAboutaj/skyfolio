import projects from "./data/projects.data"
import vuetifyMdiClientIcons from "./iconsets/client-icons.json"
import {
  PORTFOLIO_SITE_URL,
  portfolioKeywords,
  portfolioPersonIdentity,
  portfolioSiteDescription,
  portfolioSiteName,
} from "./utils/portfolioSeo"

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
    head: {
      meta: [
        {
          property: "og:image",
          content: "https://mohssineaboutaj.com/og.png",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:image",
          content: "https://mohssineaboutaj.com/og.png",
        },
      ],
    },
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
    url: PORTFOLIO_SITE_URL,
    name: portfolioSiteName,
    description: portfolioSiteDescription,
    defaultLocale: "en",
    identity: portfolioPersonIdentity,
    keywords: portfolioKeywords,
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