import { ImageResponse } from 'next/og'
import { OgpWrapper } from '@/components/layout'
import { OGP_FONT } from '@/constants'
import { OGP_IMAGE_SIZE } from '@/constants/index'
import { fetchGoogleFonts } from '@/services/fonts'

export const runtime = 'edge'
export const alt = 'Reluの自己紹介'
export const contentType = 'image/png'

export default async function Image() {
  const font = await fetchGoogleFonts(OGP_FONT)

  return new ImageResponse(<OgpWrapper>Reluの自己紹介</OgpWrapper>, {
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
