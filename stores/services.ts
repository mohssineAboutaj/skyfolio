import { defineStore } from "pinia"
import services from "@/data/services.json"

// Servcies store
export const useServicesStore = defineStore("services", {
  state: () => ({ services }),
  getters: {
    getAll: (state) => state.services,
  },
})
