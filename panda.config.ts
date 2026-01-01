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
  jsxFramework: 'react',
  theme: {
    extend: {
      // Primitive Tokens - 生の値を定義
      tokens: {
        colors: {
          // Purple scale - メインカラーパレット
          purple: {
            50: { value: '#F8F9FE' },
            100: { value: '#E6E8F9' },
            200: { value: '#C4C9F0' },
            300: { value: '#9ca3af' },
            400: { value: '#5B6FD8' },
            500: { value: '#3F4C9C' },
            600: { value: '#353E84' },
            700: { value: '#2C3269' },
            800: { value: '#2d1b69' },
            900: { value: '#191C37' },
            950: { value: '#1e1b4b' },
          },
          // Blue scale
          blue: {
            400: { value: '#7B8EFF' },
          },
          // Neutral scale
          neutral: {
            100: { value: '#d0d8ff' },
            400: { value: '#6b7280' },
          },
          // System colors
          system: {
            error: { value: '#f87171' },
          },
          // Pure colors
          white: { value: '#FFFFFF' },
        },
        // Spacing tokens
        spacing: {
          xs: { value: '0.125rem' },
          sm: { value: '0.25rem' },
          md: { value: '0.5rem' },
          lg: { value: '0.75rem' },
          xl: { value: '1rem' },
          '2xl': { value: '1.5rem' },
          '3xl': { value: '2rem' },
          '4xl': { value: '3rem' },
        },
        // Radii tokens
        radii: {
          sm: { value: '0.25rem' },
          md: { value: '0.5rem' },
          lg: { value: '1rem' },
          full: { value: '9999px' },
        },
      },
      // Semantic Tokens - 目的に基づいたトークン（Primitiveを参照）
      semanticTokens: {
        colors: {
          // Text colors
          base: { value: '{colors.purple.900}' },
          head: { value: '{colors.purple.700}' },
          error: { value: '{colors.system.error}' },
          link: { value: '{colors.purple.500}' },
          // Background colors
          bg: {
            base: { value: '{colors.purple.50}' },
            codeBlock: { value: '#EEF0FAB5' },
          },
          // Border colors
          border: {
            section: { value: '{colors.purple.500}' },
          },
          // Input colors
          input: {
            border: {
              base: { value: '{colors.purple.500}' },
              focus: { value: '{colors.purple.600}' },
            },
            placeholder: { value: '{colors.purple.300}' },
          },
          // Button colors
          button: {
            bg: {
              base: { value: '{colors.purple.500}' },
              hover: { value: '{colors.purple.600}' },
            },
          },
          // Icon color
          icon: { value: '{colors.purple.500}' },
          // PostCard colors
          postCard: {
            title: {
              base: { value: '{colors.purple.700}' },
              hover: { value: '{colors.purple.500}' },
            },
            tag: { value: '{colors.purple.600}' },
            bg: { value: 'linear-gradient(to bottom, {colors.white}, {colors.purple.50})' },
          },
          // Post colors
          post: {
            base: { value: '{colors.purple.600}' },
            code: { value: '#2C3269CC' },
          },
          // Header colors
          header: {
            active: {
              value: 'linear-gradient(to bottom, {colors.purple.500}, {colors.purple.600})',
            },
            bg: { value: '#FAFBFFED' },
          },
          // Avatar colors
          avatar: {
            ring: { value: '{colors.purple.500}' },
          },
          // Divider
          divider: { value: '{colors.purple.200}' },
          // Brand colors
          brand: {
            primary: { value: '{colors.purple.500}' },
            light: { value: '{colors.purple.400}' },
            dark: { value: '{colors.purple.800}' },
            darker: { value: '{colors.purple.950}' },
          },
          // Overlay colors
          overlay: {
            brand: {
              10: { value: 'rgba(63, 76, 156, 0.1)' },
              20: { value: 'rgba(63, 76, 156, 0.2)' },
              30: { value: 'rgba(63, 76, 156, 0.3)' },
            },
            white: {
              10: { value: 'rgba(255, 255, 255, 0.1)' },
              20: { value: 'rgba(255, 255, 255, 0.2)' },
              50: { value: 'rgba(255, 255, 255, 0.5)' },
              95: { value: 'rgba(250, 251, 255, 0.95)' },
            },
            purple: {
              light: {
                10: { value: 'rgba(91, 111, 216, 0.08)' },
                20: { value: 'rgba(91, 111, 216, 0.2)' },
                30: { value: 'rgba(91, 111, 216, 0.3)' },
              },
            },
            braille: {
              inner: { value: 'rgba(123, 142, 255, 0.6)' },
              outer: { value: 'rgba(63, 76, 156, 0.4)' },
              glow: { value: 'rgba(91, 111, 216, 0.2)' },
              innerHover: { value: 'rgba(123, 142, 255, 0.7)' },
              outerHover: { value: 'rgba(63, 76, 156, 0.5)' },
              glowHover: { value: 'rgba(91, 111, 216, 0.3)' },
              border: { value: 'rgba(63, 76, 156, 0.3)' },
            },
            bg: {
              footer: { value: 'rgba(246, 247, 254, 0.5)' },
            },
          },
          // Surface colors
          surface: {
            light: { value: '{colors.purple.100}' },
            muted: { value: '{colors.neutral.400}' },
          },
          // OGP colors
          ogp: {
            gradient: {
              from: { value: '{colors.purple.500}' },
              to: { value: '{colors.purple.800}' },
            },
          },
        },
      },
      // Text Styles - タイポグラフィ管理
      textStyles: {
        body: {
          DEFAULT: { value: { fontSize: '1rem', lineHeight: '1.5rem' } },
          sm: { value: { fontSize: '0.875rem', lineHeight: '1.25rem' } },
          lg: { value: { fontSize: '1.125rem', lineHeight: '1.75rem' } },
          xl: { value: { fontSize: '1.25rem', lineHeight: '1.75rem' } },
          '2xl': { value: { fontSize: '1.5rem', lineHeight: '2rem' } },
          '3xl': { value: { fontSize: '1.875rem', lineHeight: '2.25rem' } },
          '4xl': { value: { fontSize: '2.25rem', lineHeight: '2.5rem' } },
        },
        heading: {
          h1: { value: { fontSize: '2.25rem', lineHeight: '2.5rem', fontWeight: '600' } },
          h2: { value: { fontSize: '2rem', lineHeight: '2.5rem', fontWeight: '600' } },
          h3: { value: { fontSize: '1.75rem', lineHeight: '2.25rem', fontWeight: '600' } },
          h4: { value: { fontSize: '1.5rem', lineHeight: '2rem', fontWeight: '600' } },
          h5: { value: { fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: '600' } },
          h6: { value: { fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: '600' } },
        },
        code: {
          inline: { value: { fontSize: '0.875rem', fontFamily: 'monospace' } },
          block: { value: { fontSize: '0.875rem', lineHeight: '1.5rem', fontFamily: 'monospace' } },
        },
      },
      // Layer Styles - 背景、ボーダー、シャドウ、不透明度の管理
      layerStyles: {
        gradient: {
          primary: {
            value: {
              background:
                'linear-gradient(135deg, {colors.brand.primary} 0%, {colors.brand.light} 100%)',
            },
          },
          footer: {
            value: {
              background:
                'linear-gradient(135deg, {colors.brand.primary} 0%, {colors.brand.dark} 100%)',
            },
          },
          hero: {
            value: {
              background:
                'linear-gradient(135deg, {colors.brand.primary} 0%, {colors.brand.darker} 100%)',
            },
          },
          card: {
            value: {
              background: '{colors.postCard.bg}',
            },
          },
        },
        codeBlock: {
          wrapper: {
            value: {
              background: '{colors.bg.codeBlock}',
              borderRadius: '{radii.md}',
            },
          },
          header: {
            value: {
              background: '{colors.overlay.white.10}',
            },
          },
        },
        linkCard: {
          DEFAULT: {
            value: {
              borderRadius: '{radii.lg}',
              border: '1px solid {colors.divider}',
            },
          },
        },
      },
      recipes,
    },
  },
  globalCss,
  outdir: 'styled-system',
})
