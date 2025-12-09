import { Navigation } from "@/components/navigation"

const sections = [
  {
    title: "Workshops",
    description:
      "Hands-on sessions led by engineers, designers, and product folks. Topics will span AI, fintech, civic tech, and creative coding.",
    status: "To Be Announced",
  },
  {
    title: "Panels",
    description:
      "Candid conversations with industry leaders, alumni, and community builders about the future of tech and inclusive innovation.",
    status: "To Be Announced",
  },
  {
    title: "Judges",
    description:
      "Expert judges from academia and industry who will review projects, provide feedback, and help teams refine their pitches.",
    status: "To Be Announced",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-background via-card/30 to-background">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Inside MorganHacks</p>
          <h1 className="text-4xl md:text-6xl font-bold font-orbitron">
            What to Expect
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Workshops, panels, and judging experiences are coming together for MorganHacks 2026. Stay tuned for the full lineup—everything below is TBA while we finalize details.
          </p>
        </div>
      </section>

      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((item) => (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-xl border border-primary/30 bg-card/80 p-6 shadow-lg hover:border-primary/60 transition-colors"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10 opacity-70" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold font-orbitron">{item.title}</h2>
                  <span className="px-3 py-1 text-xs font-mono rounded-full bg-muted text-muted-foreground border border-primary/20">
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
