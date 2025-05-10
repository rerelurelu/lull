import type { Metadata } from 'next'
import '@/styles/global.css'
import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ViewTransitions } from 'next-view-transitions'
import Head from 'next/head'
import { cx } from 'styled-system/css'
import { flex, grid } from 'styled-system/patterns'

export const metadata: Metadata = {
  title: { template: '%s | Relu', default: 'Relu' },
  openGraph: {
    images:
      'https://github.com/rerelurelu/kilonova/assets/43092452/f9f07b5d-2bae-4c17-a95e-14a88dd93579',
    type: 'website',
    title: {
      template: '%s | Relu',
      default: 'Relu',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang='ja'>
        <Head>
          <meta name='twitter:card' content='summary_large_image' />
        </Head>
        <body>
          <SpeedInsights />
          <div
            className={cx(
              grid({
                minH: '100vh',
                gridTemplateRows: 'auto 1fr auto',
                rowGap: { base: '6rem', md: '8rem' },
              }),
            )}
          >
            <Header />
            <main
              className={flex({
                alignItems: 'start',
                justifyContent: 'center',
                mx: '2rem',
              })}
            >
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ViewTransitions>
  )
}
