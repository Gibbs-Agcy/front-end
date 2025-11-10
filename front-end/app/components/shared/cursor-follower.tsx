'use client'

import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@/app/hooks/use-media-query'
import { cn } from '@/lib/utils'

/**
 * Optimized cursor follower component with smooth performance
 */
export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const rafRef = useRef<number | null>(null)

  // Optimized mouse tracking with requestAnimationFrame
  useEffect(() => {
    if (!isDesktop || !cursorRef.current || !cursorDotRef.current) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let dotX = 0
    let dotY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      // Smooth interpolation for cursor ring (slower)
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15

      // Faster interpolation for dot
      dotX += (mouseX - dotX) * 0.5
      dotY += (mouseY - dotY) * 0.5

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isDesktop])

  // Hover detection with event delegation
  useEffect(() => {
    if (!isDesktop) return

    const checkHoverable = (target: HTMLElement | null): boolean => {
      if (!target) return false
      return !!(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('a, button, input, textarea, [role="button"], .cursor-pointer')
      )
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(checkHoverable(target))
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })
    document.addEventListener('mousedown', handleMouseDown, { passive: true })
    document.addEventListener('mouseup', handleMouseUp, { passive: true })

    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <>
      {/* Main Cursor Ring */}
      <div
        ref={cursorRef}
        className={cn(
          'fixed w-10 h-10 border-2 border-primary rounded-full pointer-events-none z-[9998] mix-blend-difference will-change-transform',
          isHovering && 'scale-150',
          isClicking && 'scale-75'
        )}
        style={{
          transform: 'translate(-20px, -20px)',
          transition: isHovering || isClicking ? 'transform 0.2s ease-out' : 'none',
        }}
        aria-hidden="true"
      />

      {/* Cursor Dot */}
      <div
        ref={cursorDotRef}
        className={cn(
          'fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform',
          isClicking && 'scale-0'
        )}
        style={{
          transform: 'translate(-4px, -4px)',
          transition: isClicking ? 'transform 0.1s ease-out' : 'none',
        }}
        aria-hidden="true"
      />
    </>
  )
}

