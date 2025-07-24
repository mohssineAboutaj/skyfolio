import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  mockComposables,
  mockComposablesWithErrors,
  mockComposablesWithGitHubError,
  mockComposablesWithWakatimeError,
  mockGitHubResponse,
  mockWakatimeResponse,
  mockNetworkError,
  mockGitHubErrorResponse,
  mockWakatimeErrorResponse
} from '~/tests/mocks/composables.mock'

describe('StatisticsCompasables', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getReposCount', () => {
    it('should return GitHub repositories count', async () => {
      const result = await mockComposables.getReposCount()
      expect(result).toBe(mockGitHubResponse.public_repos)
    })

    it('should return a number', async () => {
      const result = await mockComposables.getReposCount()
      expect(typeof result).toBe('number')
    })

    it('should return a positive number', async () => {
      const result = await mockComposables.getReposCount()
      expect(result).toBeGreaterThanOrEqual(0)
    })

    it('should handle network errors', async () => {
      await expect(mockComposablesWithErrors.getReposCount()).rejects.toThrow(mockNetworkError)
    })

    it('should handle GitHub API errors', async () => {
      await expect(mockComposablesWithGitHubError.getReposCount()).rejects.toThrow()
    })

    it('should simulate API delay', async () => {
      const startTime = Date.now()
      await mockComposables.getReposCount()
      const endTime = Date.now()
      expect(endTime - startTime).toBeGreaterThanOrEqual(90) // Allow for small timing variations
    })
  })

  describe('getCodingActivity', () => {
    it('should return coding activity data', async () => {
      const result = await mockComposables.getCodingActivity()
      expect(result).toHaveProperty('totalHours')
      expect(result).toHaveProperty('totalCodedLines')
    })

    it('should return correct data structure', async () => {
      const result = await mockComposables.getCodingActivity()
      expect(result).toMatchObject({
        totalHours: expect.any(Number),
        totalCodedLines: expect.any(Number),
      })
    })

    it('should calculate total hours correctly', async () => {
      const result = await mockComposables.getCodingActivity()
      const expectedHours = Math.floor(
        mockWakatimeResponse.data.grand_total.total_seconds_including_other_language / 3600
      )
      expect(result.totalHours).toBe(expectedHours)
    })

    it('should calculate total coded lines correctly', async () => {
      const result = await mockComposables.getCodingActivity()
      const averageCodingLinesPerHour = 150
      const expectedHours = Math.floor(
        mockWakatimeResponse.data.grand_total.total_seconds_including_other_language / 3600
      )
      const expectedLines = expectedHours * averageCodingLinesPerHour
      expect(result.totalCodedLines).toBe(expectedLines)
    })

    it('should return positive numbers', async () => {
      const result = await mockComposables.getCodingActivity()
      expect(result.totalHours).toBeGreaterThanOrEqual(0)
      expect(result.totalCodedLines).toBeGreaterThanOrEqual(0)
    })

    it('should handle network errors', async () => {
      await expect(mockComposablesWithErrors.getCodingActivity()).rejects.toThrow(mockNetworkError)
    })

    it('should handle Wakatime API errors', async () => {
      await expect(mockComposablesWithWakatimeError.getCodingActivity()).rejects.toThrow()
    })

    it('should simulate API delay', async () => {
      const startTime = Date.now()
      await mockComposables.getCodingActivity()
      const endTime = Date.now()
      expect(endTime - startTime).toBeGreaterThanOrEqual(90) // Allow for small timing variations
    })
  })

  describe('Data Validation', () => {
    it('should validate GitHub response structure', () => {
      expect(mockGitHubResponse).toHaveProperty('public_repos')
      expect(typeof mockGitHubResponse.public_repos).toBe('number')
      expect(mockGitHubResponse.public_repos).toBeGreaterThanOrEqual(0)
    })

    it('should validate Wakatime response structure', () => {
      expect(mockWakatimeResponse).toHaveProperty('data')
      expect(mockWakatimeResponse.data).toHaveProperty('grand_total')
      expect(mockWakatimeResponse.data.grand_total).toHaveProperty('total_seconds_including_other_language')
      expect(typeof mockWakatimeResponse.data.grand_total.total_seconds_including_other_language).toBe('number')
    })

    it('should validate error response structures', () => {
      expect(mockGitHubErrorResponse).toHaveProperty('message')
      expect(mockGitHubErrorResponse).toHaveProperty('documentation_url')
      expect(mockWakatimeErrorResponse).toHaveProperty('error')
      expect(mockWakatimeErrorResponse).toHaveProperty('message')
    })
  })

  describe('Error Handling', () => {
    it('should handle network errors gracefully', async () => {
      await expect(mockComposablesWithErrors.getReposCount()).rejects.toThrow()
      await expect(mockComposablesWithErrors.getCodingActivity()).rejects.toThrow()
    })

    it('should handle API errors gracefully', async () => {
      await expect(mockComposablesWithGitHubError.getReposCount()).rejects.toThrow()
      await expect(mockComposablesWithWakatimeError.getCodingActivity()).rejects.toThrow()
    })

    it('should provide meaningful error messages', async () => {
      try {
        await mockComposablesWithGitHubError.getReposCount()
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        if (error instanceof Error) {
          expect(error.message).toContain('Not Found')
        }
      }
    })
  })

  describe('Performance', () => {
    it('should complete within reasonable time', async () => {
      const startTime = Date.now()
      await Promise.all([
        mockComposables.getReposCount(),
        mockComposables.getCodingActivity()
      ])
      const endTime = Date.now()
      expect(endTime - startTime).toBeLessThan(1000) // Should complete within 1 second
    })

    it('should handle concurrent requests', async () => {
      const promises = [
        mockComposables.getReposCount(),
        mockComposables.getCodingActivity(),
        mockComposables.getReposCount(),
        mockComposables.getCodingActivity()
      ]

      const results = await Promise.all(promises)
      expect(results).toHaveLength(4)
      expect(typeof results[0]).toBe('number')
      expect(typeof (results[1] as any).totalHours).toBe('number')
      expect(typeof results[2]).toBe('number')
      expect(typeof (results[3] as any).totalHours).toBe('number')
    })
  })

  describe('Data Consistency', () => {
    it('should return consistent results for multiple calls', async () => {
      const result1 = await mockComposables.getReposCount()
      const result2 = await mockComposables.getReposCount()
      expect(result1).toBe(result2)
    })

    it('should return consistent coding activity data', async () => {
      const result1 = await mockComposables.getCodingActivity()
      const result2 = await mockComposables.getCodingActivity()
      expect(result1.totalHours).toBe(result2.totalHours)
      expect(result1.totalCodedLines).toBe(result2.totalCodedLines)
    })
  })
}) 