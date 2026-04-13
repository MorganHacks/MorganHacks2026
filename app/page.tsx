import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, Trophy, Users, Zap } from "lucide-react"

import { CountdownPortal } from "@/components/countdown-portal"
import { HomePrizeShowcase } from "@/components/home-prize-showcase"
import { HomeTrackGrid } from "@/components/home-track-grid"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <section className="relative overflow-hidden px-4 pb-0 pt-16 sm:pt-20 lg:pt-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
            <div className="flex-1 flex justify-center lg:justify-start order-2 lg:order-1">
              <CountdownPortal />
            </div>

            <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
              <div className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5">
                <span className="text-base md:text-lg text-primary font-mono font-semibold">April 11-12, 2026 • Starts at 8:00 AM</span>
                <span className="ml-3 inline-block rounded-full bg-accent/20 border border-accent/40 px-3 py-1 text-xs uppercase tracking-wider text-accent">
                  Portal Closed
                </span>
              </div>

              <h1 className="mb-4 text-balance font-orbitron text-4xl font-bold md:text-5xl lg:text-6xl">
                <span className="neon-glow-cyan">MorganHacks</span>
                <br />
                <span className="neon-glow-pink">2026</span>
              </h1>

              <p className="mb-6 max-w-2xl text-base text-muted-foreground text-pretty md:text-lg">
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

      <div className="relative z-10 mt-2 sm:mt-4">
        <HomePrizeShowcase />
      </div>

      <section className="py-16 px-4 border-t border-primary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <StatCard icon={<Users className="w-8 h-8" />} value="200+" label="Hackers Expected" color="primary" />
            <StatCard icon={<Zap className="w-8 h-8" />} value="5" label="Challenge Districts" color="secondary" />
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-orbitron">
              <Link href="/tracks" className="inline-block hover:opacity-90 transition-opacity">
                <span className="neon-glow-blue">Explore Tracks</span>
              </Link>
            </h2>
            <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground text-pretty">
              MorganHacks teams choose one of five challenge districts and spend the weekend building something real.
            </p>
          </div>
          <HomeTrackGrid />
        </div>
      </section>

    </main>
  )
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: ReactNode
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
