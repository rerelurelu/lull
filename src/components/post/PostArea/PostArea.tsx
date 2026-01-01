import { ViewTransition } from 'react'
import { Grid } from 'styled-system/jsx'
import { PostCard } from '@/components/post'
import type { Post } from '@/types/post'

type Props = {
  posts: Post[]
  className?: string
}

export const PostArea = ({ posts, className }: Props) => {
  return (
    <Grid
      w='100%'
      maxW='1024px'
      gap={{ base: '3xl', md: '2.5rem' }}
      columns={{ sm: 1, md: 2, lg: 3 }}
      className={className}
    >
      {posts.map((post) => (
        <ViewTransition key={post.id} name={`post-${post.id}`}>
          <PostCard
            createdAt={post.publishedAt.slice(0, 10)}
            href={`/post/${post.id}`}
            key={post.id}
            postId={post.id}
            tags={post.tags.map((tag) => tag)}
            title={post.title}
          />
        </ViewTransition>
      ))}
    </Grid>
  )
}
