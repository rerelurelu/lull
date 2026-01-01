import type { Metadata } from 'next'
import { css } from 'styled-system/css'
import { styled } from 'styled-system/jsx'
import { Hero } from '@/components/layout'
import { PostArea } from '@/components/post'
import { TextLink } from '@/components/ui'
import { fetchPosts } from '@/services/post'
import { createMetadata } from '@/utils/metadata'

export const metadata: Metadata = createMetadata({
  title: 'Home',
  path: '/',
})

export default async function Home() {
  const { posts } = await fetchPosts({ limit: 3 })

  return (
    <styled.div
      display='grid'
      h='full'
      gridTemplateRows='auto 1fr'
      justifyItems='center'
      gap={{ base: '4rem', md: '6rem' }}
    >
      <Hero className={css({ py: { base: '4rem', md: '6rem' } })} />
      <styled.div
        display='grid'
        gridTemplateRows='auto auto 1fr'
        justifyItems='center'
        gap={{ base: '2.5rem', md: '3.75rem' }}
        w='full'
      >
        <styled.div
          w='full'
          maxW='1024px'
          display='flex'
          flexDir='column'
          alignItems='center'
          gap='xl'
        >
          <styled.h2
            fontSize={{ base: '1.875rem', md: '2.25rem' }}
            fontWeight='300'
            letterSpacing='0.02em'
            color='head'
            textAlign='center'
          >
            Recent Posts
          </styled.h2>
          <styled.div
            pos='relative'
            w='full'
            h='1px'
            bg='linear-gradient(90deg, transparent 0%, {colors.divider} 50%, transparent 100%)'
            _before={{
              content: '""',
              pos: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              w: '8px',
              h: '8px',
              bg: 'brand.primary',
              borderRadius: 'full',
              boxShadow: '0 0 0 4px {colors.surface.base}, 0 0 12px {colors.brand.primary}',
            }}
            _after={{
              content: '""',
              pos: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              w: '16px',
              h: '16px',
              border: '1px solid',
              borderColor: 'brand.light',
              borderRadius: 'full',
              opacity: '0.3',
            }}
          />
        </styled.div>
        <PostArea posts={posts} />
        <TextLink text='See all posts →' href={'/posts/1'} />
      </styled.div>
    </styled.div>
  )
}
