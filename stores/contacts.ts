import { defineStore } from "pinia"
import contacts from "~/data/contacts.json"
import type { Contact } from "~/types/home"

export const useContactStore = defineStore("contacts", {
  state: () => ({ contacts }),
  getters: {
    getAll: (state) => state.contacts,
    getFeatured: (state) =>
      state.contacts.filter((contact) => contact.isFeatured),
  },
})
