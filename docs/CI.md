# CI and Deployment

## Branches

| Branch | Purpose |
| --- | --- |
| `master` | Integration branch. Every change lands here through a pull request. |
| `release` | Production. Netlify builds and deploys this branch. |
| `<type>/<topic>` | One branch per issue (e.g. `fix/seo-static-rendering-404`), opened as a PR into `master`. |

## GitHub Actions

Workflows live in `.github/workflows/`.

| Workflow | File | Runs on | What it does |
| --- | --- | --- | --- |
| Test Suite | `test.yml` | push and PR to `main`, `master`, `develop` | `npm ci`, `npm run test:all`, uploads `coverage/` as an artifact (30 days) |
| Pull Request Check | `pr-check.yml` | PR to `main`, `master`, `develop` | `npm ci`, unit tests, e2e tests, coverage, then comments on the PR |

Both use Node.js 22 (same as Netlify) and the npm cache.

### Recommended branch protection

In **Settings -> Branches**, protect `master` (and `release`):

- Require a pull request before merging
- Require status checks to pass: **Run Tests** and **Code Quality Check**
- Require branches to be up to date before merging

## Running the checks locally

```bash
npm ci
npm run test:run       # all tests once
npm run test:unit      # tests/unit only
npm run test:e2e       # tests/e2e only
npm run test:coverage  # coverage report in coverage/
npm run generate       # static build in .output/public
```

To reproduce the exact Netlify output (including `_redirects`):

```bash
NITRO_PRESET=netlify_static npm run generate
```

## Netlify

Configured in `netlify.toml`:

- Build command `npm run generate`, publish directory `.output/public`, Node.js 22
- Long-term caching for hashed assets under `/_nuxt/*`; HTML is always revalidated
- Unknown URLs are served `404.html` with a real `404` status by the `_redirects` file that the Netlify preset generates. Do not add a catch-all `/* -> /200.html` rule.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NUXT_GITHUB_TOKEN` | No | Authenticates the build-time GitHub API call for the statistics section, avoiding the 60 requests/hour unauthenticated limit on shared build IPs. A token with no scopes is enough. |
| `NUXT_OG_IMAGE_SECRET` | No | Used by the `@nuxtjs/seo` OG image module. |

Statistics (GitHub repos, WakaTime hours) are fetched at build time, so they refresh on each deploy. A scheduled Netlify build hook can keep them current.

## Badges

```markdown
[![Test Suite](https://github.com/mohssineAboutaj/skyfolio/actions/workflows/test.yml/badge.svg)](https://github.com/mohssineAboutaj/skyfolio/actions/workflows/test.yml)
[![Pull Request Check](https://github.com/mohssineAboutaj/skyfolio/actions/workflows/pr-check.yml/badge.svg)](https://github.com/mohssineAboutaj/skyfolio/actions/workflows/pr-check.yml)
```
