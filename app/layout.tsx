import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/globals.css'
import { Header } from './components/layout/header'
import { Footer } from './components/sections/footer'
import { ScrollProgress } from './components/layout/scroll-progress'
import { GSAPProvider } from './components/animations/gsap-provider'
import { SmoothScroll } from './components/shared/smooth-scroll'
import { CursorFollower } from './components/shared/cursor-follower'
import { PageLoader } from './components/shared/loader'
import { ThemeProvider } from './components/theme-provider'
import { TouchOptimizer } from './components/shared/touch-optimizer'
import { ErrorBoundary } from './components/error-boundary'
import { SITE_CONFIG } from '@/lib/constants'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ['web development', 'digital agency', 'next.js', 'react', 'typescript'],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    creator: '@gibbsagency',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={inter.variable} suppressHydrationWarning>
      <body className="font-body antialiased">
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TouchOptimizer />
            <GSAPProvider>
              <SmoothScroll>
                <PageLoader />
                <ScrollProgress />
                <CursorFollower />
                <a href="#main-content" className="skip-to-content">
                  Skip to content
                </a>
                <Header />
                <main id="main-content" tabIndex={-1}>
                  {children}
                </main>
                <Footer />
                {/* ARIA live region for announcements */}
                <div
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className="sr-only"
                />
              </SmoothScroll>
            </GSAPProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

