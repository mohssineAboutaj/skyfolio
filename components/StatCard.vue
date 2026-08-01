<script setup lang="ts">
const props = defineProps({
  color: { type: String, required: false, default: "primary" },
  icon: { type: String, required: true },
  title: { type: String, default: undefined },
  subtitle: { type: String, default: undefined },
  value: { type: Number, default: undefined },
  elevation: { type: Number, default: 0 },
})

const { countUp } = useGsap()
const cardRef = ref<{ $el?: Element } | null>(null)
const displayValue = ref(0)
let animatedFor: number | null = null

function numberWithCommas(x: number = 0) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function startCount(value: number) {
  if (value === animatedFor || !cardRef.value) return
  animatedFor = value
  countUp(cardRef.value, value, (n) => {
    displayValue.value = n
  })
}

onMounted(async () => {
  await nextTick()
  if (props.value != null) startCount(props.value)
})

watch(
  () => props.value,
  async (value) => {
    if (value == null) return
    await nextTick()
    startCount(value)
  },
)
</script>

<template>
  <v-card
    ref="cardRef"
    :class="[`elevation-${elevation}`, 'px-6', 'py-4']"
    data-animate-child
  >
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
          {{ numberWithCommas(displayValue) }}
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
