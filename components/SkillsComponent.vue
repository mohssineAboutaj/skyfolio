<script lang="ts" setup>
import type { Skill } from "~/types/general"
import { skillsTab, type SkillsTabKey } from "~/data/skillsTab.data"

// store
const skillsStore = useSkillsStore()
const { revealSection } = useGsap()

const tabs = skillsTab
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
    variant="text"
    elevation="0"
    title="Skills"
    subtitle="Technologies I use in production — grouped by where they fit in the stack."
    class="section-shell bg-transparent my-16"
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

      <v-row>
        <v-col
          v-for="skill in skills"
          :key="`${activeTab}-${skill.id}`"
          cols="6"
          sm="4"
          md="3"
          lg="2"
        >
          <div
            class="skill-chip d-flex align-center ga-3 pa-3 rounded-lg"
            data-animate-child
            data-magnetic
          >
            <Icon
              :name="skill.icon"
              size="28"
              :color="skill.color"
            />
            <span class="text-body-1">{{ skill.name }}</span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.skill-chip {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  min-height: 56px;
}
</style>
