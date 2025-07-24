import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockAboutStore } from '~/tests/mocks/stores.mock'
import { mockAboutInfoData, mockAboutEducationData, mockAboutCertificationData } from '~/tests/mocks/data.mock'

describe('About Store', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Store Structure', () => {
    it('should have correct store structure', () => {
      expect(mockAboutStore).toHaveProperty('info')
      expect(mockAboutStore).toHaveProperty('edu')
      expect(mockAboutStore).toHaveProperty('cert')
      expect(mockAboutStore).toHaveProperty('getInfo')
      expect(mockAboutStore).toHaveProperty('getEducations')
      expect(mockAboutStore).toHaveProperty('getCertifications')
    })

    it('should have correct data types', () => {
      expect(typeof mockAboutStore.info).toBe('object')
      expect(Array.isArray(mockAboutStore.edu)).toBe(true)
      expect(Array.isArray(mockAboutStore.cert)).toBe(true)
      expect(typeof mockAboutStore.getInfo).toBe('function')
      expect(typeof mockAboutStore.getEducations).toBe('function')
      expect(typeof mockAboutStore.getCertifications).toBe('function')
    })
  })

  describe('getInfo Getter', () => {
    it('should return about info data', () => {
      const result = mockAboutStore.getInfo()
      expect(result).toBe(mockAboutInfoData)
    })

    it('should return correct about info structure', () => {
      const result = mockAboutStore.getInfo()
      expect(result).toMatchObject({
        avatar: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        fullName: expect.any(String),
        email: expect.any(String),
        birth: expect.any(String),
        address: expect.any(String),
        phone: expect.any(String),
        jobs: expect.any(Array),
        shortDescription: expect.any(String),
        description: expect.any(String),
      })
    })

    it('should return valid about info data', () => {
      const result = mockAboutStore.getInfo()
      expect(result.avatar).toBeTruthy()
      expect(result.firstName).toBeTruthy()
      expect(result.lastName).toBeTruthy()
      expect(result.fullName).toBeTruthy()
      expect(result.email).toBeTruthy()
      expect(result.birth).toBeTruthy()
      expect(result.address).toBeTruthy()
      expect(result.phone).toBeTruthy()
      expect(result.jobs.length).toBeGreaterThan(0)
      expect(result.shortDescription).toBeTruthy()
      expect(result.description).toBeTruthy()
    })

    it('should have valid email format', () => {
      const result = mockAboutStore.getInfo()
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      expect(result.email).toMatch(emailRegex)
    })

    it('should have valid phone format', () => {
      const result = mockAboutStore.getInfo()
      const phoneRegex = /^\+?[\d\s\-\(\)]+$/
      expect(result.phone).toMatch(phoneRegex)
    })

    it('should have valid jobs array', () => {
      const result = mockAboutStore.getInfo()
      expect(Array.isArray(result.jobs)).toBe(true)
      result.jobs.forEach(job => {
        expect(typeof job).toBe('string')
        expect(job.length).toBeGreaterThan(0)
      })
    })
  })

  describe('getEducations Getter', () => {
    it('should return education data', () => {
      const result = mockAboutStore.getEducations()
      expect(result).toBe(mockAboutEducationData)
    })

    it('should return array of education objects', () => {
      const result = mockAboutStore.getEducations()
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
    })

    it('should return valid education structure', () => {
      const result = mockAboutStore.getEducations()
      result.forEach(education => {
        expect(education).toMatchObject({
          id: expect.any(String),
          title: expect.any(String),
          enterprise: expect.any(String),
          year: expect.any(Number),
        })
      })
    })

    it('should have valid education years', () => {
      const result = mockAboutStore.getEducations()
      const currentYear = new Date().getFullYear()
      result.forEach(education => {
        expect(education.year).toBeGreaterThan(1900)
        expect(education.year).toBeLessThanOrEqual(currentYear + 1)
      })
    })

    it('should have unique education IDs', () => {
      const result = mockAboutStore.getEducations()
      const ids = result.map(edu => edu.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have valid education data', () => {
      const result = mockAboutStore.getEducations()
      result.forEach(education => {
        expect(education.id).toBeTruthy()
        expect(education.title).toBeTruthy()
        expect(education.enterprise).toBeTruthy()
        expect(education.year).toBeTruthy()
      })
    })
  })

  describe('getCertifications Getter', () => {
    it('should return certification data', () => {
      const result = mockAboutStore.getCertifications()
      expect(result).toBe(mockAboutCertificationData)
    })

    it('should return array of certification objects', () => {
      const result = mockAboutStore.getCertifications()
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
    })

    it('should return valid certification structure', () => {
      const result = mockAboutStore.getCertifications()
      result.forEach(certification => {
        expect(certification).toMatchObject({
          id: expect.any(String),
          title: expect.any(String),
          enterprise: expect.any(String),
          url: expect.any(String),
          year: expect.any(Number),
        })
      })
    })

    it('should have valid certification years', () => {
      const result = mockAboutStore.getCertifications()
      const currentYear = new Date().getFullYear()
      result.forEach(certification => {
        expect(certification.year).toBeGreaterThan(1900)
        expect(certification.year).toBeLessThanOrEqual(currentYear + 1)
      })
    })

    it('should have valid URLs', () => {
      const result = mockAboutStore.getCertifications()
      const urlRegex = /^https?:\/\/.+/
      result.forEach(certification => {
        expect(certification.url).toMatch(urlRegex)
      })
    })

    it('should have unique certification IDs', () => {
      const result = mockAboutStore.getCertifications()
      const ids = result.map(cert => cert.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have valid certification data', () => {
      const result = mockAboutStore.getCertifications()
      result.forEach(certification => {
        expect(certification.id).toBeTruthy()
        expect(certification.title).toBeTruthy()
        expect(certification.enterprise).toBeTruthy()
        expect(certification.url).toBeTruthy()
        expect(certification.year).toBeTruthy()
      })
    })
  })

  describe('Data Consistency', () => {
    it('should have consistent data across getters', () => {
      const info = mockAboutStore.getInfo()
      const educations = mockAboutStore.getEducations()
      const certifications = mockAboutStore.getCertifications()

      expect(info).toBe(mockAboutInfoData)
      expect(educations).toBe(mockAboutEducationData)
      expect(certifications).toBe(mockAboutCertificationData)
    })

    it('should have non-empty string values', () => {
      const info = mockAboutStore.getInfo()
      expect(info.avatar.trim()).toBeTruthy()
      expect(info.firstName.trim()).toBeTruthy()
      expect(info.lastName.trim()).toBeTruthy()
      expect(info.fullName.trim()).toBeTruthy()
      expect(info.email.trim()).toBeTruthy()
      expect(info.birth.trim()).toBeTruthy()
      expect(info.address.trim()).toBeTruthy()
      expect(info.phone.trim()).toBeTruthy()
      expect(info.shortDescription.trim()).toBeTruthy()
      expect(info.description.trim()).toBeTruthy()
    })
  })
}) 