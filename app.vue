<script setup lang="ts">
import type { Link } from "~/types/general"
import type { Contact } from "~/types/home"

// stores
const infoStore = useAboutInfoStore().getInfo
const { getFeatured } = useContactStore()

// router
const router = useRouter()

// data
/// static
const title = "Vuetify"
const user = {
  ...infoStore,
  avatar: "/uploads/" + infoStore.avatar,
}
/// reactive
const drawer = ref(false)
const socials: Contact[] = reactive([])
const links: Link[] = reactive([
  // home
  {
    icon: "mdi-home",
    title: "Home",
    value: "home",
    targetId: "#home",
    isCurrent: false,
  },
  // about
  {
    icon: "mdi-account",
    title: "About",
    value: "about",
    targetId: "#about",
    isCurrent: false,
  },
  // statistics
  {
    icon: "mdi-chart-bar",
    title: "Statistics",
    value: "statistics",
    targetId: "#statistics",
    isCurrent: false,
  },
  // services
  {
    icon: "mdi-cogs",
    title: "Services",
    value: "services",
    targetId: "#services",
    isCurrent: false,
  },
  // skills
  {
    icon: "mdi-code-tags-check",
    title: "Skills",
    value: "skills",
    targetId: "#skills",
    isCurrent: false,
  },
  // projects
  {
    icon: "mdi-briefcase",
    title: "Projects",
    value: "projects",
    targetId: "#projects",
    isCurrent: false,
  },
  // contacts
  {
    icon: "mdi-email",
    title: "Contacts",
    value: "contacts",
    targetId: "#contacts",
    isCurrent: false,
  },
])

// fill data
getFeatured.forEach((contact) => {
  socials.push(contact)
})

// methods
function goToTarget(link: Link) {
  const targetId = link.targetId

  const el = document.querySelector(targetId)
  if (el) {
    el.scrollIntoView({ behavior: "smooth" })

    router.push(targetId)
    links.forEach((l) => (l.isCurrent = false))

    link.isCurrent = true
  }
}

// hooks
onMounted(() => {
  // set current link
  const targetId = router.currentRoute.value.hash || links[0].targetId
  const link = links.find((l) => l.targetId === targetId)
  if (link) {
    link.isCurrent = true
  }
})
</script>

<template>
  <v-layout>
    <v-navigation-drawer v-model="drawer">
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

    <v-main class="bg-primary">
      <v-toolbar flat color="transparent">
        <v-app-bar-nav-icon
          class="hidden-lg-and-up"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title class="text-lg-center">{{ title }}</v-toolbar-title>
      </v-toolbar>

      <nuxt-page />

      <v-footer class="text-h6 text-center justify-center ga-2 text-capitalize">
        <span>&copy; {{ new Date().getFullYear() }}</span>
        <b>{{ user.fullName }}</b>
      </v-footer>
    </v-main>
  </v-layout>
</template>
