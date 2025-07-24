# Badges for README

Add these badges to your main `README.md` file to show the status of your CI/CD pipeline:

## 🏷️ Basic Badges

```markdown
<!-- Test Status -->

![Tests](https://github.com/{username}/{repo-name}/workflows/Test%20Suite/badge.svg)

<!-- Build Status -->

![Build](https://github.com/{username}/{repo-name}/workflows/Deploy/badge.svg)

<!-- Coverage -->

![Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen)

<!-- Node Version -->

![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)

<!-- License -->

![License](https://img.shields.io/badge/license-MIT-blue)
```

## 🏷️ Advanced Badges

```markdown
<!-- GitHub Actions Status -->

[![CI](https://github.com/{username}/{repo-name}/workflows/CI%20-%20Test%20Suite/badge.svg)](https://github.com/{username}/{repo-name}/actions)

<!-- Pull Request Check -->

[![PR Check](https://github.com/{username}/{repo-name}/workflows/Pull%20Request%20Check/badge.svg)](https://github.com/{username}/{repo-name}/actions)

<!-- Deployment Status -->

[![Deploy](https://github.com/{username}/{repo-name}/workflows/Deploy/badge.svg)](https://github.com/{username}/{repo-name}/actions)

<!-- Codecov Coverage -->

[![codecov](https://codecov.io/gh/{username}/{repo-name}/branch/main/graph/badge.svg)](https://codecov.io/gh/{username}/{repo-name})

<!-- NPM Version -->

![npm version](https://img.shields.io/npm/v/{package-name})

<!-- Downloads -->

![npm downloads](https://img.shields.io/npm/dm/{package-name})
```

## 🏷️ Technology Badges

```markdown
<!-- Vue.js -->

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js&logoColor=white)

<!-- Nuxt.js -->

![Nuxt.js](https://img.shields.io/badge/Nuxt.js-3.x-00DC82?logo=nuxt.js&logoColor=white)

<!-- Vuetify -->

![Vuetify](https://img.shields.io/badge/Vuetify-3.x-1867C0?logo=vuetify&logoColor=white)

<!-- TypeScript -->

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)

<!-- Vitest -->

![Vitest](https://img.shields.io/badge/Vitest-1.x-6E9F18?logo=vitest&logoColor=white)
```

## 🏷️ Complete Example

Here's how your badges section should look in your main README:

```markdown
# Skyfolio

A modern portfolio website built with Vue.js, Nuxt.js, and Vuetify.

## 📊 Status

[![CI](https://github.com/{username}/skyfolio/workflows/CI%20-%20Test%20Suite/badge.svg)](https://github.com/{username}/skyfolio/actions)
[![PR Check](https://github.com/{username}/skyfolio/workflows/Pull%20Request%20Check/badge.svg)](https://github.com/{username}/skyfolio/actions)
[![Deploy](https://github.com/{username}/skyfolio/workflows/Deploy/badge.svg)](https://github.com/{username}/skyfolio/actions)
[![codecov](https://codecov.io/gh/{username}/skyfolio/branch/main/graph/badge.svg)](https://codecov.io/gh/{username}/skyfolio)

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js&logoColor=white)
![Nuxt.js](https://img.shields.io/badge/Nuxt.js-3.x-00DC82?logo=nuxt.js&logoColor=white)
![Vuetify](https://img.shields.io/badge/Vuetify-3.x-1867C0?logo=vuetify&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-1.x-6E9F18?logo=vitest&logoColor=white)

![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
```

## 🔧 Customization

### Replace Placeholders

- `{username}`: Your GitHub username
- `{repo-name}`: Your repository name
- `{package-name}`: Your npm package name (if applicable)

### Custom Badges

You can create custom badges using [Shields.io](https://shields.io/):

```markdown
![Custom Badge](https://img.shields.io/badge/custom-text-blue?style=for-the-badge&logo=github)
```

### Dynamic Badges

For dynamic badges that update automatically:

```markdown
<!-- Test Count -->

![Tests](https://img.shields.io/badge/tests-620%20passing-brightgreen)

<!-- Coverage Percentage -->

![Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen)
```

## 📝 Notes

1. **Update URLs**: Make sure to replace `{username}` and `{repo-name}` with your actual values
2. **Workflow Names**: The workflow names in the badges must match exactly with your workflow file names
3. **Branch Names**: Update branch names if you're not using `main` as your default branch
4. **External Services**: Some badges require setting up external services (Codecov, etc.)

## 🎯 Next Steps

1. Add the badges to your main README.md
2. Set up Codecov for coverage badges
3. Configure deployment platforms for deployment badges
4. Update badge URLs with your actual repository information
