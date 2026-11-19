<script setup lang="ts">
import {
  ESTIMATED_LINES_PER_HOUR,
  getCodingActivity,
  getReposCount,
} from "~/composables/StatisticsCompasables"
import type { Statistic } from "~/types/general"

const CAREER_START_YEAR = 2018

// store
const { getProjectsCount } = useProjectsStore()
const { revealSection } = useGsap()

// Fetched during prerender and stored in the page payload, so visitors never
// hit the GitHub/WakaTime APIs. Each source fails independently to null.
const { data: remote } = await useAsyncData("portfolio-statistics", async () => {
  const { githubToken } = useRuntimeConfig()
  const [repos, activity] = await Promise.all([
    getReposCount(githubToken || undefined),
    getCodingActivity(),
  ])
  return { repos, activity }
})

const statistics = computed<Statistic[]>(() => {
  const stats: Statistic[] = [
    {
      title: "Projects Count",
      subtitle: "Total projects available in my portfolio.",
      value: getProjectsCount,
      icon: "mdi-folder-multiple",
    },
  ]

  const repos = remote.value?.repos
  if (repos != null) {
    stats.push({
      title: "Repos Count",
      subtitle: "Total public repositories on my GitHub.",
      value: repos,
      icon: "mdi-source-branch",
    })
  }

  const activity = remote.value?.activity
  if (activity) {
    stats.push(
      {
        title: "Total Worked Hours",
        subtitle: "Total hours spent on coding, tracked by WakaTime.",
        value: activity.totalHours,
        icon: "mdi-clock-time-four-outline",
      },
      {
        title: "Estimated Lines of Code",
        subtitle: `Estimate: WakaTime coding hours x ${ESTIMATED_LINES_PER_HOUR} lines per hour.`,
        value: activity.estimatedLines,
        icon: "mdi-code-tags",
      },
    )
  }

  stats.push({
    title: "Experience in Years",
    subtitle: `Professional experience since ${CAREER_START_YEAR}.`,
    value: new Date().getFullYear() - CAREER_START_YEAR,
    icon: "mdi-calendar-check-outline",
  })

  return stats
})

onMounted(async () => {
  await nextTick()
  revealSection("#statistics", {
    childSelector: "[data-animate-child]",
  })
})
</script>

<template>
  <FlatCard
    id="statistics"
    title="Statistics"
    subtitle="A snapshot of projects, open-source activity, and time invested in shipping software."
  >
    <v-row justify="space-around">
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
