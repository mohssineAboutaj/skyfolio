<script setup lang="ts">
const infoStore = useAboutInfoStore().getInfo

const user = {
  ...infoStore,
  avatar: "/uploads/" + infoStore.avatar,
}
</script>

<template>
  <v-container
    class="d-flex justify-center align-center flex-column-reverse flex-md-row"
    style="min-height: 100vh"
  >
    <v-col cols="12" md="6" class="font-weight-thin">
      <h1 class="text-h3 mb-8 text-capitalize">
        Hi, I'm <b>{{ user.fullName }}</b>
      </h1>
      <h3 class="text-h5 mb-8 text-capitalize">
        Am a <b>{{ user.job }}</b>
      </h3>
    </v-col>
    <v-col cols="12" md="6" class="text-center">
      <v-avatar :size="250" class="elevation-12 mx-auto mb-8">
        <v-img :src="user.avatar" :alt="`${user.fullName} avatar`"></v-img>
      </v-avatar>
    </v-col>
  </v-container>
</template>
