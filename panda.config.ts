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
          base: { value: '#191C37' },
          head: { value: '#2C3269' },
          error: { value: '#f87171' },
          link: { value: '#3F4C9C' },
          bg: {
            base: { value: '#F8F9FE' },
            codeBlock: { value: '#EEF0FAB5' },
          },
          border: {
            section: { value: '#3F4C9C' },
          },
          input: {
            border: {
              base: { value: '#3F4C9C' },
              focus: { value: '#353E84' },
            },
            placeholder: { value: '#9ca3af' },
          },
          button: {
            bg: {
              base: { value: '#3F4C9C' },
              hover: { value: '#353E84' },
            },
          },
          icon: { value: '#3F4C9C' },
          postCard: {
            title: {
              base: { value: '#2C3269' },
              hover: { value: '#3F4C9C' },
            },
            tag: { value: '#353E84' },
            bg: { value: 'linear-gradient(to bottom, #FFFFFF, #F8F9FE)' },
          },
          post: {
            base: { value: '#353E84' },
            code: { value: '#2C3269CC' },
          },
          header: {
            active: { value: 'linear-gradient(to bottom, #3F4C9C, #353E84)' },
            bg: { value: '#FAFBFFED' },
          },
          avatar: {
            ring: { value: '#3F4C9C' },
          },
          divider: { value: '#C4C9F0' },
        },
      },
      recipes,
    },
  },
  globalCss,
  outdir: 'styled-system',
})
