<script setup lang="ts">
import { useProjectsStore } from "~/stores/projects"
import type { Project } from "~/types/home"
import { useDisplay } from "vuetify"

// store
const { getFeatured } = useProjectsStore()

// vuetify
const { thresholds } = useDisplay()

// data
/// static
const swiperOptions = {
  modules: [SwiperAutoplay, SwiperEffectCoverflow],
  slidesPerView: 1,
  breakpoints: {
    [thresholds.value.sm]: { slidesPerView: 2, spaceBetween: 20 },
    [thresholds.value.lg]: { slidesPerView: 3, spaceBetween: 30 },
    [thresholds.value.xl]: { slidesPerView: 5, spaceBetween: 40 },
  },
  autoplay: { delay: 1500 },
}
/// reactive
const projects: Project[] = reactive([])

// fill data
getFeatured().forEach((project) => {
  projects.push(project)
})
</script>

<template>
  <v-card id="projects" variant="text" class="elevation-0">
    <v-card-title class="mb-4">Projects</v-card-title>
    <Swiper v-bind="swiperOptions">
      <SwiperSlide v-for="project in projects" :key="project.id">
        <ProjectPreviewCard :project="project" />
      </SwiperSlide>
    </Swiper>
  </v-card>
</template>
