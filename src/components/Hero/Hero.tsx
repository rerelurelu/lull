import { css } from 'styled-system/css'
import { Braille } from './fragments/Braille'

export const Hero = () => {
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDir: 'row',
        gap: '2rem',
        flexWrap: 'wrap',
        w: '100%',
        h: 'fit-content',
      })}
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
