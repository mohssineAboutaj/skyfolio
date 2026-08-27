<script setup lang="ts">
import { portfolioSiteDescription } from "~/utils/portfolioSeo"

useSeoMeta({
  title: "Freelance Full-Stack Developer",
  description: portfolioSiteDescription,
})
</script>

<template>
  <div>
    <HeaderComponent />

    <v-container>
      <AboutComponent />

      <StatisticsComponent />

      <ServicesComponent />

      <SkillsComponent />

      <ProjectsComponent />

      <ContactsComponent />
    </v-container>
  </div>
</template>
