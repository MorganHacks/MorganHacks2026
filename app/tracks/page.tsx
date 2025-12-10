"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { Navigation } from "@/components/navigation"
import { InteractiveCityMap } from "@/components/interactive-city-map"
import trackCitiesStatic from "@/public/track-cities.json"
import trackDetailsStatic from "@/public/track-details.json"

type TrackCity = {
  id: string
  name: string
  description: string
  color: string
}

type TrackDetail = {
  fullDescription: string
  challenges: string[]
  prizes: string[]
  resources: { name: string; url: string }[]
}

const TrackScene3D = dynamic(() => import("@/components/track-scene-3d").then((m) => m.TrackScene3D), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] rounded-lg border border-primary/20 flex items-center justify-center text-sm text-muted-foreground">
      Loading 3D view…
    </div>
  ),
})

export default function TracksPage() {
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d")
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)
  const [insideTrackId, setInsideTrackId] = useState<string | null>(null)
  const tracks = useMemo(() => trackCitiesStatic as TrackCity[], [])
  const trackDetails = useMemo(() => trackDetailsStatic as Record<string, TrackDetail>, [])
  const selectedTrack = selectedTrackId ? tracks.find((t) => t.id === selectedTrackId) : null
  const selectedDetail = selectedTrackId ? trackDetails[selectedTrackId] : null

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-orbitron">
              <span className="neon-glow-cyan">Track Cities</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
              Explore eight interconnected districts. Drag or pinch to navigate, tap or click a city to open details and resources.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setViewMode("2d")}
                className={`px-4 py-2 rounded-lg border text-sm font-mono transition-colors ${
                  viewMode === "2d"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-primary/30 text-muted-foreground hover:border-primary/60"
                }`}
              >
                2D View
              </button>
              <button
                onClick={() => setViewMode("3d")}
                className={`px-4 py-2 rounded-lg border text-sm font-mono transition-colors ${
                  viewMode === "3d"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-primary/30 text-muted-foreground hover:border-primary/60"
                }`}
              >
                3D View (beta)
              </button>
            </div>
          </div>

          {viewMode === "3d" ? (
            <TrackScene3D selectedId={selectedTrackId} onSelect={setSelectedTrackId} insideId={insideTrackId} />
          ) : (
            <InteractiveCityMap />
          )}

          {selectedTrack && (
            <div className="mt-8 p-6 rounded-lg border border-primary/30 bg-card/60">
              <p className="text-xs uppercase text-muted-foreground font-mono">Selected Track</p>
              <h3 className="text-2xl font-bold font-orbitron">{selectedTrack.name}</h3>
              <p className="text-sm text-muted-foreground font-mono mt-2">
                {selectedDetail?.fullDescription ?? selectedTrack.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(selectedDetail?.resources ?? []).slice(0, 4).map((resource) => (
                  <a
                    key={resource.url}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary hover:bg-primary/15"
                  >
                    {resource.name}
                  </a>
                ))}
              </div>
              {viewMode === "3d" && (
                <div className="mt-4 flex gap-3">
                  <button
                    className="text-xs px-3 py-1.5 rounded-md border border-primary/30 text-primary hover:border-primary/60 transition-colors"
                    onClick={() => {
                      setInsideTrackId(selectedTrackId)
                      setViewMode("3d")
                    }}
                  >
                    Enter Interior
                  </button>
                  {insideTrackId && (
                    <button
                      className="text-xs px-3 py-1.5 rounded-md border border-primary/20 text-muted-foreground hover:border-primary/50 transition-colors"
                      onClick={() => setInsideTrackId(null)}
                    >
                      Exit Interior
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="mt-10 space-y-4">
            <h2 className="text-2xl font-bold font-orbitron text-center">Track List (accessible)</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tracks.map((track) => (
                <li
                  key={track.id}
                  className={`p-4 rounded-lg border bg-card/70 transition-colors ${
                    selectedTrackId === track.id ? "border-primary" : "border-primary/20"
                  }`}
                >
                  <p className="text-sm uppercase text-muted-foreground font-mono">{track.id}</p>
                  <h3 className="text-lg font-bold font-orbitron">{track.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">{track.description}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="text-xs px-3 py-1.5 rounded-md border border-primary/30 text-primary hover:border-primary/60 transition-colors"
                      onClick={() => {
                        setSelectedTrackId(track.id)
                        setViewMode("3d")
                        setInsideTrackId(null)
                      }}
                    >
                      View in 3D
                    </button>
                    <button
                      className="text-xs px-3 py-1.5 rounded-md border border-primary/20 text-muted-foreground hover:border-primary/50 transition-colors"
                      onClick={() => {
                        setSelectedTrackId(track.id)
                        setInsideTrackId(null)
                      }}
                    >
                      Select
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
