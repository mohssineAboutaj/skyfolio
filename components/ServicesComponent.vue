<script setup lang="ts">
import type { Service } from "~/types/home"

// store
const servicesStore = useServicesStore()

// data
/// static
const services: Service[] = servicesStore.getAll
</script>

<template>
  <v-card variant="text" class="elevation-0" id="services">
    <v-card-title class="mb-4">Services</v-card-title>
    <v-row>
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
          <v-card-title
            class="headline mb-4 text-center text-capitalize font-weight-light"
          >
            {{ service.title }}
          </v-card-title>
          <v-card-text class="caption text-center">
            {{ service.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
