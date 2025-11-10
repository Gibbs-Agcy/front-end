'use client'

import { useEffect } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'

/**
 * Error boundary component
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Bir hata oluştu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Üzgünüz, beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground">
              Hata ID: {error.digest}
            </p>
          )}
          <Button onClick={reset} variant="primary" className="w-full">
            Tekrar Dene
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

