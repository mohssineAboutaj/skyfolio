<script lang="ts" setup>
import { useProjectsStore } from "~/stores/projects"
import type { Project } from "~/types/home"

// store
const { getFeatured } = useProjectsStore()

// data
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
    <v-row>
      <v-col
        v-for="project in projects"
        :key="project.id"
        cols="12"
        md="6"
        lg="4"
      >
        <ProjectPreviewCard :project="project" />
      </v-col>
    </v-row>
  </v-card>
</template>
