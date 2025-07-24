import { vi } from 'vitest'

// Mock Nuxt composables
export const mockNuxtComposables = {
  useNuxtApp: () => ({
    $vuetify: {
      theme: {
        current: {
          dark: true,
        },
      },
    },
  }),
}

// Setup Nuxt mocks
export const setupNuxtMocks = () => {
  vi.mock('#app', () => mockNuxtComposables)
} 