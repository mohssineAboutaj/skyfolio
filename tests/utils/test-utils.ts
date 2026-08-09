import { mount, type VueWrapper } from '@vue/test-utils'
import type { ComponentMountingOptions } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { vi, expect } from 'vitest'

// Create Vuetify instance for testing
export const createTestVuetify = () => {
  return createVuetify({
    components,
    directives,
  })
}

// Generic mount function with Vuetify
export const mountWithVuetify = <T>(
  component: T,
  options: ComponentMountingOptions<T> = {}
): VueWrapper<any> => {
  const vuetify = createTestVuetify()

  return mount(component, {
    global: {
      plugins: [vuetify],
      ...options.global,
    },
    ...options,
  })
}

// Wait for next tick
export const waitForNextTick = () => new Promise(resolve => setTimeout(resolve, 0))

// Mock window.matchMedia for responsive testing
export const mockMatchMedia = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

// Test data helpers
export const createMockSkill = (overrides = {}) => ({
  id: 'test-id',
  name: 'Test Skill',
  score: 85,
  color: '#ff0000',
  icon: 'test-icon',
  categories: ['Frontend'] as const,
  ...overrides,
})

// Assertion helpers
export const expectSkillCardToHaveCorrectData = (wrapper: VueWrapper<any>, skill: any) => {
  expect(wrapper.text()).toContain(skill.name)
}
 