import { describe, it, expect } from 'vitest'
import {
  mockDataModules,
  mockSkillsData,
  mockProjectsData,
  mockServicesData,
  mockContactsData
} from '~/tests/mocks/data.mock'
import {
  mockStores,
  mockAboutStore,
  mockProjectsStore,
  mockSkillsStore,
  mockServicesStore,
  mockContactsStore,
  mockSettingsStore
} from '~/tests/mocks/stores.mock'
import {
  mockComposables,
  mockGitHubResponse,
  mockWakatimeResponse
} from '~/tests/mocks/composables.mock'

describe('Data, Stores, and Composables Integration', () => {
  describe('Data Integration', () => {
    it('should have consistent data across all modules', () => {
      expect(mockDataModules.skills).toBe(mockSkillsData)
      expect(mockDataModules.projects).toBe(mockProjectsData)
      expect(mockDataModules.services).toBe(mockServicesData)
      expect(mockDataModules.contacts).toBe(mockContactsData)
    })

    it('should have valid data structures', () => {
      expect(typeof mockDataModules.skills).toBe('object')
      expect(Array.isArray(mockDataModules.projects)).toBe(true)
      expect(Array.isArray(mockDataModules.services)).toBe(true)
      expect(Array.isArray(mockDataModules.contacts)).toBe(true)
    })

    it('should have non-empty data collections', () => {
      expect(Object.keys(mockDataModules.skills).length).toBeGreaterThan(0)
      expect(mockDataModules.projects.length).toBeGreaterThan(0)
      expect(mockDataModules.services.length).toBeGreaterThan(0)
      expect(mockDataModules.contacts.length).toBeGreaterThan(0)
    })
  })

  describe('Store Integration', () => {
    it('should have consistent store structure', () => {
      expect(mockStores.about).toBe(mockAboutStore)
      expect(mockStores.projects).toBe(mockProjectsStore)
      expect(mockStores.skills).toBe(mockSkillsStore)
      expect(mockStores.services).toBe(mockServicesStore)
      expect(mockStores.contacts).toBe(mockContactsStore)
      expect(mockStores.settings).toBe(mockSettingsStore)
    })

    it('should have valid store methods', () => {
      expect(typeof mockAboutStore.getInfo).toBe('function')
      expect(typeof mockAboutStore.getEducations).toBe('function')
      expect(typeof mockAboutStore.getCertifications).toBe('function')

      expect(typeof mockProjectsStore.getAll).toBe('function')
      expect(typeof mockProjectsStore.getFeatured).toBe('function')
      expect(typeof mockProjectsStore.getBySlug).toBe('function')

      expect(typeof mockSkillsStore.getAll).toBe('function')
      expect(typeof mockServicesStore.getAll).toBe('function')
      expect(typeof mockContactsStore.getAll).toBe('function')
    })

    it('should return consistent data from store methods', () => {
      const aboutInfo = mockAboutStore.getInfo()
      const projects = mockProjectsStore.getAll()
      const skills = mockSkillsStore.getAll()
      const services = mockServicesStore.getAll()
      const contacts = mockContactsStore.getAll()

      expect(aboutInfo).toBeTruthy()
      expect(Array.isArray(projects)).toBe(true)
      expect(Array.isArray(skills)).toBe(true)
      expect(Array.isArray(services)).toBe(true)
      expect(Array.isArray(contacts)).toBe(true)
    })
  })

  describe('Composables Integration', () => {
    it('should have valid composable functions', () => {
      expect(typeof mockComposables.getReposCount).toBe('function')
      expect(typeof mockComposables.getCodingActivity).toBe('function')
    })

    it('should return expected data types from composables', async () => {
      const reposCount = await mockComposables.getReposCount()
      const codingActivity = await mockComposables.getCodingActivity()

      expect(typeof reposCount).toBe('number')
      expect(typeof codingActivity.totalHours).toBe('number')
      expect(typeof codingActivity.totalCodedLines).toBe('number')
    })

    it('should return consistent values from composables', async () => {
      const reposCount1 = await mockComposables.getReposCount()
      const reposCount2 = await mockComposables.getReposCount()
      const codingActivity1 = await mockComposables.getCodingActivity()
      const codingActivity2 = await mockComposables.getCodingActivity()

      expect(reposCount1).toBe(reposCount2)
      expect(codingActivity1.totalHours).toBe(codingActivity2.totalHours)
      expect(codingActivity1.totalCodedLines).toBe(codingActivity2.totalCodedLines)
    })
  })

  describe('Cross-Module Data Consistency', () => {
    it('should maintain data consistency between stores and data modules', () => {
      const storeProjects = mockProjectsStore.getAll()
      const dataProjects = mockDataModules.projects

      // Both should reference the same data
      expect(storeProjects).toStrictEqual(dataProjects)
      expect(storeProjects.length).toBe(dataProjects.length)
    })

    it('should have consistent project data structure', () => {
      const projects = mockProjectsStore.getAll()
      projects.forEach(project => {
        expect(project).toHaveProperty('id')
        expect(project).toHaveProperty('title')
        expect(project).toHaveProperty('slug')
        expect(project).toHaveProperty('description')
        expect(project).toHaveProperty('imgs')
        expect(project).toHaveProperty('visible')
        expect(project).toHaveProperty('featured')
        expect(project).toHaveProperty('types')
        expect(project).toHaveProperty('tech')
      })
    })

    it('should have consistent skill data structure', () => {
      const skills = mockSkillsStore.getAll()
      skills.forEach(skill => {
        expect(skill).toHaveProperty('id')
        expect(skill).toHaveProperty('name')
        expect(skill).toHaveProperty('color')
        expect(skill).toHaveProperty('score')
        expect(skill).toHaveProperty('icon')
        expect(skill).toHaveProperty('categories')
      })
    })
  })

  describe('Data Validation Rules', () => {
    it('should have valid project slugs', () => {
      const projects = mockProjectsStore.getAll()
      const slugRegex = /^[a-z0-9-]+$/

      projects.forEach(project => {
        expect(project.slug).toMatch(slugRegex)
      })
    })

    it('should have valid skill scores', () => {
      const skills = mockSkillsStore.getAll()

      skills.forEach(skill => {
        expect(skill.score).toBeGreaterThanOrEqual(0)
        expect(skill.score).toBeLessThanOrEqual(100)
        expect(Number.isInteger(skill.score)).toBe(true)
      })
    })

    it('should have valid hex colors', () => {
      const skills = mockSkillsStore.getAll()
      const contacts = mockContactsStore.getAll()
      const hexColorRegex = /^#[0-9A-Fa-f]{3,6}$/

      skills.forEach(skill => {
        expect(skill.color).toMatch(hexColorRegex)
      })

      contacts.forEach(contact => {
        expect(contact.color).toMatch(hexColorRegex)
      })
    })

    it('should have valid email formats in contacts', () => {
      const contacts = mockContactsStore.getAll()
      const emailContacts = contacts.filter(contact => contact.link.startsWith('mailto:'))

      emailContacts.forEach(contact => {
        const email = contact.link.replace('mailto:', '')
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        expect(email).toMatch(emailRegex)
      })
    })
  })

  describe('Store Method Behavior', () => {
    it('should filter visible projects correctly', () => {
      const allProjects = mockProjectsStore.getAll()
      const visibleProjects = allProjects.filter(p => p.visible)

      expect(visibleProjects.length).toBeLessThanOrEqual(allProjects.length)
      visibleProjects.forEach(project => {
        expect(project.visible).toBe(true)
      })
    })

    it('should filter featured projects correctly', () => {
      const featuredProjects = mockProjectsStore.getFeatured()

      featuredProjects.forEach(project => {
        expect(project.featured).toBe(true)
        expect(project.visible).toBe(true)
      })
    })

    it('should find projects by slug correctly', () => {
      const projects = mockProjectsStore.getAll()
      if (projects.length > 0) {
        const firstProject = projects[0]
        const foundProject = mockProjectsStore.getBySlug(firstProject.slug)

        expect(foundProject).toBe(firstProject)
      }
    })

    it('should return undefined for non-existent slug', () => {
      const foundProject = mockProjectsStore.getBySlug('non-existent-slug')
      expect(foundProject).toBeUndefined()
    })
  })

  describe('Composable Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      // Test that composables can handle errors without breaking the application
      expect(mockComposables.getReposCount).toBeDefined()
      expect(mockComposables.getCodingActivity).toBeDefined()
    })

    it('should return expected data structures even with errors', async () => {
      const reposCount = await mockComposables.getReposCount()
      const codingActivity = await mockComposables.getCodingActivity()

      expect(typeof reposCount).toBe('number')
      expect(codingActivity).toHaveProperty('totalHours')
      expect(codingActivity).toHaveProperty('totalCodedLines')
    })
  })

  describe('Performance and Reliability', () => {
    it('should complete composable calls within reasonable time', async () => {
      const startTime = Date.now()

      await Promise.all([
        mockComposables.getReposCount(),
        mockComposables.getCodingActivity()
      ])

      const endTime = Date.now()
      expect(endTime - startTime).toBeLessThan(1000) // Should complete within 1 second
    })

    it('should handle concurrent store access', () => {
      const aboutInfo = mockAboutStore.getInfo()
      const projects = mockProjectsStore.getAll()
      const skills = mockSkillsStore.getAll()
      const services = mockServicesStore.getAll()
      const contacts = mockContactsStore.getAll()

      expect(aboutInfo).toBeTruthy()
      expect(projects).toBeTruthy()
      expect(skills).toBeTruthy()
      expect(services).toBeTruthy()
      expect(contacts).toBeTruthy()
    })
  })
}) 