<script setup lang="ts">
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
  autoplay: { delay: 2500 },
}
/// reactive
const projects: Project[] = reactive([])

// fill data
getFeatured().forEach((project) => {
  projects.push(project)
})
</script>

<template>
  <FlatCard id="projects">
    <v-card-title class="d-flex justify-space-between">
      <span>Projects</span>
      <v-spacer></v-spacer>
      <v-btn
        to="/projects"
        color="primary"
        append-icon="mdi-chevron-double-right"
      >
        <span class="hidden-sm-and-down">see all</span>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <Swiper v-bind="swiperOptions">
        <SwiperSlide v-for="project in projects" :key="project.id">
          <ProjectPreviewCard :project="project" />
        </SwiperSlide>
      </Swiper>
    </v-card-text>
  </FlatCard>
</template>
