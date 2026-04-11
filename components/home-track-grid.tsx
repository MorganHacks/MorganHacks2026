import Link from "next/link"
import { ArrowRight } from "lucide-react"

import trackCitiesStatic from "@/public/track-cities.json"
import { cn } from "@/lib/utils"

type TrackCity = {
  id: string
  name: string
  description: string
  color: string
}

const cities = trackCitiesStatic as TrackCity[]

export function HomeTrackGrid() {
  if (cities.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {cities.map((city) => (
        <Link href="/tracks" key={city.id} className="group h-full">
          <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-card/55 p-6 ring-1 ring-white/8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:ring-primary/25">
            <div className={cn("absolute inset-0 bg-linear-to-br opacity-10 transition-opacity duration-300 group-hover:opacity-20", city.color)} />
            <div className="relative z-10 flex h-full flex-col">
              <div className={cn("mb-5 h-12 w-12 rounded-2xl bg-linear-to-br", city.color)} />
              <h3 className="mb-3 text-lg font-bold font-orbitron">{city.name}</h3>
              <p className="flex-1 text-sm leading-6 text-muted-foreground">{city.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-primary">
                View track
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}
