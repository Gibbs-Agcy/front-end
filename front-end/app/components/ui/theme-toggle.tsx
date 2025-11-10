'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

/**
 * Theme toggle component for dark/light mode
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    const root = document.documentElement
    const currentTheme = root.classList.contains('dark') ? 'dark' : 'light'
    setTheme(currentTheme)
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    const newTheme = theme === 'light' ? 'dark' : 'light'
    root.classList.toggle('dark')
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn('w-10 h-10 p-0', className)}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  )
}

