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
          base: { value: '#bdc6e9' },
          head: { value: '#ffffff' },
          error: { value: '#f87171' },
          link: { value: '#f472b6' },
          bg: {
            base: { value: '#1a1e2e' },
            codeBlock: { value: '#2b3047' },
          },
          border: {
            section: { value: '#312e81' },
          },
          input: {
            border: {
              base: { value: '#999eef' },
              focus: { value: '#7c3aed' },
            },
            placeholder: { value: '#475569' },
          },
          button: {
            bg: {
              base: { value: '#e879f9' },
              hover: { value: '#22d3ee' },
            },
          },
          icon: { value: '#c4b5fd' },
          postCard: {
            title: {
              base: { value: '#ffffff' },
              hover: { value: '#f0abfc' },
            },
            tag: { value: '#f0abfc' },
            bg: { value: 'linear-gradient(to bottom right, #647dee, #7f53ac)' },
          },
          post: {
            base: { value: '#939ab5' },
            code: { value: '#f2f4ffcc' },
          },
          header: {
            active: { value: 'linear-gradient(to bottom, #00f1f9, #cb33f4)' },
            bg: { value: '#1a1e2e4d' },
          },
          avatar: {
            ring: { value: '#999eef' },
          },
          divider: { value: '#2A2F40' },
        },
      },
      recipes,
    },
  },
  globalCss,
  outdir: 'styled-system',
})
