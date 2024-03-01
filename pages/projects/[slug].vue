<script setup lang="ts">
import type { Project } from "~/types/home"

// store
const { getBySlug } = useProjectsStore()
const { updateTitle } = useSettingsStore()

// route
const route = useRoute()

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
const project: Project = ref({} as Project)
const slug = ref("")
const panel = ref([0])

// fill data
slug.value = route.params.slug as string
project.value = getBySlug(slug.value)
updateTitle(project.value.title)
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title class="mb-4 text-center">{{ project.title }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <Swiper
              v-bind="swiperSharedOptions"
              :slidesPerView="1"
              class="main-gallery"
              :thumbs="{ swiper: '.nav-gallery', autoScrollOffset: 3 }"
            >
              <SwiperSlide v-for="n in 5" :key="n">
                <v-img
                  :src="`https://swiperjs.com/demos/images/nature-${n}.jpg`"
                />
              </SwiperSlide>
            </Swiper>

            <Swiper
              v-bind="swiperSharedOptions"
              :slidesPerView="4"
              class="nav-gallery my-2"
              :spaceBetween="10"
            >
              <SwiperSlide v-for="n in 5" :key="n">
                <v-img
                  :src="`https://swiperjs.com/demos/images/nature-${n}.jpg`"
                />
              </SwiperSlide>
            </Swiper>
          </v-col>
          <v-col cols="12" md="6">
            <v-card title="Description" variant="plain" class="elevation-0">
              <v-card-text>{{ project.description }}</v-card-text>
            </v-card>
            <v-divider></v-divider>
            <v-card
              title="Used Technologies"
              variant="plain"
              class="elevation-0"
            >
              <v-card-text>
                <v-chip-group column>
                  <v-chip v-for="tech in project.tech" :key="tech">
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
                  rounded="xl"
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
                  rounded="xl"
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
