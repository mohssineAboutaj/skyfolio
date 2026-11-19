<script setup lang="ts">
import { portfolioSiteDescription } from "~/utils/portfolioSeo"

// store
const projectsStore = useProjectsStore()
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
const types = [ALL, ...projectsStore.getProjectsTypesWithProjects]

/// reactive
const activeType = ref(ALL)

// Derived during setup so the list is part of the prerendered HTML
const visibleProjects = computed(() => {
  const all = projectsStore.getAll()
  if (activeType.value === ALL) return all
  return all.filter((project) => project.types.includes(activeType.value))
})

updateTitle(title)
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

    <v-row>
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
