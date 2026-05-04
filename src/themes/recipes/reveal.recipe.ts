import { defineRecipe } from '@pandacss/dev'

export const revealRecipe = defineRecipe({
  className: 'reveal',
  description: 'Hologram reveal entrance animation',
  base: {
    opacity: 0,
    animationDuration: '300ms',
    animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    animationFillMode: 'forwards',
  },
  variants: {
    kind: {
      reveal: { animationName: 'reveal' },
      panel: { animationName: 'revealPanel' },
      fade: { animationName: 'fadeIn' },
    },
    delay: {
      0: { animationDelay: '0ms' },
      30: { animationDelay: '20ms' },
      60: { animationDelay: '40ms' },
      90: { animationDelay: '60ms' },
      120: { animationDelay: '80ms' },
    },
  },
  defaultVariants: {
    kind: 'reveal',
    delay: 0,
  },
})
