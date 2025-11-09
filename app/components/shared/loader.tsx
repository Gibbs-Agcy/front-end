'use client'

import { useEffect, useState } from 'react'
import { gsap } from '@/lib/gsap-config'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Page loader component with animated logo and progress bar
 */
export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Hide loader after loading complete
    const timer = setTimeout(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReducedMotion) {
        setIsLoading(false)
        return
      }

      gsap.to('.page-loader', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => setIsLoading(false),
      })
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="page-loader fixed inset-0 z-[10000] flex items-center justify-center bg-background">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-gradient" />

      {/* Loader Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full animate-pulse" />
          <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-spin-slow">
            <Sparkles className="h-10 w-10 text-white animate-pulse" />
          </div>
        </div>

        {/* Brand */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight animate-pulse">
            GIBBS
          </h1>
          <p className="text-sm text-muted-foreground italic">
            Tasarımın Gücü, Kodun Zarafeti
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 space-y-2">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="text-center text-xs text-muted-foreground">
            {Math.min(Math.round(progress), 100)}%
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-sm text-muted-foreground animate-pulse">
          Yükleniyor...
        </div>
      </div>
    </div>
  )
}

