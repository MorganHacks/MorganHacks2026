"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import trackCitiesStatic from "@/public/track-cities.json"

type TrackCity = {
  id: string
  name: string
  description: string
  color: string
}

export function HomeTrackGrid() {
  const [cities, setCities] = useState<TrackCity[]>(trackCitiesStatic as TrackCity[])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadCities = async () => {
      setLoading(true)
      try {
        const res = await fetch("/track-cities.json")
        if (!res.ok) return
        const data = (await res.json()) as TrackCity[]
        setCities(data)
      } catch {
        setCities([])
      } finally {
        setLoading(false)
      }
    }
    loadCities()
  }, [])

  const items = useMemo(() => cities ?? [], [cities])

  return (
    <div className="space-y-4">
      {loading && <p className="text-sm text-muted-foreground font-mono text-center">Loading tracks…</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((city) => (
          <Link href="/tracks" key={city.id}>
            <div className="group relative h-full overflow-hidden rounded-lg border border-primary/30 bg-card p-6 hover:scale-105 transition-all cursor-pointer flex flex-col">
              <div
                className={`absolute inset-0 bg-linear-to-br ${city.color} opacity-10 group-hover:opacity-20 transition-opacity`}
              />
              <div className="relative z-10 flex flex-col h-full">
                <div
                  className={`w-12 h-12 rounded-lg bg-linear-to-br ${city.color} mb-4 opacity-80 group-hover:opacity-100 transition-opacity neon-border`}
                />
                <h3 className="text-lg font-bold mb-2 font-orbitron">{city.name}</h3>
                <p className="text-sm text-muted-foreground font-mono flex-1">{city.description}</p>
              </div>
            </div>
          </Link>
        ))}
        {!loading && items.length === 0 && (
          <p className="text-sm text-muted-foreground font-mono col-span-full text-center">Tracks coming soon.</p>
        )}
      </div>
    </div>
  )
}
