<script setup lang="ts">
import type { Service } from "~/types/general"

// store
const { getAll } = useServicesStore()

// data
/// reactive
const services: Service[] = reactive([])

// hooks
onMounted(() => {
  getAll.forEach((service) => services.push(service))
})
</script>

<template>
  <FlatCard
    id="services"
    title="Services"
    subtitle="Some of the services that I can offer."
  >
    <v-row v-if="services.length == 0">
      <v-col
        v-for="n in 3"
        :key="`services-skeleton-${n}`"
        cols="12"
        sm="12"
        :md="n < 2 ? 6 : 4"
        xl="3"
      >
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="(service, i) in services"
        :key="service.id"
        cols="12"
        sm="12"
        :md="i < 2 ? 6 : 4"
        xl="3"
      >
        <v-card min-height="350">
          <v-card-text class="text-center pa-12">
            <v-avatar class="pa-10" color="primary">
              <v-icon size="50">{{ service.icon }}</v-icon>
            </v-avatar>
          </v-card-text>
          <v-card-title class="text-center font-weight-regular">
            {{ service.title }}
          </v-card-title>
          <v-card-text class="caption text-center">
            {{ service.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </FlatCard>
</template>
