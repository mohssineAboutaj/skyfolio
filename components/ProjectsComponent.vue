<script setup lang="ts">
import type { Project } from "~/types/general"

// store
const { getFeatured } = useProjectsStore()

// vuetify
const { thresholds } = useDisplay()

// data
/// static
const swiperOptions = {
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

// hooks
onMounted(() => {
  getFeatured().forEach((project) => {
    projects.push(project)
  })
})
</script>

<template>
  <FlatCard id="projects">
    <v-card-title class="d-flex justify-space-between">
      <span class="title">Projects</span>
      <v-spacer></v-spacer>
      <v-btn
        to="/projects"
        color="primary"
        v-bind="
          $vuetify.display.mdAndDown
            ? { icon: 'mdi-chevron-double-right' }
            : { appendIcon: 'mdi-chevron-double-right', text: 'View All' }
        "
      ></v-btn>
    </v-card-title>
    <v-card-subtitle>
      Some of my projects and projects that I'm allowed to share.
    </v-card-subtitle>
    <v-card-text>
      <v-row v-if="projects.length == 0">
        <v-col
          v-for="n in 4"
          :key="`featured-projects-skeleton-${n}`"
          cols="12"
          md="6"
          lg="3"
        >
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
      </v-row>

      <swiper-container v-else v-bind="swiperOptions">
        <swiper-slide v-for="project in projects" :key="project.id">
          <ProjectPreviewCard :project="project" />
        </swiper-slide>
      </swiper-container>
    </v-card-text>
  </FlatCard>
</template>
