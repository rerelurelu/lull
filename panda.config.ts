import { defineConfig, defineGlobalStyles } from '@pandacss/dev'
import { recipes } from '@/themes/recipes'

const globalCss = defineGlobalStyles({
  body: {
    color: 'base',
    bg: 'bg.base',
  },
})

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{ts,tsx,js,jsx}'],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          base: { value: '#2d1b69' },
          head: { value: '#1e1b4b' },
          error: { value: '#f87171' },
          link: { value: '#6d28d9' },
          bg: {
            base: { value: '#eaeaff' },
            codeBlock: { value: '#e2e3efb5' },
          },
          border: {
            section: { value: '#7c3aed' },
          },
          input: {
            border: {
              base: { value: '#7c3aed' },
              focus: { value: '#6d28d9' },
            },
            placeholder: { value: '#9ca3af' },
          },
          button: {
            bg: {
              base: { value: '#7c3aed' },
              hover: { value: '#6d28d9' },
            },
          },
          icon: { value: '#7c3aed' },
          postCard: {
            title: {
              base: { value: '#1e1b4b' },
              hover: { value: '#6d28d9' },
            },
            tag: { value: '#4c1d95' },
            bg: { value: 'linear-gradient(to bottom, #f1f0ff, #e9e7ff)' },
          },
          post: {
            base: { value: '#4c1d95' },
            code: { value: '#1e1b4bcc' },
          },
          header: {
            active: { value: 'linear-gradient(to bottom, #7c3aed, #6d28d9)' },
            bg: { value: '#faf8ff8d' },
          },
          avatar: {
            ring: { value: '#7c3aed' },
          },
          divider: { value: '#c4b5fd' },
        },
      },
      recipes,
    },
  },
  globalCss,
  outdir: 'styled-system',
})
