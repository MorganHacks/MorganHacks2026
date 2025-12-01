"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Cpu, Leaf, Heart, Gamepad2, Bot } from "lucide-react"

const cities = [
  {
    id: "ai",
    name: "AI District",
    description: "Machine learning, neural networks, and artificial intelligence",
    color: "from-cyan-500 to-blue-500",
    position: { x: 20, y: 30 },
    icon: Cpu,
    glowColor: "rgba(6, 182, 212, 0.5)",
  },
  {
    id: "sustainability",
    name: "Sustainability Harbor",
    description: "Green technology, climate solutions, and environmental innovation",
    color: "from-green-500 to-emerald-500",
    position: { x: 50, y: 15 },
    icon: Leaf,
    glowColor: "rgba(34, 197, 94, 0.5)",
  },
  {
    id: "health",
    name: "Health Core",
    description: "Medical technology, wellness apps, and healthcare innovation",
    color: "from-pink-500 to-rose-500",
    position: { x: 75, y: 35 },
    icon: Heart,
    glowColor: "rgba(236, 72, 153, 0.5)",
  },
  {
    id: "entertainment",
    name: "Entertainment Alley",
    description: "Gaming, AR/VR, creative tech, and digital experiences",
    color: "from-purple-500 to-violet-500",
    position: { x: 35, y: 65 },
    icon: Gamepad2,
    glowColor: "rgba(168, 85, 247, 0.5)",
  },
  {
    id: "robotics",
    name: "Robotics Forge",
    description: "Hardware hacking, IoT, drones, and physical computing",
    color: "from-orange-500 to-red-500",
    position: { x: 65, y: 70 },
    icon: Bot,
    glowColor: "rgba(249, 115, 22, 0.5)",
  },
]

export function InteractiveCityMap() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

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

  const handleCityClick = (cityId: string) => {
    router.push(`/tracks/${cityId}`)
  }

  return (
    <div className="relative">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
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
        className="relative w-full h-[600px] bg-gradient-to-br from-background via-card to-background border border-primary/30 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20" />

        {/* Connection lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)` }}
        >
          <line
            x1="20%"
            y1="30%"
            x2="50%"
            y2="15%"
            stroke="rgba(6, 182, 212, 0.3)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <line
            x1="50%"
            y1="15%"
            x2="75%"
            y2="35%"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <line
            x1="20%"
            y1="30%"
            x2="35%"
            y2="65%"
            stroke="rgba(6, 182, 212, 0.3)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <line
            x1="75%"
            y1="35%"
            x2="65%"
            y2="70%"
            stroke="rgba(236, 72, 153, 0.3)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <line
            x1="35%"
            y1="65%"
            x2="65%"
            y2="70%"
            stroke="rgba(168, 85, 247, 0.3)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>

        {/* Cities */}
        <div
          className="absolute inset-0 transition-transform duration-200"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          }}
        >
          {cities.map((city) => {
            const Icon = city.icon
            const isHovered = hoveredCity === city.id

            return (
              <div
                key={city.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${city.position.x}%`,
                  top: `${city.position.y}%`,
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
                  className={`relative w-24 h-32 bg-gradient-to-br ${city.color} rounded-lg transition-all duration-300 ${
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
                <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <p className="text-sm font-bold text-center font-[family-name:var(--font-orbitron)]">{city.name}</p>
                </div>

                {/* Hover card */}
                {isHovered && (
                  <div className="absolute top-full mt-12 left-1/2 transform -translate-x-1/2 w-64 p-4 bg-card border border-primary/30 rounded-lg shadow-xl z-10 animate-fade-in">
                    <p className="text-xs text-muted-foreground font-mono">{city.description}</p>
                    <p className="text-xs text-primary mt-2 font-mono">Click to explore →</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center text-sm text-muted-foreground font-mono">
        <p>Drag to pan • Scroll to zoom • Click cities to explore</p>
      </div>
    </div>
  )
}
