import { css } from 'styled-system/css'
import { styled } from 'styled-system/jsx'
import { PostIcon } from '@/components/ui'
import type { Post } from '@/types/post'
import { PostListItem } from './PostListItem'

type Props = {
  posts: Post[]
}

export const PostList = ({ posts }: Props) => {
  return (
    <styled.section w='full'>
      <styled.header display='flex' alignItems='center' gap='md' mb={{ base: 'lg', md: 'xl' }}>
        <PostIcon className={css({ color: 'brand.primary', flexShrink: 0 })} />
        <styled.h2
          fontSize='0.875rem'
          lineHeight='1'
          fontWeight='400'
          color='muted'
          letterSpacing='0.18em'
          textTransform='uppercase'
        >
          Posts
        </styled.h2>
      </styled.header>

      <styled.ol display='flex' flexDir='column' m={0} p={0} listStyle='none'>
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </styled.ol>
    </styled.section>
  )
}
