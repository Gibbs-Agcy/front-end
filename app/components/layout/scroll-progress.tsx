'use client'

import { useEffect, useState } from 'react'
import { useScrollProgress } from '@/app/hooks/use-scroll-progress'
import { cn } from '@/lib/utils'

/**
 * Scroll progress indicator component with glow effect
 */
export function ScrollProgress() {
  const progress = useScrollProgress()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(progress > 0)
  }, [progress])

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-[9999] h-[3px] transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      aria-hidden="true"
    >
      {/* Progress Bar */}
      <div
        className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />

      {/* Glow Effect */}
      <div
        className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-transparent to-primary/50 blur-xl transition-all duration-300"
        style={{
          transform: `translateX(${progress}%)`,
          opacity: progress > 5 ? 1 : 0,
        }}
      />
    </div>
  )
}

