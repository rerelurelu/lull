import type { Metadata } from 'next'
import { styled } from 'styled-system/jsx'

const DESCRIPTION = 'ページが見つかりませんでした'

export const metadata: Metadata = {
  title: '404 Page Not Found',
  description: DESCRIPTION,
  openGraph: {
    description: DESCRIPTION,
  },
}

export default function Page() {
  return (
    <styled.div display='grid' placeItems='center' textAlign='center'>
      <styled.p fontSize={{ base: '5rem', md: '9xl' }} fontWeight='bold'>
        404
      </styled.p>
      <styled.p fontSize={{ base: '3xl', md: '5xl' }}>Page Not Found</styled.p>
    </styled.div>
  )
}
