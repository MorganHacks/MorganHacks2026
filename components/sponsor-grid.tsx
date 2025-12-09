"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { X, ExternalLink, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

type Sponsor = {
  name: string
  image?: string
  url?: string
  linkedin?: string
  gradient?: string
  color?: string
}

const gradients = [
  "from-cyan-500 to-blue-500",
  "from-blue-500 to-indigo-500",
  "from-purple-500 to-violet-500",
  "from-pink-500 to-rose-500",
  "from-orange-500 to-red-500",
]

export function SponsorGrid() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSponsors = async () => {
      try {
        const res = await fetch("/sponsors.json")
        if (!res.ok) return
        const data = (await res.json()) as Sponsor[]
        setSponsors(data)
      } catch {
        setSponsors([])
      } finally {
        setLoading(false)
      }
    }
    loadSponsors()
  }, [])

  const sponsorsWithStyles = useMemo(
    () =>
      sponsors.map((s, idx) => ({
        ...s,
        color: s.gradient ?? s.color ?? gradients[idx % gradients.length],
      })),
    [sponsors],
  )

  return (
    <>
      <div className="space-y-8">
        {loading && <p className="text-sm text-muted-foreground font-mono">Loading sponsors…</p>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sponsorsWithStyles.map((s) => (
            <SponsorCard key={s.name} sponsor={s} onClick={() => setSelectedSponsor(s)} />
          ))}
          {!loading && sponsorsWithStyles.length === 0 && (
            <p className="text-sm text-muted-foreground font-mono col-span-full">Sponsors coming soon.</p>
          )}
        </div>
      </div>

      {/* Sponsor detail modal */}
      {selectedSponsor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-card border border-primary/30 rounded-lg p-8 animate-scale-in">
            <button
              onClick={() => setSelectedSponsor(null)}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`w-full h-2 bg-linear-to-r ${selectedSponsor.color} rounded-full mb-6 neon-border`} />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={selectedSponsor.image || "/placeholder.svg"}
                  alt={selectedSponsor.name}
                  className="w-full h-full object-contain"
                  width={96}
                  height={96}
                  unoptimized
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-orbitron">{selectedSponsor.name}</h2>
                <p className="text-sm text-muted-foreground font-mono">MorganHacks sponsor</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              We&apos;re grateful to partner with {selectedSponsor.name} to support builders at MorganHacks.
            </p>

            <Button
              size="lg"
              className={`w-full bg-linear-to-r ${selectedSponsor.color} text-white hover:opacity-90 neon-border`}
              onClick={() => selectedSponsor.url && window.open(selectedSponsor.url, "_blank")}
              disabled={!selectedSponsor.url}
            >
              Visit Website
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>

            {selectedSponsor.linkedin && (
              <Button
                variant="outline"
                size="lg"
                className="mt-3 w-full border-primary/40 text-primary hover:bg-primary/10"
                onClick={() => window.open(selectedSponsor.linkedin, "_blank")}
              >
                Connect on LinkedIn
                <Linkedin className="ml-2 w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function SponsorCard({
  sponsor,
  onClick,
  size = "normal",
}: {
  sponsor: { name: string; image?: string; color: string }
  onClick: () => void
  size?: "normal" | "small"
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative bg-card border border-primary/30 rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105 hover:border-primary/60 ${
        size === "small" ? "p-4" : "p-6"
      }`}
    >
      {/* Hover glow effect */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${sponsor.color} opacity-0 group-hover:opacity-10 transition-opacity`}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div
          className={`bg-muted rounded-lg flex items-center justify-center mb-4 ${
            size === "small" ? "w-20 h-20" : "w-32 h-32"
          }`}
        >
          <Image
            src={sponsor.image || "/placeholder.svg"}
            alt={sponsor.name}
            className="w-full h-full object-contain p-2"
            width={size === "small" ? 80 : 128}
            height={size === "small" ? 80 : 128}
            unoptimized
          />
        </div>

        <h3
          className={`font-bold mb-2 font-orbitron ${
            size === "small" ? "text-sm" : "text-lg"
          }`}
        >
          {sponsor.name}
        </h3>
      </div>

      {/* Neon border on hover */}
      <div
        className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none"
      />
    </div>
  )
}
