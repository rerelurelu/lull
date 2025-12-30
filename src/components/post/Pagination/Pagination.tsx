'use client'

import { Pagination as ArkPagination, type UsePaginationProps, usePagination } from '@ark-ui/react'
import { useRouter } from 'next/navigation'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { css, cx } from 'styled-system/css'
import { grid } from 'styled-system/patterns'

type Props = UsePaginationProps & {
  baseUrl: string
  className?: string
}

const clickableItemStyle = css({
  h: '2.5rem',
  minW: '2.5rem',
  cursor: 'pointer',
  borderColor: 'base',
  borderRadius: 'sm',
  transition: 'all 0.3s ease',
  _hover: {
    bg: 'brand.primary',
    color: 'white',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 12px {colors.overlay.brand.30}',
  },
})

const iconWrapperStyle = cx(clickableItemStyle, css({ display: 'grid', placeItems: 'center' }))

export const Pagination = ({ baseUrl, className, ...props }: Props) => {
  const pagination = usePagination({ ...props })
  const router = useRouter()

  const onClickPage = (page: number | null) => {
    if (!page || page === props.defaultPage) return
    router.push(`/${baseUrl}/${page}`)
  }

  return (
    <div className={className}>
      <ArkPagination.RootProvider value={pagination}>
        <div className={css({ display: 'flex', gap: '0.5rem' })}>
          <ArkPagination.PrevTrigger
            className={iconWrapperStyle}
            onClick={() => onClickPage(pagination.previousPage)}
          >
            <FiChevronLeft />
          </ArkPagination.PrevTrigger>
          <ArkPagination.Context>
            {(pagination) =>
              pagination.pages.map((page, idx) =>
                page.type === 'page' ? (
                  <ArkPagination.Item
                    key={`${idx}-${page}`}
                    onClick={() => onClickPage(page.value)}
                    className={cx(
                      clickableItemStyle,
                      css({ border: page.value === props.defaultPage ? '1px solid' : 'none' }),
                    )}
                    {...page}
                  >
                    {page.value}
                  </ArkPagination.Item>
                ) : (
                  <ArkPagination.Ellipsis
                    key={`${idx}-${page}`}
                    index={idx}
                    className={grid({ placeItems: 'center' })}
                  >
                    &#8230;
                  </ArkPagination.Ellipsis>
                ),
              )
            }
          </ArkPagination.Context>
          <ArkPagination.NextTrigger
            className={iconWrapperStyle}
            onClick={() => onClickPage(pagination.nextPage)}
          >
            <FiChevronRight />
          </ArkPagination.NextTrigger>
        </div>
      </ArkPagination.RootProvider>
    </div>
  )
}
