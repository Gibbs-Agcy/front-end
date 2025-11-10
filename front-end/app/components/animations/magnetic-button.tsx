'use client'

import { useRef, MouseEvent, memo } from 'react'
import { gsap } from '@/lib/gsap-config'
import { Button, ButtonProps } from '../ui/button'
import { cn } from '@/lib/utils'

interface MagneticButtonProps extends ButtonProps {
  strength?: number
}

/**
 * Magnetic button that follows mouse cursor
 * Respects prefers-reduced-motion for accessibility
 */
function MagneticButtonComponent({
  children,
  className,
  strength = 0.3,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const button = ref.current
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(button, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!ref.current) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  return (
    <Button
      ref={ref}
      className={cn('relative', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Button>
  )
}

// Memoize component for performance
export const MagneticButton = memo(MagneticButtonComponent)

