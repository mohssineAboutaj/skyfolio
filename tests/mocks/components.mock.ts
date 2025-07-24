import type { Project } from '~/types/general'

// Mock project data for ProjectPreviewCard
export const mockProject: Project = {
  id: '1',
  title: 'Test Project',
  slug: 'test-project',
  description: 'A test project for testing',
  imgs: ['/images/projects/test/test-1.png'],
  visible: true,
  featured: true,
  types: ['web'],
  tech: ['Vue', 'TypeScript'],
}

// Mock project with multiple images
export const mockProjectWithMultipleImages: Project = {
  id: '2',
  title: 'Multi Image Project',
  slug: 'multi-image-project',
  description: 'A project with multiple images',
  imgs: [
    '/images/projects/multi/multi-1.png',
    '/images/projects/multi/multi-2.png',
    '/images/projects/multi/multi-3.png',
  ],
  visible: true,
  featured: false,
  types: ['mobile'],
  tech: ['React', 'Node.js'],
}

// Mock stat card data
export const mockStatCardData = {
  color: 'primary',
  icon: 'mdi-account',
  title: 'Happy Clients',
  subtitle: 'Number of satisfied customers',
  value: 150,
  elevation: 2,
}

// Mock stat card data with different values
export const mockStatCardData2 = {
  color: 'secondary',
  icon: 'mdi-code-braces',
  title: 'Projects Completed',
  subtitle: 'Total projects delivered',
  value: 2500,
  elevation: 0,
}

// Mock typewriter strings
export const mockTypewriterStrings = [
  'Hello World',
  'Welcome to my portfolio',
  'I am a developer',
  'Let\'s build something amazing',
]

// Mock typewriter strings with special characters
export const mockTypewriterStringsSpecial = [
  'Hello & Welcome!',
  'Vue.js + TypeScript',
  'Full-Stack Developer',
  'Open Source Contributor',
]

// Mock particles options
export const mockParticlesOptions = {
  fullScreen: { enable: true, zIndex: -1 },
  background: { color: { value: '#ffffff' } },
  particles: {
    color: { value: '#1976d2' },
    links: { color: '#424242', enable: true },
    move: { enable: true },
    number: { value: 150 },
  },
  interactivity: {
    events: { onClick: { enable: true, mode: 'push' } },
  },
}

// Mock theme data
export const mockTheme = {
  current: {
    colors: {
      background: '#ffffff',
      primary: '#1976d2',
      secondary: '#424242',
    },
  },
} 