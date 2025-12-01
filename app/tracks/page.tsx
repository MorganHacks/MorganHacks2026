"use client"

import { Navigation } from "@/components/navigation"
import { InteractiveCityMap } from "@/components/interactive-city-map"

export default function TracksPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-orbitron)]">
              <span className="neon-glow-cyan">Parallel Cities</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
              Explore five interconnected districts. Click and drag to navigate, hover to preview.
            </p>
          </div>

          <InteractiveCityMap />
        </div>
      </section>
    </main>
  )
}
