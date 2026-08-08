import { vi } from 'vitest'
import { setupNuxtMocks } from './mocks/nuxt.mock'
import { setupVuetifyMocks } from './mocks/vuetify.mock'

// Setup all mocks
setupNuxtMocks()
setupVuetifyMocks()

// Mock the skills store
vi.mock('~/stores/skills', () => ({
  useSkillsStore: () => ({
    getAll: [
      {
        id: '1',
        name: 'HTML',
        score: 95,
        color: '#e34f26',
        icon: 'devicon:html5',
        categories: ['frontend'],
      },
      {
        id: '2',
        name: 'CSS',
        score: 90,
        color: '#264de4',
        icon: 'devicon:css3',
        categories: ['frontend'],
      },
    ],
    getByTab: (tab: string) => {
      const all = [
        {
          id: '1',
          name: 'HTML',
          score: 95,
          color: '#e34f26',
          icon: 'devicon:html5',
          categories: ['frontend'] as const,
        },
        {
          id: '2',
          name: 'CSS',
          score: 90,
          color: '#264de4',
          icon: 'devicon:css3',
          categories: ['frontend'] as const,
        },
      ]
      if (tab === 'top') return all.filter((s) => s.score >= 85)
      if (tab === 'all') return all
      return all.filter((s) => s.categories.includes(tab as 'frontend'))
    },
    getTabs: {
      top: 'Top',
      all: 'All',
      frontend: 'Frontend',
      backend: 'Backend',
      mobile: 'Mobile',
      ai: 'AI',
      testing: 'Testing',
      tools: 'Tools',
    },
  }),
}))

// Mock the Icon component
vi.mock('nuxt-icon', () => ({
  default: {
    name: 'Icon',
    props: ['name', 'size', 'color'],
    template: '<div class="icon" :style="{ color: color }">{{ name }}</div>'
  }
}))

// Mock CSS imports
vi.mock('*.css', () => ({}))
