<script setup lang="ts">
// data
const iconMargin = ref(1)

// props
const { color, icon, title, value, elevation } = defineProps({
  color: { type: String, required: false, default: "primary" },
  icon: { type: String, required: true },
  title: { type: String, default: undefined },
  value: { type: Number, default: undefined },
  elevation: { type: Number, default: 0 },
})
</script>

<template>
  <v-card
    :class="[
      `elevation-${elevation}`,
      'px-6',
      'py-4',
      'my-4',
      'overflow-visible',
    ]"
  >
    <v-row>
      <v-col
        cols="4"
        :class="[
          `bg-${color}`,
          'text-center',
          `elevation-${elevation}`,
          'rounded-lg',
          'mt-n6',
          'mb-6',
        ]"
      >
        <v-icon size="40" class="my-4" dark>{{ icon }}</v-icon>
      </v-col>
      <v-col cols="8" class="text-right">
        <div class="text-subtitle-2 text-capitalize font-weight-light">
          {{ title }}
        </div>
        <div class="text-h4 text-capitalize text-right">{{ value }}</div>
      </v-col>
    </v-row>
  </v-card>
</template>
