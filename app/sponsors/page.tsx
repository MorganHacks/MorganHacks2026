import { Navigation } from "@/components/navigation"
import { SponsorGrid } from "@/components/sponsor-grid"
import { AnalyticsDataTower } from "@/components/analytics-data-tower"

export default function SponsorsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Sponsors section */}
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-orbitron)]">
                <span className="neon-glow-pink">Our Sponsors</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
                Powering innovation and enabling hackers to build the future
              </p>
            </div>

            <SponsorGrid />
          </div>

          {/* Analytics section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-orbitron)]">
                <span className="neon-glow-cyan">MorganHacks 2025 Impact</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
                Data from last year's event - visualized in our Data Tower
              </p>
            </div>

            <AnalyticsDataTower />
          </div>
        </div>
      </section>
    </main>
  )
}
