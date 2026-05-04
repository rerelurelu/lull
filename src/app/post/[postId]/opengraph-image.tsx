import { ImageResponse } from 'next/og'
import { OgpWrapper } from '@/components/layout'
import { MAX_OGP_TEXT_LENGTH, OGP_FONT } from '@/constants'
import { OGP_IMAGE_SIZE } from '@/constants/index'
import { fetchGoogleFonts } from '@/services/fonts'
import { fetchPost } from '@/services/post'

export const runtime = 'edge'
export const alt = 'Reluの投稿記事'
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params
  const font = await fetchGoogleFonts(OGP_FONT)
  const post = await fetchPost(postId)

  return new ImageResponse(<OgpWrapper>{post.title.slice(0, MAX_OGP_TEXT_LENGTH)}</OgpWrapper>, {
    ...OGP_IMAGE_SIZE,
    fonts: [
      {
        name: OGP_FONT,
        data: font,
        style: 'normal',
        weight: 100,
      },
    ],
  })
}
