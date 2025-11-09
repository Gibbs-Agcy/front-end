'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface TerminalProps {
  lines: string[]
  className?: string
  typingSpeed?: number
}

export function Terminal({
  lines,
  className,
  typingSpeed = 30,
}: TerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentLine >= lines.length) return

    const line = lines[currentLine]

    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setCurrentChar(currentChar + 1)
      }, typingSpeed)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line])
        setCurrentLine(currentLine + 1)
        setCurrentChar(0)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [currentLine, currentChar, lines, typingSpeed])

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [displayedLines, currentChar])

  const getLineColor = (line: string) => {
    if (line.startsWith('$')) return 'text-purple-400'
    if (line.startsWith('>')) return 'text-cyan-400'
    if (line.includes('✓') || line.includes('✨')) return 'text-green-400'
    if (line.includes('⚡')) return 'text-yellow-400'
    if (line.includes('🚀')) return 'text-blue-400'
    if (line.includes('📊') || line.includes('👥')) return 'text-pink-400'
    return 'text-green-400'
  }

  // Check for reduced motion and show all lines immediately
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const prefersMotion = mediaQuery.matches
    setPrefersReducedMotion(prefersMotion)

    if (prefersMotion && displayedLines.length === 0) {
      setDisplayedLines(lines)
      setCurrentLine(lines.length)
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
      if (e.matches && displayedLines.length === 0) {
        setDisplayedLines(lines)
        setCurrentLine(lines.length)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [lines, displayedLines.length])

  return (
    <div
      className={cn(
        'rounded-xl bg-black/95 p-4 font-mono text-sm shadow-2xl border border-primary/20',
        className
      )}
      role="log"
      aria-label="Terminal output"
    >
      {/* Window Controls */}
      <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="ml-4 text-xs text-white/50">gibbs-terminal</div>
      </div>

      {/* Terminal Content */}
      <div
        ref={containerRef}
        className="space-y-1 overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
      >
        {displayedLines.map((line, i) => (
          <div key={i} className={cn('leading-relaxed', getLineColor(line))}>
            {line}
          </div>
        ))}
        {currentLine < lines.length && !prefersReducedMotion && (
          <div
            className={cn(
              'leading-relaxed',
              getLineColor(lines[currentLine])
            )}
          >
            {lines[currentLine].substring(0, currentChar)}
            <span className="terminal-cursor">▊</span>
          </div>
        )}
      </div>
    </div>
  )
}

