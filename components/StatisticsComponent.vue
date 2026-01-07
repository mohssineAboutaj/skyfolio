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
    subtitle: "Total projects available in my portfolio.",
    value: getProjectsCount,
    icon: "mdi-folder-multiple",
  })

  getReposCount().then((res) => {
    statistics.push({
      title: "Repos Count",
      subtitle: "Total public repositories on my GitHub.",
      value: res,
      icon: "mdi-source-branch",
    })
  })

  getCodingActivity().then((res) => {
    statistics.push({
      title: "Total Worked Hours",
      subtitle: "Total hours spent on coding coming from WakaTime.",
      value: res.totalHours,
      icon: "mdi-clock-time-four-outline",
    })
    statistics.push({
      title: "Total Coded Lines",
      subtitle: "Total lines of code written based on working hours.",
      value: res.totalCodedLines,
      icon: "mdi-code-tags",
    })
  })

  // experience in years since 2018
  statistics.push({
    title: "Experience in Years",
    subtitle: "Real experience in years since 2018.",
    value: new Date().getFullYear() - 2018,
    icon: "mdi-calendar-check-outline",
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
        md="4"
      >
        <v-skeleton-loader type="card"></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else justify="space-around">
      <v-col
        v-for="stat in statistics"
        :key="stat.title"
        cols="12"
        sm="6"
        md="4"
      >
        <StatCard
          :title="stat.title"
          :subtitle="stat.subtitle"
          :value="stat.value"
          :icon="stat.icon"
          :elevation="24"
          color="primary"
        />
      </v-col>
    </v-row>
  </FlatCard>
</template>
