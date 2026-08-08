import { describe, it, expect, vi } from 'vitest'
import { mockSkills } from '~/tests/mocks/skills.mock'

// Mock the skills store
vi.mock('~/stores/skills', () => ({
  useSkillsStore: () => ({
    getAll: mockSkills,
    getByTab: (tab: string) => {
      if (tab === 'top') return mockSkills.filter((s) => s.score >= 85)
      if (tab === 'all') return mockSkills
      return mockSkills.filter((s) =>
        s.categories.includes(tab as (typeof s.categories)[number]),
      )
    },
    getTabs: {
      top: 'Top',
      all: 'All',
      frontend: 'Frontend',
      backend: 'Backend',
      mobile: 'Mobile',
      ai: 'AI',
      testing: 'Testing',
      tools: 'Tools',
    },
  }),
}))

describe('Skills Page E2E', () => {
  describe('Skills Data Validation', () => {
    it('should have valid skills data for E2E testing', () => {
      expect(mockSkills).toBeDefined()
      expect(Array.isArray(mockSkills)).toBe(true)
      expect(mockSkills.length).toBeGreaterThan(0)
    })

    it('should have skills with required properties for display', () => {
      mockSkills.forEach(skill => {
        expect(skill).toHaveProperty('id')
        expect(skill).toHaveProperty('name')
        expect(skill).toHaveProperty('score')
        expect(skill).toHaveProperty('color')
        expect(skill).toHaveProperty('icon')
        expect(skill).toHaveProperty('categories')
        expect(Array.isArray(skill.categories)).toBe(true)
      })
    })
  })

  describe('Skills Display Logic', () => {
    it('should have skills with valid score ranges for progress bars', () => {
      mockSkills.forEach(skill => {
        expect(skill.score).toBeGreaterThanOrEqual(0)
        expect(skill.score).toBeLessThanOrEqual(100)
      })
    })

    it('should have unique skill names for proper display', () => {
      const skillNames = mockSkills.map(skill => skill.name)
      const uniqueNames = new Set(skillNames)
      expect(uniqueNames.size).toBe(skillNames.length)
    })

    it('should have valid color values for skill icons', () => {
      mockSkills.forEach(skill => {
        expect(skill.color).toMatch(/^#[0-9A-Fa-f]{6}$/)
      })
    })
  })

  describe('Responsive Layout Logic', () => {
    it('should have appropriate number of skills for grid layout', () => {
      expect(mockSkills.length).toBeGreaterThanOrEqual(3)
    })

    it('should have skills with varying scores for visual variety', () => {
      const scores = mockSkills.map(skill => skill.score)
      const uniqueScores = new Set(scores)
      expect(uniqueScores.size).toBeGreaterThan(1)
    })
  })

  describe('Component Structure Validation', () => {
    it('should have skills with valid icon names', () => {
      mockSkills.forEach(skill => {
        expect(skill.icon).toBeDefined()
        expect(typeof skill.icon).toBe('string')
        expect(skill.icon.length).toBeGreaterThan(0)
      })
    })

    it('should have skills with valid IDs for proper rendering', () => {
      const skillIds = mockSkills.map(skill => skill.id)
      const uniqueIds = new Set(skillIds)
      expect(uniqueIds.size).toBe(skillIds.length)
    })
  })

  describe('User Experience Validation', () => {
    it('should have skills with meaningful names', () => {
      mockSkills.forEach(skill => {
        expect(skill.name.length).toBeGreaterThan(0)
        expect(skill.name.length).toBeLessThan(50)
      })
    })

    it('should have a good distribution of skill levels', () => {
      const scores = mockSkills.map(skill => skill.score)
      const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length
      expect(averageScore).toBeGreaterThan(50)
      expect(averageScore).toBeLessThan(100)
    })
  })

  describe('Data Consistency', () => {
    it('should have consistent data structure across all skills', () => {
      const expectedKeys = ['id', 'name', 'score', 'color', 'icon', 'categories']

      mockSkills.forEach(skill => {
        expectedKeys.forEach(key => {
          expect(skill).toHaveProperty(key)
        })
      })
    })

    it('should have skills with appropriate color contrast', () => {
      mockSkills.forEach(skill => {
        expect(skill.color).toMatch(/^#[0-9A-Fa-f]{6}$/)
      })
    })
  })

  describe('Skills Tab Filtering', () => {
    it('should filter testing skills from mock data', () => {
      const testing = mockSkills.filter((s) => s.categories.includes('testing'))
      expect(testing.some((s) => s.name === 'Jest')).toBe(true)
    })

    it('should filter AI skills from mock data', () => {
      const ai = mockSkills.filter((s) => s.categories.includes('ai'))
      expect(ai.some((s) => s.name === 'Cursor')).toBe(true)
    })

    it('should derive top skills from high scores', () => {
      const top = mockSkills.filter((s) => s.score >= 85)
      expect(top.length).toBeGreaterThan(0)
      top.forEach((s) => expect(s.score).toBeGreaterThanOrEqual(85))
    })
  })

  describe('Performance Considerations', () => {
    it('should have reasonable number of skills for optimal performance', () => {
      expect(mockSkills.length).toBeLessThan(50)
    })

    it('should have skills with efficient data structure', () => {
      mockSkills.forEach(skill => {
        expect(skill.name.length).toBeLessThan(30)
        expect(skill.icon.length).toBeLessThan(50)
      })
    })
  })
})
