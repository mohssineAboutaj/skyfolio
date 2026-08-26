<script setup lang="ts">
// store
const { getAll } = useServicesStore()
const { revealSection } = useGsap()

const services = computed(() => getAll)
let motionWired = false

watch(
  () => services.value.length,
  async (len) => {
    if (!len || motionWired) return
    motionWired = true
    await nextTick()
    revealSection("#services", {
      childSelector: "[data-animate-child]",
      stagger: 0.1,
    })
  },
  { immediate: true },
)
</script>

<template>
  <FlatCard
    id="services"
    title="Services"
    subtitle="How I can help — from interface and APIs to deployment and ongoing care."
  >
    <v-row>
      <v-col
        v-for="service in services"
        :key="service.id"
        cols="12"
        sm="12"
        md="4"
        xl="3"
      >
        <v-card min-height="350" data-animate-child data-magnetic>
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
