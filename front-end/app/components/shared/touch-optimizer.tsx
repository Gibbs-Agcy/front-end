'use client'

import { useEffect } from 'react'

/**
 * Touch optimizer component
 * Handles touch device detection and optimizations
 */
export function TouchOptimizer() {
  useEffect(() => {
    // Detect touch device
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0

    if (isTouchDevice) {
      document.documentElement.classList.add('touch-device')
    } else {
      document.documentElement.classList.add('no-touch')
    }

    // Prevent double-tap zoom on iOS
    let lastTouchEnd = 0
    const handleTouchEnd = (event: TouchEvent) => {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    }

    document.addEventListener('touchend', handleTouchEnd, false)

    // Improve scroll performance on touch devices
    let ticking = false
    const handleTouchMove = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false
        })
        ticking = true
      }
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return null
}

