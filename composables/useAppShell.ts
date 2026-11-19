import { storeToRefs } from "pinia"
import navLinks from "~/data/navLinks.data"
import type { Link } from "~/types/general"

/**
 * Shared state and actions for the app chrome (toolbar + drawer).
 * State lives in useState so it is per-request on the server and shared
 * across every component that calls this composable on the client.
 */
export function useAppShell() {
  const route = useRoute()
  const router = useRouter()
  const { scrollToSection } = useScrollToSection()

  const drawer = useState("app-shell:drawer", () => false)
  const isGeneratingPDF = useState("app-shell:generating-pdf", () => false)
  const activeLink = useState<string | null>("app-shell:active-link", () => null)

  const settingsStore = useSettingsStore()
  const { title } = storeToRefs(settingsStore)
  const aboutStore = useAboutInfoStore()
  const contactStore = useContactStore()
  const { generatePDF } = useResumePDF()
  const { optimize } = useOptimizedImage()

  const user = computed(() => aboutStore.getInfo)
  const socials = computed(() => contactStore.getFeatured)
  const links = navLinks

  const drawerAvatar = computed(() =>
    optimize(user.value.avatar, { width: 80, height: 80 }),
  )

  const error = useError()
  const showHomeBtn = computed(() => Boolean(error.value))
  const showToolbarLinks = computed(
    () => showHomeBtn.value || route.path === "/",
  )

  function closeDrawer() {
    drawer.value = false
  }

  function toggleDrawer() {
    drawer.value = !drawer.value
  }

  function goToTarget(link: Link) {
    scrollToSection(link.targetId)
    activeLink.value = link.value
    closeDrawer()
  }

  function goToContacts() {
    closeDrawer()
    if (route.path !== "/") {
      router.push({ path: "/", hash: "#contacts" })
      return
    }
    const contactsLink = links.find((l) => l.value === "contacts")
    if (contactsLink) {
      goToTarget(contactsLink)
      return
    }
    scrollToSection("#contacts")
  }

  async function handleDownloadResume() {
    try {
      isGeneratingPDF.value = true
      await generatePDF()
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      isGeneratingPDF.value = false
    }
  }

  /** Reset the toolbar title when returning home. Call once from app.vue. */
  function watchRouteTitle() {
    watch(
      () => route.path,
      (path) => {
        if (path === "/") settingsStore.resetTitle()
      },
    )
  }

  return {
    drawer,
    isGeneratingPDF,
    activeLink,
    title,
    user,
    socials,
    links,
    drawerAvatar,
    showHomeBtn,
    showToolbarLinks,
    toggleDrawer,
    goToTarget,
    goToContacts,
    handleDownloadResume,
    watchRouteTitle,
  }
}
