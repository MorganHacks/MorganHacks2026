"use client"

import { useState } from "react"
import { MapPin, Users, Presentation, Coffee, Trophy, Flag } from "lucide-react"

const events = [
  // Saturday
  {
    id: 1,
    time: "9:00 AM",
    title: "Registration & Check-in",
    description: "Get your badge, swag, and meet fellow hackers",
    location: "Main Atrium",
    type: "event",
    day: "saturday",
    icon: Users,
  },
  {
    id: 2,
    time: "10:00 AM",
    title: "Opening Ceremony",
    description: "Welcome to MorganHacks 2026! Meet sponsors and learn about challenges",
    location: "Grand Hall",
    type: "event",
    day: "saturday",
    icon: Presentation,
  },
  {
    id: 3,
    time: "11:00 AM",
    title: "Hacking Begins!",
    description: "Start building your projects across all five track cities",
    location: "All Districts",
    type: "event",
    day: "saturday",
    icon: Flag,
  },
  {
    id: 4,
    time: "12:30 PM",
    title: "Lunch Service",
    description: "Fuel up with food from local vendors",
    location: "Food Court",
    type: "meal",
    day: "saturday",
    icon: Coffee,
  },
  {
    id: 5,
    time: "1:00 PM",
    title: "Workshop: Intro to Machine Learning",
    description: "Learn ML basics with hands-on examples",
    location: "AI District",
    type: "workshop",
    day: "saturday",
    icon: Presentation,
  },
  {
    id: 6,
    time: "2:30 PM",
    title: "Workshop: Sustainable Tech Design",
    description: "Build with environmental impact in mind",
    location: "Sustainability Harbor",
    type: "workshop",
    day: "saturday",
    icon: Presentation,
  },
  {
    id: 7,
    time: "4:00 PM",
    title: "Workshop: Game Development with Unity",
    description: "Create your first game prototype",
    location: "Entertainment Alley",
    type: "workshop",
    day: "saturday",
    icon: Presentation,
  },
  {
    id: 8,
    time: "6:00 PM",
    title: "Dinner Service",
    description: "Evening meal with networking opportunities",
    location: "Food Court",
    type: "meal",
    day: "saturday",
    icon: Coffee,
  },
  {
    id: 9,
    time: "7:30 PM",
    title: "Tech Talks & Sponsor Demos",
    description: "Industry leaders share insights and tools",
    location: "Main Stage",
    type: "event",
    day: "saturday",
    icon: Presentation,
  },
  {
    id: 10,
    time: "9:00 PM",
    title: "Mini Games & Activities",
    description: "Take a break with fun competitions and prizes",
    location: "Recreation Zone",
    type: "event",
    day: "saturday",
    icon: Trophy,
  },
  {
    id: 11,
    time: "12:00 AM",
    title: "Midnight Snacks",
    description: "Late night fuel for the dedicated",
    location: "Food Court",
    type: "meal",
    day: "saturday",
    icon: Coffee,
  },
  // Sunday
  {
    id: 12,
    time: "8:00 AM",
    title: "Breakfast Service",
    description: "Start day two energized",
    location: "Food Court",
    type: "meal",
    day: "sunday",
    icon: Coffee,
  },
  {
    id: 13,
    time: "9:00 AM",
    title: "Workshop: Hardware Hacking",
    description: "Build IoT devices and robots",
    location: "Robotics Forge",
    type: "workshop",
    day: "sunday",
    icon: Presentation,
  },
  {
    id: 14,
    time: "10:30 AM",
    title: "Workshop: Healthcare Innovation",
    description: "Design apps that improve wellbeing",
    location: "Health Core",
    type: "workshop",
    day: "sunday",
    icon: Presentation,
  },
  {
    id: 15,
    time: "11:00 AM",
    title: "Hacking Ends",
    description: "Final commits - time to wrap up your projects!",
    location: "All Districts",
    type: "event",
    day: "sunday",
    icon: Flag,
  },
  {
    id: 16,
    time: "12:00 PM",
    title: "Project Submissions Due",
    description: "Submit your projects on Devpost",
    location: "Online",
    type: "event",
    day: "sunday",
    icon: Flag,
  },
  {
    id: 17,
    time: "12:30 PM",
    title: "Lunch & Expo Setup",
    description: "Final meal while setting up demo tables",
    location: "Food Court",
    type: "meal",
    day: "sunday",
    icon: Coffee,
  },
  {
    id: 18,
    time: "1:30 PM",
    title: "Project Expo & Judging",
    description: "Present your work to judges and attendees",
    location: "Expo Hall",
    type: "event",
    day: "sunday",
    icon: Trophy,
  },
  {
    id: 19,
    time: "3:30 PM",
    title: "Closing Ceremony",
    description: "Winner announcements and prizes!",
    location: "Grand Hall",
    type: "event",
    day: "sunday",
    icon: Trophy,
  },
  {
    id: 20,
    time: "5:00 PM",
    title: "Event Ends",
    description: "Thanks for hacking with us! See you next year",
    location: "Main Atrium",
    type: "event",
    day: "sunday",
    icon: Flag,
  },
]

export function TimelineMonorail() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [activeDay, setActiveDay] = useState<"saturday" | "sunday" | "all">("all")

  const filteredEvents = activeDay === "all" ? events : events.filter((e) => e.day === activeDay)

  const saturdayEvents = events.filter((e) => e.day === "saturday")
  const sundayEvents = events.filter((e) => e.day === "sunday")

  return (
    <div className="space-y-8">
      {/* Day selector */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setActiveDay("all")}
          className={`px-6 py-3 rounded-lg border font-mono transition-all ${
            activeDay === "all"
              ? "bg-accent/20 border-accent text-accent neon-border"
              : "bg-card border-primary/30 text-muted-foreground hover:border-primary/50"
          }`}
        >
          Both Days
        </button>
        <button
          onClick={() => setActiveDay("saturday")}
          className={`px-6 py-3 rounded-lg border font-mono transition-all ${
            activeDay === "saturday"
              ? "bg-primary/20 border-primary text-primary neon-border"
              : "bg-card border-primary/30 text-muted-foreground hover:border-primary/50"
          }`}
        >
          Saturday, April 11
        </button>
        <button
          onClick={() => setActiveDay("sunday")}
          className={`px-6 py-3 rounded-lg border font-mono transition-all ${
            activeDay === "sunday"
              ? "bg-secondary/20 border-secondary text-secondary neon-border"
              : "bg-card border-primary/30 text-muted-foreground hover:border-primary/50"
          }`}
        >
          Sunday, April 12
        </button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {/* Monorail track */}
          <div className="relative h-2 bg-linear-to-r from-primary via-secondary to-primary rounded-full mb-12">
            {/* Animated train */}
            <div
              className="absolute top-1/2 left-0 w-8 h-8 -translate-y-1/2 bg-accent rounded-full animate-pulse neon-border"
              style={{
                animation: "slide 20s linear infinite",
              }}
            />
          </div>

          {/* Stations */}
          <div className="grid grid-cols-5 gap-4">
            {filteredEvents.map((event, index) => (
              <EventStation
                key={event.id}
                event={event}
                isSelected={selectedEvent === event.id}
                onClick={() => setSelectedEvent(event.id)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4">
          {(activeDay === "all" || activeDay === "saturday") && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary font-orbitron">
                Saturday, April 14
              </h3>
              {saturdayEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          {(activeDay === "all" || activeDay === "sunday") && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-secondary font-orbitron">
                Sunday, April 15
              </h3>
              {sundayEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected event detail (desktop) */}
      {selectedEvent && (
        <div className="hidden lg:block p-6 bg-card border border-primary/30 rounded-lg animate-fade-in">
          {(() => {
            const event = events.find((e) => e.id === selectedEvent)!
            const Icon = event.icon
            return (
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    event.day === "saturday" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-sm font-bold font-mono ${
                        event.day === "saturday" ? "text-primary" : "text-secondary"
                      }`}
                    >
                      {event.time}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono uppercase">{event.type}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-orbitron">{event.title}</h3>
                  <p className="text-muted-foreground mb-3">{event.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="font-mono">{event.location}</span>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}

function EventStation({
  event,
  isSelected,
  onClick,
  index,
}: {
  event: (typeof events)[0]
  isSelected: boolean
  onClick: () => void
  index: number
}) {
  const Icon = event.icon
  const dayColor = event.day === "saturday" ? "primary" : "secondary"

  return (
    <div
      onClick={onClick}
      className="cursor-pointer group"
      style={{
        gridColumn: `${(index % 5) + 1}`,
        gridRow: Math.floor(index / 5) + 1,
      }}
    >
      {/* Station pole */}
      <div className="flex flex-col items-center">
        <div className={`h-16 w-0.5 bg-linear-to-b from-${dayColor} to-transparent mb-2`} />

        {/* Station icon */}
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            isSelected
              ? `bg-${dayColor} text-background neon-border scale-110`
              : `bg-card border-2 border-${dayColor}/50 text-${dayColor} hover:scale-105`
          }`}
        >
          <Icon className="w-8 h-8" />
        </div>

        {/* Station info */}
        <div className="text-center mt-4">
          <p
            className={`text-xs font-bold font-mono mb-1 ${
              event.day === "saturday" ? "text-primary" : "text-secondary"
            }`}
          >
            {event.time}
          </p>
          <p className="text-sm font-bold leading-tight font-orbitron">{event.title}</p>
          <p className="text-xs text-muted-foreground mt-1 font-mono">{event.location}</p>
        </div>
      </div>
    </div>
  )
}

function EventCard({ event }: { event: (typeof events)[0] }) {
  const Icon = event.icon

  return (
    <div className="p-4 mb-3 bg-card border border-primary/30 rounded-lg hover:border-primary/50 transition-colors">
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
            event.day === "saturday" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
          }`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`text-sm font-bold font-mono ${event.day === "saturday" ? "text-primary" : "text-secondary"}`}
            >
              {event.time}
            </span>
            <span className="text-xs text-muted-foreground font-mono uppercase">{event.type}</span>
          </div>
          <h3 className="text-base font-bold mb-1 font-orbitron">{event.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="font-mono">{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
