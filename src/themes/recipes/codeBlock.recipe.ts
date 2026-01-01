import { defineRecipe } from '@pandacss/dev'

export const codeBlockRecipe = defineRecipe({
  className: 'code-block',
  description: 'Code block component styles',
  base: {
    position: 'relative',
    borderRadius: 'md',
    overflow: 'hidden',
    my: '2xl',
  },
  variants: {
    variant: {
      default: {
        layerStyle: 'codeBlock.wrapper',
      },
      inline: {
        display: 'inline-block',
        px: 'md',
        py: 'xs',
        borderRadius: 'sm',
        bg: 'bg.codeBlock',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
