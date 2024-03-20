import { defineStore } from "pinia"
import contacts from "~/data/contacts.data"
import type { Contact } from "~/types/general"

export const useContactStore = defineStore("contacts", {
  state: () => ({ contacts }),
  getters: {
    getAll: (state) => state.contacts,
    getFeatured: (state) =>
      state.contacts.filter((contact) => contact.isFeatured),
  },
})
