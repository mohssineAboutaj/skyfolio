import { defineStore } from "pinia"
import services from "~/data/services.data"

// Servcies store
export const useServicesStore = defineStore("services", {
  state: () => ({ services }),
  getters: {
    getAll: (state) => state.services,
  },
})
