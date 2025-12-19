import { defineRecipe } from '@pandacss/dev'

export const gradientRecipe = defineRecipe({
  className: 'gradient',
  description: 'Gradient background styles',
  base: {},
  variants: {
    type: {
      primary: {
        background: 'linear-gradient(135deg, {colors.brand.primary} 0%, {colors.brand.light} 100%)',
      },
      primaryHorizontal: {
        background: 'linear-gradient(90deg, {colors.brand.primary}, {colors.brand.light})',
      },
      dark: {
        background: 'linear-gradient(135deg, {colors.head} 0%, {colors.brand.primary} 100%)',
      },
      header: {
        background:
          'linear-gradient(135deg, {colors.overlay.white.95} 0%, rgba(246, 247, 254, 0.9) 100%)',
      },
      footer: {
        background: 'linear-gradient(to bottom, transparent 0%, {colors.overlay.bg.footer} 100%)',
      },
      ogp: {
        background:
          'linear-gradient(to right, {colors.ogp.gradient.from} 0%, {colors.ogp.gradient.to} 100%)',
      },
      divider: {
        background:
          'linear-gradient(90deg, transparent 0%, {colors.divider} 50%, transparent 100%)',
      },
      linkCard: {
        background: 'linear-gradient(135deg, rgba(100, 125, 238, 0.1), rgba(127, 83, 172, 0.1))',
      },
      linkCardHover: {
        background: 'linear-gradient(135deg, rgba(100, 125, 238, 0.15), rgba(127, 83, 172, 0.15))',
      },
      postCard: {
        background: 'linear-gradient(135deg, #FFFFFF 0%, {colors.bg.base} 100%)',
      },
      radialGlow: {
        background:
          'radial-gradient(ellipse at center, {colors.overlay.purple.light.10} 0%, transparent 70%)',
      },
    },
  },
  defaultVariants: {
    type: 'primary',
  },
})
