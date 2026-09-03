<script setup lang="ts">
const { bindMagneticAll } = useGsap()
const { syncTitleFromStore, watchRouteTitle } = useAppShell()

let cleanupMagnetic = () => {}

onMounted(() => {
  nextTick(() => {
    cleanupMagnetic = bindMagneticAll(document.body, "[data-magnetic]")
  })
})

onBeforeUnmount(() => {
  cleanupMagnetic()
})

syncTitleFromStore()
watchRouteTitle()
</script>

<template>
  <v-app>
    <AppDrawer />

    <v-layout>
      <AppToolbar />

      <v-main>
        <div class="mt-16 page-shell" style="min-height: 85vh">
          <NuxtPage
            :transition="{
              name: 'folio',
              mode: 'out-in',
            }"
          />
        </div>

        <AppFooter />
      </v-main>
    </v-layout>
  </v-app>
</template>

<style>
* {
  font-family: "Quicksand", sans-serif !important;
}

.v-card-title,
.title {
  font-family: "Space Grotesk", sans-serif !important;
  font-weight: 600 !important;
  font-style: normal;
  letter-spacing: -0.02em;
}

.v-card-subtitle {
  font-family: "Quicksand", sans-serif !important;
  font-weight: 400 !important;
  opacity: 0.75;
}

.section-shell {
  background: transparent !important;
  box-shadow: none !important;
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
