# Skyfolio

A modern, responsive portfolio website built with Vue.js, Nuxt.js, and Vuetify. Showcase your projects, skills, and professional information with a beautiful, interactive design.

<div style="text-align: center;">
  <a href="https://github.com/mohssineAboutaj/skyfolio/actions/workflows/test.yml"><img src="https://github.com/mohssineAboutaj/skyfolio/actions/workflows/test.yml/badge.svg" alt="Test Suite" /></a>
  <img src="https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js&logoColor=white" alt="Vue.js" />
  <img src="https://img.shields.io/badge/Nuxt-4.x-00DC82?logo=nuxt.js&logoColor=white" alt="Nuxt" />
  <img src="https://img.shields.io/badge/Vuetify-3.x-1867C0?logo=vuetify&logoColor=white" alt="Vuetify" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vitest-4.x-6E9F18?logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/Node.js-22-brightgreen" alt="Node.js" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
</div>

## Table of Contents

- [Features](#features)
  - [Modern UI/UX](#modern-uiux)
  - [Components](#components)
  - [Technical Features](#technical-features)
  - [Testing Infrastructure](#testing-infrastructure)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
  - [SkillsComponent](#skillscomponent)
  - [ProjectsComponent](#projectscomponent)
  - [StatisticsComponent](#statisticscomponent)
- [Testing](#testing)
  - [Test Coverage](#test-coverage)
  - [What's Tested](#whats-tested)
  - [Running Tests](#running-tests)
- [CI/CD Pipeline](#cicd-pipeline)
  - [GitHub Actions](#github-actions)
  - [Workflows](#workflows)
- [Customization](#customization)
  - [Personal Information](#personal-information)
  - [Projects](#projects)
  - [Skills](#skills)
  - [Styling](#styling)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Nuxt Configuration](#nuxt-configuration)
- [Responsive Design](#responsive-design)
  - [Breakpoints](#breakpoints)
  - [Features](#features-1)
- [Deployment](#deployment)
  - [Static Site Generation](#static-site-generation)
  - [Deployment Platforms](#deployment-platforms)
- [Contributing](#contributing)
  - [Development Guidelines](#development-guidelines)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Support](#support)

## Features

### **Modern UI/UX**

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Material Design**: Beautiful Vuetify components with smooth animations
- **Dark Theme**: Dark Vuetify theme by default
- **Interactive Elements**: Hover effects, transitions, and micro-interactions

### **Components**

- **Header**: Navigation with smooth scrolling and mobile menu
- **Hero Section**: Eye-catching introduction with typewriter effect
- **About**: Personal information, experience, education, and certifications
- **Skills**: Grouped skill chips (core stack and categories)
- **Projects**: Portfolio showcase with filtering and detailed views
- **Services**: Professional services offered
- **Statistics**: GitHub repositories and coding activity
- **Contact**: Contact information and social links

### **Technical Features**

- **TypeScript**: Full type safety and better development experience
- **Pinia Store**: State management for data and settings
- **Composables**: Reusable logic for API calls and data fetching
- **SEO Optimized**: Meta tags, OG image, and static generation
- **Static Site**: Pre-rendered with Nuxt for fast hosting (e.g. Netlify)

### **Testing Infrastructure**

- **Unit Tests**: Vitest for components, stores, data and utils
- **E2E Tests**: Playwright against the generated static site (desktop and mobile)
- **CI/CD Pipeline**: Automated testing on GitHub Actions
- **Coverage Reports**: Detailed test coverage analysis

## Quick Start

### Prerequisites

- Node.js 22 (same as Netlify and CI)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/mohssineAboutaj/skyfolio.git
cd skyfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build

# Testing
npm run test         # Run all tests
npm run test:unit    # Run unit tests only
npm run test:e2e     # Run E2E tests only
npm run test:coverage # Run tests with coverage
npm run test:all     # Run complete test suite

# Type checking
npm run typecheck    # Check TypeScript types
```

## Project Structure

```
skyfolio/
├── components/              # Vue components
│   ├── AboutComponent.vue   # About section
│   ├── ProjectsComponent.vue # Projects showcase
│   ├── SkillsComponent.vue  # Skills with progress bars
│   ├── ServicesComponent.vue # Services offered
│   ├── ContactsComponent.vue # Contact information
│   ├── StatisticsComponent.vue # GitHub/Wakatime stats
│   └── ...                  # Other components
├── pages/                   # Nuxt pages
│   ├── index.vue           # Home page
│   ├── projects/           # Projects pages
│   └── 404.vue             # Not found page
├── stores/                  # Pinia stores
│   ├── about.ts            # About data store
│   ├── projects.ts         # Projects data store
│   ├── skills.ts           # Skills data store
│   └── ...                 # Other stores
├── data/                    # Static data
│   ├── projects.data.ts    # Project information
│   ├── skills.data.ts      # Skills data
│   ├── services.data.ts    # Services data
│   └── about/              # About data
├── composables/             # Reusable logic (useAppShell, useGsap, ...)
├── utils/                   # Pure helpers
│   └── statistics.ts       # GitHub/WakaTime API fetchers
├── tests/                   # Test files
│   ├── unit/               # Unit tests
│   ├── e2e/                # E2E tests
│   ├── mocks/              # Mock data
│   └── setup.ts            # Test setup
├── public/                  # Static assets
│   └── images/             # Project images
└── types/                   # TypeScript types
    └── general.ts          # Common interfaces
```

## Key Components

### **SkillsComponent**

- **Card-based Design**: Each skill displayed as a modern card
- **Progress Bars**: Visual representation of proficiency levels
- **Colored Icons**: Icons colored according to skill themes
- **Responsive Layout**: Adapts to different screen sizes

### **ProjectsComponent**

- **Filtering**: Filter projects by category and technology
- **Detailed Views**: Individual project pages with galleries
- **Image Galleries**: Swiper-based image carousels
- **External Links**: GitHub and live demo links

### **StatisticsComponent**

- **GitHub Integration**: Real-time repository count
- **Wakatime Integration**: Coding activity statistics
- **API Composables**: Reusable data fetching logic
- **Error Handling**: Graceful fallbacks for API failures

## Testing

### **Test Coverage**

- **Unit tests** (`tests/unit/`, Vitest): components, pages, stores, data and utils
- **E2E tests** (`tests/e2e/`, Playwright): run in Chromium at desktop and mobile sizes against the generated site, served the way Netlify serves it (`scripts/serve-static.mjs`). They cover the home page, statistics, toolbar/drawer navigation, resume download, the prerendered project list, project pages and real 404 responses.

### **What's Tested**

- **Components** (11): All Vue components with props and logic
- **Pages** (4): Home, Projects, Project Detail, 404
- **Data Files** (2): Skills and Projects data validation
- **Stores** (1): Pinia store state management
- **Composables** (1): API integration logic
- **Types** (1): TypeScript interface validation

### **Running Tests**

```bash
# Unit tests (with coverage)
npm run test:all

# Unit tests only, no coverage
npm run test:unit

# E2E tests: generate the site first, then run Playwright
npx playwright install chromium   # once
npm run generate
npm run test:e2e
```

## CI/CD Pipeline

### **GitHub Actions**

- **Runs on**: pushes and pull requests to `master` and `release`
- **Typecheck + unit tests**: coverage summary shown on the workflow run page
- **Build + e2e**: `nuxt generate` with the Netlify preset (fails on any prerender error), then Playwright

### **Workflows**

- **`test.yml`**: two jobs, "Typecheck and unit tests" and "Build and e2e tests"

See [docs/CI.md](docs/CI.md) for branches, workflows, branch protection, Netlify settings and environment variables.

## Customization

### **Personal Information**

Update your personal data in the `data/` directory:

- `data/about/info.data.ts` - Personal information
- `data/about/edu.data.ts` - Education history
- `data/about/cert.data.ts` - Certifications

### **Projects**

Add your projects in `data/projects.data.ts`:

```typescript
{
  id: 'project-name',
  title: 'Project Title',
  description: 'Project description',
  images: ['image1.png', 'image2.png'],
  types: ['Web App', 'Mobile'],
  tech: ['Vue.js', 'TypeScript'],
  visible: true,
  featured: true
}
```

### **Skills**

Configure your skills in `data/skills.data.ts`:

```typescript
{
  id: 'skill-name',
  name: 'Skill Name',
  icon: 'skill-icon',
  color: '#FF5722',
  score: 85
}
```

### **Styling**

- **Vuetify Theme**: Customize colors and typography
- **Component Styling**: Modify individual component styles
- **Responsive Design**: Adjust breakpoints and layouts

## Configuration

### **Environment Variables**

All optional. See [docs/CI.md](docs/CI.md#environment-variables).

```bash
# Authenticates the build-time GitHub API call for the statistics section
NUXT_GITHUB_TOKEN=your_github_token
```

WakaTime data comes from a public share link and needs no key.

### **Nuxt Configuration**

- **Vuetify**: Material Design components
- **TypeScript**: Full type safety
- **SEO**: Meta tags and structured data
- **Performance**: Optimized builds and caching

## Responsive Design

### **Breakpoints**

- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px

### **Features**

- **Mobile Menu**: Hamburger menu for mobile navigation
- **Touch-Friendly**: Optimized for touch interactions
- **Flexible Layouts**: Components adapt to screen size
- **Optimized Images**: Responsive image loading

## Deployment

### **Static Site Generation**

```bash
# Generate static site
npm run generate

# Preview generated site
npm run preview
```

### **Deployment Platforms**

Production is deployed to **Netlify** from the `release` branch (see `netlify.toml` and [docs/CI.md](docs/CI.md#netlify)). The generated `.output/public` folder also works on any static host.

## Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Add** tests for new features
5. **Run** the test suite
6. **Submit** a pull request

### **Development Guidelines**

- Follow Vue.js style guide
- Write tests for new components
- Use TypeScript for type safety
- Keep components small and focused
- Document complex logic

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 mohssineAboutaj

## Acknowledgments

- **Vue.js**: Progressive JavaScript framework
- **Nuxt.js**: Full-stack Vue framework
- **Vuetify**: Material Design component library
- **Vitest**: Fast unit testing framework
- **GitHub Actions**: CI/CD automation

## Support

If you have any questions or need help:

1. **Check the documentation**: Review this README and `CI_SETUP.md`
2. **CI/CD Documentation**: See `.github/CI_DOCUMENTATION.md` for workflow details
3. **Badge Configuration**: See `BADGE_CONFIGURATION.md` for status badge setup
4. **Run tests locally**: Ensure all tests pass with `npm run test:all`
5. **Check GitHub Actions**: View detailed logs in the Actions tab
6. **Open an issue**: Report bugs or request features

---

**Ready to showcase your portfolio?** Start customizing your data and deploy your professional portfolio today!
