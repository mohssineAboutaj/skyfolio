<script setup lang="ts">
const { user } = useAppShell()
</script>

<template>
  <v-footer
    class="text-h6 text-center justify-center ga-2 text-capitalize"
    color="primary"
  >
    <span>&copy; {{ new Date().getFullYear() }}</span>
    <b>{{ user.fullName }}</b>
  </v-footer>
</template>
