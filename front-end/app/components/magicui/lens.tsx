'use client'

import { cn } from '@/lib/utils'

interface LensProps {
  children: React.ReactNode
  className?: string
}

export function Lens({ children, className }: LensProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {children}
    </div>
  )
}

