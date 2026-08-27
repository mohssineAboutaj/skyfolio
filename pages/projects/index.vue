<script setup lang="ts">
import type { Project } from "~/types/general"
import { portfolioSiteDescription } from "~/utils/portfolioSeo"

// store
const { getAll, getProjectsTypesWithProjects } = useProjectsStore()
const { updateTitle } = useSettingsStore()

useSeoMeta({
  title: "Projects",
  description: `Production and personal projects — ${portfolioSiteDescription}`,
})

// data
/// static
const title = "Projects"
const breadcrumbItems = [
  { title: "Home", disabled: false, to: "/" },
  { title: "Projects", disabled: true },
]
const ALL = "all"
/// reactive
const projects: Project[] = reactive([])
const activeType = ref("")
const types = [ALL, ...getProjectsTypesWithProjects]

const visibleProjects = computed(() =>
  projects.filter((project) => project.show !== false),
)

// hooks
onMounted(() => {
  getAll().forEach((project) => {
    projects.push({ ...project, show: true })
  })

  updateTitle(title)
  activeType.value = ALL
})

// methods
watch(activeType, (newType) => {
  projects.forEach((project) => {
    project.show = newType === "all" || project.types.includes(newType)
  })
})
</script>

<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbItems" divider="-"></v-breadcrumbs>

    <v-tabs
      v-model="activeType"
      bg-color="background"
      class="rounded-xl mb-4"
      slider-color="secondary"
      selected-class="text-secondary"
      show-arrows
    >
      <v-tab v-for="type in types" :key="type" :value="type">
        {{ type }}
      </v-tab>
    </v-tabs>

    <v-row v-if="projects.length == 0">
      <v-col
        v-for="n in 12"
        :key="`featured-projects-skeleton-${n}`"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="project in visibleProjects"
        :key="project.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ProjectPreviewCard :project="project" />
      </v-col>
    </v-row>
  </v-container>
</template>
