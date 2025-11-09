'use client'

import { useState, useEffect } from 'react'

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

/**
 * Hook to get current breakpoint
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<string>('mobile')

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < breakpoints.sm) setBreakpoint('mobile')
      else if (width < breakpoints.md) setBreakpoint('sm')
      else if (width < breakpoints.lg) setBreakpoint('md')
      else if (width < breakpoints.xl) setBreakpoint('lg')
      else if (width < breakpoints['2xl']) setBreakpoint('xl')
      else setBreakpoint('2xl')
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint
}

/**
 * Check if device is mobile
 */
export function isMobile() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < breakpoints.md
}

/**
 * Check if device is tablet
 */
export function isTablet() {
  if (typeof window === 'undefined') return false
  return (
    window.innerWidth >= breakpoints.md &&
    window.innerWidth < breakpoints.lg
  )
}

/**
 * Check if device is desktop
 */
export function isDesktop() {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= breakpoints.lg
}

/**
 * Check if device is touch device
 */
export function isTouchDevice() {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

