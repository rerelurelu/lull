import Image from 'next/image'
import Link from 'next/link'
import { css, cx } from 'styled-system/css'
import { styled } from 'styled-system/jsx'

type Props = {
  href: string
  areaLabel: string
  src: string
  width: number
  height: number
  alt: string
  target?: string
  linkStyle?: string
  iconStyle?: string
}

const StyledLink = styled(Link)

export const IconLink = ({
  href,
  areaLabel,
  src,
  width,
  height,
  alt,
  target = '_blank',
  linkStyle,
  iconStyle,
}: Props) => {
  return (
    <StyledLink
      href={href}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      aria-label={areaLabel}
      textDecoration='underline'
      _hover={{ opacity: '0.7' }}
      className={linkStyle}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        loading='lazy'
        decoding='async'
        className={cx(css({ objectFit: 'fill' }), iconStyle)}
      />
    </StyledLink>
  )
}
