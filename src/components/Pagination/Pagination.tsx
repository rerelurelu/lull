'use client'

import { PER_PAGE } from '@/constants'
import { useWindowSize } from '@/hooks/useWindowSize'
import { getPagination } from '@/utils/getPagination'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { css, cva } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

type Props = {
  totalCount: number
  currentIndex: number
}

export const Pagination: FC<Props> = ({ totalCount, currentIndex }) => {
  const route = useRouter()
  const { width } = useWindowSize()

  const maxIndex = Math.ceil(totalCount / PER_PAGE)
  const isLaptop = width >= 1024
  const pagination = getPagination(maxIndex, currentIndex, isLaptop)

  const handlePagination = (index: number) => {
    route.push(`/posts/${index}`)
  }

  return (
    <div
      className={flex({
        mt: { base: '4rem', md: '6rem' },
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
      })}
    >
      {currentIndex !== 1 && (
        <li
          className={css({
            w: '24px',
            h: '40px',
            lineHeight: '36px',
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
          })}
        >
          <button
            type='button'
            className={button({ visual: 'icon' })}
            onClick={() => handlePagination(currentIndex - 1)}
          >
            <HiChevronLeft
              className={css({
                w: '24px',
                h: '40px',
                lineHeight: '36px',
                color: 'icon',
                _hover: {
                  opacity: '0.7',
                },
              })}
            />
          </button>
        </li>
      )}
      {pagination.map((number) => (
        <li
          className={css({
            w: '40px',
            h: '40px',
            lineHeight: '36px',
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
          })}
          key={number}
        >
          <button
            type='button'
            className={button({ visual: currentIndex === number ? 'currentPage' : 'default' })}
            onClick={() => handlePagination(number)}
          >
            {number}
          </button>
        </li>
      ))}
      {currentIndex !== maxIndex && (
        <li
          className={css({
            w: '24px',
            h: '40px',
            lineHeight: '36px',
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
          })}
        >
          <button
            type='button'
            className={button({ visual: 'icon' })}
            onClick={() => handlePagination(currentIndex + 1)}
          >
            <HiChevronRight
              className={css({
                w: '24px',
                h: '40px',
                lineHeight: '36px',
                color: 'icon',
                _hover: {
                  opacity: '0.7',
                },
              })}
            />
          </button>
        </li>
      )}
    </div>
  )
}

const button = cva({
  base: {
    pt: '3px',
    w: '40px',
    cursor: 'pointer',
    color: 'white',
    borderRadius: '10px',
    textAlign: 'center',
  },
  variants: {
    visual: {
      default: { bg: 'transparent', _hover: { bg: '#ffffff1a' } },
      currentPage: { bg: '#ad5bba', _hover: { opacity: '0.7' } },
      icon: { w: '20px', h: '40px', pt: 0, bg: 'transparent', _hover: { opacity: '0.7' } },
    },
  },
})
