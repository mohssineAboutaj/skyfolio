<script setup lang="ts">
import {
  getReposCount,
  getCodingActivity,
} from "~/composables/StatisticsCompasables"
import type { Statistic } from "~/types/general"

// store
const { getProjectsCount } = useProjectsStore()

const statistics: Statistic[] = reactive([])

onMounted(() => {
  // for now push static projects count
  statistics.push({
    title: "Projects Count",
    value: getProjectsCount,
    icon: "mdi-folder-multiple",
  })

  getReposCount().then((res) => {
    statistics.push({
      title: "Repos Count",
      value: res,
      icon: "mdi-source-branch",
    })
  })

  getCodingActivity().then((res) => {
    statistics.push({
      title: "Total Worked Hours",
      value: res.totalHours,
      icon: "mdi-clock-time-four-outline",
    })
    statistics.push({
      title: "Total Coded Lines",
      value: res.totalCodedLines,
      icon: "mdi-code-tags",
    })
  })
})
</script>

<template>
  <FlatCard
    id="statistics"
    title="Statistics"
    subtitle="Some of the statistics that I have collected."
  >
    <v-row v-if="statistics.length == 0">
      <v-col
        v-for="n in 3"
        :key="`about-statistics-skeleton-${n}`"
        cols="12"
        sm="6"
        md="3"
      >
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="stat in statistics"
        :key="stat.title"
        cols="12"
        sm="6"
        md="3"
      >
        <StatCard
          :title="stat.title"
          :value="stat.value"
          :icon="stat.icon"
          :elevation="24"
          color="primary"
        />
      </v-col>
    </v-row>
  </FlatCard>
</template>
