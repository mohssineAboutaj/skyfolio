import type { Skill } from '~/types/general'
import { skillCategories, skillsTab } from '~/data/skillsTab.data'

export const mockSkills: Skill[] = [
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
  {
    id: '3',
    name: 'JavaScript',
    score: 88,
    color: '#C3B128',
    icon: 'simple-icons:javascript',
    categories: [skillCategories.frontend, skillCategories.backend],
  },
  {
    id: '4',
    name: 'Vue.js',
    score: 91,
    color: '#41B883',
    icon: 'devicon:vuejs',
    categories: [skillCategories.frontend],
  },
  {
    id: '5',
    name: 'Nuxt.js',
    score: 90,
    color: '#4BA497',
    icon: 'simple-icons:nuxtdotjs',
    categories: [skillCategories.frontend],
  },
  {
    id: '6',
    name: 'Jest',
    score: 65,
    color: '#c21325',
    icon: 'simple-icons:jest',
    categories: [skillCategories.testing],
  },
  {
    id: '7',
    name: 'Cursor',
    score: 85,
    color: '#000000',
    icon: 'simple-icons:cursor',
    categories: [skillCategories.ai],
  },
]

export const mockEmptySkills: Skill[] = []

export const mockSkillsStore = {
  getAll: mockSkills,
  getByTab: (tab: string) => {
    if (tab === 'top') return mockSkills.filter((s) => s.score >= 85)
    if (tab === 'all') return mockSkills
    if (tab in skillsTab) {
      const label = skillsTab[tab as keyof typeof skillsTab]
      return mockSkills.filter((s) => s.categories.includes(label as Skill['categories'][number]))
    }
    return []
  },
  getTabs: skillsTab,
}

export const mockEmptySkillsStore = {
  getAll: mockEmptySkills,
  getByTab: () => mockEmptySkills,
}
