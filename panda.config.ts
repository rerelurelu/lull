import { defineConfig, defineGlobalStyles } from '@pandacss/dev'
import { recipes } from '@/themes/recipes'

const globalCss = defineGlobalStyles({
  body: {
    color: 'base',
    bg: 'bg.base',
    minHeight: '100vh',
  },
  '@keyframes pulse': {
    '0%': {
      opacity: '0.6',
      transform: 'scale(1)',
    },
    '100%': {
      opacity: '1',
      transform: 'scale(1.05)',
    },
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
          base: { value: '#e0d4ff' },
          head: { value: '#f0ebff' },
          error: { value: '#ff6b9d' },
          link: { value: '#a855f7' },
          bg: {
            base: { value: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f0f23 50%, #000000 100%)' },
            codeBlock: { value: 'rgba(139, 92, 246, 0.1)' },
          },
          border: {
            section: { value: 'rgba(168, 85, 247, 0.6)' },
          },
          input: {
            border: {
              base: { value: 'rgba(168, 85, 247, 0.4)' },
              focus: { value: 'rgba(168, 85, 247, 0.8)' },
            },
            placeholder: { value: 'rgba(224, 212, 255, 0.6)' },
          },
          button: {
            bg: {
              base: { value: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))' },
              hover: { value: 'linear-gradient(135deg, rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5))' },
            },
          },
          icon: { value: '#a855f7' },
          postCard: {
            title: {
              base: { value: '#f0ebff' },
              hover: { value: '#a855f7' },
            },
            tag: { value: '#c084fc' },
            bg: { value: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)' },
          },
          post: {
            base: { value: '#c084fc' },
            code: { value: 'rgba(240, 235, 255, 0.8)' },
          },
          header: {
            active: { value: 'linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4))' },
            bg: { value: 'rgba(30, 27, 75, 0.4)' },
          },
          avatar: {
            ring: { value: 'rgba(168, 85, 247, 0.6)' },
          },
          divider: { value: 'rgba(192, 132, 252, 0.3)' },
        },
      },
      recipes,
    },
  },
  globalCss,
  outdir: 'styled-system',
})
