# Testing Structure

This directory contains a comprehensive testing setup for the Skyfolio project with organized test types and reusable utilities.

## 📁 Directory Structure

```
tests/
├── mocks/                    # Mock data and utilities
│   ├── skills.mock.ts       # Skills data and store mocks
│   ├── components.mock.ts   # Reusable components mock data
│   ├── main-components.mock.ts # Main components mock data
│   ├── pages.mock.ts        # Pages mock data
│   ├── data.mock.ts         # Data files mock data
│   ├── stores.mock.ts       # Stores mock data
│   ├── composables.mock.ts  # Composables mock data
│   ├── vuetify.mock.ts      # Vuetify component mocks
│   └── nuxt.mock.ts         # Nuxt composables mocks
├── unit/                     # Unit tests
│   ├── components/          # Component unit tests
│   │   ├── SkillsComponent.test.ts
│   │   ├── AboutComponent.test.ts
│   │   ├── ProjectsComponent.test.ts
│   │   ├── ServicesComponent.test.ts
│   │   ├── ContactsComponent.test.ts
│   │   ├── StatisticsComponent.test.ts
│   │   ├── FlatCard.test.ts
│   │   ├── ProjectPreviewCard.test.ts
│   │   ├── StatCard.test.ts
│   │   ├── TypewriterComponent.test.ts
│   │   └── Particles.test.ts
│   ├── pages/               # Page unit tests
│   │   ├── HomePage.test.ts
│   │   ├── ProjectsPage.test.ts
│   │   ├── ProjectDetailPage.test.ts
│   │   └── NotFoundPage.test.ts
│   ├── data/                # Data files unit tests
│   │   ├── skills.data.test.ts
│   │   └── projects.data.test.ts
│   ├── stores/              # Stores unit tests
│   │   └── about.test.ts
│   ├── composables/         # Composables unit tests
│   │   └── StatisticsCompasables.test.ts
│   └── types/               # Types unit tests
│       └── general.test.ts
├── e2e/                      # End-to-end tests
│   ├── skills.spec.ts       # Skills page E2E tests
│   ├── reusable-components.spec.ts  # Reusable components E2E tests
│   ├── main-components.spec.ts      # Main components E2E tests
│   ├── pages.spec.ts        # Pages E2E tests
│   └── data-stores-composables.spec.ts # Data, stores, composables E2E tests
├── utils/                    # Test utilities
│   └── test-utils.ts        # Common testing utilities
├── setup.ts                  # Global test setup
└── README.md                # This file
```

## 🧪 Test Types

### Unit Tests (`tests/unit/`)

- **Purpose**: Test individual components and functions in isolation
- **Focus**: Component logic, data validation, computed properties
- **Location**: `tests/unit/components/`
- **Example**: `SkillsComponent.test.ts`

### E2E Tests (`tests/e2e/`)

- **Purpose**: Test complete user workflows and page interactions
- **Focus**: Page rendering, user interactions, responsive behavior
- **Location**: `tests/e2e/`
- **Example**: `skills.spec.ts`

## 🎭 Mocks (`tests/mocks/`)

### Skills Mock (`skills.mock.ts`)

```typescript
export const mockSkills: Skill[] = [
  {
    id: "1",
    name: "HTML",
    score: 95,
    color: "#e34f26",
    icon: "devicon:html5",
  },
  // ... more skills
]
```

### Components Mock (`components.mock.ts`)

```typescript
export const mockProject: Project = {
  id: "1",
  title: "Test Project",
  slug: "test-project",
  description: "A test project for testing",
  imgs: ["/images/projects/test/test-1.png"],
  visible: true,
  featured: true,
  types: ["web"],
  tech: ["Vue", "TypeScript"],
}

export const mockStatCardData = {
  color: "primary",
  icon: "mdi-account",
  title: "Happy Clients",
  subtitle: "Number of satisfied customers",
  value: 150,
  elevation: 2,
}
```

### Main Components Mock (`main-components.mock.ts`)

```typescript
export const mockAboutInfo: AboutInfo = {
  avatar: "/images/avatar.jpg",
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  email: "john.doe@example.com",
  // ... more properties
}

export const mockFeaturedProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    slug: "ecommerce-platform",
    description: "A modern e-commerce platform built with Vue.js",
    imgs: ["/images/projects/ecommerce/ecommerce-1.png"],
    visible: true,
    featured: true,
    types: ["web"],
    tech: ["Vue.js", "Node.js", "MongoDB"],
  },
  // ... more projects
]

export const mockServices: Service[] = [
  {
    id: "1",
    icon: "mdi-web",
    title: "Web Development",
    description: "Custom web applications using modern technologies",
  },
  // ... more services
]
```

### Pages Mock (`pages.mock.ts`)

```typescript
export const mockHomePageComponents = {
  header: true,
  about: true,
  statistics: true,
  services: true,
  skills: true,
  projects: true,
  contacts: true,
}

export const mockProjectsPageData = {
  title: "Projects",
  breadcrumbs: [
    { title: "Home", to: "/" },
    { title: "Projects", to: "/projects" },
  ],
  types: ["all", "web", "mobile", "desktop"],
}

export const mockProjectDetail = {
  id: "1",
  title: "E-commerce Platform",
  slug: "ecommerce-platform",
  description: "A modern e-commerce platform built with Vue.js and Node.js",
  imgs: ["/images/projects/ecommerce/ecommerce-1.png"],
  visible: true,
  featured: true,
  types: ["web"],
  tech: ["Vue.js", "Node.js", "MongoDB"],
}
```

### Data Mock (`data.mock.ts`)

```typescript
export const mockSkillsData: Record<string, Skill> = {
  html: {
    id: "18636b66-f793-421e-b8ee-c07c45110a8e",
    name: "HTML",
    score: 100,
    color: "#e34f26",
    icon: "simple-icons:html5",
  },
  // ... more skills
}

export const mockProjectsData: Project[] = [
  {
    id: "1",
    title: "Test Project 1",
    slug: "test-project-1",
    description: "A test project for testing",
    imgs: ["/images/projects/test/test-1.png"],
    visible: true,
    featured: true,
    types: ["web"],
    tech: ["Vue.js", "TypeScript"],
  },
  // ... more projects
]
```

### Stores Mock (`stores.mock.ts`)

```typescript
export const mockAboutStore = {
  info: mockAboutInfoData,
  edu: mockAboutEducationData,
  cert: mockAboutCertificationData,
  getInfo: vi.fn(() => mockAboutInfoData),
  getEducations: vi.fn(() => mockAboutEducationData),
  getCertifications: vi.fn(() => mockAboutCertificationData),
}

export const mockProjectsStore = {
  projects: mockProjectsData,
  getAll: vi.fn(() => mockProjectsData.filter((p) => p.visible)),
  getFeatured: vi.fn(() =>
    mockProjectsData.filter((p) => p.visible && p.featured),
  ),
  getBySlug: vi.fn((slug: string) =>
    mockProjectsData.find((p) => p.slug === slug),
  ),
}
```

### Composables Mock (`composables.mock.ts`)

```typescript
export const mockComposables = {
  getReposCount: vi.fn(async () => {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return mockGitHubResponse.public_repos
  }),

  getCodingActivity: vi.fn(async () => {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const averageCodingLinesPerHour = 150
    const totalHours = Math.floor(
      mockWakatimeResponse.data.grand_total
        .total_seconds_including_other_language / 3600,
    )
    const totalCodedLines = totalHours * averageCodingLinesPerHour

    return { totalHours, totalCodedLines }
  }),
}
```

### Vuetify Mock (`vuetify.mock.ts`)

- Mocks Vuetify components to avoid CSS import issues
- Provides simple component templates for testing
- Includes setup function for easy integration

### Nuxt Mock (`nuxt.mock.ts`)

- Mocks Nuxt composables like `useNuxtApp`
- Provides consistent testing environment

## 🛠️ Test Utilities (`tests/utils/`)

### Test Utils (`test-utils.ts`)

```typescript
// Mount component with Vuetify
export const mountWithVuetify = <T>(
  component: T,
  options: ComponentMountingOptions<T> = {}
): VueWrapper<any>

// Create mock skill data
export const createMockSkill = (overrides = {}) => ({
  id: 'test-id',
  name: 'Test Skill',
  score: 85,
  color: '#ff0000',
  icon: 'test-icon',
  ...overrides,
})
```

## 📜 Available Scripts

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests once
npm run test:run

# Run only unit tests
npm run test:unit

# Run only E2E tests
npm run test:e2e

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 🚀 Adding New Tests

### 1. Unit Test for a New Component

```typescript
// tests/unit/components/NewComponent.test.ts
import { describe, it, expect, vi } from "vitest"
import { mockSkills } from "~/tests/mocks/skills.mock"
import { setupVuetifyMocks } from "~/tests/mocks/vuetify.mock"

setupVuetifyMocks()

describe("NewComponent", () => {
  it("should render correctly", () => {
    // Your test logic
  })
})
```

### 2. E2E Test for a New Page

```typescript
// tests/e2e/new-page.spec.ts
import { describe, it, expect, vi } from "vitest"
import { mount } from "@vue/test-utils"

describe("New Page E2E", () => {
  it("should load the page successfully", async () => {
    // Your E2E test logic
  })
})
```

### 3. New Mock Data

```typescript
// tests/mocks/new-data.mock.ts
export const mockNewData = {
  // Your mock data
}

export const setupNewDataMocks = () => {
  vi.mock("~/stores/new-store", () => ({
    useNewStore: () => mockNewData,
  }))
}
```

## 🔧 Configuration

### Vitest Config (`vitest.config.ts`)

- Environment: jsdom for browser-like testing
- CSS support enabled
- Path aliases configured (`~` and `@`)
- Vuetify optimization for faster tests

### Global Setup (`tests/setup.ts`)

- Imports and sets up all mocks
- Configures global testing environment
- Handles CSS import mocking

## 📊 Test Coverage

The testing structure provides comprehensive coverage:

### **Current Test Status** ✅

- **Total Tests**: 620 tests passing
- **Unit Tests**: 508 tests (11 components + 4 pages + 2 data files + 1 store + 1 composable + 1 types)
- **E2E Tests**: 112 tests (5 test suites)
- **Test Files**: 25 files

### **Components Tested** ✅

**Main Components:**

- **AboutComponent**: About info data processing, education/certification validation, tab configuration
- **ProjectsComponent**: Featured projects integration, swiper configuration, project data validation
- **ServicesComponent**: Services data validation, store integration, responsive design
- **ContactsComponent**: Contact data validation, link formats, color validation, featured distribution
- **StatisticsComponent**: Async data loading, composables integration, statistics processing

**Reusable Components:**

- **SkillsComponent**: Skills data validation, structure, processing logic
- **FlatCard**: Component structure, props, styling, accessibility
- **ProjectPreviewCard**: Project data processing, navigation, image handling
- **StatCard**: Props validation, number formatting, data validation
- **TypewriterComponent**: String array validation, cycling logic, text processing
- **Particles**: Theme integration, configuration, performance optimization

### **Pages Tested** ✅

**Main Pages:**

- **HomePage**: Page structure, component integration, layout validation
- **ProjectsPage**: Projects listing, filtering logic, data validation, store integration
- **ProjectDetailPage**: Project detail rendering, image gallery, breadcrumb navigation
- **NotFoundPage**: 404 page structure, navigation, user experience

### **Data Files Tested** ✅

**Data Validation:**

- **Skills Data**: Data structure, properties validation, consistency checks
- **Projects Data**: Data structure, properties validation, consistency checks

### **Stores Tested** ✅

**State Management:**

- **About Store**: About info, education, certification data management

### **Composables Tested** ✅

**Business Logic:**

- **StatisticsCompasables**: GitHub API integration, Wakatime API integration, error handling

### **Types Tested** ✅

**Type Definitions:**

- **General Types**: Interface validation, type compatibility, structure validation

### **Coverage Areas**

- **Unit Tests**: Component logic, data validation, computed properties
- **E2E Tests**: Page rendering, user interactions, responsive design
- **Mock Coverage**: All external dependencies properly mocked
- **Utility Coverage**: Reusable testing utilities for consistency

## 🎯 Best Practices

1. **Use Mocks**: Always use the provided mocks for external dependencies
2. **Test Structure**: Follow the established directory structure
3. **Descriptive Names**: Use clear, descriptive test names
4. **Group Tests**: Use `describe` blocks to group related tests
5. **Reuse Utilities**: Use the provided test utilities for common operations
6. **Mock Data**: Use the mock data files for consistent test data

## 🔍 Debugging Tests

### Common Issues

1. **CSS Import Errors**: Ensure Vuetify mocks are properly set up
2. **Store Mocking**: Use the provided store mocks or create new ones
3. **Component Import**: Use dynamic imports for Vue components

### Debug Commands

```bash
# Run specific test file
npm run test:run tests/unit/components/SkillsComponent.test.ts

# Run tests with verbose output
npm run test:run -- --reporter=verbose

# Run tests with UI for debugging
npm run test:ui
```

## 📈 Continuous Integration

The testing structure is designed to work seamlessly with CI/CD pipelines:

- **Fast Execution**: Optimized for quick feedback
- **Reliable Mocks**: Consistent testing environment
- **Coverage Reports**: Built-in coverage support
- **Parallel Execution**: Tests can run in parallel

This testing structure provides a solid foundation for maintaining code quality and ensuring reliable functionality across the Skyfolio project.
