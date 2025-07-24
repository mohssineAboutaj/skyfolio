import type {
  AboutInfo,
  AboutEducation,
  AboutCertification,
  AboutBasicInfo,
  AboutTab,
  Project,
  Service,
  Contact,
  Statistic
} from '~/types/general'

// About Component Mocks
export const mockAboutInfo: AboutInfo = {
  avatar: '/images/avatar.jpg',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  birth: '1990-01-01',
  address: 'New York, USA',
  phone: '+1-234-567-8900',
  jobs: ['Frontend Developer', 'UI/UX Designer'],
  shortDescription: 'A passionate developer',
  description: 'A full-stack developer with 5+ years of experience',
}

export const mockAboutEducations: AboutEducation[] = [
  {
    id: '1',
    title: 'Bachelor of Computer Science',
    enterprise: 'University of Technology',
    year: 2015,
  },
  {
    id: '2',
    title: 'Master of Software Engineering',
    enterprise: 'Tech Institute',
    year: 2017,
  },
]

export const mockAboutCertifications: AboutCertification[] = [
  {
    id: '1',
    title: 'AWS Certified Developer',
    enterprise: 'Amazon Web Services',
    url: 'https://aws.amazon.com/certification',
    year: 2022,
  },
  {
    id: '2',
    title: 'Google Cloud Professional',
    enterprise: 'Google Cloud',
    url: 'https://cloud.google.com/certification',
    year: 2023,
  },
]

export const mockAboutTabs: AboutTab[] = [
  { name: 'Information', value: 'info', icon: 'mdi-information' },
  { name: 'Educations', value: 'education', icon: 'mdi-school' },
  { name: 'Certificates', value: 'certificates', icon: 'mdi-certificate' },
]

export const mockAboutBasicInfos: AboutBasicInfo[] = [
  {
    title: 'Full Name',
    subtitle: 'John Doe',
    icon: 'mdi-account',
  },
  {
    title: 'Email',
    subtitle: 'john.doe@example.com',
    icon: 'mdi-email',
  },
  {
    title: 'Jobs',
    subtitle: 'Frontend Developer, UI/UX Designer',
    icon: 'mdi-briefcase',
  },
  {
    title: 'Address',
    subtitle: 'New York, USA',
    icon: 'mdi-map-marker',
  },
]

// Projects Component Mocks
export const mockFeaturedProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    slug: 'ecommerce-platform',
    description: 'A modern e-commerce platform built with Vue.js',
    imgs: ['/images/projects/ecommerce/ecommerce-1.png'],
    visible: true,
    featured: true,
    types: ['web'],
    tech: ['Vue.js', 'Node.js', 'MongoDB'],
  },
  {
    id: '2',
    title: 'Mobile App',
    slug: 'mobile-app',
    description: 'Cross-platform mobile application',
    imgs: ['/images/projects/mobile/mobile-1.png'],
    visible: true,
    featured: true,
    types: ['mobile'],
    tech: ['React Native', 'Firebase'],
  },
  {
    id: '3',
    title: 'Dashboard System',
    slug: 'dashboard-system',
    description: 'Analytics dashboard for business intelligence',
    imgs: ['/images/projects/dashboard/dashboard-1.png'],
    visible: true,
    featured: true,
    types: ['web'],
    tech: ['Vue.js', 'D3.js', 'Express'],
  },
]

// Services Component Mocks
export const mockServices: Service[] = [
  {
    id: '1',
    icon: 'mdi-web',
    title: 'Web Development',
    description: 'Custom web applications using modern technologies',
  },
  {
    id: '2',
    icon: 'mdi-cellphone',
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications',
  },
  {
    id: '3',
    icon: 'mdi-palette',
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive user interfaces',
  },
  {
    id: '4',
    icon: 'mdi-server',
    title: 'Backend Development',
    description: 'Robust server-side applications and APIs',
  },
]

// Contacts Component Mocks
export const mockContacts: Contact[] = [
  {
    id: '1',
    label: 'GitHub',
    headline: 'Check out my projects',
    icon: 'mdi-github',
    color: '#333',
    link: 'https://github.com/johndoe',
    isFeatured: true,
  },
  {
    id: '2',
    label: 'LinkedIn',
    headline: 'Connect with me',
    icon: 'mdi-linkedin',
    color: '#0077b5',
    link: 'https://linkedin.com/in/johndoe',
    isFeatured: true,
  },
  {
    id: '3',
    label: 'Email',
    headline: 'Send me an email',
    icon: 'mdi-email',
    color: '#ea4335',
    link: 'mailto:john.doe@example.com',
    isFeatured: true,
  },
  {
    id: '4',
    label: 'Twitter',
    headline: 'Follow me on Twitter',
    icon: 'mdi-twitter',
    color: '#1da1f2',
    link: 'https://twitter.com/johndoe',
    isFeatured: false,
  },
]

// Statistics Component Mocks
export const mockStatistics: Statistic[] = [
  {
    title: 'Projects Count',
    value: 25,
    icon: 'mdi-folder-multiple',
  },
  {
    title: 'Repos Count',
    value: 50,
    icon: 'mdi-source-branch',
  },
  {
    title: 'Total Worked Hours',
    value: 1200,
    icon: 'mdi-clock-time-four-outline',
  },
  {
    title: 'Total Coded Lines',
    value: 50000,
    icon: 'mdi-code-tags',
  },
]

// Store Mocks
export const mockAboutStore = {
  getInfo: mockAboutInfo,
  getEducations: mockAboutEducations,
  getCertifications: mockAboutCertifications,
}

export const mockProjectsStore = {
  getFeatured: () => mockFeaturedProjects,
  getProjectsCount: 25,
}

export const mockServicesStore = {
  getAll: mockServices,
}

export const mockContactsStore = {
  getAll: mockContacts,
}

// Composables Mocks
export const mockStatisticsComposables = {
  getReposCount: () => Promise.resolve(50),
  getCodingActivity: () => Promise.resolve({
    totalHours: 1200,
    totalCodedLines: 50000,
  }),
} 