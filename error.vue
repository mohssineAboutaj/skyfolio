<script setup lang="ts">
import type { NuxtError } from "#app"

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.statusCode === 404)
const heading = computed(() =>
  isNotFound.value ? "Page not found" : "Something went wrong",
)

useSeoMeta({
  title: () => heading.value,
  robots: "noindex, follow",
})

function goHome() {
  clearError({ redirect: "/" })
}
</script>

<template>
  <v-app>
    <v-layout>
      <AppToolbar />

      <v-main>
        <v-container
          class="d-flex justify-center align-center mt-16"
          style="min-height: 80vh"
        >
          <div class="text-center">
            <h1 class="v-card-title text-h1">{{ error.statusCode }}</h1>
            <h2 class="v-card-title text-h4">{{ heading }}</h2>
            <v-btn class="mt-8" color="primary" @click="goHome">
              Go to home
            </v-btn>
          </div>
        </v-container>

        <AppFooter />
        <ConsentBanner />
      </v-main>
    </v-layout>
  </v-app>
</template>
