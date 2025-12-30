import { css, cx } from 'styled-system/css'
import { gradient } from 'styled-system/recipes'
import { Braille } from './Braille'

type Props = {
  className?: string
}

export const Hero = ({ className }: Props) => {
  return (
    <div
      className={cx(
        gradient({ type: 'radialGlow' }),
        css({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexDir: 'row',
          gap: { base: '2rem', md: '2.75rem' },
          flexWrap: 'wrap',
          w: '100%',
          h: 'fit-content',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          p: { base: '6rem 2rem', md: '8rem 3rem' },
        }),
        className,
      )}
    >
      <Braille tl={false} tr={true} ml={true} mr={true} bl={false} br={true} />
      <Braille tl={true} tr={false} ml={false} mr={true} bl={false} br={false} />
      <Braille tl={true} tr={false} ml={true} mr={false} bl={true} br={false} />
      <Braille tl={true} tr={true} ml={false} mr={false} bl={false} br={false} />
      <Braille tl={true} tr={false} ml={false} mr={true} bl={true} br={false} />
      <Braille tl={true} tr={true} ml={false} mr={false} bl={true} br={false} />
      <Braille tl={true} tr={false} ml={false} mr={true} bl={false} br={false} />
      <Braille tl={false} tr={false} ml={true} mr={true} bl={true} br={false} />
    </div>
  )
}
