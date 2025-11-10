'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { cn } from '@/lib/utils'

interface MaskedTextProps {
  children: string
  className?: string
  delay?: number
}

export function MaskedText({ children, className = '', delay = 0 }: MaskedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const chars = children.split('')
    containerRef.current.innerHTML = ''

    chars.forEach((char, index) => {
      const span = document.createElement('span')
      span.style.display = 'inline-block'
      span.style.overflow = 'hidden'
      span.style.position = 'relative'

      const inner = document.createElement('span')
      inner.textContent = char === ' ' ? '\u00A0' : char
      inner.style.display = 'inline-block'
      inner.style.position = 'relative'

      span.appendChild(inner)
      containerRef.current?.appendChild(span)
    })

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      const innerSpans = containerRef.current.querySelectorAll('span span')
      innerSpans.forEach((span) => {
        ;(span as HTMLElement).style.transform = 'translateY(0%)'
      })
      return
    }

    const innerSpans = containerRef.current.querySelectorAll('span span')

    const animation = gsap.from(innerSpans, {
      yPercent: 100,
      duration: 1,
      stagger: 0.02,
      delay,
      ease: 'power4.out',
    })

    return () => {
      animation.kill()
    }
  }, [children, delay])

  return <div ref={containerRef} className={className} />
}

