const GITHUB_USER_URL = "https://api.github.com/users/mohssineAboutaj"
const WAKATIME_SHARE_URL =
  "https://wakatime.com/share/@mohssineAboutaj/c7080d72-f315-4f03-a913-43f454f4a23b.json"
const REQUEST_TIMEOUT_MS = 8000

/** Rough industry rule of thumb used for the "estimated lines" statistic. */
export const ESTIMATED_LINES_PER_HOUR = 150

type FetchLike = typeof fetch

async function fetchJson(
  url: string,
  init: RequestInit = {},
  fetchImpl: FetchLike = fetch,
): Promise<unknown | null> {
  try {
    const response = await fetchImpl(url, {
      ...init,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
    if (!response.ok) {
      console.warn(`[statistics] ${url} responded ${response.status}`)
      return null
    }
    return await response.json()
  } catch (error) {
    console.warn(`[statistics] ${url} failed:`, error)
    return null
  }
}

/** Total public GitHub repositories, or null when unavailable. */
export const getReposCount = async (
  token?: string,
  fetchImpl?: FetchLike,
): Promise<number | null> => {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const data = (await fetchJson(GITHUB_USER_URL, { headers }, fetchImpl)) as {
    public_repos?: unknown
  } | null

  return typeof data?.public_repos === "number" ? data.public_repos : null
}

/** Total WakaTime coding hours plus an estimated line count, or null. */
export const getCodingActivity = async (
  fetchImpl?: FetchLike,
): Promise<{ totalHours: number; estimatedLines: number } | null> => {
  const data = (await fetchJson(WAKATIME_SHARE_URL, {}, fetchImpl)) as {
    data?: {
      grand_total?: { total_seconds_including_other_language?: unknown }
    }
  } | null

  const seconds =
    data?.data?.grand_total?.total_seconds_including_other_language
  if (typeof seconds !== "number") return null

  const totalHours = Math.floor(seconds / 3600)
  return {
    totalHours,
    estimatedLines: totalHours * ESTIMATED_LINES_PER_HOUR,
  }
}
