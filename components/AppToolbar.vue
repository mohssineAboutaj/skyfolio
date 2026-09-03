<script setup lang="ts">
const {
  title,
  links,
  activeLink,
  showHomeBtn,
  hideToolbarLinks,
  isGeneratingPDF,
  toggleDrawer,
  goToTarget,
  goToContacts,
  handleDownloadResume,
} = useAppShell()
</script>

<template>
  <v-toolbar color="primary" class="position-fixed" style="z-index: 999">
    <v-app-bar-nav-icon v-if="showHomeBtn" aria-label="Home" to="/">
      <v-icon>mdi-home</v-icon>
    </v-app-bar-nav-icon>
    <v-app-bar-nav-icon
      v-else
      class="hidden-lg-and-up"
      aria-label="Menu"
      @click="toggleDrawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="font-weight-bold">{{ title }}</v-toolbar-title>

    <v-toolbar-items v-if="hideToolbarLinks" class="hidden-sm-and-down">
      <v-tabs v-model="activeLink" align-tabs="center" stacked>
        <v-tab
          v-for="link in links"
          :key="link.value"
          :value="link.value"
          :active="link.isCurrent"
          hide-slider
          @click="goToTarget(link)"
        >
          <v-icon>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-tab>
        <v-tab data-magnetic hide-slider @click="goToContacts">
          <v-icon>mdi-handshake</v-icon>
          Hire me
        </v-tab>
        <v-tab
          :loading="isGeneratingPDF"
          :disabled="isGeneratingPDF"
          data-magnetic
          hide-slider
          @click="handleDownloadResume"
        >
          <v-icon>mdi-download</v-icon>
          Resume
        </v-tab>
      </v-tabs>
    </v-toolbar-items>
  </v-toolbar>
</template>
