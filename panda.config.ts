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
          base: { value: '#2c3e50' },
          head: { value: '#34495e' },
          error: { value: '#e74c3c' },
          link: { value: '#e67e22' },
          bg: {
            base: { value: '#b8e0e8' },
            codeBlock: { value: '#ecf0f1' },
          },
          border: {
            section: { value: '#e67e22' },
          },
          input: {
            border: {
              base: { value: '#e67e22' },
              focus: { value: '#d35400' },
            },
            placeholder: { value: '#7f8c8d' },
          },
          button: {
            bg: {
              base: { value: '#e67e22' },
              hover: { value: '#d35400' },
            },
          },
          icon: { value: '#e67e22' },
          postCard: {
            title: {
              base: { value: '#2c3e50' },
              hover: { value: '#e67e22' },
            },
            tag: { value: '#34495e' },
            bg: { value: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.7))' },
          },
          post: {
            base: { value: '#2c3e50' },
            code: { value: '#34495ecc' },
          },
          header: {
            active: { value: 'linear-gradient(to bottom, #e67e22, #d35400)' },
            bg: { value: 'rgba(255,255,255,0.85)' },
          },
          avatar: {
            ring: { value: '#e67e22' },
          },
          divider: { value: '#bdc3c7' },
        },
      },
      recipes,
    },
  },
  globalCss,
  outdir: 'styled-system',
})
