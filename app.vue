<script setup lang="ts">
import type { Link } from "~/types/general"
import type { Contact } from "~/types/home"
import { useGoTo } from "vuetify"

const goTo = useGoTo()

// stores
const infoStore = useAboutInfoStore().getInfo
const { getFeatured } = useContactStore()
const { getLinks, getTitle, $subscribe, resetTitle } = useSettingsStore()

// router
const router = useRouter()

// data
/// static
const title = ref(getTitle)
const user = {
  ...infoStore,
  avatar: "/uploads/" + infoStore.avatar,
}
/// reactive
const drawer = ref(false)
const socials: Contact[] = reactive([])
const links: Link[] = reactive([] as Link[])
const activeLink = ref(null)

// computed
const showBackBtn = computed(() => {
  return router.currentRoute.value.path !== "/"
})

// fill data
getFeatured.forEach((contact) => {
  socials.push(contact)
})
getLinks.forEach((link: Link) => {
  links.push(link)
})

// methods
function goToTarget(link: Link) {
  const toolbarHeight = document.querySelector(".v-toolbar")?.clientHeight || 0

  goTo(link.targetId, { offset: -toolbarHeight })

  links.forEach((l) => (l.isCurrent = false))

  link.isCurrent = true

  // navigation drawer is open
  if (drawer.value) {
    drawer.value = false
  }
}

/// watch store
$subscribe((mutate, state) => {
  title.value = state.title
})

// watch route
watch(
  () => router.currentRoute.value.path,
  () => {
    if (router.currentRoute.value.path === "/") {
      resetTitle()
    }
  },
)
</script>

<template>
  <Particles />

  <v-layout>
    <v-navigation-drawer
      v-model="drawer"
      class="hidden-md-and-up"
      disable-resize-watcher
    >
      <div class="d-flex align-center justify-center mt-16 mb-8">
        <v-avatar :size="80">
          <v-img :src="user.avatar" :alt="`${user.fullName} avatar`"></v-img>
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
        >
          <Icon :name="social.icon" size="24" />
        </v-btn>
      </div>

      <v-list density="comfortable" class="pr-0" nav>
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
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="primary" class="position-fixed" style="z-index: 999">
      <v-app-bar-nav-icon v-if="showBackBtn" @click="router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-app-bar-nav-icon>
      <v-app-bar-nav-icon
        v-else
        class="hidden-lg-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="font-weight-bold">{{ title }}</v-toolbar-title>

      <v-toolbar-items v-if="!showBackBtn" class="hidden-sm-and-down">
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
        </v-tabs>
      </v-toolbar-items>
    </v-toolbar>

    <v-main>
      <div class="mt-16" style="min-height: 85vh">
        <nuxt-page />
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
</template>

<style>
* {
  font-family: "Quicksand", sans-serif !important;
}

.v-card-title,
.v-card-subtitle {
  font-family: "Dancing Script", cursive !important;
  font-optical-sizing: auto;
  font-style: normal;
}

p {
  line-height: 1.5 !important;
}
</style>
