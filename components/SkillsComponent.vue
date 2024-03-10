<script lang="ts" setup>
import type { Skill } from "~/types/home"

// store
const { getTopSkills } = useSkillsStore()

// data
/// static
const skillsCountToDisplay = 12
/// reactive
const skills: Skill[] = reactive([])

// hooks
onMounted(() => {
  getTopSkills(skillsCountToDisplay).forEach((skill) => {
    skills.push(skill as Skill)
  })
})
</script>

<template>
  <v-card id="skills" title="Skills">
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
          md="6"
          class="my-8"
        >
          <v-row>
            <v-col cols="2" class="d-flex justify-center align-center">
              <v-tooltip
                location="top"
                :text="skill.name.toString()"
                :aria-label="skill.name"
              >
                <template v-slot:activator="{ props }">
                  <Icon
                    :name="skill.icon"
                    size="60"
                    :color="skill.color"
                    v-bind="props"
                  />
                </template>
              </v-tooltip>
            </v-col>
            <v-col cols="10" class="d-flex justify-center align-center">
              <v-tooltip
                location="top"
                :text="skill.score.toString()"
                :aria-label="skill.score"
              >
                <template v-slot:activator="{ props }">
                  <v-progress-linear
                    v-model="skill.score"
                    color="blue-grey"
                    height="25"
                    :aria-label="skill.name"
                    v-bind="props"
                  ></v-progress-linear>
                </template>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
