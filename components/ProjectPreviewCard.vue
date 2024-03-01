<script setup lang="ts">
// props
const { project } = defineProps({
  project: { type: Object, required: true },
})

// computed
const projectImg = computed(() => {
  if (project.imgs[0].startsWith("http")) {
    return project.imgs[0]
  } else {
    return `/uploads/imgs/projects/${project.imgs[0]}`
  }
})
</script>

<template>
  <v-card
    class="mx-auto"
    max-width="400"
    hover
    :to="`projects/${project.slug}`"
  >
    <v-img
      class="align-end text-white"
      height="200"
      cover
      :src="projectImg"
      :alt="project.title"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
    >
      <v-card-title>{{ project.title }}</v-card-title>
    </v-img>

    <v-card-text class="pa-0">
      <v-btn block color="primary">
        <span>Read more</span>
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>
