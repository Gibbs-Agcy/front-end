'use client'

import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // ScrollTrigger refresh on resize
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return <>{children}</>
}

