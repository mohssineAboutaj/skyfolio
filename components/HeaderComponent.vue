<script setup lang="ts">
import { useGoTo, useDisplay } from "vuetify"
import TypewriterComponent from "~/components/TypewriterComponent.vue"

// store
const { getInfo } = useAboutInfoStore()
const { getFeatured } = useContactStore()

const goTo = useGoTo()
const { playHeroEntrance, bindSpotlight } = useGsap()
const { optimize } = useOptimizedImage()
const { mdAndDown } = useDisplay()

const user = computed(() => getInfo)
const contacts = computed(() => getFeatured)

const heroRef = ref<HTMLElement | null>(null)
const nameRef = ref<HTMLElement | null>(null)
const jobRef = ref<HTMLElement | null>(null)
const socialsRef = ref<HTMLElement | null>(null)
const avatarRef = ref<HTMLElement | null>(null)
const chevronRef = ref<HTMLElement | null>(null)
let heroPlayed = false
let cleanupSpotlight = () => {}

const avatarSize = computed(() => (mdAndDown.value ? 150 : 250))
const optimizedAvatar = computed(() =>
  optimize(user.value.avatar, {
    width: avatarSize.value,
    height: avatarSize.value,
  }),
)

useHead({
  link: computed(() => {
    const href = optimizedAvatar.value
    if (!href) return []
    return [
      {
        rel: "preload",
        as: "image",
        href,
        fetchpriority: "high",
      },
    ]
  }),
})

onBeforeUnmount(() => {
  cleanupSpotlight()
})

watch(
  () => user.value.fullName,
  async (fullName) => {
    if (!fullName || heroPlayed) return
    await nextTick()
    heroPlayed = true
    playHeroEntrance({
      name: nameRef.value,
      job: jobRef.value,
      socials: socialsRef.value,
      avatar: avatarRef.value,
      chevron: chevronRef.value,
    })
    cleanupSpotlight = bindSpotlight(heroRef.value)
  },
  { immediate: true },
)

function goToAbout() {
  const toolbarHeight = document.querySelector(".v-toolbar")?.clientHeight || 0
  goTo("#about", { offset: -toolbarHeight })
}

function goToContacts() {
  const toolbarHeight = document.querySelector(".v-toolbar")?.clientHeight || 0
  goTo("#contacts", { offset: -toolbarHeight })
}
</script>

<template>
  <div ref="heroRef" class="hero-stage">
    <v-container
      id="home"
      fluid
      class="hero-stage__content"
      style="min-height: 80vh"
    >
      <v-row
        align="center"
        justify="center"
        class="flex-column-reverse flex-md-row ma-0"
        style="min-height: 80vh"
      >
        <v-col cols="12" md="6" class="font-weight-light">
          <div
            ref="nameRef"
            class="v-card-title text-h4 mb-8 text-capitalize"
          >
            <div class="title">Hi, I'm</div>
            <h1
              class="d-sm-block d-lg-inline d-block text-wrap text-secondary"
            >
              {{ user.fullName }}
            </h1>
          </div>
          <div ref="jobRef" class="v-card-title text-h5 mb-8 text-capitalize">
            <div class="title">I'm a</div>
            <h2 v-if="user.jobs.length == 1" class="font-weight-bold">
              {{ user.jobs[0] }}
            </h2>
            <TypewriterComponent
              v-else
              :strings="user.jobs"
              class="font-weight-bold d-sm-block d-lg-inline-block text-wrap text-secondary"
              :typeSpeed="50"
              :eraseSpeed="25"
            />
          </div>

          <v-row ref="socialsRef" class="mt-4">
            <v-col
              v-for="contact in contacts"
              :key="contact.id"
              cols="auto"
              data-hero-social
              data-magnetic
            >
              <v-btn
                :color="contact.color"
                :href="contact.link"
                target="_blank"
                :title="contact.label"
                :aria-label="contact.label"
                icon
              >
                <Icon :name="contact.icon" size="20" />
              </v-btn>
            </v-col>
            <v-col cols="auto" data-hero-social data-magnetic>
              <v-btn
                color="secondary"
                variant="flat"
                aria-label="Hire me"
                @click="goToContacts"
              >
                Hire me
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" class="text-center">
          <div ref="avatarRef" class="d-inline-block" data-magnetic>
            <v-avatar
              :size="$vuetify.display.mdAndDown ? 150 : 250"
              class="elevation-12 mx-auto mb-8"
            >
              <v-img
                :src="optimizedAvatar"
                :alt="`${user.fullName} avatar`"
                color="primary"
              ></v-img>
            </v-avatar>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      fluid
      class="d-flex justify-center align-center"
      style="height: 10vh"
    >
      <div ref="chevronRef" data-magnetic>
        <v-btn
          size="x-large"
          aria-label="go to about"
          color="transparent"
          icon="mdi-chevron-double-down"
          @click="goToAbout"
        ></v-btn>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.hero-stage {
  min-height: 100vh;
  position: relative;
  isolation: isolate;
  --spot-x: 70%;
  --spot-y: 40%;
  --spot-opacity: 0;
}

.hero-stage.has-spotlight::before {
  content: "";
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: var(--spot-opacity);
  transition: opacity 0.4s ease;
  background: radial-gradient(
    420px circle at var(--spot-x) var(--spot-y),
    rgba(100, 181, 246, 0.18),
    transparent 55%
  );
}

.hero-stage__content,
.hero-stage > .v-container {
  position: relative;
  z-index: 1;
}

@media (prefers-reduced-motion: reduce) {
  .hero-stage.has-spotlight::before {
    display: none;
  }
}
</style>
