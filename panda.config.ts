import { defineConfig, defineGlobalStyles } from '@pandacss/dev'
import { recipes } from '@/themes/recipes'

const globalCss = defineGlobalStyles({
  '@keyframes wave-gentle': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-8px)' },
  },
  '@keyframes ripple': {
    '0%': { transform: 'scale(1)', opacity: '0.8' },
    '100%': { transform: 'scale(1.2)', opacity: '0' },
  },
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-12px)' },
  },
  body: {
    color: 'base',
    bg: 'bg.base',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
  },
  '*': {
    transition: 'all 0.2s ease-in-out',
  },
})

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{ts,tsx,js,jsx}'],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        animations: {
          'wave-gentle': { value: 'wave-gentle 3s ease-in-out infinite' },
          'ripple': { value: 'ripple 0.6s ease-out' },
          'float': { value: 'float 4s ease-in-out infinite' },
        },
        colors: {
          base: { value: '#4a3a5a' },
          head: { value: '#c8a2ff' },
          error: { value: '#ff6b9d' },
          link: { value: '#a855f7' },
          bg: {
            base: { value: 'linear-gradient(135deg, #f8e8ff 0%, #ffe4f3 30%, #fff4a3 60%, #e4f3ff 100%)' },
            codeBlock: { value: '#e2e8f0b5' },
          },
          border: {
            section: { value: '#c8a2ff' },
          },
          input: {
            border: {
              base: { value: '#c8a2ff' },
              focus: { value: '#ffb3e6' },
            },
            placeholder: { value: '#8a7ca8' },
          },
          button: {
            bg: {
              base: { value: 'linear-gradient(135deg, #c8a2ff, #d8b3ff)' },
              hover: { value: 'linear-gradient(135deg, #ffb3e6, #ffcaed)' },
            },
          },
          icon: { value: '#c8a2ff' },
          postCard: {
            title: {
              base: { value: '#6b46c1' },
              hover: { value: '#ec4899' },
            },
            tag: { value: '#f59e0b' },
            bg: { value: 'linear-gradient(135deg, rgba(200, 162, 255, 0.15), rgba(255, 179, 230, 0.1), rgba(255, 244, 163, 0.1))' },
          },
          post: {
            base: { value: '#4a3a5a' },
            code: { value: '#c8a2ffcc' },
          },
          header: {
            active: { value: 'linear-gradient(to right, #c8a2ff, #ffb3e6)' },
            bg: { value: 'rgba(248, 232, 255, 0.95)' },
          },
          avatar: {
            ring: { value: '#c8a2ff' },
          },
          divider: { value: '#ffb3e6' },
          pastel: {
            purple: { value: '#c8a2ff' },
            pink: { value: '#ffb3e6' },
            yellow: { value: '#fff4a3' },
            blue: { value: '#a3d9ff' },
          },
        },
      },
      recipes,
    },
  },
  globalCss,
  outdir: 'styled-system',
})
