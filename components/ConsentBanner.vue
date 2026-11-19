<script setup lang="ts">
const { showBanner, restore, accept, decline } = useAnalyticsConsent()

onMounted(restore)
</script>

<template>
  <div
    v-if="showBanner"
    class="consent-banner"
    role="region"
    aria-label="Analytics consent"
  >
    <v-card class="pa-4" color="surface" elevation="12" rounded="xl">
      <p class="mb-4">
        This site uses Google Analytics to understand how visitors use it.
        Analytics only loads if you accept.
      </p>
      <div class="d-flex justify-end ga-2">
        <v-btn variant="text" @click="decline">Decline</v-btn>
        <v-btn color="primary" variant="flat" @click="accept">Accept</v-btn>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.consent-banner {
  position: fixed;
  right: 16px;
  bottom: 16px;
  left: 16px;
  z-index: 1000;
  max-width: 480px;
  margin-left: auto;
}
</style>
