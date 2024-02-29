<script lang="ts" setup>
import { useContactStore } from "#imports"
import { object, string } from "yup"
import type { Contact } from "~/types/home"

// store
const { getAll } = useContactStore()

// data
/// reactive
const contacts: Contact[] = reactive([])
const showAlert = ref(!false)

// validation
const { defineField, handleSubmit, resetForm, meta, isSubmitting } = useForm({
  validationSchema: object({
    email: string().email().required(),
    subject: string().required(),
    message: string().required(),
  }),
})
const vuetifyConfig = (state) => ({
  props: {
    "error-messages": state.errors,
  },
})
const [email, emailProps] = defineField("email", vuetifyConfig)
const [subject, subjectProps] = defineField("subject", vuetifyConfig)
const [message, messageProps] = defineField("message", vuetifyConfig)

// fill data
getAll.forEach((contact: Contact) => {
  contacts.push(contact)
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

  <v-card id="contacts" class="my-0 py-0" rounded="none">
    <v-container>
      <v-card-title class="mb-4">Contacts</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-card-subtitle class="text-h6 mb-2">
              Get in touch with me
            </v-card-subtitle>
            <v-card-text class="text-h6">
              If you have any questions or want to work together, feel free to
              contact me.
            </v-card-text>
            <v-card-text class="text-h6">
              <v-row class="justify-space-around">
                <v-col
                  v-for="contact in contacts"
                  :key="contact.id"
                  cols="auto"
                >
                  <v-btn
                    color="primary"
                    icon
                    :href="contact.link"
                    target="_blank"
                  >
                    <Icon :name="contact.icon" size="20" />
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-col>
          <v-col cols="12" md="6">
            <v-form @submit="onSubmit" validate-on="blur">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="email"
                    v-bind="emailProps"
                    label="Email"
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
                    outlined
                    prepend-icon="mdi-format-title"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-textarea
                v-model="message"
                v-bind="messageProps"
                label="Message"
                outlined
                prepend-icon="mdi-message"
              ></v-textarea>
              <v-row class="mt-4 ga-6 justify-end">
                <v-btn
                  rounded="xl"
                  color="error"
                  variant="outlined"
                  @click="resetForm"
                >
                  Reset
                </v-btn>
                <v-btn
                  rounded="xl"
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
        </v-row>
      </v-card-text>
    </v-container>
  </v-card>
</template>
