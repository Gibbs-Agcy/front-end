'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { cn } from '@/lib/utils'

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  type?: 'chars' | 'words' | 'lines'
}

export function SplitText({
  children,
  className = '',
  delay = 0,
  stagger = 0.03,
  type = 'chars',
}: SplitTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const text = textRef.current.textContent || ''
    textRef.current.innerHTML = ''

    const elements = type === 'words' ? text.split(' ') : text.split('')

    elements.forEach((char) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      span.style.opacity = prefersReducedMotion ? '1' : '0'
      textRef.current?.appendChild(span)
    })

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      return
    }

    const animation = gsap.to(textRef.current.children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      delay,
      ease: 'power3.out',
      from: { y: 50, opacity: 0 },
    })

    return () => {
      animation.kill()
    }
  }, [children, delay, stagger, type])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}

