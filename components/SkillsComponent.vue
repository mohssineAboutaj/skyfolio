<script lang="ts" setup>
import { useSkillsStore } from "@/stores/skills"
import type { Skill } from "~/types/home"

// store
const { getTopSkills } = useSkillsStore()

// data
/// reactive
const skills: Skill[] = reactive([])

// fill data
getTopSkills(12).forEach((skill) => {
  skills.push(skill as Skill)
})
</script>

<template>
  <v-card id="skills">
    <v-card-title>Skills</v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-for="skill in skills"
          :key="skill.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="text-center my-8"
        >
          <v-progress-circular
            :size="100"
            :width="12"
            :value="skill.score"
            :model-value="skill.score"
            :color="skill.color || 'primary'"
          >
            <template v-slot:default>
              <v-tooltip location="top" :text="skill.name">
                <template v-slot:activator="{ props }">
                  <v-icon v-bind="props" :size="40" class="text-white">
                    {{ skill.icon }}
                  </v-icon>
                </template>
              </v-tooltip>
            </template>
          </v-progress-circular>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
