import type React from "react"
import { CountdownPortal } from "@/components/countdown-portal"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Users, Trophy } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 overflow-hidden">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
              <span className="text-sm text-primary font-mono">April 14-15, 2026</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance font-[family-name:var(--font-orbitron)]">
              <span className="neon-glow-cyan">MorganHacks</span>
              <br />
              <span className="neon-glow-pink">2026</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
              {"Morgan State University's flagship hackathon—two days of building, learning, and launching big ideas."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 neon-border group">
                Explore the Cities
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
              >
                View Schedule
              </Button>
            </div>
          </div>

          {/* Countdown Portal */}
          <CountdownPortal />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-t border-primary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard icon={<Users className="w-8 h-8" />} value="500+" label="Hackers Expected" color="primary" />
            <StatCard icon={<Zap className="w-8 h-8" />} value="5" label="Track Cities" color="secondary" />
            <StatCard icon={<Trophy className="w-8 h-8" />} value="$50K" label="In Prizes" color="accent" />
          </div>
        </div>
      </section>

      {/* Track Cities Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 font-[family-name:var(--font-orbitron)]">
            <span className="neon-glow-blue">Explore the Districts</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Each track is a glowing district with its own unique culture and challenges
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <CityCard
              name="AI District"
              color="from-cyan-500 to-blue-500"
              description="Machine learning & intelligence"
            />
            <CityCard
              name="Sustainability Harbor"
              color="from-blue-500 to-indigo-500"
              description="Green tech & climate solutions"
            />
            <CityCard
              name="Health Core"
              color="from-pink-500 to-rose-500"
              description="Medical innovation & wellness"
            />
            <CityCard
              name="Entertainment Alley"
              color="from-purple-500 to-violet-500"
              description="Gaming & creative tech"
            />
            <CityCard name="Robotics Forge" color="from-orange-500 to-red-500" description="Hardware & automation" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground font-mono">© 2026 MorganHacks. Built for the future.</p>
        </div>
      </footer>
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
        className={`text-4xl font-bold mb-2 font-[family-name:var(--font-orbitron)] ${
          color === "primary" ? "neon-glow-cyan" : color === "secondary" ? "neon-glow-pink" : "neon-glow-blue"
        }`}
      >
        {value}
      </div>
      <div className="text-sm text-muted-foreground font-mono">{label}</div>
    </div>
  )
}

function CityCard({
  name,
  color,
  description,
}: {
  name: string
  color: string
  description: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-primary/30 bg-card p-6 hover:scale-105 transition-all cursor-pointer">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity`}
      />
      <div className="relative z-10">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} mb-4 opacity-80 group-hover:opacity-100 transition-opacity neon-border`}
        />
        <h3 className="text-lg font-bold mb-2 font-[family-name:var(--font-orbitron)]">{name}</h3>
        <p className="text-sm text-muted-foreground font-mono">{description}</p>
      </div>
    </div>
  )
}
