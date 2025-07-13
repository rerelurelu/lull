import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/constants'

type CreateMetadataOptions = {
  title?: string
  description?: string
  path?: string
  type?: 'website' | 'article'
  images?: string | string[]
}

export const createMetadata = ({
  title,
  description = SITE_CONFIG.description,
  path = '',
  type = 'website',
  images,
}: CreateMetadataOptions = {}): Metadata => {
  const url = `${SITE_CONFIG.url}${path}`
  const fullTitle = title ? `${title} | ${SITE_CONFIG.title}` : SITE_CONFIG.title

  const metadata: Metadata = {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.title,
      type,
      locale: SITE_CONFIG.language,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: url,
    },
  }

  // images が指定されている場合のみ設定
  if (images) {
    if (metadata.openGraph) {
      metadata.openGraph.images = images
    }
    if (metadata.twitter) {
      metadata.twitter.images = images
    }
  }

  return metadata
}

export const createArticleMetadata = (
  title: string,
  description: string,
  path: string,
): Metadata => {
  return createMetadata({
    title,
    description,
    path,
    type: 'article',
  })
}
