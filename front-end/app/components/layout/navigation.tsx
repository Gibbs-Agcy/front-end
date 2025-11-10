'use client'

import Link from 'next/link'
import { NAVIGATION } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

/**
 * Navigation component
 */
export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-8">
      {NAVIGATION.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              isActive && 'text-primary'
            )}
          >
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}

