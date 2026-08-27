import aboutInfo from "../data/about/info.data"
import contacts from "../data/contacts.data"
import skills from "../data/skills.data"

export const PORTFOLIO_SITE_URL = "https://mohssineaboutaj.com/"

export const portfolioSiteName = aboutInfo.fullName

export const portfolioSiteDescription = aboutInfo.availableForWork
  ? `${aboutInfo.shortDescription} Available for freelance and remote contracts.`
  : aboutInfo.shortDescription

export const portfolioKeywords = [
  "Mohssine Aboutaj",
  "freelance developer",
  "full-stack developer",
  "Vue.js developer",
  "Nuxt developer",
  "Laravel developer",
  "Node.js developer",
  "Marrakech",
  "Morocco",
  "remote developer",
  ...aboutInfo.jobs,
]

export function getPortfolioSameAs(): string[] {
  return contacts
    .map((contact) => contact.link)
    .filter((link) => link.startsWith("http"))
}

export function getPortfolioKnowsAbout(limit = 24): string[] {
  return Object.values(skills)
    .map((skill) => skill.name)
    .slice(0, limit)
}

export function truncateMetaDescription(text: string, maxLength = 160): string {
  const plain = text
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  if (plain.length <= maxLength) return plain
  return `${plain.slice(0, maxLength - 1).trimEnd()}…`
}

export const portfolioPersonIdentity = {
  type: "Person" as const,
  name: aboutInfo.fullName,
  givenName: aboutInfo.firstName,
  familyName: aboutInfo.lastName,
  email: aboutInfo.email,
  jobTitle: aboutInfo.jobs[0],
  image: `${PORTFOLIO_SITE_URL}images/avatar.jpg`,
  sameAs: getPortfolioSameAs(),
  knowsAbout: getPortfolioKnowsAbout(),
  address: {
    "@type": "PostalAddress" as const,
    addressLocality: "Marrakech",
    addressCountry: "MA",
  },
}
