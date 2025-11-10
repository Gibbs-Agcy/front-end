import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

/**
 * 404 Not Found page
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        {/* 404 Text */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-gradient opacity-20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass p-8 rounded-2xl">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold mb-2">Sayfa Bulunamadı</h2>
              <p className="text-muted-foreground">
                Aradığınız sayfa taşınmış veya silinmiş olabilir.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:scale-105 transition-transform"
          >
            <Home className="h-5 w-5" />
            Ana Sayfaya Dön
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full font-semibold hover:scale-105 transition-transform"
          >
            <ArrowLeft className="h-5 w-5" />
            Geri Dön
          </button>
        </div>
      </div>
    </div>
  )
}

