"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PortalTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const start = requestAnimationFrame(() => setIsTransitioning(true))
    const timer = setTimeout(() => setIsTransitioning(false), 800)

    return () => {
      cancelAnimationFrame(start)
      clearTimeout(timer)
    }
  }, [pathname])

  if (!isTransitioning) return null

  return (
    <div className="fixed inset-0 z-100 pointer-events-none">
      {/* Portal effect */}
      <div className="absolute inset-0 bg-background animate-portal-close">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            {/* Spinning portal rings */}
            <div className="absolute inset-0 rounded-full border-4 border-primary animate-spin-fast opacity-80" />
            <div className="absolute inset-8 rounded-full border-4 border-secondary animate-spin-reverse opacity-60" />
            <div className="absolute inset-16 rounded-full border-4 border-accent animate-spin-fast opacity-40" />

            {/* Center glow */}
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary via-secondary to-accent blur-3xl opacity-50 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
