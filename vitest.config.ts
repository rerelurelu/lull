import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './vitest.setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      'styled-system': path.resolve(import.meta.dirname, './styled-system'),
    },
  },
})
