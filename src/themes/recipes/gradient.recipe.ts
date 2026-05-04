import { defineRecipe } from '@pandacss/dev'

export const gradientRecipe = defineRecipe({
  className: 'gradient',
  description: 'Gradient background styles',
  base: {},
  variants: {
    type: {
      primary: {
        background: 'linear-gradient(135deg, {colors.brand.primary} 0%, {colors.brand.dark} 100%)',
      },
      dark: {
        background: 'linear-gradient(135deg, {colors.head} 0%, {colors.brand.dark} 100%)',
      },
      divider: {
        background:
          'linear-gradient(90deg, transparent 0%, {colors.divider} 50%, transparent 100%)',
      },
      ogp: {
        background:
          'linear-gradient(to right, {colors.ogp.gradient.from} 0%, {colors.ogp.gradient.to} 100%)',
      },
      radialGlow: {
        background:
          'radial-gradient(ellipse at center, rgba(88, 174, 224, 0.10) 0%, transparent 70%)',
      },
    },
  },
  defaultVariants: {
    type: 'primary',
  },
})
