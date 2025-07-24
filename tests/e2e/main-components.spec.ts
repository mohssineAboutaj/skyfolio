import { describe, it, expect } from 'vitest'
import {
  mockAboutInfo,
  mockAboutEducations,
  mockAboutCertifications,
  mockAboutTabs,
  mockAboutBasicInfos,
  mockAboutStore,
  mockFeaturedProjects,
  mockProjectsStore,
  mockServices,
  mockServicesStore,
  mockContacts,
  mockContactsStore,
  mockStatistics,
  mockStatisticsComposables
} from '~/tests/mocks/main-components.mock'

describe('Main Components E2E Tests', () => {
  describe('AboutComponent Data Integration', () => {
    it('should integrate about info data correctly', () => {
      expect(mockAboutStore.getInfo).toBe(mockAboutInfo)
      expect(mockAboutStore.getEducations).toBe(mockAboutEducations)
      expect(mockAboutStore.getCertifications).toBe(mockAboutCertifications)
    })

    it('should process basic info correctly', () => {
      const fullNameInfo = mockAboutBasicInfos.find(info => info.title === 'Full Name')
      expect(fullNameInfo?.subtitle).toBe(mockAboutInfo.fullName)

      const emailInfo = mockAboutBasicInfos.find(info => info.title === 'Email')
      expect(emailInfo?.subtitle).toBe(mockAboutInfo.email)

      const jobsInfo = mockAboutBasicInfos.find(info => info.title === 'Jobs')
      expect(jobsInfo?.subtitle).toBe(mockAboutInfo.jobs.join(', '))
    })

    it('should have consistent tab configuration', () => {
      expect(mockAboutTabs.length).toBe(3)
      expect(mockAboutTabs[0].value).toBe('info')
      expect(mockAboutTabs[1].value).toBe('education')
      expect(mockAboutTabs[2].value).toBe('certificates')
    })

    it('should validate education data integrity', () => {
      expect(mockAboutEducations.length).toBe(2)
      expect(mockAboutEducations[0].year).toBeLessThan(mockAboutEducations[1].year)
      mockAboutEducations.forEach(edu => {
        expect(edu.id).toBeDefined()
        expect(edu.title.length).toBeGreaterThan(0)
        expect(edu.enterprise.length).toBeGreaterThan(0)
      })
    })

    it('should validate certification data integrity', () => {
      expect(mockAboutCertifications.length).toBe(2)
      mockAboutCertifications.forEach(cert => {
        expect(cert.id).toBeDefined()
        expect(cert.title.length).toBeGreaterThan(0)
        expect(cert.enterprise.length).toBeGreaterThan(0)
        expect(cert.url).toMatch(/^https?:\/\//)
      })
    })
  })

  describe('ProjectsComponent Data Integration', () => {
    it('should integrate featured projects data correctly', () => {
      const featuredProjects = mockProjectsStore.getFeatured()
      expect(featuredProjects).toBe(mockFeaturedProjects)
      expect(featuredProjects.length).toBe(3)
    })

    it('should validate project data integrity', () => {
      mockFeaturedProjects.forEach(project => {
        expect(project.featured).toBe(true)
        expect(project.visible).toBe(true)
        expect(project.id).toBeDefined()
        expect(project.title.length).toBeGreaterThan(0)
        expect(project.slug).toMatch(/^[a-z-]+$/)
        expect(project.imgs.length).toBeGreaterThan(0)
        expect(project.tech.length).toBeGreaterThan(0)
        expect(project.types.length).toBeGreaterThan(0)
      })
    })

    it('should have unique project identifiers', () => {
      const ids = mockFeaturedProjects.map(project => project.id)
      const slugs = mockFeaturedProjects.map(project => project.slug)
      expect(new Set(ids).size).toBe(ids.length)
      expect(new Set(slugs).size).toBe(slugs.length)
    })

    it('should validate project image paths', () => {
      mockFeaturedProjects.forEach(project => {
        project.imgs.forEach(img => {
          expect(img).toMatch(/^\/images\/projects\//)
          expect(img.length).toBeGreaterThan(0)
        })
      })
    })

    it('should validate projects count integration', () => {
      expect(mockProjectsStore.getProjectsCount).toBe(25)
      expect(typeof mockProjectsStore.getProjectsCount).toBe('number')
    })
  })

  describe('ServicesComponent Data Integration', () => {
    it('should integrate services data correctly', () => {
      const allServices = mockServicesStore.getAll
      expect(allServices).toBe(mockServices)
      expect(allServices.length).toBe(4)
    })

    it('should validate service data integrity', () => {
      mockServices.forEach(service => {
        expect(service.id).toBeDefined()
        expect(service.title.length).toBeGreaterThan(0)
        expect(service.description.length).toBeGreaterThan(10)
        expect(service.icon).toMatch(/^mdi-/)
      })
    })

    it('should have unique service identifiers', () => {
      const ids = mockServices.map(service => service.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('should cover essential service categories', () => {
      const titles = mockServices.map(service => service.title)
      expect(titles.some(title => title.includes('Web'))).toBe(true)
      expect(titles.some(title => title.includes('Mobile'))).toBe(true)
      expect(titles.some(title => title.includes('Design'))).toBe(true)
      expect(titles.some(title => title.includes('Backend'))).toBe(true)
    })

    it('should have appropriate service descriptions', () => {
      mockServices.forEach(service => {
        expect(service.description.length).toBeLessThan(200)
        expect(service.description.length).toBeGreaterThan(10)
      })
    })
  })

  describe('ContactsComponent Data Integration', () => {
    it('should integrate contacts data correctly', () => {
      const allContacts = mockContactsStore.getAll
      expect(allContacts).toBe(mockContacts)
      expect(allContacts.length).toBe(4)
    })

    it('should validate contact data integrity', () => {
      mockContacts.forEach(contact => {
        expect(contact.id).toBeDefined()
        expect(contact.label.length).toBeGreaterThan(0)
        expect(contact.headline.length).toBeGreaterThan(5)
        expect(contact.icon).toMatch(/^mdi-/)
        expect(contact.color).toMatch(/^#[0-9A-Fa-f]{3,6}$/)
        expect(contact.link.length).toBeGreaterThan(0)
        expect(typeof contact.isFeatured).toBe('boolean')
      })
    })

    it('should have unique contact identifiers', () => {
      const ids = mockContacts.map(contact => contact.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('should validate contact link formats', () => {
      const githubContact = mockContacts.find(contact => contact.label === 'GitHub')
      expect(githubContact?.link).toMatch(/^https:\/\/github\.com\//)

      const linkedinContact = mockContacts.find(contact => contact.label === 'LinkedIn')
      expect(linkedinContact?.link).toMatch(/^https:\/\/linkedin\.com\//)

      const emailContact = mockContacts.find(contact => contact.label === 'Email')
      expect(emailContact?.link).toMatch(/^mailto:/)

      const twitterContact = mockContacts.find(contact => contact.label === 'Twitter')
      expect(twitterContact?.link).toMatch(/^https:\/\/twitter\.com\//)
    })

    it('should have proper featured contact distribution', () => {
      const featuredContacts = mockContacts.filter(contact => contact.isFeatured)
      const nonFeaturedContacts = mockContacts.filter(contact => !contact.isFeatured)
      expect(featuredContacts.length).toBeGreaterThan(0)
      expect(nonFeaturedContacts.length).toBeGreaterThan(0)
    })
  })

  describe('StatisticsComponent Data Integration', () => {
    it('should integrate statistics data correctly', () => {
      expect(mockStatistics.length).toBe(4)
      expect(mockStatistics[0].title).toBe('Projects Count')
      expect(mockStatistics[1].title).toBe('Repos Count')
      expect(mockStatistics[2].title).toBe('Total Worked Hours')
      expect(mockStatistics[3].title).toBe('Total Coded Lines')
    })

    it('should validate statistics data integrity', () => {
      mockStatistics.forEach(stat => {
        expect(stat.title.length).toBeGreaterThan(0)
        expect(typeof stat.value).toBe('number')
        expect(stat.value).toBeGreaterThanOrEqual(0)
        expect(stat.icon).toMatch(/^mdi-/)
      })
    })

    it('should have unique statistic titles', () => {
      const titles = mockStatistics.map(stat => stat.title)
      expect(new Set(titles).size).toBe(titles.length)
    })

    it('should integrate projects count correctly', () => {
      const projectsStat = mockStatistics.find(stat => stat.title === 'Projects Count')
      expect(projectsStat?.value).toBe(mockProjectsStore.getProjectsCount)
    })

    it('should integrate GitHub statistics correctly', async () => {
      const reposCount = await mockStatisticsComposables.getReposCount()
      const reposStat = mockStatistics.find(stat => stat.title === 'Repos Count')
      expect(reposStat?.value).toBe(reposCount)
    })

    it('should integrate coding activity statistics correctly', async () => {
      const codingActivity = await mockStatisticsComposables.getCodingActivity()
      const hoursStat = mockStatistics.find(stat => stat.title === 'Total Worked Hours')
      const linesStat = mockStatistics.find(stat => stat.title === 'Total Coded Lines')

      expect(hoursStat?.value).toBe(codingActivity.totalHours)
      expect(linesStat?.value).toBe(codingActivity.totalCodedLines)
    })

    it('should validate composables return promises', () => {
      const reposPromise = mockStatisticsComposables.getReposCount()
      const activityPromise = mockStatisticsComposables.getCodingActivity()

      expect(reposPromise).toBeInstanceOf(Promise)
      expect(activityPromise).toBeInstanceOf(Promise)
    })
  })

  describe('Cross-Component Data Consistency', () => {
    it('should maintain consistent data across components', () => {
      // Projects count should be consistent between ProjectsComponent and StatisticsComponent
      expect(mockProjectsStore.getProjectsCount).toBe(25)
      const projectsStat = mockStatistics.find(stat => stat.title === 'Projects Count')
      expect(projectsStat?.value).toBe(25)
    })

    it('should have reasonable data ranges', () => {
      // Projects count
      expect(mockProjectsStore.getProjectsCount).toBeGreaterThan(0)
      expect(mockProjectsStore.getProjectsCount).toBeLessThan(1000)

      // Featured projects
      expect(mockFeaturedProjects.length).toBeGreaterThan(0)
      expect(mockFeaturedProjects.length).toBeLessThan(10)

      // Services
      expect(mockServices.length).toBeGreaterThan(2)
      expect(mockServices.length).toBeLessThan(10)

      // Contacts
      expect(mockContacts.length).toBeGreaterThan(2)
      expect(mockContacts.length).toBeLessThan(15)

      // Statistics
      expect(mockStatistics.length).toBeGreaterThan(2)
      expect(mockStatistics.length).toBeLessThan(10)
    })

    it('should have proper data relationships', () => {
      // Featured projects should be a subset of all projects
      expect(mockFeaturedProjects.length).toBeLessThanOrEqual(mockProjectsStore.getProjectsCount)

      // All featured projects should be visible
      mockFeaturedProjects.forEach(project => {
        expect(project.visible).toBe(true)
        expect(project.featured).toBe(true)
      })
    })
  })

  describe('Data Validation Rules', () => {
    it('should enforce data structure rules', () => {
      // All arrays should be arrays
      expect(Array.isArray(mockFeaturedProjects)).toBe(true)
      expect(Array.isArray(mockServices)).toBe(true)
      expect(Array.isArray(mockContacts)).toBe(true)
      expect(Array.isArray(mockStatistics)).toBe(true)
      expect(Array.isArray(mockAboutEducations)).toBe(true)
      expect(Array.isArray(mockAboutCertifications)).toBe(true)
      expect(Array.isArray(mockAboutBasicInfos)).toBe(true)
      expect(Array.isArray(mockAboutTabs)).toBe(true)

      // All objects should have required properties
      expect(mockAboutInfo).toHaveProperty('fullName')
      expect(mockAboutInfo).toHaveProperty('email')
      expect(mockAboutInfo).toHaveProperty('jobs')
    })

    it('should enforce data type rules', () => {
      // String properties
      expect(typeof mockAboutInfo.fullName).toBe('string')
      expect(typeof mockAboutInfo.email).toBe('string')

      // Array properties
      expect(Array.isArray(mockAboutInfo.jobs)).toBe(true)

      // Number properties
      expect(typeof mockProjectsStore.getProjectsCount).toBe('number')
      mockStatistics.forEach(stat => {
        expect(typeof stat.value).toBe('number')
      })
    })

    it('should enforce data format rules', () => {
      // Email format
      expect(mockAboutInfo.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

      // Icon format
      const allIcons = [
        ...mockServices.map(s => s.icon),
        ...mockContacts.map(c => c.icon),
        ...mockStatistics.map(s => s.icon),
        ...mockAboutBasicInfos.map(b => b.icon),
        ...mockAboutTabs.map(t => t.icon)
      ]
      allIcons.forEach(icon => {
        expect(icon).toMatch(/^mdi-/)
      })

      // Color format
      mockContacts.forEach(contact => {
        expect(contact.color).toMatch(/^#[0-9A-Fa-f]{3,6}$/)
      })
    })
  })
}) 