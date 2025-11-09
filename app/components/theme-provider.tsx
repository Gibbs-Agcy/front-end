'use client'

import * as React from 'react'

/**
 * Theme Provider wrapper
 * Note: We're using a simple implementation without next-themes
 * since it's not in the dependencies. You can add next-themes if needed.
 */
export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}) {
  // Simple theme provider without external dependencies
  // If you want to use next-themes, install it and uncomment:
  // import { ThemeProvider as NextThemesProvider } from 'next-themes'
  // return <NextThemesProvider {...props}>{children}</NextThemesProvider>

  return <>{children}</>
}

