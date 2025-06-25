import { client } from '@/libs/microCMS'
import type { Post, PostsData } from '@/types/post'
import type { MicroCMSQueries } from 'microcms-js-sdk'

const ENDPOINT = process.env.MICROCMS_ENDPOINT as string

export const fetchPosts = async (queries?: MicroCMSQueries): Promise<PostsData> => {
  const data = await client.getList<Post>({ endpoint: ENDPOINT, queries })

  return { posts: data.contents, totalCount: data.totalCount }
}

export const fetchPost = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client.getListDetail<Post>({
    endpoint: ENDPOINT,
    contentId,
    queries,
  })

  return detailData
}
