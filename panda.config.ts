import { recipes } from '@/themes/recipes'
import { defineConfig } from '@pandacss/dev'

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
          link: { value: '#f472b6' },
          bg: {
            base: { value: '#1a1e2e' },
            codeBlock: { value: '#2b3047' },
          },
          border: {
            section: { value: '#312e81' },
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
  outdir: 'styled-system',
})
