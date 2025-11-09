'use client'

import { useLenis } from '@/app/hooks/use-lenis'

/**
 * Smooth scroll wrapper component
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useLenis()
  return <>{children}</>
}

