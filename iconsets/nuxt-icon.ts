import { h } from "vue"
import type { IconAliases, IconProps, IconSet } from "vuetify"
import { aliases as mdiAliases } from "vuetify/iconsets/mdi"
import { Icon } from "#components"

/** Map Vuetify `mdi-*` / `$alias` values to Iconify `mdi:*` names. */
export function toIconifyName(icon: unknown): string {
  if (typeof icon !== "string" || !icon) return ""
  if (icon.includes(":")) return icon
  if (icon.startsWith("mdi-")) return `mdi:${icon.slice(4)}`
  return icon
}

/** Keep Vuetify built-in alias keys; values stay `mdi-*` and convert at render. */
export const aliases: IconAliases = { ...mdiAliases }

export const nuxtIcon: IconSet = {
  component: (props: IconProps) => {
    const { icon, tag, ...rest } = props
    return h(tag, rest, [
      h(Icon, {
        name: toIconifyName(icon),
        size: "1em",
      }),
    ])
  },
}
