<script setup lang="ts">
import { useAboutInfoStore } from "@/stores/about"
import type { Link, Social } from "@/types/general"

const info = useAboutInfoStore().getInfo

const user = {
  ...info,
  avatar: "/uploads/" + info.avatar,
}
</script>

<template>
  <v-container class="fill-height" style="max-height: 100vh">
    <v-row class="justify-center align-center flex-column-reverse flex-md-row">
      <v-col cols="12" md="6" class="font-weight-thin">
        <h1 class="text-h3 mb-8 text-capitalize">
          Hi, I'm <b>{{ user.fullName }}</b>
        </h1>
        <h3 class="text-h5 mb-8 text-capitalize">
          Am a <b>{{ user.job }}</b>
        </h3>
      </v-col>
      <v-col cols="12" md="6" class="text-center">
        <v-avatar :size="300" class="elevation-12 mx-auto mb-8">
          <v-img :src="user.avatar" :alt="`${user.fullName} avatar`"></v-img>
        </v-avatar>
      </v-col>
    </v-row>
  </v-container>
</template>
