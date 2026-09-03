import type { Link } from "~/types/general"
import { useGoTo } from "vuetify"

const drawer = ref(false)
const isGeneratingPDF = ref(false)
const activeLink = ref(null)
const title = ref("")
let shellReady = false
let titleSynced = false
let routeWatched = false

export function useAppShell() {
  const goTo = useGoTo()
  const route = useRoute()
  const router = useRouter()

  const infoStore = useAboutInfoStore().getInfo
  const { getFeatured } = useContactStore()
  const { getLinks, getTitle, $subscribe, resetTitle } = useSettingsStore()
  const { generatePDF } = useResumePDF()
  const { optimize } = useOptimizedImage()

  if (!shellReady) {
    title.value = getTitle
    shellReady = true
  }

  const user = computed(() => infoStore)
  const socials = computed(() => getFeatured)
  const links = computed(() => getLinks)

  const drawerAvatar = computed(() =>
    optimize(user.value.avatar, { width: 80, height: 80 }),
  )

  const showHomeBtn = computed(() => route.path === "/404")
  const hideToolbarLinks = computed(
    () => showHomeBtn.value || route.path === "/",
  )

  function closeDrawer() {
    if (drawer.value) drawer.value = false
  }

  function toggleDrawer() {
    drawer.value = !drawer.value
  }

  function goToTarget(link: Link) {
    const toolbarHeight =
      document.querySelector(".v-toolbar")?.clientHeight || 0

    goTo(link.targetId, { offset: -toolbarHeight })

    getLinks.forEach((l) => (l.isCurrent = false))
    link.isCurrent = true
    closeDrawer()
  }

  function goToContacts() {
    closeDrawer()
    if (route.path !== "/") {
      router.push({ path: "/", hash: "#contacts" })
      return
    }
    const contactsLink = links.value.find((l) => l.value === "contacts")
    if (contactsLink) {
      goToTarget(contactsLink)
      return
    }
    const toolbarHeight =
      document.querySelector(".v-toolbar")?.clientHeight || 0
    goTo("#contacts", { offset: -toolbarHeight })
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

  function syncTitleFromStore() {
    if (titleSynced) return
    titleSynced = true
    $subscribe((_mutate, state) => {
      title.value = state.title
    })
  }

  function watchRouteTitle() {
    if (routeWatched) return
    routeWatched = true
    watch(
      () => route.path,
      () => {
        if (route.path === "/") {
          resetTitle()
        }
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
    hideToolbarLinks,
    toggleDrawer,
    goToTarget,
    goToContacts,
    handleDownloadResume,
    syncTitleFromStore,
    watchRouteTitle,
  }
}
