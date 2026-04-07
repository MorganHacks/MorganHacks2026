import { BusRoutes } from "@/components/bus-routes"

export default function TransitPage() {
  return (
    <main className="min-h-screen">
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-orbitron">
              <span className="neon-glow-blue">Transit System</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
              Official bus schedule for MorganHacks weekend.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://form.jotform.com/260886109987172"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-5 py-2.5 text-sm font-mono text-secondary transition-colors hover:border-secondary/60 hover:bg-secondary/15"
              >
                Click to fill out the Bus Route RSVP Form
              </a>
              <a
                href="https://groupme.com/join_group/104623961/a4Q09YxT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-primary/30 bg-card/80 px-5 py-2.5 text-sm font-mono text-primary transition-colors hover:border-primary/60 hover:bg-primary/10"
              >
                Questions about bus routes? Click to join the Transit GroupMe
              </a>
            </div>
          </div>
          <BusRoutes />
        </div>
      </section>
    </main>
  )
}
