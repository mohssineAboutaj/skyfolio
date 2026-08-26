<script setup lang="ts">
// store
const { getFeatured } = useProjectsStore()
const { revealSection } = useGsap()

// vuetify
const { thresholds } = useDisplay()

const swiperOptions = {
  slidesPerView: 1,
  breakpoints: {
    [thresholds.value.sm]: { slidesPerView: 2, spaceBetween: 20 },
    [thresholds.value.lg]: { slidesPerView: 3, spaceBetween: 30 },
    [thresholds.value.xl]: { slidesPerView: 5, spaceBetween: 40 },
  },
  autoplay: { delay: 2500 },
}

const projects = computed(() => getFeatured())
let motionWired = false

watch(
  () => projects.value.length,
  async (len) => {
    if (!len || motionWired) return
    motionWired = true
    await nextTick()
    revealSection("#projects")
  },
  { immediate: true },
)
</script>

<template>
  <FlatCard id="projects">
    <v-card-title class="d-flex justify-space-between">
      <span class="title">Projects</span>
      <v-spacer></v-spacer>
      <v-btn
        to="/projects"
        color="primary"
        data-magnetic
        aria-label="View all projects"
        v-bind="
          $vuetify.display.mdAndDown
            ? { icon: 'mdi-chevron-double-right' }
            : { appendIcon: 'mdi-chevron-double-right', text: 'View All' }
        "
      ></v-btn>
    </v-card-title>
    <v-card-subtitle>
      Selected work I can share — commercial products and personal builds.
    </v-card-subtitle>
    <v-card-text>
      <swiper-container v-bind="swiperOptions">
        <swiper-slide v-for="project in projects" :key="project.id">
          <ProjectPreviewCard :project="project" />
        </swiper-slide>
      </swiper-container>
    </v-card-text>
  </FlatCard>
</template>
