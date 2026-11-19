<script setup lang="ts">
const { user } = useAppShell()
const { consent, reset } = useAnalyticsConsent()
</script>

<template>
  <v-footer
    class="text-h6 text-center justify-center ga-2 text-capitalize"
    color="primary"
  >
    <span>&copy; {{ new Date().getFullYear() }}</span>
    <b>{{ user.fullName }}</b>
    <ClientOnly>
      <v-btn
        v-if="consent"
        variant="text"
        size="small"
        class="text-none ml-2"
        @click="reset"
      >
        Cookie settings
      </v-btn>
    </ClientOnly>
  </v-footer>
</template>
