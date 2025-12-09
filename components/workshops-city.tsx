"use client"

import { useState } from "react"
import { X, Clock, MapPin, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

const workshops = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    speaker: "Dr. Sarah Chen",
    company: "Google AI",
    time: "Saturday, 1:00 PM",
    duration: "90 minutes",
    location: "AI District - Room 301",
    capacity: "50 hackers",
    level: "Beginner",
    description:
      "Learn the fundamentals of machine learning with hands-on examples. We'll cover supervised learning, neural networks, and practical applications using Python and TensorFlow.",
    color: "from-cyan-500 to-blue-500",
    district: "ai",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Sustainable Tech Design",
    speaker: "Emma Thompson",
    company: "Green Tech Alliance",
    time: "Saturday, 2:30 PM",
    duration: "60 minutes",
    location: "Sustainability Harbor - Eco Hall",
    capacity: "40 hackers",
    level: "All Levels",
    description:
      "Build technology with environmental impact in mind. Learn frameworks for sustainable design, carbon-aware computing, and green UX patterns.",
    color: "from-blue-500 to-indigo-500",
    district: "sustainability",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Game Development with Unity",
    speaker: "Jordan Kim",
    company: "Epic Games",
    time: "Saturday, 4:00 PM",
    duration: "120 minutes",
    location: "Entertainment Alley - Studio B",
    capacity: "35 hackers",
    level: "Intermediate",
    description:
      "Create your first game prototype in Unity. Learn game mechanics, physics, UI design, and how to build engaging player experiences.",
    color: "from-purple-500 to-violet-500",
    district: "entertainment",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Building IoT Devices",
    speaker: "Prof. David Zhang",
    company: "MIT Media Lab",
    time: "Sunday, 9:00 AM",
    duration: "90 minutes",
    location: "Robotics Forge - Lab 2",
    capacity: "30 hackers",
    level: "Intermediate",
    description:
      "Hardware hacking workshop covering IoT fundamentals, sensor integration, and building connected devices with Arduino and Raspberry Pi.",
    color: "from-orange-500 to-red-500",
    district: "robotics",
    status: "upcoming",
  },
  {
    id: 5,
    title: "Healthcare App Design",
    speaker: "Dr. Lisa Anderson",
    company: "Stanford Medicine",
    time: "Sunday, 10:30 AM",
    duration: "75 minutes",
    location: "Health Core - Medical Wing",
    capacity: "45 hackers",
    level: "All Levels",
    description:
      "Design healthcare applications that improve patient outcomes. Learn about HIPAA compliance, medical UX, and accessibility in health tech.",
    color: "from-pink-500 to-rose-500",
    district: "health",
    status: "upcoming",
  },
  {
    id: 6,
    title: "Advanced React Patterns",
    speaker: "Alex Park",
    company: "Meta",
    time: "Saturday, 3:00 PM",
    duration: "90 minutes",
    location: "AI District - Room 205",
    capacity: "40 hackers",
    level: "Advanced",
    description:
      "Master advanced React concepts including custom hooks, context patterns, performance optimization, and state management strategies.",
    color: "from-cyan-500 to-blue-500",
    district: "ai",
    status: "upcoming",
  },
  {
    id: 7,
    title: "Blockchain Fundamentals",
    speaker: "Carlos Mendez",
    company: "Ethereum Foundation",
    time: "Saturday, 5:30 PM",
    duration: "90 minutes",
    location: "AI District - Blockchain Lab",
    capacity: "30 hackers",
    level: "Beginner",
    description:
      "Introduction to blockchain technology, smart contracts, and decentralized applications. Learn to build on Ethereum with Solidity.",
    color: "from-cyan-500 to-blue-500",
    district: "ai",
    status: "upcoming",
  },
  {
    id: 8,
    title: "API Design Best Practices",
    speaker: "Maya Rodriguez",
    company: "Stripe",
    time: "Sunday, 11:30 AM",
    duration: "60 minutes",
    location: "AI District - Room 102",
    capacity: "50 hackers",
    level: "Intermediate",
    description:
      "Learn to design REST and GraphQL APIs that developers love. Covers authentication, versioning, documentation, and API security.",
    color: "from-cyan-500 to-blue-500",
    district: "ai",
    status: "upcoming",
  },
]

export function WorkshopsCity() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<number | null>(null)

  const workshop = selectedWorkshop ? workshops.find((w) => w.id === selectedWorkshop) : null

  return (
    <div className="space-y-8">
      {/* City skyline */}
      <div className="relative bg-linear-to-b from-background via-card to-background border border-primary/30 rounded-lg p-8 min-h-[400px] overflow-hidden">
        {/* Stars background */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Buildings grid */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 items-end justify-center max-w-5xl mx-auto">
          {workshops.map((ws, index) => (
            <WorkshopBuilding
              key={ws.id}
              workshop={ws}
              onClick={() => setSelectedWorkshop(ws.id)}
              height={120 + (index % 3) * 40}
            />
          ))}
        </div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-linear-to-r from-primary via-secondary to-accent" />
      </div>

      {/* Workshop detail modal */}
      {workshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-primary/30 rounded-lg p-6 animate-scale-in">
            {/* Close button */}
            <button
              onClick={() => setSelectedWorkshop(null)}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className={`w-full h-2 bg-linear-to-r ${workshop.color} rounded-full mb-6`} />

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold bg-linear-to-r ${workshop.color} text-white`}
                >
                  {workshop.level}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent/20 text-accent">
                  {workshop.status}
                </span>
              </div>

              <h2 className="text-3xl font-bold mb-3 font-orbitron">{workshop.title}</h2>

              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold">
                  {workshop.speaker
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-bold text-foreground">{workshop.speaker}</p>
                  <p className="text-sm font-mono">{workshop.company}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground font-mono">Time</p>
                  <p className="font-bold">{workshop.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground font-mono">Duration</p>
                  <p className="font-bold">{workshop.duration}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground font-mono">Location</p>
                  <p className="font-bold">{workshop.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground font-mono">Capacity</p>
                  <p className="font-bold">{workshop.capacity}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2 font-orbitron">About This Workshop</h3>
              <p className="text-muted-foreground leading-relaxed">{workshop.description}</p>
            </div>

            {/* Action */}
            <Button
              size="lg"
              className={`w-full bg-linear-to-r ${workshop.color} text-white hover:opacity-90 neon-border`}
            >
              Reserve Your Spot
            </Button>
          </div>
        </div>
      )}

      {/* Workshop list (mobile-friendly) */}
      <div className="md:hidden space-y-3">
        <h3 className="text-xl font-bold mb-4 font-orbitron">All Workshops</h3>
        {workshops.map((ws) => (
          <div
            key={ws.id}
            onClick={() => setSelectedWorkshop(ws.id)}
            className="p-4 bg-card border border-primary/30 rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className={`w-12 h-16 bg-linear-to-br ${ws.color} rounded shrink-0`}>
                <div className="grid grid-cols-2 gap-0.5 p-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white/30 rounded-sm" />
                  ))}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold mb-1 font-orbitron">{ws.title}</h4>
                <p className="text-sm text-muted-foreground font-mono">{ws.speaker}</p>
                <p className="text-xs text-primary mt-1 font-mono">{ws.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WorkshopBuilding({
  workshop,
  onClick,
  height,
}: {
  workshop: (typeof workshops)[0]
  onClick: () => void
  height: number
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer group transition-transform hover:scale-110"
      style={{ height: `${height}px` }}
    >
      <div
        className={`relative w-full h-full bg-linear-to-br ${workshop.color} rounded-t-lg overflow-hidden`}
        style={{
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        {/* Windows */}
        <div className="absolute inset-2 grid grid-cols-2 gap-1">
          {Array.from({ length: Math.floor(height / 25) }).map((_, i) => (
            <div
              key={i}
              className={`bg-white/20 rounded-sm transition-all ${
                i % 3 === 0 ? "bg-white/60 group-hover:animate-pulse" : "group-hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Building label */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-background/80 rounded text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity font-mono">
          {workshop.title.substring(0, 15)}...
        </div>

        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity blur-xl"
          style={{
            background: `linear-gradient(to top, ${workshop.color})`,
          }}
        />
      </div>
    </div>
  )
}
