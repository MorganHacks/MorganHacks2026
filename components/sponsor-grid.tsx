"use client"

import { useState } from "react"
import { X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const sponsors = [
  {
    id: 1,
    name: "TechCorp Global",
    tier: "Platinum",
    logo: "/techcorp-logo.png",
    description: "Leading technology solutions provider specializing in cloud infrastructure and AI platforms.",
    website: "https://techcorp.example.com",
    offerings: ["Cloud Credits", "API Access", "Mentors", "Prizes"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 2,
    name: "InnovateLabs",
    tier: "Platinum",
    logo: "/innovatelabs-logo.png",
    description: "Innovation hub focused on emerging technologies and sustainable development.",
    website: "https://innovatelabs.example.com",
    offerings: ["Internship Opportunities", "Workshop", "Swag"],
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    name: "DataFlow Systems",
    tier: "Gold",
    logo: "/dataflow-logo.png",
    description: "Enterprise data analytics and machine learning infrastructure platform.",
    website: "https://dataflow.example.com",
    offerings: ["Platform Access", "Data Credits", "Mentors"],
    color: "from-purple-500 to-violet-500",
  },
  {
    id: 4,
    name: "CloudServe",
    tier: "Gold",
    logo: "/cloudserve-logo.jpg",
    description: "Scalable cloud computing and hosting solutions for modern applications.",
    website: "https://cloudserve.example.com",
    offerings: ["Hosting Credits", "Developer Tools"],
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 5,
    name: "DevTools Inc",
    tier: "Silver",
    logo: "/devtools-logo.jpg",
    description: "Professional developer tools and IDE solutions.",
    website: "https://devtools.example.com",
    offerings: ["Free Licenses", "Swag"],
    color: "from-orange-500 to-red-500",
  },
  {
    id: 6,
    name: "StartupHub",
    tier: "Silver",
    logo: "/startuphub-logo.jpg",
    description: "Supporting the next generation of tech entrepreneurs and founders.",
    website: "https://startuphub.example.com",
    offerings: ["Mentorship", "Networking"],
    color: "from-cyan-500 to-blue-500",
  },
]

export function SponsorGrid() {
  const [selectedSponsor, setSelectedSponsor] = useState<number | null>(null)

  const platinumSponsors = sponsors.filter((s) => s.tier === "Platinum")
  const goldSponsors = sponsors.filter((s) => s.tier === "Gold")
  const silverSponsors = sponsors.filter((s) => s.tier === "Silver")

  const sponsor = selectedSponsor ? sponsors.find((s) => s.id === selectedSponsor) : null

  return (
    <>
      <div className="space-y-12">
        {/* Platinum */}
        {platinumSponsors.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center text-primary font-[family-name:var(--font-orbitron)]">
              Platinum Sponsors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {platinumSponsors.map((s) => (
                <SponsorCard key={s.id} sponsor={s} onClick={() => setSelectedSponsor(s.id)} />
              ))}
            </div>
          </div>
        )}

        {/* Gold */}
        {goldSponsors.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-6 text-center text-secondary font-[family-name:var(--font-orbitron)]">
              Gold Sponsors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goldSponsors.map((s) => (
                <SponsorCard key={s.id} sponsor={s} onClick={() => setSelectedSponsor(s.id)} />
              ))}
            </div>
          </div>
        )}

        {/* Silver */}
        {silverSponsors.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-6 text-center text-accent font-[family-name:var(--font-orbitron)]">
              Silver Sponsors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {silverSponsors.map((s) => (
                <SponsorCard key={s.id} sponsor={s} onClick={() => setSelectedSponsor(s.id)} size="small" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sponsor detail modal */}
      {sponsor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-card border border-primary/30 rounded-lg p-8 animate-scale-in">
            <button
              onClick={() => setSelectedSponsor(null)}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`w-full h-2 bg-gradient-to-r ${sponsor.color} rounded-full mb-6 neon-border`} />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={sponsor.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-orbitron)]">{sponsor.name}</h2>
                <p
                  className={`text-sm font-bold ${
                    sponsor.tier === "Platinum"
                      ? "text-primary"
                      : sponsor.tier === "Gold"
                        ? "text-secondary"
                        : "text-accent"
                  } font-mono`}
                >
                  {sponsor.tier} Tier
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">{sponsor.description}</p>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 font-[family-name:var(--font-orbitron)]">What They Offer</h3>
              <div className="flex flex-wrap gap-2">
                {sponsor.offerings.map((offer, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-sm font-mono bg-gradient-to-r ${sponsor.color} bg-opacity-20 border border-current`}
                  >
                    {offer}
                  </span>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              className={`w-full bg-gradient-to-r ${sponsor.color} text-white hover:opacity-90 neon-border`}
              onClick={() => window.open(sponsor.website, "_blank")}
            >
              Visit Website
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
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
  sponsor: (typeof sponsors)[0]
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
        className={`absolute inset-0 bg-gradient-to-br ${sponsor.color} opacity-0 group-hover:opacity-10 transition-opacity`}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div
          className={`bg-muted rounded-lg flex items-center justify-center mb-4 ${
            size === "small" ? "w-20 h-20" : "w-32 h-32"
          }`}
        >
          <img
            src={sponsor.logo || "/placeholder.svg"}
            alt={sponsor.name}
            className="w-full h-full object-contain p-2"
          />
        </div>

        <h3
          className={`font-bold mb-2 font-[family-name:var(--font-orbitron)] ${
            size === "small" ? "text-sm" : "text-lg"
          }`}
        >
          {sponsor.name}
        </h3>

        <p
          className={`font-bold font-mono ${size === "small" ? "text-xs" : "text-sm"} ${
            sponsor.tier === "Platinum" ? "text-primary" : sponsor.tier === "Gold" ? "text-secondary" : "text-accent"
          }`}
        >
          {sponsor.tier} Sponsor
        </p>
      </div>

      {/* Neon border on hover */}
      <div
        className={`absolute inset-0 border-2 ${
          sponsor.tier === "Platinum"
            ? "border-primary"
            : sponsor.tier === "Gold"
              ? "border-secondary"
              : "border-accent"
        } opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none`}
      />
    </div>
  )
}
