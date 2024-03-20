<script setup lang="ts">
import type { Project } from "~/types/general"

// store
const { getBySlug } = useProjectsStore()
const { updateTitle } = useSettingsStore()

// route
const route = useRoute()
const router = useRouter()

// data
/// static
const swiperSharedOptions = {
  modules: [SwiperThumbs, SwiperAutoplay],
  centeredSlides: true,
  centeredSlidesBounds: true,
  // spaceBetween: 10,
  grabCursor: true,
  loop: true,
  autoplay: { delay: 1500 },
}
/// reactive
const project: Project = reactive({} as Project)
const slug = ref("")
const title = ref("")
const breadcrumbItems = reactive([
  { title: "Home", disabled: false, to: "/" },
  { title: "Projects", disabled: false, to: "/projects" },
  { title: "", disabled: true },
])
const projectHasImages = ref(false)

// hooks
onBeforeMount(() => {
  slug.value = route.params.slug as string
  const projectFromStore = getBySlug(slug.value)

  if (projectFromStore) {
    Object.assign(project, projectFromStore)
    title.value = project.title
    updateTitle(title.value)
    projectHasImages.value = project.imgs.length > 1

    breadcrumbItems[2].title = title.value
  } else {
    router.push("/404")
  }
})
</script>

<template>
  <v-container>
    <v-breadcrumbs :items="breadcrumbItems" divider="-"></v-breadcrumbs>

    <v-card>
      <v-card-title class="text-center">{{ title }}</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <Swiper
              v-bind="swiperSharedOptions"
              :slidesPerView="1"
              class="main-gallery"
              :thumbs="{ swiper: '.nav-gallery', autoScrollOffset: 3 }"
            >
              <SwiperSlide
                v-for="(image, n) in project.imgs"
                :key="`main-img-${n}`"
              >
                <v-img :src="image" />
              </SwiperSlide>
            </Swiper>

            <Swiper
              v-if="projectHasImages"
              v-bind="swiperSharedOptions"
              :slidesPerView="4"
              class="nav-gallery my-2"
              :spaceBetween="10"
            >
              <SwiperSlide
                v-for="(image, n) in project.imgs"
                :key="`gallery-img-${n}`"
              >
                <v-img :src="image" />
              </SwiperSlide>
            </Swiper>
          </v-col>
          <v-col cols="12" md="6">
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
            <v-divider></v-divider>
            <v-card title="Related Links" variant="text" class="elevation-0">
              <v-card-text>
                <!-- project.url, project.source -->
                <v-btn
                  v-if="project.url"
                  :href="project.url"
                  target="_blank"
                  prepend-icon="mdi-web"
                  color="primary"
                  class="mr-2"
                >
                  Visit Website
                </v-btn>
                <span class="mx-1"></span>
                <v-btn
                  v-if="project.source"
                  :href="project.source"
                  target="_blank"
                  prepend-icon="mdi-code-tags"
                  color="primary"
                >
                  Source Code
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
