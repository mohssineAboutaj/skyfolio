import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration"
import { blue } from "vuetify/lib/util/colors.mjs"

const colorPalette = {
  primary: blue.darken3,
  secondary: blue.base,
}

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        colors: { ...colorPalette },
        dark: true,
      },
      light: {
        colors: { ...colorPalette },
        dark: false,
      },
    },
  },
  defaults: {
    VCard: {
      rounded: "xl",
      class: "my-8 elevation-12",
    },
    VCardTitle: {
      class: "text-h5 font-weight-bold my-auto mb-4 text-capitalize",
    },
    VCardSubtitle: {
      class: "text-h1 font-weight-regular my-auto",
    },
    VBtn: {
      rounded: "xl",
      class: "font-weight-black",
    },
  },
})
