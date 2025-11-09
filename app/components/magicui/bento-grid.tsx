import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto',
        className
      )}
    >
      {children}
    </div>
  )
}

export function BentoCard({
  children,
  className,
  spotlight = false,
  onMouseEnter,
  onMouseLeave,
}: {
  children: ReactNode
  className?: string
  spotlight?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}) {
  return (
    <div
      className={cn(
        'group relative rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg',
        spotlight && 'md:col-span-2 lg:row-span-2',
        className
      )}
      data-spotlight={spotlight ? 'true' : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}

