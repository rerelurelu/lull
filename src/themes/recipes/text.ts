import { defineRecipe } from '@pandacss/dev'

export const text = defineRecipe({
  className: 'text',
  description: 'The Styles for the text component',
  base: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  variants: {
    size: {
      sm: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
      },
      lg: {
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
      },
      xl: {
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
      },
      '2xl': {
        fontSize: '1.5rem',
        lineHeight: '2rem',
      },
      '3xl': {
        fontSize: '1.875rem',
        lineHeight: '2.25rem',
      },
      '4xl': {
        fontSize: '2.25rem',
        lineHeight: '2.5rem',
      },
    },
  },
})
