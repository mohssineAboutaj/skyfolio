import { describe, it, expect, vi } from "vitest"
import {
  ESTIMATED_LINES_PER_HOUR,
  getCodingActivity,
  getReposCount,
} from "~/composables/StatisticsCompasables"

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

describe("statistics fetchers", () => {
  vi.spyOn(console, "warn").mockImplementation(() => {})

  describe("getReposCount", () => {
    it("returns public_repos from the GitHub response", async () => {
      const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({ public_repos: 85 }))
      expect(await getReposCount(undefined, fetchImpl)).toBe(85)
    })

    it("sends the token as a bearer header when provided", async () => {
      const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({ public_repos: 1 }))
      await getReposCount("secret", fetchImpl)
      const init = fetchImpl.mock.calls[0]![1] as RequestInit
      expect((init.headers as Record<string, string>).Authorization).toBe(
        "Bearer secret",
      )
    })

    it("returns null on a non-OK response (e.g. rate limit)", async () => {
      const fetchImpl = vi
        .fn()
        .mockResolvedValue(jsonResponse({ message: "API rate limit exceeded" }, 403))
      expect(await getReposCount(undefined, fetchImpl)).toBeNull()
    })

    it("returns null on a network error", async () => {
      const fetchImpl = vi.fn().mockRejectedValue(new TypeError("fetch failed"))
      expect(await getReposCount(undefined, fetchImpl)).toBeNull()
    })

    it("returns null when the payload has no numeric public_repos", async () => {
      const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({}))
      expect(await getReposCount(undefined, fetchImpl)).toBeNull()
    })
  })

  describe("getCodingActivity", () => {
    it("converts WakaTime seconds to hours and estimated lines", async () => {
      const fetchImpl = vi.fn().mockResolvedValue(
        jsonResponse({
          data: { grand_total: { total_seconds_including_other_language: 7.5 * 3600 } },
        }),
      )
      expect(await getCodingActivity(fetchImpl)).toEqual({
        totalHours: 7,
        estimatedLines: 7 * ESTIMATED_LINES_PER_HOUR,
      })
    })

    it("returns null on a non-OK response", async () => {
      const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({}, 500))
      expect(await getCodingActivity(fetchImpl)).toBeNull()
    })

    it("returns null when the payload shape changes", async () => {
      const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({ data: {} }))
      expect(await getCodingActivity(fetchImpl)).toBeNull()
    })
  })
})
