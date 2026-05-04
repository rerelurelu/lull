import { defineConfig, defineGlobalStyles } from '@pandacss/dev'
import { recipes } from '@/themes/recipes'

const globalCss = defineGlobalStyles({
  body: {
    color: 'base',
    bg: 'bg.base',
    minHeight: '100vh',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    textRendering: 'optimizeLegibility',
  },
  '::selection': {
    background: '{colors.mist.200}',
    color: '{colors.navy.900}',
  },
})

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{ts,tsx,js,jsx}'],
  exclude: [],
  jsxFramework: 'react',
  theme: {
    extend: {
      tokens: {
        colors: {
          mist: {
            50: { value: '#F4F8EE' },
            100: { value: '#E8F0DA' },
            200: { value: '#D7E5C9' },
            300: { value: '#C4D8AF' },
            400: { value: '#B0CB99' },
            500: { value: '#9CB7A2' },
            600: { value: '#82A089' },
            700: { value: '#688671' },
            800: { value: '#4F6C57' },
            900: { value: '#36533D' },
          },
          sage: {
            400: { value: '#9CB7A2' },
            600: { value: '#6E8C77' },
          },
          cyan: {
            300: { value: '#8AC8EA' },
            500: { value: '#58AEE0' },
            600: { value: '#3F92C5' },
            700: { value: '#2C7AAA' },
          },
          navy: {
            500: { value: '#2A3654' },
            700: { value: '#1B2540' },
            900: { value: '#121A2F' },
          },
          signal: {
            300: { value: '#E5E780' },
            500: { value: '#D7D84F' },
            700: { value: '#B8B931' },
          },
          system: {
            error: { value: '#E27676' },
          },
          white: { value: '#FFFFFF' },
          black: { value: '#000000' },
        },
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
        radii: {
          sm: { value: '0.25rem' },
          md: { value: '0.5rem' },
          lg: { value: '1rem' },
          full: { value: '9999px' },
          pill: { value: '9999px' },
        },
      },
      semanticTokens: {
        colors: {
          base: { value: '{colors.navy.900}' },
          head: { value: '{colors.navy.700}' },
          muted: { value: '{colors.mist.700}' },
          link: { value: '{colors.cyan.700}' },
          'link.hover': { value: '{colors.cyan.600}' },
          signal: { value: '{colors.signal.700}' },
          error: { value: '{colors.system.error}' },
          bg: {
            base: { value: '{colors.white}' },
            subtle: { value: '{colors.mist.50}' },
            codeBlock: { value: 'rgba(27, 37, 64, 0.05)' },
            codeHeader: { value: 'rgba(27, 37, 64, 0.08)' },
          },
          border: {
            subtle: { value: '{colors.mist.300}' },
            strong: { value: '{colors.sage.400}' },
          },
          divider: { value: '{colors.mist.300}' },
          brand: {
            primary: { value: '{colors.cyan.500}' },
            dark: { value: '{colors.cyan.700}' },
            signal: { value: '{colors.signal.500}' },
          },
          ogp: {
            gradient: {
              from: { value: '{colors.cyan.700}' },
              to: { value: '{colors.navy.700}' },
            },
          },
          icon: { value: '{colors.cyan.600}' },
          avatar: {
            ring: { value: '{colors.sage.400}' },
          },
          postCard: {
            title: {
              base: { value: '{colors.head}' },
              hover: { value: '{colors.brand.primary}' },
            },
          },
          post: {
            base: { value: '{colors.base}' },
            code: { value: '{colors.navy.700}' },
          },
          overlay: {
            white: {
              10: { value: 'rgba(255, 255, 255, 0.5)' },
              20: { value: 'rgba(255, 255, 255, 0.7)' },
              50: { value: 'rgba(255, 255, 255, 0.85)' },
            },
          },
        },
      },
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
          h1: { value: { fontSize: '2.25rem', lineHeight: '2.5rem', fontWeight: '500' } },
          h2: { value: { fontSize: '2rem', lineHeight: '2.5rem', fontWeight: '500' } },
          h3: { value: { fontSize: '1.75rem', lineHeight: '2.25rem', fontWeight: '400' } },
          h4: { value: { fontSize: '1.5rem', lineHeight: '2rem', fontWeight: '400' } },
          h5: { value: { fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: '400' } },
          h6: { value: { fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: '400' } },
        },
        code: {
          inline: { value: { fontSize: '0.875rem', fontFamily: 'monospace' } },
          block: { value: { fontSize: '0.875rem', lineHeight: '1.5rem', fontFamily: 'monospace' } },
        },
      },
      layerStyles: {
        gradient: {
          primary: {
            value: {
              background:
                'linear-gradient(135deg, {colors.brand.primary} 0%, {colors.brand.dark} 100%)',
            },
          },
          divider: {
            value: {
              background:
                'linear-gradient(90deg, transparent 0%, {colors.divider} 50%, transparent 100%)',
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
              background: '{colors.bg.codeHeader}',
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
      keyframes: {
        reveal: {
          from: { opacity: '0', filter: 'blur(6px)' },
          to: { opacity: '1', filter: 'none' },
        },
        revealPanel: {
          from: { opacity: '0', filter: 'blur(4px)' },
          to: { opacity: '1', filter: 'none' },
        },
        fadeIn: {
          from: { opacity: '0', filter: 'blur(2px)' },
          to: { opacity: '1', filter: 'none' },
        },
      },
      recipes,
    },
  },
  globalCss,
  outdir: 'styled-system',
})
