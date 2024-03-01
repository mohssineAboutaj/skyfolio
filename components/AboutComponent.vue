<script setup lang="ts">
import type {
  AboutTab,
  AboutBasicInfo,
  AboutEducation,
  AboutCertification,
} from "~/types/home"

// stores
const aboutStore = useAboutInfoStore()
const info = aboutStore.getInfo
const educations: AboutEducation[] = aboutStore.getEducations
const certificates: AboutCertification[] = aboutStore.getCertifications

// data
/// static
const tabs: AboutTab[] = [
  { name: "Information", value: "info", icon: "mdi-information" },
  { name: "Education", value: "education", icon: "mdi-school" },
  { name: "Certificates", value: "certificates", icon: "mdi-certificate" },
]
const aboutBasicInfos: AboutBasicInfo[] = [
  { title: "Full Name", subtitle: info.fullName, icon: "mdi-account" },
  { title: "Email", subtitle: info.email, icon: "mdi-email" },
  { title: "Job", subtitle: info.job, icon: "mdi-briefcase" },
  { title: "Address", subtitle: info.address, icon: "mdi-map-marker" },
]
/// dynamic
const tab = ref(null)
</script>

<template>
  <v-card id="about">
    <v-card-title class="hidden-md-and-up text-center">About Me</v-card-title>

    <v-tabs v-model="tab" color="primary" align-tabs="end" grow>
      <v-card-title class="hidden-md-and-down">About Me</v-card-title>

      <v-spacer class="hidden-md-and-down"></v-spacer>

      <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
        <v-icon class="hidden-md-and-up">{{ tab.icon }}</v-icon>
        <span class="hidden-md-and-down">{{ tab.name }}</span>
      </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="info">
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="4">
              <v-list lines="two">
                <v-list-item
                  v-for="basic in aboutBasicInfos"
                  :key="basic.title"
                  :title="basic.title"
                  :subtitle="basic.subtitle"
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
              <p class="text-md-h5">{{ info.description }}</p>
            </v-col>
          </v-row>
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
                <h2 class="mt-n1 headline font-weight-light mb-4 text-primary">
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
                  class="mt-n1 headline font-weight-light mb-4 text-primary text-capitalize"
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
