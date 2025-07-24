import { vi } from 'vitest'
import type { Project, Skill, Service, Contact, AboutInfo, AboutEducation, AboutCertification, Link } from '~/types/general'
import { mockProjectsData, mockSkillsData, mockServicesData, mockContactsData, mockAboutInfoData, mockAboutEducationData, mockAboutCertificationData } from './data.mock'

// About Store Mock
export const mockAboutStore = {
  info: mockAboutInfoData,
  edu: mockAboutEducationData,
  cert: mockAboutCertificationData,
  getInfo: vi.fn(() => mockAboutInfoData),
  getEducations: vi.fn(() => mockAboutEducationData),
  getCertifications: vi.fn(() => mockAboutCertificationData),
}

// Projects Store Mock
export const mockProjectsStore = {
  projects: mockProjectsData,
  getVisible: vi.fn(() => mockProjectsData.filter(p => p.visible)),
  getProjectsCount: vi.fn(() => mockProjectsData.filter(p => p.visible).length),
  getProjectsTypes: vi.fn(() => ["all", "web", "mobile", "desktop"]),
  getAll: vi.fn(() => mockProjectsData.filter(p => p.visible)),
  getFeatured: vi.fn(() => mockProjectsData.filter(p => p.visible && p.featured)),
  getBySlug: vi.fn((slug: string) => mockProjectsData.find(p => p.slug === slug)),
}

// Skills Store Mock
export const mockSkillsStore = {
  getAll: vi.fn(() => Object.values(mockSkillsData)),
  getSkillById: vi.fn((id: string) => Object.values(mockSkillsData).find(s => s.id === id)),
  getSkillsByScore: vi.fn((minScore: number) => Object.values(mockSkillsData).filter(s => s.score >= minScore)),
}

// Services Store Mock
export const mockServicesStore = {
  getAll: vi.fn(() => mockServicesData),
  getServiceById: vi.fn((id: string) => mockServicesData.find(s => s.id === id)),
}

// Contacts Store Mock
export const mockContactsStore = {
  getAll: vi.fn(() => mockContactsData),
  getFeatured: vi.fn(() => mockContactsData.filter(c => c.isFeatured)),
  getContactById: vi.fn((id: string) => mockContactsData.find(c => c.id === id)),
}

// Settings Store Mock
export const mockSettingsLinks: Link[] = [
  {
    icon: "mdi-home",
    title: "Home",
    value: "home",
    targetId: "#home",
    isCurrent: false,
  },
  {
    icon: "mdi-account",
    title: "About",
    value: "about",
    targetId: "#about",
    isCurrent: false,
  },
  {
    icon: "mdi-chart-bar",
    title: "Statistics",
    value: "statistics",
    targetId: "#statistics",
    isCurrent: false,
  },
  {
    icon: "mdi-view-list",
    title: "Services",
    value: "services",
    targetId: "#services",
    isCurrent: false,
  },
  {
    icon: "mdi-code-tags",
    title: "Skills",
    value: "skills",
    targetId: "#skills",
    isCurrent: false,
  },
  {
    icon: "mdi-folder-multiple",
    title: "Projects",
    value: "projects",
    targetId: "#projects",
    isCurrent: false,
  },
  {
    icon: "mdi-email",
    title: "Contacts",
    value: "contacts",
    targetId: "#contacts",
    isCurrent: false,
  },
]

export const mockSettingsStore = {
  links: mockSettingsLinks,
  title: mockAboutInfoData.fullName,
  getLinks: vi.fn(() => mockSettingsLinks),
  getTitle: vi.fn(() => mockAboutInfoData.fullName),
  updateTitle: vi.fn((title: string) => {
    mockSettingsStore.title = title
  }),
  resetTitle: vi.fn(() => {
    mockSettingsStore.title = mockAboutInfoData.fullName
  }),
}

// Store mocks for testing
export const mockStores = {
  about: mockAboutStore,
  projects: mockProjectsStore,
  skills: mockSkillsStore,
  services: mockServicesStore,
  contacts: mockContactsStore,
  settings: mockSettingsStore,
} 