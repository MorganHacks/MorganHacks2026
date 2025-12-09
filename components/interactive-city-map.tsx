"use client"

import type React from "react"

import { useState, useRef, useMemo, useEffect } from "react"
import { Cpu, Leaf, Heart, Gamepad2, Bot, X, Sparkles, Banknote, Orbit } from "lucide-react"
import trackCitiesStatic from "@/public/track-cities.json"
import trackDetailsStatic from "@/public/track-details.json"

type TrackCity = {
  id: string
  name: string
  description: string
  color: string
  position: { x: number; y: number }
  icon: string
  glowColor: string
}

type TrackDetail = {
  fullDescription: string
  challenges: string[]
  prizes: string[]
  resources: { name: string; url: string }[]
}

const PARTICLE_SEEDS = Array.from({ length: 20 }).map((_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  delay: (i * 17) % 5,
  duration: 5 + ((i * 23) % 5),
}))

const iconMap = {
  Cpu,
  Heart,
  Leaf,
  Gamepad2,
  Bot,
  Sparkles,
  Banknote,
  Orbit,
} as const

export function InteractiveCityMap() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [citiesData, setCitiesData] = useState<TrackCity[]>(trackCitiesStatic as TrackCity[])
  const [trackDetailsData, setTrackDetailsData] = useState<Record<string, TrackDetail>>(
    trackDetailsStatic as Record<string, TrackDetail>
  )
  const containerRef = useRef<HTMLDivElement>(null)

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setScale((prev) => Math.min(Math.max(prev * delta, 0.5), 2))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setIsDragging(true)
    setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const touch = e.touches[0]
    setPosition({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleCityClick = (cityId: string) => {
    setSelectedCity(cityId)
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const [citiesRes, detailsRes] = await Promise.all([fetch("/track-cities.json"), fetch("/track-details.json")])
        if (citiesRes.ok) {
          const data = (await citiesRes.json()) as TrackCity[]
          setCitiesData(data)
        }
        if (detailsRes.ok) {
          const data = (await detailsRes.json()) as Record<string, TrackDetail>
          setTrackDetailsData(data)
        }
      } catch {
        setCitiesData(trackCitiesStatic as TrackCity[])
        setTrackDetailsData(trackDetailsStatic as Record<string, TrackDetail>)
      }
    }
    loadData()
  }, [])

  const citiesWithIcons = useMemo(() => {
    return citiesData.map((city) => {
      const Icon = iconMap[city.icon as keyof typeof iconMap] ?? Cpu
      return { ...city, icon: Icon }
    })
  }, [citiesData])

  const displayCities = useMemo(() => {
    if (!citiesWithIcons.length) return []

    // Order cities around center, then lay them out radially for even spacing
    const ordered = [...citiesWithIcons].sort((a, b) => {
      const angleA = Math.atan2(a.position.y - 50, a.position.x - 50)
      const angleB = Math.atan2(b.position.y - 50, b.position.x - 50)
      return angleA - angleB
    })

    const center = 50
    const radius = 40

    return ordered.map((city, idx) => {
      const angle = (2 * Math.PI * idx) / ordered.length - Math.PI / 2
      const displayPosition = {
        x: center + Math.cos(angle) * radius,
        y: center + Math.sin(angle) * radius,
      }
      return { ...city, displayPosition }
    })
  }, [citiesWithIcons])

  const selected = selectedCity ? displayCities.find((c) => c.id === selectedCity) : null
  const selectedTrack =
    selectedCity && trackDetailsData[selectedCity]
      ? trackDetailsData[selectedCity]
      : selectedCity
        ? {
            fullDescription: "Details coming soon.",
            challenges: ["Challenges: TBA"],
            prizes: ["Prizes: TBA"],
            resources: [],
          }
        : null

  const linePairs = useMemo(() => {
    if (displayCities.length < 2) return []
    return displayCities.map((city, idx) => ({
      from: city,
      to: displayCities[(idx + 1) % displayCities.length],
    }))
  }, [displayCities])

  return (
    <div className="relative">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 hidden md:flex flex-col gap-2">
        <button
          onClick={() => setScale((prev) => Math.min(prev * 1.2, 2))}
          className="px-4 py-2 bg-card border border-primary/30 rounded-lg text-sm font-mono hover:bg-primary/10 transition-colors"
        >
          Zoom In
        </button>
        <button
          onClick={() => setScale((prev) => Math.max(prev * 0.8, 0.5))}
          className="px-4 py-2 bg-card border border-primary/30 rounded-lg text-sm font-mono hover:bg-primary/10 transition-colors"
        >
          Zoom Out
        </button>
        <button
          onClick={() => {
            setScale(1)
            setPosition({ x: 0, y: 0 })
          }}
          className="px-4 py-2 bg-card border border-primary/30 rounded-lg text-sm font-mono hover:bg-primary/10 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Map Container */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[420px] h-[75vh] max-h-[840px] bg-linear-to-br from-background via-card to-background border border-primary/30 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[3rem_3rem] opacity-20" />

        {/* Padded content area so labels and glow have breathing room */}
        <div className="absolute inset-6 sm:inset-8 md:inset-10">
          {/* Connection lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              transformOrigin: "50% 50%",
            }}
          >
            {linePairs.map((pair, idx) => (
              <line
                key={idx}
                x1={`${pair.from.position.x}%`}
                y1={`${pair.from.position.y}%`}
                x2={`${pair.to.position.x}%`}
                y2={`${pair.to.position.y}%`}
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="2"
                strokeDasharray="6,6"
              />
            ))}
          </svg>

          {/* Cities */}
          <div
            className="absolute inset-0 transition-transform duration-200"
            style={{
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              transformOrigin: "50% 50%",
            }}
          >
            {displayCities.map((city) => {
              const Icon = city.icon
              const isHovered = hoveredCity === city.id

              return (
                <div
                  key={city.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${city.displayPosition.x}%`,
                    top: `${city.displayPosition.y}%`,
                  }}
                  onMouseEnter={() => setHoveredCity(city.id)}
                  onMouseLeave={() => setHoveredCity(null)}
                  onClick={() => handleCityClick(city.id)}
                >
                  {/* Glow effect */}
                  {isHovered && (
                    <div
                      className="absolute inset-0 rounded-full blur-2xl animate-pulse"
                      style={{
                        width: "200px",
                        height: "200px",
                        backgroundColor: city.glowColor,
                        transform: "translate(-50%, -50%)",
                        top: "50%",
                        left: "50%",
                      }}
                    />
                  )}

                  {/* City building */}
                  <div
                    className={`relative w-24 h-32 bg-linear-to-br ${city.color} rounded-lg transition-all duration-300 ${
                      isHovered ? "scale-110 shadow-2xl" : "scale-100"
                    }`}
                    style={{
                      boxShadow: isHovered ? `0 0 40px ${city.glowColor}` : "none",
                    }}
                  >
                    {/* Windows */}
                    <div className="absolute inset-2 grid grid-cols-3 gap-1">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div
                          key={i}
                          className={`bg-white/20 rounded-sm transition-all ${
                            isHovered ? "bg-white/60 animate-pulse" : ""
                          }`}
                        />
                      ))}
                    </div>

                    {/* Icon */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-card border-2 border-current rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* City name */}
                  <div className="absolute top-full mt-6 left-1/2 transform -translate-x-1/2">
                    <p className="text-sm font-bold text-center font-orbitron px-3 py-1 rounded-full bg-background/95 border border-primary/20 shadow-sm max-w-[200px] whitespace-normal leading-snug">
                      {city.name}
                    </p>
                  </div>

                  {/* Hover card */}
                  {isHovered && (
                    <div className="absolute top-full mt-16 left-1/2 transform -translate-x-1/2 w-72 p-4 bg-card border border-primary/30 rounded-lg shadow-xl z-10 animate-fade-in">
                      <p className="text-xs text-muted-foreground font-mono">{city.description}</p>
                      <p className="text-xs text-primary mt-2 font-mono">Click to explore →</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {PARTICLE_SEEDS.map((seed, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
              style={{
                left: `${seed.left}%`,
                top: `${seed.top}%`,
                animationDelay: `${seed.delay}s`,
                animationDuration: `${seed.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center text-sm text-muted-foreground font-mono">
        <p className="md:block hidden">Drag to pan • Scroll to zoom • Click cities to explore</p>
        <p className="md:hidden block">Pinch/drag to pan • Tap cities to explore</p>
      </div>

      {/* Mobile-friendly cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {citiesWithIcons.map((city) => {
          const Icon = city.icon
          return (
            <button
              key={city.id}
              onClick={() => handleCityClick(city.id)}
              className="p-4 bg-card border border-primary/30 rounded-lg text-left hover:border-primary/60 transition-colors"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-linear-to-br ${city.color} mb-3 flex items-center justify-center neon-border`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold font-orbitron">{city.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 font-mono">{city.description}</p>
              <p className="text-xs text-primary mt-2 font-mono">Tap to explore →</p>
            </button>
          )
        })}
      </div>

      {/* City detail modal */}
      {selected && selectedTrack && (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-card border border-primary/30 rounded-lg p-6 shadow-2xl">
            <button
              onClick={() => setSelectedCity(null)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`w-14 h-14 rounded-lg bg-linear-to-br ${selected.color} flex items-center justify-center mb-4 neon-border`}>
              <selected.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2 font-orbitron">{selected.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 font-mono">{selectedTrack.fullDescription}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">Challenges</p>
                <ul className="space-y-2">
                  {selectedTrack.challenges.slice(0, 3).map((challenge, i) => (
                    <li key={i} className="text-sm text-foreground font-mono">
                      • {challenge}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">Prizes</p>
                <ul className="space-y-1">
                  {selectedTrack.prizes.slice(0, 3).map((prize, i) => (
                    <li key={i} className="text-sm text-foreground font-mono">
                      {prize}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
                Resources (APIs & tools)
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedTrack.resources.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary hover:bg-primary/15 transition-colors"
                  >
                    {resource.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
