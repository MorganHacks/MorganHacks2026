import { Navigation } from "@/components/navigation"

export default function TimelinePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-orbitron">
              <span className="neon-glow-pink">Event Timeline</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
              Schedule: TBA. Check back soon for the full timeline.
            </p>
          </div>

          {/* <TimelineMonorail /> */}
        </div>
      </section>
    </main>
  )
}
