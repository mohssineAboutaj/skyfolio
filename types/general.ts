export interface Link {
  icon: string
  title: string
  value: string
  targetId: string
  isCurrent: boolean
}

export interface Social {
  icon: string
  link: string
}

export interface AboutTab {
  name: string
  value: string
  icon: string
}

export interface AboutInfo {
  avatar: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  birth: string
  address: string
  phone: string
  jobs: string[]
  shortDescription: string
  description: string
}

export interface AboutBasicInfo {
  title: string
  subtitle: string
  icon: string
}

export interface AboutEducation {
  id: string
  title: string
  enterprise: string
  year: number
}

export interface AboutCertification {
  id: string
  title: string
  enterprise: string
  url: string
  year: number
}

export interface Statistic {
  title: string
  value: number
  icon: string
}

export interface Service {
  id: string
  icon: string
  title: string
  description: string
}

export interface Project {
  id: string
  title: string
  slug: string
  url?: string
  description: string
  imgs: string[]
  visible: boolean
  featured: boolean
  types: string[]
  tech: string[]
  source?: string
  show?: boolean
}

export interface Skill {
  id: string
  name: string
  color: string
  score: number
  icon: string
}

export interface Contact {
  id: string
  label: string
  headline: string
  icon: string
  color: string
  link: string
  isFeatured: boolean
}
