import type { Metadata } from 'next'
import '@/styles/global.css'
import '@/styles/syntax-highlighting.css'
import { M_PLUS_1p } from 'next/font/google'
import { cx } from 'styled-system/css'
import { flex, grid } from 'styled-system/patterns'
import { ViewTransitionHandler } from '@/components/features'
import { Footer, Header } from '@/components/layout'
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
        <div
          className={cx(
            grid({
              minH: '100vh',
              gridTemplateRows: 'auto 1fr auto',
              gap: 0,
            }),
          )}
        >
          <Header />
          <main
            className={flex({
              alignItems: 'start',
              justifyContent: 'center',
              mx: '2rem',
              py: '2rem',
            })}
          >
            {children}
          </main>
          <Footer />
        </div>
        <ViewTransitionHandler />
      </body>
    </html>
  )
}
