<script lang="ts" setup>
import type { Contact } from "~/types/general"

// store
const { getAll } = useContactStore()
const { revealSection } = useGsap()

// data
/// reactive
const contacts: Contact[] = reactive([])
let motionWired = false

// hooks
onMounted(() => {
  getAll.forEach((contact: Contact) => {
    contacts.push(contact)
  })
})

watch(
  () => contacts.length,
  async (len) => {
    if (!len || motionWired) return
    motionWired = true
    await nextTick()
    revealSection("#contacts", {
      childSelector: "[data-animate-child]",
    })
  },
)
</script>

<template>
  <v-card
    id="contacts"
    title="contacts"
    subtitle="If you have any questions or want to work together, feel free to contact me."
  >
    <v-card-text>
      <v-card-text class="text-h6">
        <v-row v-if="contacts.length == 0" class="justify-space-around">
          <v-col v-for="n in 12" :key="`contact-skeleton-${n}`">
            <v-skeleton-loader type="avatar"></v-skeleton-loader>
          </v-col>
        </v-row>

        <v-row v-else class="justify-space-around">
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
