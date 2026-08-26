<script lang="ts" setup>
// store
const { getAll } = useContactStore()
const { revealSection } = useGsap()

const contacts = computed(() => getAll)
let motionWired = false

watch(
  () => contacts.value.length,
  async (len) => {
    if (!len || motionWired) return
    motionWired = true
    await nextTick()
    revealSection("#contacts", {
      childSelector: "[data-animate-child]",
    })
  },
  { immediate: true },
)
</script>

<template>
  <v-card
    id="contacts"
    title="Contacts"
    subtitle="Have a project in mind or a question? Reach out — I am open to freelance and full-time opportunities."
  >
    <v-card-text>
      <v-card-text class="text-h6">
        <v-row class="justify-space-around">
          <v-col
            v-for="contact in contacts"
            :key="contact.id"
            cols="auto"
            data-animate-child
            data-magnetic
          >
            <v-btn
              :color="contact.color"
              :href="contact.link"
              target="_blank"
              :title="contact.label"
              :aria-label="contact.label"
              :class="[
                'circle-btn',
                !$vuetify.display.mdAndDown ? 'd-flex justify-center' : '',
              ]"
              :icon="true"
              :block="false"
            >
              <Icon :name="contact.icon" size="20" />
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card-text>
  </v-card>
</template>
