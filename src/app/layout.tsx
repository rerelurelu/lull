import type { Metadata } from 'next'
import '@/styles/global.css'
import '@/styles/syntax-highlighting.css'
import { M_PLUS_1p } from 'next/font/google'
import { styled } from 'styled-system/jsx'
import { Footer, RevealReplay } from '@/components/layout'
import { createMetadata } from '@/utils/metadata'

const MPlus1p = M_PLUS_1p({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300'],
})

export const metadata: Metadata = createMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={MPlus1p.className}>
        <RevealReplay />
        <styled.div display='grid' minH='100vh' gridTemplateRows='1fr auto' gap={0}>
          <styled.main
            display='flex'
            alignItems='start'
            justifyContent='center'
            mx={{ base: 'xl', md: '2rem' }}
            py={{ base: '3xl', md: '5rem' }}
          >
            {children}
          </styled.main>
          <Footer />
        </styled.div>
      </body>
    </html>
  )
}
