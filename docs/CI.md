# CI and Deployment

## Branches

| Branch | Purpose |
| --- | --- |
| `master` | Integration branch. Every change lands here through a pull request. |
| `release` | Production. Netlify builds and deploys this branch. |
| `<type>/<topic>` | One branch per issue (e.g. `fix/seo-static-rendering-404`), opened as a PR into `master`. |

## GitHub Actions

Workflows live in `.github/workflows/`.

One workflow, **Test Suite** (`test.yml`), runs on pushes and pull requests to `master` and `release`, with two jobs (Node.js 22, same as Netlify):

| Job | Steps |
| --- | --- |
| **Typecheck and unit tests** | `npm ci`, `npm run typecheck`, Vitest with coverage. A coverage table is added to the run summary and `coverage/` is uploaded as an artifact (14 days). |
| **Build and e2e tests** | `npm ci`, `nuxt generate` with the `netlify_static` preset (any prerender error fails the build), then Playwright e2e tests in Chromium. The Playwright report and traces are uploaded when it fails. |

### Recommended branch protection

In **Settings -> Branches**, protect `master` (and `release`):

- Require a pull request before merging
- Require status checks to pass: **Typecheck and unit tests** and **Build and e2e tests**
- Require branches to be up to date before merging

## Running the checks locally

```bash
npm ci
npm run typecheck      # vue-tsc via nuxi typecheck
npm run test:all       # unit tests with coverage (coverage/)

# e2e: build the site the way Netlify does, then run Playwright against it
npx playwright install chromium   # once
NITRO_PRESET=netlify_static npm run generate
npm run test:e2e
```

The e2e tests serve `.output/public` with `scripts/serve-static.mjs`, which mimics Netlify: unknown paths get `404.html` with a real 404 status.

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
