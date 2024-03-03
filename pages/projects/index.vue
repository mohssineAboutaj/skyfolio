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

// fill data
getAll().forEach((project) => {
  projects.push({ ...project, show: true })
})

// hooks
onMounted(() => {
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
  <v-container class="mt-16">
    <v-breadcrumbs :items="breadcrumbItems" divider="-"></v-breadcrumbs>

    <v-tabs
      v-model="activeType"
      color="primary"
      slider-color="secondary"
      selected-class="text-secondary"
      show-arrows
    >
      <v-tab v-for="type in types" :key="type" :value="type">
        {{ type }}
      </v-tab>
    </v-tabs>

    <v-row>
      <v-col
        v-for="project in projects"
        :key="project.id"
        v-show="project.show"
        cols="12"
        md="6"
        lg="4"
        xl="3"
      >
        <ProjectPreviewCard :project="project" />
      </v-col>
    </v-row>
  </v-container>
</template>
