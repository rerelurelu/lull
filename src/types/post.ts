export type Tag = {
  id: string
  tagName: string
}

export type Post = {
  publishedAt: string
  title: string
  id: string
  content: string
  tags: Tag[]
}

export type PostsData = {
  posts: Post[]
  totalCount: number
}
