<script lang="ts" setup>
import { object, string } from "yup"
import type { Contact } from "~/types/home"

// store
const { getAll } = useContactStore()

// data
/// reactive
const contacts: Contact[] = reactive([])
const showAlert = ref(false)

// validation
const { defineField, handleSubmit, resetForm, meta, isSubmitting } = useForm({
  validationSchema: object({
    email: string().email().required(),
    subject: string().required(),
    message: string().required(),
  }),
})
const vuetifyConfig = (state: { errors: any }) => ({
  props: {
    "error-messages": state.errors,
  },
})
const [email, emailProps] = defineField("email", vuetifyConfig)
const [subject, subjectProps] = defineField("subject", vuetifyConfig)
const [message, messageProps] = defineField("message", vuetifyConfig)

// hooks
onMounted(() => {
  getAll.forEach((contact: Contact) => {
    contacts.push(contact)
  })
})

// methods
/// submit form
const onSubmit = handleSubmit((values) => {
  const $mail: any = useNuxtApp().$mail
  $mail
    .send({
      from: values.email,
      subject: values.subject,
      text: values.message,
    })
    .then(() => {
      showAlert.value = true
      resetForm()
    })
})
</script>

<template>
  <v-snackbar v-model="showAlert" color="success" location="top">
    Email sent successfully

    <template v-slot:actions>
      <v-btn color="primary" variant="text" @click="showAlert = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>

  <v-card id="contacts" title="contacts" subtitle="Get in touch with me">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-form @submit="onSubmit" validate-on="blur">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="email"
                  v-bind="emailProps"
                  label="Email"
                  aria-label="email"
                  type="email"
                  outlined
                  prepend-icon="mdi-email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="subject"
                  v-bind="subjectProps"
                  label="Subject"
                  aria-label="subject"
                  outlined
                  prepend-icon="mdi-format-title"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-textarea
              v-model="message"
              v-bind="messageProps"
              label="Message"
              aria-label="message"
              outlined
              prepend-icon="mdi-message"
            ></v-textarea>
            <v-row class="my-4 mx-0 ga-6 justify-end">
              <v-btn color="error" variant="outlined" @click="resetForm">
                Reset
              </v-btn>
              <v-btn
                color="primary"
                type="submit"
                :loading="isSubmitting"
                :disabled="!meta.valid"
              >
                Submit
              </v-btn>
            </v-row>
          </v-form>
        </v-col>
        <v-col cols="12" md="6">
          <v-card-text class="text-h6" tag="p">
            If you have any questions or want to work together, feel free to
            contact me.
          </v-card-text>
          <v-card-text class="text-h6">
            <v-row v-if="contacts.length == 0" class="justify-space-around">
              <v-col v-for="n in 3" :key="`contact-skeleton-${n}`">
                <v-skeleton-loader type="button"></v-skeleton-loader>
              </v-col>
            </v-row>

            <v-row v-else class="justify-space-around">
              <v-col
                v-for="contact in contacts"
                :key="contact.id"
                v-bind="
                  $vuetify.display.mdAndDown
                    ? { cols: 'auto' }
                    : { cols: 12, md: 6, lg: 4 }
                "
              >
                <v-btn
                  :color="contact.color"
                  :href="contact.link"
                  target="_blank"
                  :title="contact.label"
                  :aria-label="contact.label"
                  :class="
                    !$vuetify.display.mdAndDown ? 'd-flex justify-start' : ''
                  "
                  :icon="$vuetify.display.mdAndDown"
                  :block="!$vuetify.display.mdAndDown"
                >
                  <Icon :name="contact.icon" size="20" />
                  <span class="hidden-md-and-down mx-2">
                    {{ contact.label }}
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
