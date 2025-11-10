'use client'

import { cn } from '@/lib/utils'
import { CSSProperties } from 'react'

interface MarqueeProps {
  children: React.ReactNode
  pauseOnHover?: boolean
  reverse?: boolean
  speed?: 'slow' | 'normal' | 'fast'
  gradient?: boolean
  className?: string
}

export function Marquee({
  children,
  pauseOnHover = true,
  reverse = false,
  speed = 'normal',
  gradient = true,
  className,
}: MarqueeProps) {
  const speeds: Record<string, string> = {
    slow: '60s',
    normal: '40s',
    fast: '20s',
  }

  const marqueeStyle: CSSProperties = {
    '--marquee-duration': speeds[speed],
    '--marquee-direction': reverse ? 'reverse' : 'normal',
  } as CSSProperties

  return (
    <div
      className={cn(
        'group relative flex overflow-hidden',
        gradient &&
          '[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]',
        className
      )}
      style={marqueeStyle}
    >
      <div
        className={cn(
          'flex shrink-0 items-center justify-around gap-0 animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        {children}
        {children}
      </div>
    </div>
  )
}

