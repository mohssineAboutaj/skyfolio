import { describe, it, expect } from 'vitest'
import { mockSkillsData } from '~/tests/mocks/data.mock'
import type { Skill } from '~/types/general'

describe('Skills Data Validation', () => {
  describe('Data Structure', () => {
    it('should have valid skills data structure', () => {
      const skills = Object.values(mockSkillsData)
      expect(skills).toBeInstanceOf(Array)
      expect(skills.length).toBeGreaterThan(0)
    })

    it('should have unique skill IDs', () => {
      const skills = Object.values(mockSkillsData)
      const ids = skills.map(skill => skill.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have unique skill names', () => {
      const skills = Object.values(mockSkillsData)
      const names = skills.map(skill => skill.name)
      const uniqueNames = new Set(names)
      expect(uniqueNames.size).toBe(names.length)
    })
  })

  describe('Individual Skill Validation', () => {
    it('should validate HTML skill data', () => {
      const htmlSkill = mockSkillsData.html
      expect(htmlSkill).toMatchObject({
        id: expect.any(String),
        name: 'HTML',
        score: expect.any(Number),
        color: expect.any(String),
        icon: expect.any(String),
      })
    })

    it('should validate CSS skill data', () => {
      const cssSkill = mockSkillsData.css
      expect(cssSkill).toMatchObject({
        id: expect.any(String),
        name: 'CSS',
        score: expect.any(Number),
        color: expect.any(String),
        icon: expect.any(String),
      })
    })

    it('should validate Vue.js skill data', () => {
      const vueSkill = mockSkillsData.vuejs
      expect(vueSkill).toMatchObject({
        id: expect.any(String),
        name: 'vuejs',
        score: expect.any(Number),
        color: expect.any(String),
        icon: expect.any(String),
      })
    })
  })

  describe('Skill Properties Validation', () => {
    it('should have valid score values (0-100)', () => {
      const skills = Object.values(mockSkillsData)
      skills.forEach(skill => {
        expect(skill.score).toBeGreaterThanOrEqual(0)
        expect(skill.score).toBeLessThanOrEqual(100)
        expect(Number.isInteger(skill.score)).toBe(true)
      })
    })

    it('should have valid hex color codes', () => {
      const skills = Object.values(mockSkillsData)
      const hexColorRegex = /^#[0-9A-Fa-f]{3,6}$/
      skills.forEach(skill => {
        expect(skill.color).toMatch(hexColorRegex)
      })
    })

    it('should have valid icon names', () => {
      const skills = Object.values(mockSkillsData)
      skills.forEach(skill => {
        expect(skill.icon).toBeTruthy()
        expect(typeof skill.icon).toBe('string')
        expect(skill.icon.length).toBeGreaterThan(0)
      })
    })

    it('should have valid skill names', () => {
      const skills = Object.values(mockSkillsData)
      skills.forEach(skill => {
        expect(skill.name).toBeTruthy()
        expect(typeof skill.name).toBe('string')
        expect(skill.name.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Data Consistency', () => {
    it('should have consistent data types across all skills', () => {
      const skills = Object.values(mockSkillsData)
      skills.forEach(skill => {
        expect(typeof skill.id).toBe('string')
        expect(typeof skill.name).toBe('string')
        expect(typeof skill.score).toBe('number')
        expect(typeof skill.color).toBe('string')
        expect(typeof skill.icon).toBe('string')
      })
    })

    it('should have non-empty string values', () => {
      const skills = Object.values(mockSkillsData)
      skills.forEach(skill => {
        expect(skill.id.trim()).toBeTruthy()
        expect(skill.name.trim()).toBeTruthy()
        expect(skill.color.trim()).toBeTruthy()
        expect(skill.icon.trim()).toBeTruthy()
      })
    })
  })

  describe('Skill Categories', () => {
    it('should have a mix of different skill types', () => {
      const skills = Object.values(mockSkillsData)
      const skillNames = skills.map(s => s.name.toLowerCase())

      // Check for frontend skills
      expect(skillNames.some(name => name.includes('html') || name.includes('css'))).toBe(true)

      // Check for framework skills
      expect(skillNames.some(name => name.includes('vue') || name.includes('react'))).toBe(true)
    })

    it('should have skills with varying proficiency levels', () => {
      const skills = Object.values(mockSkillsData)
      const scores = skills.map(s => s.score)

      // Should have some high proficiency skills (90+)
      expect(scores.some(score => score >= 90)).toBe(true)

      // Should have some medium proficiency skills (50-89) or high proficiency (90+)
      expect(scores.some(score => score >= 50)).toBe(true)
    })
  })
}) 