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
          base: { value: '#4a5568' },
          head: { value: '#2d3748' },
          error: { value: '#f87171' },
          link: { value: '#4299e1' },
          bg: {
            base: { value: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 50%, #fef5e7 100%)' },
            codeBlock: { value: '#e2e3efb5' },
          },
          border: {
            section: { value: '#81c6e8' },
          },
          input: {
            border: {
              base: { value: '#81c6e8' },
              focus: { value: '#4299e1' },
            },
            placeholder: { value: '#a0aec0' },
          },
          button: {
            bg: {
              base: { value: '#81c6e8' },
              hover: { value: '#4299e1' },
            },
          },
          icon: { value: '#81c6e8' },
          postCard: {
            title: {
              base: { value: '#2d3748' },
              hover: { value: '#4299e1' },
            },
            tag: { value: '#5a67d8' },
            bg: { value: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(237, 242, 247, 0.8) 50%, rgba(254, 245, 231, 0.9) 100%)' },
          },
          post: {
            base: { value: '#4a5568' },
            code: { value: '#2d3748cc' },
          },
          header: {
            active: { value: 'linear-gradient(135deg, #81c6e8 0%, #fbb6ce 100%)' },
            bg: { value: 'rgba(247, 250, 252, 0.85)' },
          },
          avatar: {
            ring: { value: '#81c6e8' },
          },
          divider: { value: '#cbd5e0' },
        },
      },
      recipes,
    },
  },
  globalCss,
  outdir: 'styled-system',
})
