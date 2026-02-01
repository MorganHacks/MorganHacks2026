"use client"

import { useState, useEffect } from "react"
import { Linkedin } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  linkedin: string
}

export function TeamShowcase() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    fetch("/team.json")
      .then((res) => res.json())
      .then((data) => setTeam(data.team))
      .catch((err) => console.error("Failed to load team data:", err))
  }, [])

  return (
    <section className="py-20 border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-orbitron">
            <span className="neon-glow-cyan">Meet the</span>{" "}
            <span className="neon-glow-pink">Team</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            The passionate individuals behind MorganHacks who work tirelessly to create an unforgettable experience
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="group relative"
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-2xl bg-card border border-primary/20 transition-all duration-500 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Neon Border Effect on Hover */}
                  <div 
                    className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                      hoveredId === member.id ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      WebkitMaskComposite: "xor",
                      padding: "2px",
                    }}
                  />

                  {/* LinkedIn Button */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 p-2 rounded-full bg-background/80 border border-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:border-primary transform translate-y-2 group-hover:translate-y-0"
                  >
                    <Linkedin className="w-4 h-4 text-foreground" />
                  </a>
                </div>

                {/* Info Section */}
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg font-orbitron text-foreground group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">
                    {member.role}
                  </p>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/60 transition-all duration-300 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/0 group-hover:border-accent/60 transition-all duration-300 rounded-br-2xl" />
              </div>

              {/* Glow Effect Behind Card */}
              <div 
                className={`absolute inset-0 -z-10 rounded-2xl transition-opacity duration-500 ${
                  hoveredId === member.id ? "opacity-50" : "opacity-0"
                }`}
                style={{
                  background: "radial-gradient(circle at center, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
                  transform: "scale(1.1)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Join CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-6 rounded-2xl bg-card/50 border border-primary/20">
            <p className="text-muted-foreground mb-2">Want to be part of the team?</p>
            <a 
              href="mailto:team@morganhacks.com" 
              className="text-primary font-mono hover:text-accent transition-colors"
            >
              team@morganhacks.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
