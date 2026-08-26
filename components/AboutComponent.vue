<script setup lang="ts">
import type { AboutTab, AboutBasicInfo } from "~/types/general"
import FlatCard from "./FlatCard.vue"

// stores
const { getInfo, getEducations, getCertifications, getExperiences } =
  useAboutInfoStore()
const { revealSection } = useGsap()

const tab = ref(null)
let motionWired = false

const info = computed(() => getInfo)
const educations = computed(() => getEducations)
const certificates = computed(() => getCertifications)
const experiences = computed(() => getExperiences)

const aboutBasicInfos = computed<AboutBasicInfo[]>(() => [
  {
    title: "Full Name",
    subtitle: getInfo.fullName,
    icon: "mdi-account",
  },
  {
    title: "Email",
    subtitle: getInfo.email,
    icon: "mdi-email",
  },
  {
    title: "Jobs",
    subtitle: getInfo.jobs.join(", "),
    icon: "mdi-briefcase",
  },
  {
    title: "Address",
    subtitle: getInfo.address,
    icon: "mdi-map-marker",
  },
])

const tabs = computed<AboutTab[]>(() => {
  const list: AboutTab[] = [
    { name: "Information", value: "info", icon: "mdi-information" },
  ]
  if (experiences.value.length > 0) {
    list.push({
      name: "Experience",
      value: "experience",
      icon: "mdi-briefcase",
    })
  }
  list.push(
    { name: "Education", value: "education", icon: "mdi-school" },
    { name: "Certificates", value: "certificates", icon: "mdi-certificate" },
  )
  return list
})

watch(
  () => aboutBasicInfos.value.length,
  async (len) => {
    if (!len || motionWired) return
    motionWired = true
    await nextTick()
    revealSection("#about", {
      childSelector: "[data-animate-child]",
    })
  },
  { immediate: true },
)
</script>

<template>
  <v-card id="about" variant="text" class="section-shell my-16" elevation="0">
    <v-row>
      <v-col cols="12" md="4" data-animate-child>
        <FlatCard title="About Me">
          <v-list lines="two">
            <v-list-item
              v-for="basic in aboutBasicInfos"
              :key="basic.title"
              :title="basic.title"
              :subtitle="basic.subtitle"
              :aria-label="basic.title"
            >
              <template v-slot:prepend>
                <v-avatar color="primary">
                  <v-icon color="white">{{ basic.icon }}</v-icon>
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </FlatCard>
      </v-col>
      <v-col cols="12" md="8" data-animate-child>
        <v-tabs
          v-model="tab"
          color="primary"
          align-tabs="end"
          grow
          class="mb-4"
        >
          <v-tab
            v-for="tabItem in tabs"
            :key="tabItem.value"
            :value="tabItem.value"
            :aria-label="tabItem.name"
          >
            <v-icon class="hidden-md-and-up">{{ tabItem.icon }}</v-icon>
            <span class="hidden-md-and-down">{{ tabItem.name }}</span>
          </v-tab>
        </v-tabs>

        <v-window v-model="tab" class="px-2">
          <v-window-item value="info">
            <p class="text-sm-h5 text-md-h6" v-html="info.description"></p>
          </v-window-item>

          <v-window-item v-if="experiences.length > 0" value="experience">
            <v-container fluid>
              <v-timeline align="start">
                <v-timeline-item
                  v-for="job in experiences"
                  :key="job.id"
                  size="small"
                  dot-color="primary"
                >
                  <template v-slot:opposite>
                    <div class="pt-1 headline font-weight-bold">
                      {{ job.period }}
                    </div>
                  </template>
                  <div>
                    <h2
                      class="mt-n1 headline font-weight-regular mb-2 text-primary"
                    >
                      {{ job.company }}
                    </h2>
                    <h4 class="mb-2">{{ job.title }}</h4>
                    <p
                      v-if="job.location"
                      class="text-medium-emphasis mb-3 text-body-2"
                    >
                      {{ job.location }}
                    </p>
                    <ul class="mb-3 pl-4">
                      <li
                        v-for="(bullet, idx) in job.bullets"
                        :key="`${job.id}-b-${idx}`"
                        class="mb-1"
                      >
                        {{ bullet }}
                      </li>
                    </ul>
                    <div v-if="job.stack?.length" class="d-flex flex-wrap ga-1">
                      <v-chip
                        v-for="tech in job.stack"
                        :key="`${job.id}-${tech}`"
                        size="small"
                        variant="tonal"
                        color="primary"
                      >
                        {{ tech }}
                      </v-chip>
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-container>
          </v-window-item>

          <v-window-item value="education">
            <v-container fluid>
              <v-timeline align="start">
                <v-timeline-item
                  v-for="education in educations"
                  :key="education.id"
                  size="small"
                  dot-color="primary"
                >
                  <template v-slot:opposite>
                    <div class="pt-1 headline font-weight-bold">
                      {{ education.year }}
                    </div>
                  </template>
                  <div>
                    <h2
                      class="mt-n1 headline font-weight-regular mb-4 text-primary"
                    >
                      {{ education.enterprise }}
                    </h2>
                    <h4>{{ education.title }}</h4>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-container>
          </v-window-item>
          <v-window-item value="certificates">
            <v-container fluid>
              <v-timeline align="start" side="end">
                <v-timeline-item
                  v-for="certificate in certificates"
                  :key="certificate.id"
                  size="small"
                  dot-color="primary"
                >
                  <template v-slot:opposite>
                    <div class="pt-1 headline font-weight-bold">
                      {{ certificate.year }}
                    </div>
                  </template>
                  <div>
                    <h2
                      class="mt-n1 headline font-weight-regular mb-4 text-primary text-capitalize"
                    >
                      {{ certificate.enterprise }}
                    </h2>
                    <h4 class="headline mb-4">
                      {{ certificate.title }}
                    </h4>
                    <v-btn
                      color="info"
                      variant="tonal"
                      block
                      :href="certificate.url"
                      target="_blank"
                    >
                      View Certificate
                    </v-btn>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-container>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-card>
</template>
