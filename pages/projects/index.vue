<script setup lang="ts">
import type { Project } from "~/types/home"

// store
const { getAll } = useProjectsStore()
const { updateTitle } = useSettingsStore()

// data
/// static
const title = "Projects"
/// reactive
const projects: Project[] = reactive([])

// fill data
getAll().forEach((project) => {
  projects.push(project)
})

// hooks
onMounted(() => {
  updateTitle(title)
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="project in projects"
        :key="project.id"
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
