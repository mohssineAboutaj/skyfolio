<script setup lang="ts">
// data
const iconMargin = ref(1)

// props
const { color, icon, title, subtitle, value, elevation } = defineProps({
  color: { type: String, required: false, default: "primary" },
  icon: { type: String, required: true },
  title: { type: String, default: undefined },
  subtitle: { type: String, default: undefined },
  value: { type: Number, default: undefined },
  elevation: { type: Number, default: 0 },
})

// methods
/// put comma to seprate big numbers
function numberWithCommas(x: number = 0) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
</script>

<template>
  <v-card :class="[`elevation-${elevation}`, 'px-6', 'py-4', 'my-4']">
    <div class="d-flex justify-space-between">
      <span class="font-weight-light text-capitalize mr-2 text-subtitle-2">
        {{ title }}
      </span>
      <v-tooltip location="top" :text="subtitle">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props" color="secondary" size="15">
            mdi-information
          </v-icon>
        </template>
      </v-tooltip>
    </div>

    <v-row class="justify-space-between align-center">
      <v-col cols="auto">
        <v-icon size="40" class="my-4" color="secondary">{{ icon }}</v-icon>
      </v-col>
      <v-col cols="auto">
        <div class="text-h4 text-capitalize text-right">
          {{ numberWithCommas(value) }}
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
