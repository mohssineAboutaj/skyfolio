<script setup lang="ts">
import type { Project } from "~/types/general"

const props = defineProps<{ project: Project }>()

const { bindProjectCard } = useGsap()
const { optimizeSizes } = useOptimizedImage()
const cardRef = ref<{ $el?: Element } | null>(null)

const optimizedCover = computed(() =>
  optimizeSizes(props.project.imgs[0], "100vw sm:50vw md:400px", {
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

    <!-- Visual call to action only: the whole card is already the link -->
    <div
      class="project-card__cta bg-primary d-flex align-center justify-center text-button font-weight-black"
      aria-hidden="true"
    >
      <span class="mx-1">see details</span>
      <v-icon>mdi-chevron-double-right</v-icon>
    </div>
  </v-card>
</template>

<style scoped>
.project-card {
  overflow: hidden;
  width: 100%;
  will-change: transform;
}

.project-card__cta {
  min-height: 36px;
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
