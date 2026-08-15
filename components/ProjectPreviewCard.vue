<script setup lang="ts">
// props
const { project } = defineProps({
  project: { type: Object, required: true },
})

const { bindProjectCard } = useGsap()
const { optimizeSizes } = useOptimizedImage()
const cardRef = ref<{ $el?: Element } | null>(null)

// computed
const projectImg = project.imgs[0]
const optimizedCover = computed(() =>
  optimizeSizes(projectImg, "100vw sm:50vw md:400px", {
    height: 200,
    quality: 75,
  }),
)

onMounted(async () => {
  await nextTick()
  bindProjectCard(cardRef.value)
})
</script>

<template>
  <v-card
    ref="cardRef"
    class="project-card h-100"
    :to="`/projects/${project.slug}`"
  >
    <div data-project-media class="project-card__media">
      <v-img
        class="align-end text-white"
        height="200"
        cover
        :src="optimizedCover.src"
        :srcset="optimizedCover.srcset"
        :sizes="optimizedCover.sizes"
        :alt="project.title"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.9)"
      >
        <v-card-title data-project-title>{{ project.title }}</v-card-title>
      </v-img>
    </div>

    <v-card-text class="pa-0">
      <v-btn block color="primary" icon="mdi-chevron-right" class="rounded-t-0">
        <span class="mx-1">see details</span>
        <v-icon>mdi-chevron-double-right</v-icon>
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.project-card {
  overflow: hidden;
  width: 100%;
  will-change: transform;
}

.project-card__media {
  overflow: hidden;
  will-change: clip-path;
}

.project-card__media :deep(.v-img__img) {
  transform-origin: center center;
  will-change: transform;
}
</style>
