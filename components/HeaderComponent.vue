<script setup lang="ts">
import VueWriter from "vue-writer"

const infoStore = useAboutInfoStore().getInfo

const user = {
  ...infoStore,
  avatar: "/uploads/" + infoStore.avatar,
}
</script>

<template>
  <v-container
    class="d-flex justify-center align-center flex-column-reverse flex-md-row"
    style="min-height: 80vh"
  >
    <v-col cols="12" md="6" class="font-weight-thin">
      <h1 class="text-h3 mb-8 text-capitalize">
        Hi, I'm <b>{{ user.fullName }}</b>
      </h1>
      <h3 class="text-h5 mb-8 text-capitalize">
        <span>Am a </span>
        <span v-if="user.jobs.length == 1" class="font-weight-bold">
          {{ user.jobs[0] }}
        </span>
        <vue-writer
          v-else
          :array="user.jobs"
          class="font-weight-bold"
          :typeSpeed="30"
          :eraseSpeed="30"
        />
      </h3>
    </v-col>
    <v-col cols="12" md="6" class="text-center">
      <v-avatar :size="250" class="elevation-12 mx-auto mb-8">
        <v-img :src="user.avatar" :alt="`${user.fullName} avatar`"></v-img>
      </v-avatar>
    </v-col>
  </v-container>
  <v-container
    class="d-flex justify-center align-center flex-column-reverse flex-md-row"
    style="min-height: 5vh"
  >
    <v-btn class="bounced-btn" density="compact" color="transparent">
      <Icon name="mdi:chevron-double-down" size="40" />
    </v-btn>
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
