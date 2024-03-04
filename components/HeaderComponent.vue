<script setup lang="ts">
import VueWriter from "vue-writer"
import { useDisplay, useGoTo } from "vuetify"

// store
const infoStore = useAboutInfoStore().getInfo

// vuetify
const { mdAndDown } = useDisplay()
const goTo = useGoTo()

// data
/// static
const user = {
  ...infoStore,
  avatar: "/uploads/" + infoStore.avatar,
}

// computed
const avatarSize = computed(() => (mdAndDown.value ? 150 : 250))

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
    style="min-height: 90vh"
  >
    <v-col cols="12" md="6" class="font-weight-light">
      <h1 class="v-card-title text-h3 mb-8 text-capitalize">
        Hi, I'm <b>{{ user.fullName }}</b>
      </h1>
      <h3 class="v-card-title text-h5 mb-8 text-capitalize">
        Am a
        <span v-if="user.jobs.length == 1" class="font-weight-bold">
          {{ user.jobs[0] }}
        </span>
        <vue-writer
          v-else
          :array="user.jobs"
          class="font-weight-bold d-sm-block d-lg-inline-block"
          :typeSpeed="30"
          :eraseSpeed="30"
        />
      </h3>
    </v-col>
    <v-col cols="12" md="6" class="text-center">
      <v-avatar :size="avatarSize" class="elevation-12 mx-auto mb-8">
        <v-img :src="user.avatar" :alt="`${user.fullName} avatar`"></v-img>
      </v-avatar>
    </v-col>
  </v-container>
  <v-container
    class="d-flex justify-center align-center flex-column-reverse flex-md-row"
    style="min-height: 10vh"
  >
    <v-btn
      class="bounced-btn"
      size="x-large"
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
