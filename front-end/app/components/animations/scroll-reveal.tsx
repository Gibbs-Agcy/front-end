'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useInView } from 'react-intersection-observer'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  className?: string
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px', // Preload
  })

  const setRefs = (element: HTMLDivElement) => {
    elementRef.current = element
    inViewRef(element)
  }

  useEffect(() => {
    if (!elementRef.current || !inView) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      if (elementRef.current) {
        elementRef.current.style.opacity = '1'
        elementRef.current.style.transform = 'none'
      }
      return
    }

    const directions = {
      up: { y: 40, x: 0 },
      down: { y: -40, x: 0 },
      left: { x: 40, y: 0 },
      right: { x: -40, y: 0 },
    }

    gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        ...directions[direction],
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power2.out',
        clearProps: 'all', // Clean up
      }
    )
  }, [inView, direction, delay, duration])

  return (
    <div ref={setRefs} className={className}>
      {children}
    </div>
  )
}

