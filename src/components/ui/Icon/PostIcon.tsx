import type { SVGProps } from 'react'

export const PostIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.25}
      strokeLinecap='round'
      strokeLinejoin='round'
      shapeRendering='geometricPrecision'
      aria-hidden='true'
      {...props}
    >
      <path d='M3 1.5 L8 1.5 L11 4.5 L11 12.5 L3 12.5 Z' />
      <path d='M8 1.5 L8 4.5 L11 4.5' />
      <path d='M5 7.75 L9 7.75' />
      <path d='M5 10 L9 10' />
    </svg>
  )
}
