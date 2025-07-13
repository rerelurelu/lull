import { ImageResponse } from 'next/og'
import { OgpWrapper } from '@/components/features'
import { OGP_FONT } from '@/constants'
import { OGP_IMAGE_SIZE } from '@/constants/index'
import { fetchGoogleFonts } from '@/services/fonts'

export const runtime = 'edge'
export const alt = 'Reluの個人ブログ・技術記事'
export const contentType = 'image/png'

export default async function Image() {
  const font = await fetchGoogleFonts(OGP_FONT)

  return new ImageResponse(<OgpWrapper>Reluの個人ブログ・技術記事</OgpWrapper>, {
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
