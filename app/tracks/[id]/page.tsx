import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles, Trophy } from "lucide-react"
import trackDetails from "@/public/track-details.json"

const trackPalette = [
  "from-sky-500 to-blue-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
  "from-violet-500 to-indigo-500",
]

type TrackDetail = {
  trackName: string
  description: string
  challenge: string
  whatGoodLooksLike: string[]
  prizes: string[]
  resources: { name: string; description: string; url: string }[]
}

export default function TrackPage({ params }: { params: { id: string } }) {
  const entries = Object.entries(trackDetails as Record<string, TrackDetail>)
  const trackIndex = entries.findIndex(([id]) => id === params.id)
  const track = trackIndex >= 0 ? entries[trackIndex][1] : null
  const accent = trackIndex >= 0 ? trackPalette[trackIndex % trackPalette.length] : "from-sky-500 to-blue-500"

  if (!track) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link href="/tracks">
            <Button variant="ghost" className="mb-8 font-mono">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to City Map
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-orbitron">
              <span className={`bg-linear-to-r ${accent} bg-clip-text text-transparent`}>{track.trackName}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6">{track.description}</p>
            <p className="text-base text-foreground/80 leading-relaxed">{track.challenge}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="p-4 bg-card border border-primary/30 rounded-lg">
              <Trophy className="w-6 h-6 text-primary mb-2" />
              <p className="text-2xl font-bold font-orbitron">{track.prizes.length}</p>
              <p className="text-sm text-muted-foreground font-mono">Prize Opportunities</p>
            </div>
            <div className="p-4 bg-card border border-primary/30 rounded-lg">
              <Sparkles className="w-6 h-6 text-secondary mb-2" />
              <p className="text-2xl font-bold font-orbitron">{track.whatGoodLooksLike.length}</p>
              <p className="text-sm text-muted-foreground font-mono">What Good Looks Like</p>
            </div>
            <div className="p-4 bg-card border border-primary/30 rounded-lg">
              <Sparkles className="w-6 h-6 text-accent mb-2" />
              <p className="text-2xl font-bold font-orbitron">{track.resources.length}</p>
              <p className="text-sm text-muted-foreground font-mono">Resources</p>
            </div>
          </div>

          {/* What Good Looks Like */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 font-orbitron">What Good Looks Like</h2>
            <div className="space-y-3">
              {track.whatGoodLooksLike.map((item, i) => (
                <div
                  key={i}
                  className="p-4 bg-card border border-primary/30 rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary font-mono">{i + 1}</span>
                    </div>
                    <p className="text-foreground">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prizes */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 font-orbitron">Prizes & Awards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {track.prizes.map((prize, i) => (
                <div
                  key={i}
                  className={`p-6 bg-linear-to-br ${accent} bg-opacity-10 border border-primary/30 rounded-lg text-center`}
                >
                  <p className="text-lg font-bold font-orbitron">{prize}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 font-orbitron">Resources & Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {track.resources.map((resource, i) => (
                <a
                  key={i}
                  className="p-4 bg-card border border-primary/30 rounded-lg flex items-start gap-3 hover:border-primary/60 transition-colors"
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Sparkles className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-mono text-sm text-foreground">{resource.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-8 bg-linear-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 font-orbitron">
              Ready to Build in {track.trackName}?
            </h3>
            <p className="text-muted-foreground mb-6 font-mono">Register now to secure your spot in this track</p>
            <Button size="lg" className={`bg-linear-to-r ${accent} text-white hover:opacity-90 neon-border`}>
              Register for MorganHacks 2026
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export async function generateStaticParams() {
  return Object.keys(trackDetails as Record<string, TrackDetail>).map((id) => ({ id }))
}
