import type { Skill } from '~/types/general'

export const mockSkills: Skill[] = [
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
  {
    id: '3',
    name: 'JavaScript',
    score: 88,
    color: '#C3B128',
    icon: 'simple-icons:javascript',
    categories: ['frontend', 'backend'],
  },
  {
    id: '4',
    name: 'Vue.js',
    score: 91,
    color: '#41B883',
    icon: 'devicon:vuejs',
    categories: ['frontend'],
  },
  {
    id: '5',
    name: 'Nuxt.js',
    score: 90,
    color: '#4BA497',
    icon: 'simple-icons:nuxtdotjs',
    categories: ['frontend'],
  },
  {
    id: '6',
    name: 'Jest',
    score: 65,
    color: '#c21325',
    icon: 'simple-icons:jest',
    categories: ['testing'],
  },
  {
    id: '7',
    name: 'Cursor',
    score: 85,
    color: '#000000',
    icon: 'simple-icons:cursor',
    categories: ['ai'],
  },
]

export const mockEmptySkills: Skill[] = []

export const mockSkillsStore = {
  getAll: mockSkills,
  getByTab: (tab: string) => {
    if (tab === 'top') return mockSkills.filter((s) => s.score >= 85)
    if (tab === 'all') return mockSkills
    return mockSkills.filter((s) => s.categories.includes(tab as Skill['categories'][number]))
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
}

export const mockEmptySkillsStore = {
  getAll: mockEmptySkills,
  getByTab: () => mockEmptySkills,
}
