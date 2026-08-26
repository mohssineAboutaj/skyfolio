import { vi } from 'vitest'
import { setupNuxtMocks } from './mocks/nuxt.mock'
import { setupVuetifyMocks } from './mocks/vuetify.mock'

// Setup all mocks
setupNuxtMocks()
setupVuetifyMocks()

const { skillCategories, skillsTab } = vi.hoisted(() => {
  const skillsTab = {
    top: 'Core stack',
    all: 'All',
    frontend: 'Frontend',
    backend: 'Backend',
    mobile: 'Mobile & Desktop',
    ai: 'AI',
    testing: 'Testing',
    tools: 'Tools',
  } as const

  return {
    skillsTab,
    skillCategories: {
      frontend: skillsTab.frontend,
      backend: skillsTab.backend,
      mobile: skillsTab.mobile,
      ai: skillsTab.ai,
      testing: skillsTab.testing,
      tools: skillsTab.tools,
    },
  }
})

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
        categories: [skillCategories.frontend],
      },
      {
        id: '2',
        name: 'CSS',
        score: 90,
        color: '#264de4',
        icon: 'devicon:css3',
        categories: [skillCategories.frontend],
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
          categories: [skillCategories.frontend],
        },
        {
          id: '2',
          name: 'CSS',
          score: 90,
          color: '#264de4',
          icon: 'devicon:css3',
          categories: [skillCategories.frontend],
        },
      ]
      if (tab === 'top') return all.filter((s) => s.score >= 85)
      if (tab === 'all') return all
      if (tab in skillsTab) {
        const label = skillsTab[tab as keyof typeof skillsTab]
        return all.filter((s) => s.categories.includes(label as typeof skillCategories.frontend))
      }
      return []
    },
    getTabs: skillsTab,
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
