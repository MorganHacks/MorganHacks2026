import type React from "react"
import Link from "next/link"
import { CountdownPortal } from "@/components/countdown-portal"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { HomeTrackGrid } from "@/components/home-track-grid"
import { RecapMarquee } from "@/components/recap-marquee"
import { ArrowRight, Zap, Users, Trophy } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Countdown Portal - Left side */}
            <div className="flex-1 flex justify-center lg:justify-start order-2 lg:order-1">
              <CountdownPortal />
            </div>

            {/* Hero Text - Right side */}
            <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
             <div className="inline-block mb-6 px-6 py-3 bg-primary/10 border border-primary/30 rounded-full">
                <span className="text-base md:text-lg text-primary font-mono font-semibold">April 11-12, 2026</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance font-orbitron">
                <span className="neon-glow-cyan">MorganHacks</span>
                <br />
                <span className="neon-glow-pink">2026</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 text-pretty">
                {"Morgan State University's hackathon — two days of building, creating, and innovating big ideas."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link href="/tracks">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 neon-border group">
                    See the Tracks
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/timeline">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
                  >
                    View Schedule
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-t border-primary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard icon={<Users className="w-8 h-8" />} value="200+" label="Hackers Expected" color="primary" />
            <StatCard icon={<Zap className="w-8 h-8" />} value="5" label="Districts" color="secondary" />
            <StatCard icon={<Trophy className="w-8 h-8" />} value="Up to $15k" label="In Prizes" color="accent" />
          </div>
        </div>
      </section>

      {/* Track Cities Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 font-orbitron">
            <span className="neon-glow-blue">Explore Tracks</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Five themed districts. Pick one to start your build journey.
          </p>

          <HomeTrackGrid />
        </div>
      </section>

      {/* Recap Section */}
      <RecapMarquee />

    </main>
  )
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode
  value: string
  label: string
  color: "primary" | "secondary" | "accent"
}) {
  const colorClasses = {
    primary: "text-primary border-primary/30 bg-primary/5",
    secondary: "text-secondary border-secondary/30 bg-secondary/5",
    accent: "text-accent border-accent/30 bg-accent/5",
  }

  return (
    <div
      className={`p-6 rounded-lg border ${colorClasses[color]} backdrop-blur-sm text-center group hover:scale-105 transition-transform`}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <div
        className={`text-4xl font-bold mb-2 font-orbitron ${
          color === "primary" ? "neon-glow-cyan" : color === "secondary" ? "neon-glow-pink" : "neon-glow-blue"
        }`}
      >
        {value}
      </div>
      <div className="text-sm text-muted-foreground font-mono">{label}</div>
    </div>
  )
}
