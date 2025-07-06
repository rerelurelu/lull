import { recipes } from '@/themes/recipes'
import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

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
          base: { value: '#e0e0e0' },
          head: { value: '#ffffff' },
          error: { value: '#f87171' },
          link: { value: '#ffcc00' },
          bg: {
            base: { value: '#1a1a1a' },
            codeBlock: { value: '#2a2a2a' },
          },
          border: {
            section: { value: '#ffcc00' },
          },
          input: {
            border: {
              base: { value: '#ffcc00' },
              focus: { value: '#ff6b35' },
            },
            placeholder: { value: '#888888' },
          },
          button: {
            bg: {
              base: { value: '#ffcc00' },
              hover: { value: '#ff6b35' },
            },
          },
          icon: { value: '#ffcc00' },
          postCard: {
            title: {
              base: { value: '#ffffff' },
              hover: { value: '#ffcc00' },
            },
            tag: { value: '#ffcc00' },
            bg: { value: 'linear-gradient(to bottom right, #2a2a2a, #1a1a1a)' },
          },
          post: {
            base: { value: '#cccccc' },
            code: { value: '#f2f4ffcc' },
          },
          header: {
            active: { value: 'linear-gradient(to bottom, #ffcc00, #ff6b35)' },
            bg: { value: '#1a1a1a4d' },
          },
          avatar: {
            ring: { value: '#ffcc00' },
          },
          divider: { value: '#333333' },
        },
      },
      recipes,
    },
  },
  globalCss,
  outdir: 'styled-system',
})
