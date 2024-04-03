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
        <v-col v-for="skill in skills" :key="skill.id" cols="auto">
          <v-tooltip location="top" :text="skill.name">
            <template v-slot:activator="{ props }">
              <Icon
                v-bind="props"
                :name="skill.icon"
                size="100"
                class="ma-2"
                :color="skill.color"
              />
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
