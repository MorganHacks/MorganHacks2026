import { Navigation } from "@/components/navigation"
import { TimelineMonorail } from "@/components/timeline-monorail"

export default function TimelinePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-orbitron)]">
              <span className="neon-glow-pink">Event Timeline</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
              Navigate through the monorail system. Each station represents an event or workshop.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground font-mono">Saturday</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-sm text-muted-foreground font-mono">Sunday</span>
              </div>
            </div>
          </div>

          <TimelineMonorail />
        </div>
      </section>
    </main>
  )
}
