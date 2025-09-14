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
          base: { value: '#e0f0ff' },
          head: { value: '#00ffff' },
          error: { value: '#ff0080' },
          link: { value: '#00d4ff' },
          bg: {
            base: { value: 'linear-gradient(135deg, #0a0a0a, #1a0d2e, #2a1810)' },
            codeBlock: { value: '#e2e8f0b5' },
          },
          border: {
            section: { value: '#00ffff' },
          },
          input: {
            border: {
              base: { value: '#00ffff' },
              focus: { value: '#ff00ff' },
            },
            placeholder: { value: '#8899bb' },
          },
          button: {
            bg: {
              base: { value: 'linear-gradient(135deg, #00ffff, #0099cc)' },
              hover: { value: 'linear-gradient(135deg, #ff00ff, #cc0066)' },
            },
          },
          icon: { value: '#00ffff' },
          postCard: {
            title: {
              base: { value: '#00ffff' },
              hover: { value: '#ff00ff' },
            },
            tag: { value: '#ffff00' },
            bg: { value: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.05), rgba(255, 255, 0, 0.05))' },
          },
          post: {
            base: { value: '#e0f0ff' },
            code: { value: '#00ffffcc' },
          },
          header: {
            active: { value: 'linear-gradient(to right, #00ffff, #ff00ff)' },
            bg: { value: 'rgba(10, 10, 10, 0.9)' },
          },
          avatar: {
            ring: { value: '#00ffff' },
          },
          divider: { value: '#ff00ff' },
          neon: {
            cyan: { value: '#00ffff' },
            magenta: { value: '#ff00ff' },
            yellow: { value: '#ffff00' },
            orange: { value: '#ff8800' },
          },
        },
      },
      recipes,
    },
  },
  globalCss,
  outdir: 'styled-system',
})
