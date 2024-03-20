<script setup lang="ts">
import type {
  AboutTab,
  AboutBasicInfo,
  AboutEducation,
  AboutCertification,
  AboutInfo,
} from "~/types/general"

// stores
const { getInfo, getEducations, getCertifications } = useAboutInfoStore()

// data
/// static
const tabs: AboutTab[] = [
  { name: "Information", value: "info", icon: "mdi-information" },
  { name: "Education", value: "education", icon: "mdi-school" },
  { name: "Certificates", value: "certificates", icon: "mdi-certificate" },
]
/// reactive
const tab = ref(null)
const info: AboutInfo = reactive({} as AboutInfo)
const educations: AboutEducation[] = reactive([])
const certificates: AboutCertification[] = reactive([])
const aboutBasicInfos: AboutBasicInfo[] = reactive([])

// hooks
onMounted(() => {
  Object.assign(info, getInfo)

  getEducations.forEach((education) => educations.push(education))
  getCertifications.forEach((certificate) => certificates.push(certificate))

  aboutBasicInfos.push(
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
  )
})
</script>

<template>
  <v-card id="about">
    <v-card-title class="hidden-md-and-up text-center">About Me</v-card-title>

    <v-tabs v-model="tab" color="primary" align-tabs="end" grow>
      <v-card-title class="hidden-md-and-down">About Me</v-card-title>

      <v-spacer class="hidden-md-and-down"></v-spacer>

      <v-tab
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        :aria-label="tab.name"
      >
        <v-icon class="hidden-md-and-up">{{ tab.icon }}</v-icon>
        <span class="hidden-md-and-down">{{ tab.name }}</span>
      </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="info">
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="4">
              <v-skeleton-loader
                v-if="aboutBasicInfos.length == 0"
                v-for="n in 4"
                :key="`about-basic-info-sketon-${n}`"
                type="list-item-avatar-two-line"
              ></v-skeleton-loader>

              <v-list v-else lines="two">
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
            </v-col>
            <v-col cols="12" md="8">
              <v-skeleton-loader
                v-if="!info.description"
                v-for="n in 5"
                :key="`about-info-skeleton-${n}`"
                type="text"
              ></v-skeleton-loader>

              <p class="text-sm-h5 text-md-h6">
                {{ info.description }}
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
      <v-window-item value="education">
        <v-container fluid>
          <v-skeleton-loader
            v-if="educations.length == 0"
            v-for="n in 3"
            :key="`about-education-skeleton-${n}`"
            type="list-item-three-line"
          ></v-skeleton-loader>

          <v-timeline v-else align="start">
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
          <v-skeleton-loader
            v-if="educations.length == 0"
            v-for="n in 3"
            :key="`about-certificates-skeleton-${n}`"
            type="list-item-three-line"
          ></v-skeleton-loader>

          <v-timeline v-else align="start" side="end">
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
  </v-card>
</template>
