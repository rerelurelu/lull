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
          base: { value: '#1a365d' },
          head: { value: '#0f2027' },
          error: { value: '#f87171' },
          link: { value: '#0369a1' },
          bg: {
            base: { value: 'linear-gradient(135deg, #e0f7fa 0%, #b3e5fc 50%, #e1f5fe 100%)' },
            codeBlock: { value: '#e2f8ffb5' },
          },
          border: {
            section: { value: '#0891b2' },
          },
          input: {
            border: {
              base: { value: '#0891b2' },
              focus: { value: '#0369a1' },
            },
            placeholder: { value: '#64748b' },
          },
          button: {
            bg: {
              base: { value: '#0284c7' },
              hover: { value: '#0369a1' },
            },
          },
          icon: { value: '#0891b2' },
          postCard: {
            title: {
              base: { value: '#0f2027' },
              hover: { value: '#0369a1' },
            },
            tag: { value: '#155e75' },
            bg: { value: 'linear-gradient(to bottom, rgba(224, 247, 250, 0.8), rgba(179, 229, 252, 0.6))' },
          },
          post: {
            base: { value: '#155e75' },
            code: { value: '#0f2027cc' },
          },
          header: {
            active: { value: 'linear-gradient(to bottom, #0891b2, #0369a1)' },
            bg: { value: 'rgba(224, 247, 250, 0.55)' },
          },
          avatar: {
            ring: { value: '#0891b2' },
          },
          divider: { value: '#7dd3fc' },
        },
      },
      recipes,
    },
  },
  globalCss,
  outdir: 'styled-system',
})
