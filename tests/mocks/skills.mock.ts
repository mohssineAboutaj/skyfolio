import type { Skill } from '~/types/general'

export const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'HTML',
    score: 95,
    color: '#e34f26',
    icon: 'devicon:html5',
  },
  {
    id: '2',
    name: 'CSS',
    score: 90,
    color: '#264de4',
    icon: 'devicon:css3',
  },
  {
    id: '3',
    name: 'JavaScript',
    score: 88,
    color: '#C3B128',
    icon: 'simple-icons:javascript',
  },
  {
    id: '4',
    name: 'Vue.js',
    score: 91,
    color: '#41B883',
    icon: 'devicon:vuejs',
  },
  {
    id: '5',
    name: 'Nuxt.js',
    score: 90,
    color: '#4BA497',
    icon: 'simple-icons:nuxtdotjs',
  },
]

export const mockEmptySkills: Skill[] = []

export const mockSkillsStore = {
  getAll: mockSkills,
}

export const mockEmptySkillsStore = {
  getAll: mockEmptySkills,
} 