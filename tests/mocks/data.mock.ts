import { vi } from 'vitest'
import type { Skill, Project, Service, Contact, AboutInfo, AboutEducation, AboutCertification } from '~/types/general'
import { skillCategories } from '~/data/skillsTab.data'

// Skills Data Mock
export const mockSkillsData: Record<string, Skill> = {
  html: {
    id: "18636b66-f793-421e-b8ee-c07c45110a8e",
    name: "HTML",
    score: 100,
    color: "#e34f26",
    icon: "simple-icons:html5",
    categories: [skillCategories.frontend],
  },
  css: {
    id: "98c6e033-7299-46c1-b77f-f170c2bbca5a",
    name: "CSS",
    score: 98,
    color: "#264de4",
    icon: "simple-icons:css3",
    categories: [skillCategories.frontend],
  },
  vuejs: {
    id: "fa6a18b7-49cc-4317-8469-81b4a0c6395d",
    name: "vuejs",
    score: 91,
    color: "#41B883",
    icon: "devicon:vuejs",
    categories: [skillCategories.frontend],
  },
  jest: {
    id: "51c404e5-7380-4d35-8d5b-2916dc7f4d8d",
    name: "Jest",
    score: 65,
    color: "#c21325",
    icon: "simple-icons:jest",
    categories: [skillCategories.testing],
  },
}

// Projects Data Mock
export const mockProjectsData: Project[] = [
  {
    id: "1",
    title: "Test Project 1",
    slug: "test-project-1",
    description: "A test project for testing",
    imgs: ["/images/projects/test/test-1.png"],
    visible: true,
    featured: true,
    types: ["web"],
    tech: ["Vue.js", "TypeScript"],
    show: true,
  },
  {
    id: "2",
    title: "Test Project 2",
    slug: "test-project-2",
    description: "Another test project",
    imgs: ["/images/projects/test/test-2.png"],
    visible: true,
    featured: false,
    types: ["mobile"],
    tech: ["React", "Node.js"],
    show: true,
  },
]

// Services Data Mock
export const mockServicesData: Service[] = [
  {
    id: "1",
    icon: "mdi-web",
    title: "Web Development",
    description: "Custom web applications using modern technologies",
  },
  {
    id: "2",
    icon: "mdi-mobile-phone",
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications",
  },
]

// Contacts Data Mock
export const mockContactsData: Contact[] = [
  {
    id: "1",
    label: "Email",
    headline: "Send me an email",
    icon: "mdi-email",
    color: "#333",
    link: "mailto:test@example.com",
    isFeatured: true,
  },
  {
    id: "2",
    label: "LinkedIn",
    headline: "Connect on LinkedIn",
    icon: "mdi-linkedin",
    color: "#0077b5",
    link: "https://linkedin.com/in/test",
    isFeatured: false,
  },
]

// About Info Data Mock
export const mockAboutInfoData: AboutInfo = {
  avatar: "/images/avatar.jpg",
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  email: "john.doe@example.com",
  birth: "1990-01-01",
  address: "123 Test Street, Test City",
  phone: "+1234567890",
  jobs: ["Frontend Developer", "Full Stack Developer"],
  shortDescription: "A passionate developer",
  description: "A detailed description about the person",
}

// About Education Data Mock
export const mockAboutEducationData: AboutEducation[] = [
  {
    id: "1",
    title: "Bachelor of Computer Science",
    enterprise: "Test University",
    year: 2020,
  },
  {
    id: "2",
    title: "Master of Software Engineering",
    enterprise: "Another University",
    year: 2022,
  },
]

// About Certification Data Mock
export const mockAboutCertificationData: AboutCertification[] = [
  {
    id: "1",
    title: "Vue.js Certification",
    enterprise: "Vue.js Official",
    url: "https://vuejs.org/certification",
    year: 2023,
  },
  {
    id: "2",
    title: "AWS Developer Associate",
    enterprise: "Amazon Web Services",
    url: "https://aws.amazon.com/certification",
    year: 2023,
  },
]

// Categories Data Mock
export const mockCategoriesData = {
  all: "All",
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
}

// Mock data modules
export const mockDataModules = {
  skills: mockSkillsData,
  projects: mockProjectsData,
  services: mockServicesData,
  contacts: mockContactsData,
  aboutInfo: mockAboutInfoData,
  aboutEducation: mockAboutEducationData,
  aboutCertification: mockAboutCertificationData,
  categories: mockCategoriesData,
} 