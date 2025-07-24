# Testing Structure

This directory contains a comprehensive testing setup for the Skyfolio project with organized test types and reusable utilities.

## 📁 Directory Structure

```
tests/
├── mocks/                    # Mock data and utilities
│   ├── skills.mock.ts       # Skills data and store mocks
│   ├── vuetify.mock.ts      # Vuetify component mocks
│   └── nuxt.mock.ts         # Nuxt composables mocks
├── unit/                     # Unit tests
│   └── components/          # Component unit tests
│       ├── SkillsComponent.test.ts
│       ├── FlatCard.test.ts
│       ├── ProjectPreviewCard.test.ts
│       ├── StatCard.test.ts
│       ├── TypewriterComponent.test.ts
│       └── Particles.test.ts
├── e2e/                      # End-to-end tests
│   ├── skills.spec.ts       # Skills page E2E tests
│   └── reusable-components.spec.ts  # Reusable components E2E tests
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

- **Total Tests**: 154 tests passing
- **Unit Tests**: 108 tests (6 components)
- **E2E Tests**: 46 tests (2 test suites)
- **Test Files**: 8 files

### **Components Tested** ✅

- **SkillsComponent**: Skills data validation, structure, processing logic
- **FlatCard**: Component structure, props, styling, accessibility
- **ProjectPreviewCard**: Project data processing, navigation, image handling
- **StatCard**: Props validation, number formatting, data validation
- **TypewriterComponent**: String array validation, cycling logic, text processing
- **Particles**: Theme integration, configuration, performance optimization

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
