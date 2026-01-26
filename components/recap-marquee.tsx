"use client"

import React from "react"

const recapImages = [
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
]

const MarqueeRow = ({
  images,
  reverse = false,
}: {
  images: string[]
  reverse?: boolean
}) => {
  const duplicatedImages = [...images, ...images]

  return (
    <div className="relative flex overflow-hidden">
      <div
        className={`flex gap-4 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {duplicatedImages.map((src, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-64 h-44 md:w-72 md:h-48 rounded-xl overflow-hidden group"
          >
            <img
              src={src}
              alt={`Recap ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
      <div
        className={`flex gap-4 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {duplicatedImages.map((src, index) => (
          <div
            key={`dup-${index}`}
            className="relative flex-shrink-0 w-64 h-44 md:w-72 md:h-48 rounded-xl overflow-hidden group"
          >
            <img
              src={src}
              alt={`Recap ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function RecapMarquee() {
  const topRowImages = recapImages.slice(0, 4)
  const bottomRowImages = recapImages.slice(4, 8)

  return (
    <section className="py-16 overflow-hidden border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 font-orbitron">
          <span className="neon-glow-pink">Our Journey</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            A look back at the energy, innovation, and unforgettable memories from past MorganHacks events
        </p>
      </div>

      <div className="space-y-6">
        {/* Top row - scrolls left */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <MarqueeRow images={topRowImages} />
        </div>

        {/* Bottom row - scrolls right */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <MarqueeRow images={bottomRowImages} reverse />
        </div>
      </div>
    </section>
  )
}
