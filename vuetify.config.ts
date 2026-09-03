import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration"
import { blue } from "vuetify/lib/util/colors.mjs"

const colorPalette = {
  primary: blue.darken3,
  secondary: blue.lighten2,
}

export default defineVuetifyConfiguration({
  // Disable MDI webfont CDN; icons are registered via plugins/vuetify-icons.ts
  icons: {
    defaultSet: "custom",
  },
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        colors: { ...colorPalette },
        dark: true,
      },
    },
  },
  defaults: {
    VCard: {
      rounded: "xl",
      class: "elevation-12",
    },
    VCardTitle: {
      class: "text-h5 font-weight-bold my-auto mb-4 text-capitalize",
    },
    VCardSubtitle: {
      class: "text-h6 font-weight-thin my-auto mb-4",
    },
    VBtn: {
      rounded: "xl",
      class: "font-weight-black",
    },
  },
})
