export type AnalyticsConsent = "granted" | "denied"

const STORAGE_KEY = "skyfolio:analytics-consent"

function readStoredConsent(): AnalyticsConsent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === "granted" || value === "denied" ? value : null
  } catch {
    return null
  }
}

function storeConsent(value: AnalyticsConsent | null) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, value)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); the choice
    // then only lasts for this page view, which is the safe default.
  }
}

/**
 * Google Analytics only loads after the visitor accepts (gtag initMode is
 * "manual" in nuxt.config.ts). The choice is remembered in localStorage.
 */
export function useAnalyticsConsent() {
  const nuxtApp = useNuxtApp()
  const { initialize, disableAnalytics, enableAnalytics } = useGtag()

  const consent = useState<AnalyticsConsent | null>(
    "analytics-consent",
    () => null,
  )
  // Hidden until the stored choice has been read on the client, so the
  // banner never flashes for visitors who already chose.
  const ready = useState("analytics-consent-ready", () => false)

  const showBanner = computed(() => ready.value && consent.value === null)

  function startAnalytics() {
    enableAnalytics()
    // initialize() registers the script with useHead, which needs the app
    // context; event handlers run outside it.
    nuxtApp.runWithContext(() => initialize())
  }

  /** Read the stored choice and start analytics if it was granted. */
  function restore() {
    consent.value = readStoredConsent()
    ready.value = true
    if (consent.value === "granted") startAnalytics()
  }

  function accept() {
    consent.value = "granted"
    storeConsent("granted")
    startAnalytics()
  }

  function decline() {
    consent.value = "denied"
    storeConsent("denied")
    disableAnalytics()
  }

  /** Forget the choice so the banner is shown again. */
  function reset() {
    consent.value = null
    storeConsent(null)
  }

  return { consent, showBanner, restore, accept, decline, reset }
}
