<script setup lang="ts">
import type { Project } from "~/types/home"

// store
const { getBySlug } = useProjectsStore()

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

// fill data
slug.value = route.params.slug as string
project.value = getBySlug(slug.value)
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
            dignissimos placeat repellendus vero facilis consequuntur provident
            doloremque iusto. Ea aliquid eaque quae nisi harum asperiores
            corporis suscipit fugiat repudiandae laborum?
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
