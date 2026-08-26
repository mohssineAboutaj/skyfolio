<script setup lang="ts">
import type { Link } from "~/types/general"
import { useGoTo } from "vuetify"

const goTo = useGoTo()

// stores
const infoStore = useAboutInfoStore().getInfo
const { getFeatured } = useContactStore()
const { getLinks, getTitle, $subscribe, resetTitle } = useSettingsStore()

// composables
const { generatePDF } = useResumePDF()
const { bindMagneticAll } = useGsap()
const { optimize } = useOptimizedImage()

// router
const route = useRoute()
const router = useRouter()

const title = ref(getTitle)
const drawer = ref(false)
const user = computed(() => infoStore)
const socials = computed(() => getFeatured)
const links = computed(() => getLinks)
const activeLink = ref(null)
const isGeneratingPDF = ref(false)
let cleanupMagnetic = () => {}

const drawerAvatar = computed(() =>
  optimize(user.value.avatar, { width: 80, height: 80 }),
)

const showHomeBtn = computed(() => {
  return route.path === "/404"
})
const hideToolbarLinks = computed(() => {
  return showHomeBtn.value || route.path === "/"
})

onMounted(() => {
  nextTick(() => {
    cleanupMagnetic = bindMagneticAll(document.body, "[data-magnetic]")
  })
})

onBeforeUnmount(() => {
  cleanupMagnetic()
})

function goToTarget(link: Link) {
  const toolbarHeight = document.querySelector(".v-toolbar")?.clientHeight || 0

  goTo(link.targetId, { offset: -toolbarHeight })

  getLinks.forEach((l) => (l.isCurrent = false))
  link.isCurrent = true

  if (drawer.value) {
    drawer.value = false
  }
}

function goToContacts() {
  if (drawer.value) drawer.value = false
  if (route.path !== "/") {
    router.push({ path: "/", hash: "#contacts" })
    return
  }
  const contactsLink = links.value.find((l) => l.value === "contacts")
  if (contactsLink) {
    goToTarget(contactsLink)
    return
  }
  const toolbarHeight = document.querySelector(".v-toolbar")?.clientHeight || 0
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

/// watch store
$subscribe((mutate, state) => {
  title.value = state.title
})

// watch route
watch(
  () => route.path,
  () => {
    if (route.path === "/") {
      resetTitle()
    }
  },
)
</script>

<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        temporary
        class="hidden-md-and-up"
        disable-resize-watcher
      >
        <div class="d-flex align-center justify-center mt-16 mb-8">
          <v-avatar :size="80">
            <v-img :src="drawerAvatar" :alt="`${user.fullName} avatar`"></v-img>
          </v-avatar>
        </div>
        <h3 class="text-h5 mb-8 text-center text-capitalize">
          {{ user.fullName }}
        </h3>

        <div class="d-flex align-center justify-space-around mb-8">
          <v-btn
            v-for="social in socials"
            :key="social.icon"
            :href="social.link"
            target="_blank"
            icon
            data-magnetic
          >
            <Icon :name="social.icon" size="24" />
          </v-btn>
        </div>

        <v-list
          density="comfortable"
          class="pr-0"
          nav
          aria-label="Main navigation"
        >
          <v-list-item
            v-for="link in links"
            :key="link.value"
            :prepend-icon="link.icon"
            :title="link.title"
            :value="link.value"
            active-class="bg-primary"
            :active="link.isCurrent"
            @click="goToTarget(link)"
          ></v-list-item>
          <v-divider class="my-2"></v-divider>
          <v-list-item
            prepend-icon="mdi-handshake"
            title="Hire me"
            @click="goToContacts"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-download"
            title="Download Resume"
            :disabled="isGeneratingPDF"
            @click="handleDownloadResume"
          >
            <template v-slot:append v-if="isGeneratingPDF">
              <v-progress-circular
                indeterminate
                size="20"
                color="primary"
              ></v-progress-circular>
            </template>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar color="primary" class="position-fixed" style="z-index: 999">
        <v-app-bar-nav-icon v-if="showHomeBtn" aria-label="Home" to="/">
          <v-icon>mdi-home</v-icon>
        </v-app-bar-nav-icon>
        <v-app-bar-nav-icon
          v-else
          class="hidden-lg-and-up"
          aria-label="Menu"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title class="font-weight-bold">{{ title }}</v-toolbar-title>

        <v-toolbar-items v-if="hideToolbarLinks" class="hidden-sm-and-down">
          <v-tabs v-model="activeLink" align-tabs="center" stacked>
            <v-tab
              v-for="link in links"
              :key="link.value"
              @click="goToTarget(link)"
              :value="link.value"
              :active="link.isCurrent"
              hide-slider
            >
              <v-icon>{{ link.icon }}</v-icon>
              {{ link.title }}
            </v-tab>
            <v-tab
              data-magnetic
              hide-slider
              @click="goToContacts"
            >
              <v-icon>mdi-handshake</v-icon>
              Hire me
            </v-tab>
            <v-tab
              :loading="isGeneratingPDF"
              :disabled="isGeneratingPDF"
              data-magnetic
              @click="handleDownloadResume"
              hide-slider
            >
              <v-icon>mdi-download</v-icon>
              Resume
            </v-tab>
          </v-tabs>
        </v-toolbar-items>
      </v-toolbar>

      <v-main>
        <div class="mt-16 page-shell" style="min-height: 85vh">
          <NuxtPage
            :transition="{
              name: 'folio',
              mode: 'out-in',
            }"
          />
        </div>

        <v-footer
          class="text-h6 text-center justify-center ga-2 text-capitalize"
          color="primary"
        >
          <span>&copy; {{ new Date().getFullYear() }}</span>
          <b>{{ user.fullName }}</b>
        </v-footer>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style>
* {
  font-family: "Quicksand", sans-serif !important;
}

.v-card-title,
.v-card-subtitle,
.title {
  font-family: "Charm", cursive !important;
  font-weight: 400;
  font-style: normal;
}

p {
  line-height: 1.5 !important;
}

.v-main,
.page-shell {
  width: 100%;
  max-width: 100%;
}

.folio-enter-active,
.folio-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.folio-enter-from {
  opacity: 0;
  transform: translateY(14px);
}

.folio-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (prefers-reduced-motion: reduce) {
  .folio-enter-active,
  .folio-leave-active {
    transition: none;
  }

  .folio-enter-from,
  .folio-leave-to {
    transform: none;
  }
}
</style>
