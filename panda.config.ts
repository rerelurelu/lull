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
  '@keyframes neonGlow': {
    '0%, 100%': {
      textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px currentColor',
      filter: 'brightness(1)',
    },
    '50%': {
      textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor',
      filter: 'brightness(1.2)',
    },
  },
  '@keyframes borderGlow': {
    '0%, 100%': {
      boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, inset 0 0 5px rgba(0, 255, 255, 0.1)',
    },
    '50%': {
      boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, inset 0 0 10px rgba(0, 255, 255, 0.2)',
    },
  },
  body: {
    color: 'base',
    bg: 'bg.base',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
  },
  '*': {
    transition: 'all 0.3s ease-in-out',
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
          'neon-glow': { value: 'neonGlow 2s ease-in-out infinite' },
          'border-glow': { value: 'borderGlow 2s ease-in-out infinite' },
        },
        colors: {
          base: { value: '#e0e0ff' },
          head: { value: '#ff00ff' },
          error: { value: '#ff0080' },
          link: { value: '#00ffff' },
          bg: {
            base: { value: 'radial-gradient(ellipse at center, #1a0d2e 0%, #16213e 30%, #0f3460 100%)' },
            codeBlock: { value: 'rgba(31, 41, 55, 0.8)' },
          },
          border: {
            section: { value: '#00ffff' },
          },
          input: {
            border: {
              base: { value: '#00ffff' },
              focus: { value: '#ff00ff' },
            },
            placeholder: { value: '#8892b0' },
          },
          button: {
            bg: {
              base: { value: 'linear-gradient(135deg, #ff00ff, #00ffff)' },
              hover: { value: 'linear-gradient(135deg, #ff0080, #0080ff)' },
            },
          },
          icon: { value: '#00ffff' },
          postCard: {
            title: {
              base: { value: '#e0e0ff' },
              hover: { value: '#ff00ff' },
            },
            tag: { value: '#00ffff' },
            bg: { value: 'linear-gradient(135deg, rgba(255, 0, 255, 0.1), rgba(0, 255, 255, 0.1))' },
          },
          post: {
            base: { value: '#e0e0ff' },
            code: { value: '#00ffffcc' },
          },
          header: {
            active: { value: 'linear-gradient(to right, #ff00ff, #00ffff)' },
            bg: { value: 'rgba(26, 13, 46, 0.95)' },
          },
          avatar: {
            ring: { value: '#00ffff' },
          },
          divider: { value: '#ff00ff' },
          cyberpunk: {
            magenta: { value: '#ff00ff' },
            cyan: { value: '#00ffff' },
            purple: { value: '#8b00ff' },
            blue: { value: '#0080ff' },
            darkBg: { value: '#1a0d2e' },
          },
        },
      },
      recipes,
    },
  },
  globalCss,
  outdir: 'styled-system',
})
