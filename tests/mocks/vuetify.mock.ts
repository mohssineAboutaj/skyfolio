import { vi } from 'vitest'

// Mock Vuetify main
export const mockVuetify = {
  createVuetify: vi.fn(() => ({})),
}

// Mock Vuetify components
export const mockVuetifyComponents = {
  VCard: {
    name: 'VCard',
    template: '<div class="v-card"><slot /></div>',
    props: ['title', 'subtitle', 'elevation', 'class'],
  },
  VCardText: {
    name: 'VCardText',
    template: '<div class="v-card-text"><slot /></div>',
    props: ['class'],
  },
  VCardTitle: {
    name: 'VCardTitle',
    template: '<div class="v-card-title"><slot /></div>',
    props: ['class'],
  },
  VRow: {
    name: 'VRow',
    template: '<div class="v-row"><slot /></div>',
    props: ['class'],
  },
  VCol: {
    name: 'VCol',
    template: '<div class="v-col"><slot /></div>',
    props: ['cols', 'sm', 'md', 'lg', 'class'],
  },
  VProgressLinear: {
    name: 'VProgressLinear',
    template: '<div class="v-progress-linear"></div>',
    props: ['modelValue', 'color', 'height'],
  },
  VSkeletonLoader: {
    name: 'VSkeletonLoader',
    template: '<div class="v-skeleton-loader"></div>',
    props: ['type'],
  },
}

// Mock Vuetify directives
export const mockVuetifyDirectives = {
  Ripple: { name: 'Ripple' },
  ClickOutside: { name: 'ClickOutside' },
}

// Setup Vuetify mocks
export const setupVuetifyMocks = () => {
  vi.mock('vuetify', () => mockVuetify)
  vi.mock('vuetify/components', () => mockVuetifyComponents)
  vi.mock('vuetify/directives', () => mockVuetifyDirectives)
} 