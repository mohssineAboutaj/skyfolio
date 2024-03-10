<script setup lang="ts">
import type { Project } from "~/types/home"

// store
const { getAll, getProjectsTypes } = useProjectsStore()
const { updateTitle } = useSettingsStore()

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
const types = [ALL, ...getProjectsTypes]

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
      class="rounded-xl"
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
        md="6"
        lg="4"
        xl="3"
      >
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-scale-transition class="v-row" tag="div" group>
      <template v-for="project in projects" :key="project.id">
        <v-col v-if="project.show" cols="12" md="6" lg="4" xl="3">
          <ProjectPreviewCard :project="project" />
        </v-col>
      </template>
    </v-scale-transition>
  </v-container>
</template>
