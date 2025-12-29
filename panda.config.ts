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
          brand: {
            primary: { value: '#3F4C9C' },
            light: { value: '#5B6FD8' },
            dark: { value: '#2d1b69' },
            darker: { value: '#1e1b4b' },
          },
          overlay: {
            brand: {
              10: { value: 'rgba(63, 76, 156, 0.1)' },
              20: { value: 'rgba(63, 76, 156, 0.2)' },
              30: { value: 'rgba(63, 76, 156, 0.3)' },
            },
            white: {
              10: { value: 'rgba(255, 255, 255, 0.1)' },
              20: { value: 'rgba(255, 255, 255, 0.2)' },
              50: { value: 'rgba(255, 255, 255, 0.5)' },
              95: { value: 'rgba(250, 251, 255, 0.95)' },
            },
            purple: {
              light: {
                10: { value: 'rgba(91, 111, 216, 0.08)' },
                20: { value: 'rgba(91, 111, 216, 0.2)' },
                30: { value: 'rgba(91, 111, 216, 0.3)' },
              },
            },
            braille: {
              inner: { value: 'rgba(123, 142, 255, 0.6)' },
              outer: { value: 'rgba(63, 76, 156, 0.4)' },
              glow: { value: 'rgba(91, 111, 216, 0.2)' },
              innerHover: { value: 'rgba(123, 142, 255, 0.7)' },
              outerHover: { value: 'rgba(63, 76, 156, 0.5)' },
              glowHover: { value: 'rgba(91, 111, 216, 0.3)' },
              border: { value: 'rgba(63, 76, 156, 0.3)' },
            },
            bg: {
              footer: { value: 'rgba(246, 247, 254, 0.5)' },
            },
          },
          surface: {
            light: { value: '#E6E8F9' },
            muted: { value: '#6b7280' },
          },
          ogp: {
            gradient: {
              from: { value: '#3F4C9C' },
              to: { value: '#2d1b69' },
            },
          },
        },
      },
      recipes,
    },
  },
  globalCss,
  outdir: 'styled-system',
})
