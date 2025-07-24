<script lang="ts" setup>
import type { Skill } from "~/types/general"

// store
const { getAll } = useSkillsStore()

// data
/// static
const skillsCountToDisplay = 12
/// reactive
const skills: Skill[] = reactive([])

// hooks
onMounted(() => {
  getAll.forEach((skill) => {
    skills.push(skill as Skill)
  })
})
</script>

<template>
  <v-card
    id="skills"
    title="Skills"
    subtitle="Some of the skills that I have learned and used."
    class="bg-transparent"
  >
    <v-card-text>
      <v-row v-if="skills.length == 0">
        <v-col
          v-for="n in skillsCountToDisplay"
          :key="`skills-skeleton-${n}`"
          cols="12"
          md="6"
          class="my-8"
        >
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col
          v-for="skill in skills"
          :key="skill.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card elevation="4" class="my-0-force">
            <v-card-text class="pa-4">
              <!-- Skill Icon -->
              <div class="d-flex align-center mb-2">
                <Icon
                  :name="skill.icon"
                  size="34"
                  :color="skill.color"
                  class="mr-4"
                />
                <v-card-title class="pa-0 text-body-1 my-0-force">
                  {{ skill.name }}
                </v-card-title>
              </div>

              <!-- Proficiency Section -->
              <div class="d-flex justify-space-between">
                <div class="text-caption text-medium-emphasis mb-2">
                  Proficiency
                </div>
                <div class="text-body-2 font-weight-medium">
                  {{ skill.score }}%
                </div>
              </div>

              <!-- Progress Bar -->
              <v-progress-linear
                :model-value="skill.score"
                color="primary"
                height="8"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.my-0-force {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
</style>
