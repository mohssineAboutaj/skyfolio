<script setup lang="ts">
import { useAboutInfoStore } from "@/stores/about"
import type { Link, Social } from "@/types/general"

const info = useAboutInfoStore().getInfo

const title = "Vuetify"
const links: Link = [{ icon: "mdi-home", title: "Home", value: "home" }]

const user = {
  ...info,
  avatar: "/uploads/" + info.avatar,
}

const socials: Social = [
  { icon: "mdi-facebook", link: "https://www.facebook.com" },
  { icon: "mdi-twitter", link: "https://www.twitter.com" },
  { icon: "mdi-linkedin", link: "https://www.linkedin.com" },
]
</script>

<template>
  <v-layout>
    <v-navigation-drawer>
      <div class="d-flex align-center justify-center mt-16 mb-8">
        <v-avatar :size="200">
          <v-img :src="user.avatar" :alt="`${user.fullName} avatar`"></v-img>
        </v-avatar>
      </div>
      <h3 class="text-h5 mb-8 text-center">{{ user.fullName }}</h3>

      <div class="d-flex align-center justify-space-around mb-8">
        <v-btn
          v-for="social in socials"
          :key="social.icon"
          :icon="social.icon"
          :href="social.link"
          target="_blank"
        />
      </div>

      <v-list density="compact" nav>
        <v-list-item
          v-for="link in links"
          :key="link.value"
          :prepend-icon="link.icon"
          :title="link.title"
          :value="link.value"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-primary">
      <v-toolbar>
        <v-app-bar-nav-icon class="hidden-lg-and-down"></v-app-bar-nav-icon>

        <v-toolbar-title class="text-lg-center">{{ title }}</v-toolbar-title>
      </v-toolbar>

      <router-view />
    </v-main>
  </v-layout>
</template>
