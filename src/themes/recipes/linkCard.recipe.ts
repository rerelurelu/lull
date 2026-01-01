import { defineSlotRecipe } from '@pandacss/dev'

export const linkCardRecipe = defineSlotRecipe({
  className: 'link-card',
  description: 'Link card component with slots',
  slots: ['root', 'content', 'thumbnail', 'text', 'title', 'description', 'url'],
  base: {
    root: {
      display: 'flex',
      gap: 'xl',
      p: 'xl',
      layerStyle: 'linkCard',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      _hover: {
        transform: 'translateY(-2px)',
      },
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 'md',
    },
    thumbnail: {
      width: '120px',
      height: '120px',
      borderRadius: 'md',
      overflow: 'hidden',
      flexShrink: 0,
    },
    text: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'sm',
    },
    title: {
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
      fontWeight: '600',
      color: 'head',
    },
    description: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      color: 'base',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
    },
    url: {
      fontSize: '0.75rem',
      lineHeight: '1rem',
      color: 'link',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
})
