import { defineConfig } from 'vitest/config'

// Game tests drive a real headless Chromium through Playwright, so they need
// generous timeouts. Each test file launches its own browser.
export default defineConfig({
  test: {
    include: ['tests/**/*.test.js'],
    environment: 'node',
    pool: 'forks',
    testTimeout: 180_000,
    hookTimeout: 60_000,
  },
})
