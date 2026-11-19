import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    // tests/e2e holds Playwright specs (npm run test:e2e)
    include: ['tests/unit/**/*.{test,spec}.ts'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    css: true,
    deps: {
      optimizer: {
        web: {
          include: ['vuetify'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
}) 