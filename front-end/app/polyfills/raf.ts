// SSR-safe requestAnimationFrame polyfill for Node/Bun environments
// Ensures any accidental server-side RAF calls won’t crash the dev server.

// Only apply on the server (no window)
if (typeof window === 'undefined') {
  const g: any = globalThis as any

  if (typeof g.requestAnimationFrame !== 'function') {
    g.requestAnimationFrame = (cb: (time: number) => void): number => {
      const id = setTimeout(() => cb(Date.now()), 16)
      // Cast to number to satisfy browser-style signature
      return (id as unknown as number)
    }
  }

  if (typeof g.cancelAnimationFrame !== 'function') {
    g.cancelAnimationFrame = (id: number) => {
      // Convert back to Timeout for Node clearTimeout
      clearTimeout(id as unknown as NodeJS.Timeout)
    }
  }
}

