"use client"

import { useEffect, useMemo, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { BookOpenCheck, PieChart, School, Sparkles, Users } from "lucide-react"

type Metric = {
  label: string
  value: number
  suffix?: string
  icon: LucideIcon
  tone: string
}

type Slice = {
  label: string
  value: number
  color: string
}

const stats: Metric[] = [
  { label: "Total Hackers", value: 142, icon: Users, tone: "text-primary" },
  { label: "Workshops", value: 6, icon: Sparkles, tone: "text-secondary" },
  { label: "Schools Represented", value: 14, icon: School, tone: "text-accent" },
  { label: "Distinct Majors", value: 43, icon: BookOpenCheck, tone: "text-primary" },
]

const classificationMix: Slice[] = [
  { label: "Freshman (F)", value: 14, color: "#60a5fa" },
  { label: "Sophomore (S)", value: 43, color: "#4f46e5" },
  { label: "Junior (J)", value: 43, color: "#22d3ee" },
  { label: "Senior (Sr)", value: 24, color: "#38bdf8" },
  { label: "5th Year (5S)", value: 5, color: "#a855f7" },
  { label: "Masters (M)", value: 40, color: "#0ea5e9" },
]

const sampleMajors = [
  "Computer Science",
  "Economics",
  "Biology",
  "Mechanical Eng",
  "Psychology",
  "Film & Media",
  "Cybersecurity",
  "Business",
]

export function AnalyticsDataTower() {
  const totalHackers = 142
  const classificationTotal = classificationMix.reduce((sum, slice) => sum + slice.value, 0)

  return (
    <div className="relative max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-card border border-primary/30 rounded-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">Attendance Mix</p>
              <h3 className="text-2xl font-bold font-orbitron mt-1">Classifications</h3>
            </div>
            <PieChart className="w-5 h-5 text-primary" />
          </div>

          <div className="flex items-center justify-center">
            <PieChartWithLabels slices={classificationMix} total={classificationTotal} />
          </div>
        </div>

        <div className="p-6 bg-card border border-primary/30 rounded-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">Skills</p>
              <h3 className="text-2xl font-bold font-orbitron mt-1">Majors Represented</h3>
              <p className="text-sm text-muted-foreground mt-2">
                43 unique majors last year. Your background doesn&apos;t limit you.
              </p>
            </div>
            <BookOpenCheck className="w-5 h-5 text-primary" />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {sampleMajors.map((major) => (
              <span
                key={major}
                className="px-3 py-1.5 rounded-full bg-linear-to-r from-primary/10 to-secondary/10 border border-primary/20 text-xs font-mono text-foreground shadow-sm"
              >
                {major}
              </span>
            ))}
            <span className="px-3 py-1.5 rounded-full bg-muted text-xs font-mono text-foreground border border-primary/10">
              +35 more majors
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ metric }: { metric: Metric }) {
  const [count, setCount] = useState(0)
  const Icon = metric.icon

  useEffect(() => {
    const duration = 800
    const steps = 50
    const increment = metric.value / steps
    let current = 0

    const timer = setInterval(() => {
      current++
      if (current <= steps) {
        setCount(Math.round(increment * current))
      } else {
        setCount(metric.value)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [metric.value])

  return (
    <div className="group relative overflow-hidden rounded-lg border border-primary/30 bg-card p-4 hover:border-primary/60 transition-all">
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10 opacity-60" />
      <div className="relative z-10 flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ${metric.tone}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground font-mono">{metric.label}</p>
          <p className="text-2xl font-bold font-orbitron">
            <span className={metric.tone}>{count.toLocaleString()}</span>
            {metric.suffix}
          </p>
        </div>
      </div>
    </div>
  )
}

function PieChartWithLabels({ slices, total }: { slices: Slice[]; total: number }) {
  const size = 320
  const center = size / 2
  const radius = 110
  const paths = useMemo(() => {
    return slices.reduce(
      (acc, slice) => {
        const angle = (slice.value / total) * 360
        const startAngle = acc.currentAngle
        const endAngle = startAngle + angle

        const start = polarToCartesian(center, center, radius, endAngle)
        const end = polarToCartesian(center, center, radius, startAngle)
        const largeArcFlag = angle > 180 ? 1 : 0
        const d = `M ${center} ${center} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`

        const percent = Math.round((slice.value / total) * 100)
        const midAngle = startAngle + angle / 2
        const lineStart = polarToCartesian(center, center, radius * 0.88, midAngle)
        const labelPos = polarToCartesian(center, center, radius * 1.15, midAngle)
        const textAnchor = labelPos.x < center ? "end" : "start"

        acc.paths.push({ d, color: slice.color, label: `${slice.label} (${percent}%)`, lineStart, labelPos, textAnchor })
        acc.currentAngle = endAngle
        return acc
      },
      { currentAngle: -90, paths: [] as Array<{ d: string; color: string; label: string; lineStart: { x: number; y: number }; labelPos: { x: number; y: number }; textAnchor: string }> }
    ).paths
  }, [center, radius, slices, total])

  return (
    <div className="relative w-[320px] h-80">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        {paths.map((path, idx) => (
          <g key={idx}>
            <path d={path.d} fill={path.color} className="opacity-90" />
            <line
              x1={path.lineStart.x}
              y1={path.lineStart.y}
              x2={path.labelPos.x}
              y2={path.labelPos.y}
              stroke={path.color}
              strokeWidth={1.5}
            />
            <text
              x={path.labelPos.x}
              y={path.labelPos.y}
              textAnchor={path.textAnchor as "start" | "end"}
              dominantBaseline="middle"
              className="text-[10px] font-mono fill-foreground"
              dx={path.textAnchor === "end" ? -6 : 6}
            >
              {path.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute inset-8 rounded-full border border-primary/20 pointer-events-none" />
    </div>
  )
}

function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  }
}
