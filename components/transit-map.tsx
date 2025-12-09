"use client"

import { useState } from "react"
import { Bus, MapPin, Clock, Users } from "lucide-react"

const routes = [
  {
    id: "cobalt",
    name: "Cobalt Line",
    color: "from-blue-500 to-indigo-500",
    borderColor: "border-blue-500",
    textColor: "text-blue-500",
    stops: [
      { name: "Campus Center", time: "9:00 AM", type: "major" },
      { name: "North Dorms", time: "9:05 AM", type: "regular" },
      { name: "Library", time: "9:10 AM", type: "regular" },
      { name: "Hackathon Venue", time: "9:15 AM", type: "major" },
      { name: "South Parking", time: "9:20 AM", type: "regular" },
      { name: "Campus Center", time: "9:30 AM", type: "major" },
    ],
    frequency: "15 minutes",
    hours: "9:00 AM - 11:00 PM",
  },
  {
    id: "sky",
    name: "Sky Line",
    color: "from-sky-400 to-blue-500",
    borderColor: "border-sky-500",
    textColor: "text-sky-500",
    stops: [
      { name: "Train Station", time: "8:30 AM", type: "major" },
      { name: "Downtown Hub", time: "8:40 AM", type: "regular" },
      { name: "Tech Park", time: "8:50 AM", type: "regular" },
      { name: "Hackathon Venue", time: "9:00 AM", type: "major" },
      { name: "West Campus", time: "9:10 AM", type: "regular" },
      { name: "Train Station", time: "9:25 AM", type: "major" },
    ],
    frequency: "20 minutes",
    hours: "8:30 AM - 6:00 PM",
  },
  {
    id: "violet",
    name: "Violet Line",
    color: "from-indigo-400 to-purple-500",
    borderColor: "border-indigo-400",
    textColor: "text-indigo-400",
    stops: [
      { name: "Airport Terminal", time: "7:00 AM", type: "major" },
      { name: "Hotel District", time: "7:30 AM", type: "regular" },
      { name: "Shopping Mall", time: "7:45 AM", type: "regular" },
      { name: "Hackathon Venue", time: "8:00 AM", type: "major" },
      { name: "Airport Terminal", time: "8:30 AM", type: "major" },
    ],
    frequency: "30 minutes",
    hours: "7:00 AM - 10:00 PM",
  },
]

export function TransitMap() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>("cobalt")
  const [hoveredStop, setHoveredStop] = useState<string | null>(null)

  const activeRoute = routes.find((r) => r.id === selectedRoute)

  return (
    <div className="space-y-8">
      {/* Route selector */}
      <div className="flex flex-wrap justify-center gap-4">
        {routes.map((route) => (
          <button
            key={route.id}
            onClick={() => setSelectedRoute(route.id)}
            className={`px-6 py-3 rounded-lg border transition-all ${
              selectedRoute === route.id
                ? `${route.borderColor} bg-linear-to-r ${route.color} bg-opacity-20 ${route.textColor} neon-border`
                : "bg-card border-primary/30 text-muted-foreground hover:border-primary/50"
            }`}
          >
            <div className="flex items-center gap-2">
              <Bus className="w-5 h-5" />
              <span className="font-bold font-orbitron">{route.name}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Transit map visualization */}
      {activeRoute && (
        <div className="bg-card border border-primary/30 rounded-lg p-8 overflow-x-auto">
          {/* Desktop subway-style map */}
          <div className="hidden md:block min-w-[600px]">
            <div className="relative">
              {/* Route line */}
              <div className="relative flex items-center justify-between mb-8">
                <div
                  className={`absolute top-1/2 left-0 right-0 h-2 bg-linear-to-r ${activeRoute.color} rounded-full -translate-y-1/2`}
                />

                {/* Animated bus */}
                <div
                  className={`absolute top-1/2 w-12 h-12 rounded-full bg-linear-to-r ${activeRoute.color} flex items-center justify-center -translate-y-1/2 neon-border z-10`}
                  style={{
                    animation: "slideRoute 8s ease-in-out infinite",
                  }}
                >
                  <Bus className="w-6 h-6 text-white" />
                </div>

                {/* Stops */}
                {activeRoute.stops.map((stop, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center z-10"
                    style={{ flex: 1 }}
                    onMouseEnter={() => setHoveredStop(stop.name)}
                    onMouseLeave={() => setHoveredStop(null)}
                  >
                    {/* Stop indicator */}
                    <div
                      className={`w-6 h-6 rounded-full border-4 transition-all ${
                        stop.type === "major"
                          ? `${activeRoute.borderColor} bg-background scale-125`
                          : "border-card bg-card"
                      } ${hoveredStop === stop.name ? "scale-150" : ""}`}
                    />

                    {/* Stop name */}
                    <div
                      className={`mt-4 text-center max-w-[100px] transition-all ${
                        hoveredStop === stop.name ? "scale-110" : ""
                      }`}
                    >
                      <p className="text-sm font-bold mb-1 font-orbitron">{stop.name}</p>
                      <p className={`text-xs font-mono ${activeRoute.textColor}`}>{stop.time}</p>
                      {stop.type === "major" && (
                        <div className="mt-1">
                          <span className="text-[10px] px-2 py-0.5 bg-accent/20 text-accent rounded-full font-mono">
                            HUB
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile list view */}
          <div className="md:hidden space-y-3">
            {activeRoute.stops.map((stop, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-background/50 rounded-lg">
                <div
                  className={`w-3 h-3 rounded-full ${
                    stop.type === "major" ? `${activeRoute.borderColor} border-4` : "bg-muted"
                  }`}
                />
                <div className="flex-1">
                  <p className="font-bold text-sm font-orbitron">{stop.name}</p>
                  {stop.type === "major" && (
                    <span className="text-[10px] px-2 py-0.5 bg-accent/20 text-accent rounded-full font-mono">HUB</span>
                  )}
                </div>
                <p className={`text-sm font-mono ${activeRoute.textColor}`}>{stop.time}</p>
              </div>
            ))}
          </div>

          {/* Route info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-background/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className={`w-5 h-5 ${activeRoute.textColor}`} />
                <p className="text-sm font-bold font-mono">Frequency</p>
              </div>
              <p className="text-lg font-orbitron">Every {activeRoute.frequency}</p>
            </div>

            <div className="p-4 bg-background/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className={`w-5 h-5 ${activeRoute.textColor}`} />
                <p className="text-sm font-bold font-mono">Hours</p>
              </div>
              <p className="text-lg font-orbitron">{activeRoute.hours}</p>
            </div>

            <div className="p-4 bg-background/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className={`w-5 h-5 ${activeRoute.textColor}`} />
                <p className="text-sm font-bold font-mono">Stops</p>
              </div>
              <p className="text-lg font-orbitron">{activeRoute.stops.length} locations</p>
            </div>
          </div>
        </div>
      )}

      {/* Important info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-card border border-primary/30 rounded-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 font-orbitron">
            <Users className="w-5 h-5 text-primary" />
            For Attendees
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground font-mono">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>All buses are free for MorganHacks attendees with badges</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>First bus departs at 7:00 AM, last bus at 11:00 PM</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Track buses in real-time via the MorganHacks app</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Accessibility accommodations available on all routes</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-card border border-primary/30 rounded-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 font-orbitron">
            <MapPin className="w-5 h-5 text-secondary" />
            Getting Here
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground font-mono">
            <li className="flex items-start gap-2">
              <span className="text-secondary mt-1">•</span>
              <span>Hackathon Venue: Morgan State University Tech Building</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary mt-1">•</span>
              <span>Parking: Free parking available at South Parking lot</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary mt-1">•</span>
              <span>Airport: Take Pink Line directly from terminal</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary mt-1">•</span>
              <span>Questions? Contact transit@morganhacks.com</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
