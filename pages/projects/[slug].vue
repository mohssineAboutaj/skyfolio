<script setup lang="ts">
import type { Project } from "~/types/general"

// store
const { getBySlug } = useProjectsStore()
const { updateTitle } = useSettingsStore()
const { gsap, reducedMotion, getScrollStart, ScrollTrigger } = useGsap()

// route
const route = useRoute()
const router = useRouter()

// data
/// reactive
const project = reactive<Project>({
  id: "",
  title: "",
  slug: "",
  description: "",
  imgs: [],
  visible: false,
  featured: false,
  types: [],
  tech: [],
  platforms: [],
  status: undefined,
})
const slug = ref("")
const title = ref("")
const breadcrumbItems = reactive([
  { title: "Home", disabled: false, to: "/" },
  { title: "Projects", disabled: false, to: "/projects" },
  { title: "", disabled: true },
])
const galleryRef = ref<HTMLElement | null>(null)
const mainSwiperRef = ref(null)
const thumbsSwiperRef = ref(null)

const imageCount = computed(() => project.imgs?.length ?? 0)
const hasGallery = computed(() => imageCount.value > 1)
const hasSingleImage = computed(() => imageCount.value === 1)

const { instance: mainSwiper } = useSwiper(mainSwiperRef, {
  slidesPerView: 1,
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  autoplay: { delay: 2500, disableOnInteraction: false },
})

const { instance: thumbsSwiper } = useSwiper(thumbsSwiperRef, {
  slidesPerView: Math.min(4, imageCount.value || 4),
  spaceBetween: 10,
  grabCursor: true,
  watchSlidesProgress: true,
  slideToClickedSlide: true,
})

const { optimize } = useOptimizedImage()

function optimizedGallerySrc(src: string, height: number) {
  return optimize(src, { height, quality: 75 })
}

watch([mainSwiper, thumbsSwiper], ([main, thumbs]) => {
  if (!main || !thumbs) return
  main.params.thumbs = { swiper: thumbs }
  main.thumbs?.init()
  main.thumbs?.update(true)
})

function loadProject() {
  slug.value = route.params.slug as string
  const projectFromStore = getBySlug(slug.value)

  if (projectFromStore) {
    Object.assign(project, {
      ...projectFromStore,
      imgs: [...(projectFromStore.imgs ?? [])],
      platforms: [...(projectFromStore.platforms ?? [])],
    })
    title.value = project.title
    updateTitle(title.value)
    breadcrumbItems[2].title = title.value
    return true
  }

  return false
}

// Load during setup so SSR has imgs defined
if (!loadProject() && import.meta.client) {
  router.push("/404")
}

onBeforeMount(() => {
  if (!project.id && !loadProject()) {
    router.push("/404")
  }
})

onMounted(async () => {
  if (reducedMotion) return
  await nextTick()
  const el = galleryRef.value
  if (!el) return
  gsap.set(el, { clipPath: "inset(8% 8% 8% 8% round 16px)", opacity: 0.85 })
  ScrollTrigger.create({
    trigger: el,
    start: getScrollStart(),
    once: true,
    onEnter: () => {
      gsap.to(el, {
        clipPath: "inset(0% 0% 0% 0% round 16px)",
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
      })
    },
  })
})
</script>

<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbItems" divider="-"></v-breadcrumbs>

    <v-card>
      <v-card-title class="text-center">{{ title }}</v-card-title>

      <v-card-text>
        <v-row>
          <v-col v-if="imageCount" cols="12" md="6">
            <div ref="galleryRef" class="project-gallery">
              <!-- Static image when there is only one -->
              <v-img
                v-if="hasSingleImage"
                :src="optimizedGallerySrc(project.imgs[0], 400)"
                :alt="title"
                max-height="400"
                cover
                class="rounded-lg"
              />

              <!-- Swiper gallery only when there are multiple images -->
              <ClientOnly v-else-if="hasGallery">
                <swiper-container
                  ref="mainSwiperRef"
                  class="main-gallery"
                  :init="false"
                >
                  <swiper-slide
                    v-for="(image, n) in project.imgs"
                    :key="`main-img-${n}`"
                  >
                    <v-img
                      :src="optimizedGallerySrc(image, 400)"
                      :alt="title"
                      max-height="400"
                      cover
                    />
                  </swiper-slide>
                </swiper-container>

                <swiper-container
                  ref="thumbsSwiperRef"
                  class="nav-gallery my-2"
                  :init="false"
                >
                  <swiper-slide
                    v-for="(image, n) in project.imgs"
                    :key="`gallery-img-${n}`"
                  >
                    <v-img
                      :src="optimizedGallerySrc(image, 100)"
                      :alt="title"
                      max-height="100"
                      cover
                    />
                  </swiper-slide>
                </swiper-container>
              </ClientOnly>
            </div>
          </v-col>
          <v-col cols="12" :md="imageCount ? 6 : 12">
            <v-card title="Description" variant="plain" class="elevation-0">
              <v-card-text>{{ project.description }}</v-card-text>
            </v-card>
            <v-divider></v-divider>
            <!-- categories -->
            <v-card title="Categories" variant="plain" class="elevation-0">
              <v-card-text>
                <v-chip-group column>
                  <v-chip
                    v-for="category in project.types"
                    :key="category"
                    variant="outlined"
                  >
                    {{ category }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
            <v-divider></v-divider>
            <v-card
              title="Used Technologies"
              variant="plain"
              class="elevation-0"
            >
              <v-card-text>
                <v-chip-group column>
                  <v-chip
                    v-for="tech in project.tech"
                    :key="tech"
                    variant="outlined"
                  >
                    {{ tech }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
            <template
              v-if="
                (project.platforms && project.platforms.length) ||
                project.status === 'private' ||
                project.status === 'offline'
              "
            >
              <v-divider></v-divider>
              <v-card title="Related Links" variant="text" class="elevation-0">
                <v-card-text>
                  <v-alert
                    v-if="project.status === 'private'"
                    type="info"
                    variant="tonal"
                    density="comfortable"
                    class="mb-2"
                  >
                    Private client project — live link not published.
                  </v-alert>
                  <v-alert
                    v-else-if="project.status === 'offline'"
                    type="warning"
                    variant="tonal"
                    density="comfortable"
                    class="mb-2"
                  >
                    No longer online — description and screenshots document the
                    work.
                  </v-alert>
                  <v-row v-if="project.platforms && project.platforms.length">
                    <v-col cols="auto">
                      <v-btn
                        v-for="(platform, n) in project.platforms"
                        :key="`platform-${n}`"
                        :href="platform.url"
                        target="_blank"
                        color="primary"
                        class="ma-1"
                      >
                        <template #prepend>
                          <Icon :name="platform.icon" />
                        </template>
                        {{ platform.label }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </template>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.nav-gallery swiper-slide {
  opacity: 0.5;
  cursor: pointer;
}

.nav-gallery swiper-slide.swiper-slide-thumb-active,
.nav-gallery swiper-slide.swiper-slide-active {
  opacity: 1;
}

.project-gallery {
  overflow: hidden;
  will-change: clip-path, opacity;
}
</style>
