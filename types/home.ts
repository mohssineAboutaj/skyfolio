export interface AboutTab {
  name: string
  value: string
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
