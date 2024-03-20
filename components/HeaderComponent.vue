<script setup lang="ts">
import { useGoTo } from "vuetify"
import type { AboutInfo } from "~/types/general"
import TypewriterComponent from "~/components/TypewriterComponent.vue"

// store
const infoStore = useAboutInfoStore().getInfo

const goTo = useGoTo()

// data
/// reactive
const user: AboutInfo = reactive({} as AboutInfo)

// fill data
onMounted(() => {
  Object.assign(user, infoStore)
})

// methods
function goToAbout() {
  const toolbarHeight = document.querySelector(".v-toolbar")?.clientHeight || 0

  goTo("#about", { offset: -toolbarHeight })
}
</script>

<template>
  <v-container
    id="home"
    class="d-flex justify-center align-center flex-column-reverse flex-md-row"
    style="min-height: 80vh"
  >
    <v-col cols="12" md="6" class="font-weight-light">
      <template v-if="!user.fullName">
        <v-skeleton-loader type="heading" />
        <v-skeleton-loader type="heading" />
      </template>

      <template v-else>
        <h1 class="v-card-title text-h4 mb-8 text-capitalize">
          <span class="title">Hi, I'm </span>
          <b class="d-sm-block d-lg-inline d-block text-wrap text-secondary">
            {{ user.fullName }}
          </b>
        </h1>
        <h2 class="v-card-title text-h5 mb-8 text-capitalize">
          <span class="title">Am a </span>
          <span v-if="user.jobs.length == 1" class="font-weight-bold">
            {{ user.jobs[0] }}
          </span>
          <TypewriterComponent
            v-else
            :strings="user.jobs"
            class="font-weight-bold d-sm-block d-lg-inline-block text-wrap text-secondary"
            :typeSpeed="50"
            :eraseSpeed="25"
          />
        </h2>
      </template>
    </v-col>
    <v-col cols="12" md="6" class="text-center">
      <v-avatar
        :size="$vuetify.display.mdAndDown ? 150 : 250"
        class="elevation-12 mx-auto mb-8"
      >
        <v-img
          :src="user.avatar"
          :alt="`${user.fullName} avatar`"
          color="primary"
        ></v-img>
      </v-avatar>
    </v-col>
  </v-container>
  <v-container
    class="d-flex justify-center align-center flex-column-reverse flex-md-row"
    style="height: 10vh"
  >
    <v-btn
      class="bounced-btn"
      size="x-large"
      aria-label="go to about"
      color="transparent"
      icon="mdi-chevron-double-down"
      @click="goToAbout"
    ></v-btn>
  </v-container>
</template>

<style scoped>
.bounced-btn {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}
</style>
