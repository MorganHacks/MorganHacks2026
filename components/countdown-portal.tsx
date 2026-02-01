"use client"

import { useEffect, useState } from "react"

const TARGET_DATE = new Date("2026-04-11T00:00:00")

export function CountdownPortal() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  
  const [isPortalOpen, setIsPortalOpen] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +TARGET_DATE - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setIsPortalOpen(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[500px]">
      {/* Portal background effect - using radial gradient instead of blur to avoid GPU artifacts */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className={`w-[500px] h-[500px] rounded-full transition-all duration-1000 ${
            isPortalOpen
              ? "animate-pulse bg-[radial-gradient(circle_at_center,hsl(var(--primary))_0%,hsl(var(--secondary))_25%,hsl(var(--accent))_50%,transparent_70%)]"
              : "bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.2)_0%,hsl(var(--secondary)/0.2)_25%,transparent_60%)]"
          }`}
        />
      </div>

      {/* Portal ring */}
      <div className="relative z-10">
        <div
          className={`relative w-80 h-80 md:w-96 md:h-96 rounded-full border-4 transition-all duration-500 ${
            isPortalOpen ? "border-accent animate-spin-slow neon-border" : "border-primary/50 animate-pulse"
          }`}
        >
          {/* Inner portal rings */}
          <div className="absolute inset-4 rounded-full border-2 border-secondary/30 animate-pulse" />
          <div className="absolute inset-8 rounded-full border border-accent/20" />

          {/* Countdown content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            {!isPortalOpen ? (
              <>
                <h3 className="text-sm md:text-base text-muted-foreground uppercase tracking-widest mb-4 font-mono">
                  Portal Opens In
                </h3>
                <div className="grid grid-cols-4 gap-2 md:gap-4 w-full">
                  <TimeUnit value={timeLeft.days} label="Days" />
                  <TimeUnit value={timeLeft.hours} label="Hours" />
                  <TimeUnit value={timeLeft.minutes} label="Mins" />
                  <TimeUnit value={timeLeft.seconds} label="Secs" />
                </div>
                <p className="mt-6 text-xs md:text-sm text-muted-foreground font-mono">April 11, 2026</p>
              </>
            ) : (
              <div className="animate-fade-in">
                <div className="text-6xl md:text-8xl mb-4 neon-glow-cyan">🚀</div>
                <h3 className="text-2xl md:text-3xl font-bold neon-glow-blue font-orbitron">
                  PORTAL OPEN
                </h3>
                <p className="mt-4 text-sm text-accent">MorganHacks has begun!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl md:text-4xl font-bold text-primary neon-glow-cyan font-orbitron">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[10px] md:text-xs text-muted-foreground uppercase mt-1 font-mono">{label}</div>
    </div>
  )
}
