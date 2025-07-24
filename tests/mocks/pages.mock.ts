import { vi } from 'vitest'
import type { Project } from '~/types/general'

// Home Page Mocks
export const mockHomePageComponents = {
  headerComponent: true,
  aboutComponent: true,
  statisticsComponent: true,
  servicesComponent: true,
  skillsComponent: true,
  projectsComponent: true,
  contactsComponent: true,
}

// Projects Page Mocks
export const mockProjectsPageData = {
  title: 'Projects',
  breadcrumbItems: [
    { title: 'Home', disabled: false, to: '/' },
    { title: 'Projects', disabled: true },
  ],
  ALL: 'all',
  types: ['all', 'web', 'mobile', 'desktop'],
}

export const mockProjectsList: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    slug: 'ecommerce-platform',
    description: 'A modern e-commerce platform built with Vue.js and Node.js. Features include user authentication, product management, shopping cart, payment integration, and admin dashboard.',
    imgs: ['/images/projects/ecommerce/ecommerce-1.png'],
    visible: true,
    featured: true,
    types: ['web'],
    tech: ['Vue.js', 'Node.js', 'MongoDB'],
    show: true,
  },
  {
    id: '2',
    title: 'Mobile App',
    slug: 'mobile-app',
    description: 'Cross-platform mobile application',
    imgs: ['/images/projects/mobile/mobile-1.png'],
    visible: true,
    featured: false,
    types: ['mobile'],
    tech: ['React Native', 'Firebase'],
    show: true,
  },
  {
    id: '3',
    title: 'Desktop Application',
    slug: 'desktop-app',
    description: 'Cross-platform desktop application',
    imgs: ['/images/projects/desktop/desktop-1.png'],
    visible: true,
    featured: false,
    types: ['desktop'],
    tech: ['Electron', 'Vue.js'],
    show: true,
  },
  {
    id: '4',
    title: 'Web Dashboard',
    slug: 'web-dashboard',
    description: 'Analytics dashboard for business intelligence',
    imgs: ['/images/projects/dashboard/dashboard-1.png'],
    visible: true,
    featured: true,
    types: ['web'],
    tech: ['Vue.js', 'D3.js', 'Express'],
    show: true,
  },
]

export const mockProjectsStore = {
  getAll: () => mockProjectsList,
  getProjectsTypes: () => ['web', 'mobile', 'desktop'],
  getBySlug: (slug: string) => mockProjectsList.find(project => project.slug === slug),
}

// Project Detail Page Mocks
export const mockProjectDetail = {
  id: '1',
  title: 'E-commerce Platform',
  slug: 'ecommerce-platform',
  description: 'A modern e-commerce platform built with Vue.js and Node.js. Features include user authentication, product management, shopping cart, payment integration, and admin dashboard.',
  imgs: [
    '/images/projects/ecommerce/ecommerce-1.png',
    '/images/projects/ecommerce/ecommerce-2.png',
    '/images/projects/ecommerce/ecommerce-3.png',
    '/images/projects/ecommerce/ecommerce-4.png',
  ],
  visible: true,
  featured: true,
  types: ['web'],
  tech: ['Vue.js', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Stripe'],
}

export const mockProjectDetailBreadcrumbs = [
  { title: 'Home', disabled: false, to: '/' },
  { title: 'Projects', disabled: false, to: '/projects' },
  { title: 'E-commerce Platform', disabled: true },
]

export const mockSwiperOptions = {
  centeredSlides: true,
  centeredSlidesBounds: true,
  grabCursor: true,
  loop: true,
  autoplay: { delay: 2500 },
}

// 404 Page Mocks
export const mock404PageData = {
  title: '404',
  subtitle: 'Page not found',
  buttonText: 'Go to home',
  buttonLink: '/',
}

// Route Mocks
export const mockRoute = {
  params: {
    slug: 'ecommerce-platform',
  },
}

export const mockRouter = {
  push: vi.fn(),
}

// Settings Store Mock
export const mockSettingsStore = {
  updateTitle: vi.fn(),
}

// Navigation Mocks
export const mockNavigationData = {
  homePath: '/',
  projectsPath: '/projects',
  projectDetailPath: '/projects/ecommerce-platform',
  notFoundPath: '/404',
}

// Page Structure Mocks
export const mockPageStructure = {
  home: {
    components: ['HeaderComponent', 'AboutComponent', 'StatisticsComponent', 'ServicesComponent', 'SkillsComponent', 'ProjectsComponent', 'ContactsComponent'],
    layout: 'v-container',
  },
  projects: {
    components: ['v-breadcrumbs', 'v-tabs', 'ProjectPreviewCard'],
    layout: 'v-container',
  },
  projectDetail: {
    components: ['v-breadcrumbs', 'swiper-container', 'v-card'],
    layout: 'v-container',
  },
  notFound: {
    components: ['v-btn'],
    layout: 'v-container',
  },
}

// Responsive Design Mocks
export const mockResponsiveBreakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
}

// Loading States Mocks
export const mockLoadingStates = {
  projectsLoading: false,
  projectDetailLoading: false,
  skeletonCount: 12,
}

// Error States Mocks
export const mockErrorStates = {
  projectNotFound: false,
  invalidSlug: false,
  networkError: false,
} 