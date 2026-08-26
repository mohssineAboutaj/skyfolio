<script setup lang="ts">
const {
  drawer,
  user,
  socials,
  links,
  drawerAvatar,
  isGeneratingPDF,
  goToTarget,
  goToContacts,
  handleDownloadResume,
} = useAppShell()
</script>

<template>
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
</template>
