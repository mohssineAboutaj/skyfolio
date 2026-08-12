<script lang="ts" setup>
import type { Skill } from "~/types/general"
import { skillsTab, type SkillsTabKey } from "~/data/skillsTab.data"

// store
const skillsStore = useSkillsStore()
const { revealSection } = useGsap()

// data
/// static
const skillsCountToDisplay = 12
const tabs = skillsTab
/// reactive
const activeTab = ref<SkillsTabKey>("top")
const skills = computed<Skill[]>(() => skillsStore.getByTab(activeTab.value))
let motionWired = false

watch(
  skills,
  async (list) => {
    if (!list.length || motionWired) return
    motionWired = true
    await nextTick()
    revealSection("#skills", {
      childSelector: "[data-animate-child]",
    })
  },
  { immediate: true },
)
</script>

<template>
  <v-card
    id="skills"
    title="Skills"
    subtitle="Some of the skills that I have learned and used."
    class="bg-transparent"
  >
    <v-card-text>
      <v-tabs
        v-model="activeTab"
        bg-color="background"
        class="rounded-xl mb-6"
        slider-color="secondary"
        selected-class="text-secondary"
        show-arrows
      >
        <v-tab v-for="(label, key) in tabs" :key="key" :value="key">
          {{ label }}
        </v-tab>
      </v-tabs>

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
          :key="`${activeTab}-${skill.id}`"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card elevation="4" class="my-0-force" data-animate-child>
            <v-card-content>
              <v-row>
                <v-col cols="auto" class="d-flex">
                  <Icon
                    :name="skill.icon"
                    size="50"
                    :color="skill.color"
                    class="my-auto"
                  />
                </v-col>
                <v-col>
                  <v-card-title class="ml-0 text-left pl-1">
                    {{ skill.name }}
                  </v-card-title>
                  <v-rating
                    :model-value="scoreToStars(skill.score)"
                    :length="5"
                    density="compact"
                    size="small"
                    color="secondary"
                    active-color="secondary"
                    readonly
                  />
                </v-col>
              </v-row>
            </v-card-content>
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
:deep(.v-card-title) {
  margin-bottom: 0 !important;
}
</style>
