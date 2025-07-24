import { describe, it, expect } from 'vitest'
import { mockProjectsData } from '~/tests/mocks/data.mock'
import type { Project } from '~/types/general'

describe('Projects Data Validation', () => {
  describe('Data Structure', () => {
    it('should have valid projects data structure', () => {
      expect(mockProjectsData).toBeInstanceOf(Array)
      expect(mockProjectsData.length).toBeGreaterThan(0)
    })

    it('should have unique project IDs', () => {
      const ids = mockProjectsData.map(project => project.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have unique project slugs', () => {
      const slugs = mockProjectsData.map(project => project.slug)
      const uniqueSlugs = new Set(slugs)
      expect(uniqueSlugs.size).toBe(slugs.length)
    })

    it('should have unique project titles', () => {
      const titles = mockProjectsData.map(project => project.title)
      const uniqueTitles = new Set(titles)
      expect(uniqueTitles.size).toBe(titles.length)
    })
  })

  describe('Individual Project Validation', () => {
    it('should validate first project data', () => {
      const project = mockProjectsData[0]
      expect(project).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        slug: expect.any(String),
        description: expect.any(String),
        imgs: expect.any(Array),
        visible: expect.any(Boolean),
        featured: expect.any(Boolean),
        types: expect.any(Array),
        tech: expect.any(Array),
      })
    })

    it('should validate second project data', () => {
      const project = mockProjectsData[1]
      expect(project).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        slug: expect.any(String),
        description: expect.any(String),
        imgs: expect.any(Array),
        visible: expect.any(Boolean),
        featured: expect.any(Boolean),
        types: expect.any(Array),
        tech: expect.any(Array),
      })
    })
  })

  describe('Project Properties Validation', () => {
    it('should have valid project IDs', () => {
      mockProjectsData.forEach(project => {
        expect(project.id).toBeTruthy()
        expect(typeof project.id).toBe('string')
        expect(project.id.length).toBeGreaterThan(0)
      })
    })

    it('should have valid project titles', () => {
      mockProjectsData.forEach(project => {
        expect(project.title).toBeTruthy()
        expect(typeof project.title).toBe('string')
        expect(project.title.length).toBeGreaterThan(0)
      })
    })

    it('should have valid project slugs', () => {
      const slugRegex = /^[a-z0-9-]+$/
      mockProjectsData.forEach(project => {
        expect(project.slug).toBeTruthy()
        expect(typeof project.slug).toBe('string')
        expect(project.slug).toMatch(slugRegex)
        expect(project.slug.length).toBeGreaterThan(0)
      })
    })

    it('should have valid project descriptions', () => {
      mockProjectsData.forEach(project => {
        expect(project.description).toBeTruthy()
        expect(typeof project.description).toBe('string')
        expect(project.description.length).toBeGreaterThan(0)
      })
    })

    it('should have valid image arrays', () => {
      mockProjectsData.forEach(project => {
        expect(Array.isArray(project.imgs)).toBe(true)
        expect(project.imgs.length).toBeGreaterThan(0)
        project.imgs.forEach(img => {
          expect(typeof img).toBe('string')
          expect(img.length).toBeGreaterThan(0)
        })
      })
    })

    it('should have valid types arrays', () => {
      mockProjectsData.forEach(project => {
        expect(Array.isArray(project.types)).toBe(true)
        expect(project.types.length).toBeGreaterThan(0)
        project.types.forEach(type => {
          expect(typeof type).toBe('string')
          expect(type.length).toBeGreaterThan(0)
        })
      })
    })

    it('should have valid tech arrays', () => {
      mockProjectsData.forEach(project => {
        expect(Array.isArray(project.tech)).toBe(true)
        expect(project.tech.length).toBeGreaterThan(0)
        project.tech.forEach(tech => {
          expect(typeof tech).toBe('string')
          expect(tech.length).toBeGreaterThan(0)
        })
      })
    })
  })

  describe('Project Visibility and Featured Status', () => {
    it('should have at least one visible project', () => {
      const visibleProjects = mockProjectsData.filter(project => project.visible)
      expect(visibleProjects.length).toBeGreaterThan(0)
    })

    it('should have at least one featured project', () => {
      const featuredProjects = mockProjectsData.filter(project => project.featured)
      expect(featuredProjects.length).toBeGreaterThan(0)
    })

    it('should have projects with show property', () => {
      mockProjectsData.forEach(project => {
        expect(project.show).toBeDefined()
        expect(typeof project.show).toBe('boolean')
      })
    })
  })

  describe('Project Categories and Technologies', () => {
    it('should have valid project types', () => {
      const allTypes = mockProjectsData.flatMap(project => project.types)
      const uniqueTypes = new Set(allTypes)
      expect(uniqueTypes.size).toBeGreaterThan(0)

      // Check for common project types
      expect(allTypes.some(type => ['web', 'mobile', 'desktop'].includes(type))).toBe(true)
    })

    it('should have valid technologies', () => {
      const allTech = mockProjectsData.flatMap(project => project.tech)
      const uniqueTech = new Set(allTech)
      expect(uniqueTech.size).toBeGreaterThan(0)

      // Check for common technologies
      expect(allTech.some(tech => ['Vue.js', 'React', 'Node.js', 'TypeScript'].includes(tech))).toBe(true)
    })

    it('should have consistent technology naming', () => {
      const allTech = mockProjectsData.flatMap(project => project.tech)
      allTech.forEach(tech => {
        expect(tech).toBeTruthy()
        expect(typeof tech).toBe('string')
        expect(tech.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Data Consistency', () => {
    it('should have consistent data types across all projects', () => {
      mockProjectsData.forEach(project => {
        expect(typeof project.id).toBe('string')
        expect(typeof project.title).toBe('string')
        expect(typeof project.slug).toBe('string')
        expect(typeof project.description).toBe('string')
        expect(Array.isArray(project.imgs)).toBe(true)
        expect(typeof project.visible).toBe('boolean')
        expect(typeof project.featured).toBe('boolean')
        expect(Array.isArray(project.types)).toBe(true)
        expect(Array.isArray(project.tech)).toBe(true)
      })
    })

    it('should have non-empty string values', () => {
      mockProjectsData.forEach(project => {
        expect(project.id.trim()).toBeTruthy()
        expect(project.title.trim()).toBeTruthy()
        expect(project.slug.trim()).toBeTruthy()
        expect(project.description.trim()).toBeTruthy()
      })
    })
  })
}) 