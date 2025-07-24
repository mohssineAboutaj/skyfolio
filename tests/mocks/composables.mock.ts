import { vi } from 'vitest'

// GitHub API Response Mock
export const mockGitHubResponse = {
  public_repos: 25,
  login: "mohssineAboutaj",
  id: 123456,
  avatar_url: "https://avatars.githubusercontent.com/u/123456",
  html_url: "https://github.com/mohssineAboutaj",
  type: "User",
  site_admin: false,
  name: "Mohssine Aboutaj",
  company: null,
  blog: "",
  location: "Morocco",
  email: null,
  hireable: null,
  bio: "Full Stack Developer",
  twitter_username: null,
  public_gists: 5,
  followers: 50,
  following: 30,
  created_at: "2020-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
}

// Wakatime API Response Mock
export const mockWakatimeResponse = {
  data: {
    grand_total: {
      total_seconds_including_other_language: 7200, // 2 hours
      total_seconds: 7200,
      total_minutes: 120,
      total_hours: 2,
      decimal: "2.00",
      digital: "2:00",
      hours: 2,
      minutes: 0,
      text: "2 hrs",
      timezone: "UTC",
    },
    range: {
      start: "2024-01-01T00:00:00Z",
      end: "2024-01-01T23:59:59Z",
      date: "2024-01-01",
      text: "2024-01-01",
      timezone: "UTC",
    },
  },
}

// Composable Functions Mock
export const mockComposables = {
  getReposCount: vi.fn(async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100))
    return mockGitHubResponse.public_repos
  }),

  getCodingActivity: vi.fn(async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100))
    const averageCodingLinesPerHour = 150
    const totalHours = Math.floor(
      mockWakatimeResponse.data.grand_total.total_seconds_including_other_language / 3600
    )
    const totalCodedLines = totalHours * averageCodingLinesPerHour

    return { totalHours, totalCodedLines }
  }),
}

// Error Response Mocks
export const mockGitHubErrorResponse = {
  message: "Not Found",
  documentation_url: "https://docs.github.com/rest",
}

export const mockWakatimeErrorResponse = {
  error: "Invalid API key",
  message: "Authentication failed",
}

// Network Error Mock
export const mockNetworkError = new Error("Network error")

// Composable Error Functions Mock
export const mockComposablesWithErrors = {
  getReposCount: vi.fn(async () => {
    throw mockNetworkError
  }),

  getCodingActivity: vi.fn(async () => {
    throw mockNetworkError
  }),
}

// Composable with GitHub Error Mock
export const mockComposablesWithGitHubError = {
  getReposCount: vi.fn(async () => {
    throw new Error(JSON.stringify(mockGitHubErrorResponse))
  }),

  getCodingActivity: vi.fn(async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100))
    const averageCodingLinesPerHour = 150
    const totalHours = Math.floor(
      mockWakatimeResponse.data.grand_total.total_seconds_including_other_language / 3600
    )
    const totalCodedLines = totalHours * averageCodingLinesPerHour

    return { totalHours, totalCodedLines }
  }),
}

// Composable with Wakatime Error Mock
export const mockComposablesWithWakatimeError = {
  getReposCount: vi.fn(async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100))
    return mockGitHubResponse.public_repos
  }),

  getCodingActivity: vi.fn(async () => {
    throw new Error(JSON.stringify(mockWakatimeErrorResponse))
  }),
} 