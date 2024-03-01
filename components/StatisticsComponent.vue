<script setup lang="ts">
import {
  getReposCount,
  getCodingActivity,
} from "~/composables/StatisticsCompasables"
import type { Statistic } from "~/types/home"

const statistics: Statistic[] = reactive([])

// for now push static projects count
statistics.push({
  title: "Projects",
  value: 10,
  icon: "mdi-folder-multiple",
})

getReposCount().then((res) => {
  statistics.push({
    title: "Repos",
    value: res,
    icon: "mdi-source-repository",
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
    icon: "mdi-code-braces",
  })
})
</script>

<template>
  <v-card variant="text" class="elevation-0" id="statistics">
    <v-card-title>Statistics</v-card-title>
    <v-row>
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
          color="secondary"
        />
      </v-col>
    </v-row>
  </v-card>
</template>
