'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface IconCloudProps {
  icons: string[]
  className?: string
}

export function IconCloud({ icons, className }: IconCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const children = Array.from(container.children) as HTMLElement[]

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Calculate 3D sphere positions
    const radius = 250
    const count = children.length

    children.forEach((child, i) => {
      // Fibonacci sphere distribution for better spacing
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi

      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)

      child.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`

      // Scale based on z-position (depth)
      const scale = (z + radius) / (radius * 2)
      child.style.opacity = String(0.3 + scale * 0.7)
    })

    if (prefersReducedMotion) {
      return
    }

    // Auto-rotation animation
    let rotX = 0
    let rotY = 0

    const animate = () => {
      rotY += 0.3
      rotX = Math.sin(rotY * 0.01) * 10

      container.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [icons])

  return (
    <div className={cn('relative w-full h-full flex items-center justify-center', className)}>
      <div
        ref={containerRef}
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {icons.map((icon, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{
              willChange: 'transform, opacity',
            }}
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-background/50 backdrop-blur-sm border border-border hover:scale-150 hover:bg-background transition-all cursor-pointer group">
              <img
                src={icon}
                alt={`Technology icon ${i + 1}`}
                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                onError={(e) => {
                  // Fallback if image fails to load
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
                loading="lazy"
                decoding="async"
                role="img"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Center Label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="glass px-6 py-3 rounded-full backdrop-blur-xl border border-primary/20">
          <span className="text-sm font-semibold text-gradient">
            {icons.length}+ Teknoloji
          </span>
        </div>
      </div>

      {/* Decorative Ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] border-2 border-dashed border-primary/10 rounded-full animate-spin-slow" />
      </div>
    </div>
  )
}

