import { defineRecipe } from '@pandacss/dev'

export const badgeRecipe = defineRecipe({
  className: 'badge',
  description: 'Badge/Tag component',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    px: 'lg',
    py: '0.375rem',
    borderRadius: 'full',
    fontSize: '0.6875rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  variants: {
    variant: {
      tag: {
        color: 'postCard.tag',
        bg: 'surface.light',
        border: '1px solid {colors.divider}',
      },
      default: {
        bg: 'overlay.brand.10',
        color: 'brand.primary',
      },
      outline: {
        border: '1px solid {colors.brand.primary}',
        color: 'brand.primary',
        bg: 'transparent',
      },
    },
    size: {
      sm: {
        px: 'md',
        py: 'xs',
        fontSize: '0.625rem',
      },
      md: {
        px: 'lg',
        py: '0.375rem',
        fontSize: '0.6875rem',
      },
      lg: {
        px: 'xl',
        py: 'md',
        fontSize: '0.875rem',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
