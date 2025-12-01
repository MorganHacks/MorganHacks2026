"use client"

import { useEffect, useState } from "react"
import { Users, Award, Code, Building2, Repeat } from "lucide-react"

const analytics = [
  { label: "Total Attendance", value: 450, icon: Users, color: "text-primary", suffix: "" },
  { label: "Distinct Majors", value: 32, icon: Building2, color: "text-secondary", suffix: "" },
  { label: "Colleges Represented", value: 18, icon: Award, color: "text-accent", suffix: "" },
  { label: "Projects Submitted", value: 87, icon: Code, color: "text-primary", suffix: "" },
  { label: "Returning Hackers", value: 156, icon: Repeat, color: "text-secondary", suffix: "" },
  { label: "Mentors & Judges", value: 42, icon: Users, color: "text-accent", suffix: "" },
]

export function AnalyticsDataTower() {
  return (
    <div className="relative">
      {/* Data tower */}
      <div className="relative max-w-4xl mx-auto">
        {/* Tower structure */}
        <div className="relative bg-gradient-to-t from-card via-background to-card border border-primary/30 rounded-lg p-8 overflow-hidden">
          {/* Holographic grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-10" />

          {/* Floating particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
              />
            ))}
          </div>

          {/* Data holograms */}
          <div className="relative z-10 space-y-6">
            {analytics.map((stat, index) => (
              <DataHologram key={index} stat={stat} delay={index * 0.1} />
            ))}
          </div>

          {/* Tower top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-b from-primary/30 to-transparent blur-3xl pointer-events-none" />
        </div>

        {/* Additional stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <StatCard
            label="Student Classifications"
            details={["Freshmen: 28%", "Sophomores: 32%", "Juniors: 25%", "Seniors: 15%"]}
            color="from-cyan-500 to-blue-500"
          />
          <StatCard
            label="Top Project Categories"
            details={["AI/ML: 24", "Web Apps: 21", "Mobile: 18", "Hardware: 14", "Other: 10"]}
            color="from-pink-500 to-rose-500"
          />
          <StatCard
            label="Gender Distribution"
            details={["Male: 58%", "Female: 38%", "Non-binary: 3%", "Prefer not to say: 1%"]}
            color="from-green-500 to-emerald-500"
          />
        </div>
      </div>
    </div>
  )
}

function DataHologram({
  stat,
  delay,
}: {
  stat: (typeof analytics)[0]
  delay: number
}) {
  const [count, setCount] = useState(0)
  const Icon = stat.icon

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = stat.value / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setCount(Math.floor(increment * currentStep))
      } else {
        setCount(stat.value)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [stat.value])

  return (
    <div
      className="group relative flex items-center gap-6 p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg hover:border-primary/50 transition-all"
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {/* Icon */}
      <div
        className={`w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-8 h-8" />
      </div>

      {/* Data */}
      <div className="flex-1">
        <p className="text-sm text-muted-foreground font-mono mb-1">{stat.label}</p>
        <p className={`text-4xl md:text-5xl font-bold font-[family-name:var(--font-orbitron)] ${stat.color}`}>
          {count.toLocaleString()}
          {stat.suffix}
        </p>
      </div>

      {/* Animated bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Scan line effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none animate-scan" />
    </div>
  )
}

function StatCard({
  label,
  details,
  color,
}: {
  label: string
  details: string[]
  color: string
}) {
  return (
    <div className="p-6 bg-card border border-primary/30 rounded-lg hover:border-primary/50 transition-colors">
      <h3 className="text-lg font-bold mb-4 font-[family-name:var(--font-orbitron)]">{label}</h3>
      <ul className="space-y-2">
        {details.map((detail, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color}`} />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  )
}
