<script setup lang="ts">
import { useTheme } from "vuetify"
import type { ISourceOptions } from "tsparticles-engine"

const { current } = useTheme()

// See tsParticles documentation for all available options
const options: ISourceOptions = {
  fullScreen: { enable: true, zIndex: -1 },
  background: { color: { value: current.value.colors.background } },
  particles: {
    color: { value: current.value.colors.primary },
    links: { color: current.value.colors.secondary, enable: true },
    move: { enable: true },
    number: { value: 150 },
  },
  interactivity: {
    events: { onClick: { enable: true, mode: "push" } },
  },
}
</script>

<template>
  <NuxtParticles id="tsparticles" :options="options"></NuxtParticles>
</template>
