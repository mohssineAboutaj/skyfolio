<script lang="ts" setup>
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
          md="6"
          class="my-8"
        >
          <v-row>
            <v-col cols="2" class="d-flex justify-center align-center">
              <v-tooltip location="top" :text="skill.name.toString()">
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
              <v-tooltip location="top" :text="skill.score.toString()">
                <template v-slot:activator="{ props }">
                  <v-progress-linear
                    v-model="skill.score"
                    color="blue-grey"
                    height="25"
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
