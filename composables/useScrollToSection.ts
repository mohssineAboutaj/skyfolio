import { useGoTo } from "vuetify"
import { getToolbarHeight } from "~/utils/toolbar"

/** Smooth-scroll to a home page section, leaving room for the fixed toolbar. */
export function useScrollToSection() {
  const goTo = useGoTo()

  function scrollToSection(target: string) {
    return goTo(target, { offset: -getToolbarHeight() })
  }

  return { scrollToSection }
}
