import type { LucideIcon } from "lucide-react"
import { Award, Medal, Rocket, Sparkles, Trophy } from "lucide-react"

import { cn } from "@/lib/utils"

type PrizeTone = "primary" | "secondary" | "accent" | "neutral"

type PrizeCardConfig = {
  title: string
  amount: string
  description: string
  note: string
  icon: LucideIcon
  tone: PrizeTone
  featured?: boolean
}

const prizeCards: PrizeCardConfig[] = [
  {
    title: "First Place",
    amount: "$5,000",
    description:
      "Awarded to the team that builds the most outstanding project across creativity, technical execution, and an unforgettable final demo.",
    note: "Yeah... this one broke the room.",
    icon: Trophy,
    tone: "primary",
    featured: true,
  },
  {
    title: "Second Place",
    amount: "$3,000",
    description:
      "Recognizes a team that delivers a strong, well-rounded project with clear product thinking, solid engineering, and a compelling presentation.",
    note: "So close it hurts. Still elite.",
    icon: Medal,
    tone: "secondary",
  },
  {
    title: "Third Place",
    amount: "$2,000",
    description: "Given to a standout build that shows great polish, strong ideas, and a demo that people won't forget.",
    note: "Not first, but definitely not forgettable.",
    icon: Award,
    tone: "accent",
  },
  {
    title: "Fourth Place",
    amount: "$1,500",
    description: "Awarded to a team that creates a clean, practical solution with thoughtful design and solid execution.",
    note: "Lowkey one of the most useful builds here.",
    icon: Sparkles,
    tone: "primary",
  },
  {
    title: "Fifth Place",
    amount: "$1,000",
    description: "Recognizes a promising project that demonstrates strong effort, creativity, and future potential.",
    note: "This one's going somewhere.",
    icon: Rocket,
    tone: "neutral",
  },
]

const toneClasses: Record<
  PrizeTone,
  {
    border: string
    label: string
    icon: string
    iconWrap: string
    halo: string
    amount: string
    line: string
  }
> = {
  primary: {
    border: "border-primary/25 hover:border-primary/40",
    label: "text-primary",
    icon: "text-primary",
    iconWrap: "border-primary/20 bg-primary/10",
    halo: "bg-primary/14",
    amount: "text-white [text-shadow:0_0_26px_rgba(129,236,255,0.34)]",
    line: "from-primary/60 to-transparent",
  },
  secondary: {
    border: "border-secondary/20 hover:border-secondary/35",
    label: "text-secondary",
    icon: "text-secondary",
    iconWrap: "border-secondary/20 bg-secondary/10",
    halo: "bg-secondary/14",
    amount: "text-white [text-shadow:0_0_26px_rgba(166,140,255,0.32)]",
    line: "from-secondary/60 to-transparent",
  },
  accent: {
    border: "border-accent/20 hover:border-accent/35",
    label: "text-accent",
    icon: "text-accent",
    iconWrap: "border-accent/20 bg-accent/10",
    halo: "bg-accent/14",
    amount: "text-white [text-shadow:0_0_26px_rgba(112,170,255,0.3)]",
    line: "from-accent/60 to-transparent",
  },
  neutral: {
    border: "border-white/10 hover:border-white/20",
    label: "text-foreground/80",
    icon: "text-foreground/80",
    iconWrap: "border-white/10 bg-white/5",
    halo: "bg-white/10",
    amount: "text-white [text-shadow:0_0_18px_rgba(255,255,255,0.22)]",
    line: "from-white/25 to-transparent",
  },
}

export function HomePrizeShowcase() {
  return (
    <section id="prizes" aria-labelledby="home-prizes-heading" className="px-3 pb-12 sm:px-4 sm:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="home-prizes-heading" className="text-3xl font-bold font-orbitron sm:text-4xl lg:text-[3.25rem]">
              <span className="neon-glow-cyan">Prizes</span>
            </h2>
          </div>
          <div className="inline-flex w-fit items-center rounded-full border border-primary/15 bg-background/45 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.24em] text-muted-foreground backdrop-blur-sm">
            Teams of 2-4
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:gap-6">
          {prizeCards.map((card) => (
            <PrizeCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PrizeCard({ title, amount, description, note, icon: Icon, tone, featured = false }: PrizeCardConfig) {
  const styles = toneClasses[tone]

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[1.25rem] border bg-[linear-gradient(180deg,rgba(37,37,45,0.5),rgba(19,19,25,0.82))] p-6 backdrop-blur-[24px] transition-all duration-300 hover:-translate-y-1",
        styles.border,
        featured ? "min-h-[22rem] p-8 md:col-span-6 lg:col-span-4" : "min-h-[18rem] md:col-span-3 lg:col-span-2",
      )}
    >
      <div className={cn("absolute -right-16 -top-16 h-52 w-52 rounded-full blur-3xl transition-all duration-500 group-hover:opacity-90", styles.halo)} />

      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className={cn("rounded-2xl border p-3", styles.iconWrap)}>
              <Icon className={cn("h-6 w-6", styles.icon)} />
            </div>
            <span className={cn("text-[11px] font-mono font-semibold uppercase tracking-[0.28em]", styles.label)}>{title}</span>
          </div>

          <p
            className={cn(
              "font-orbitron font-black tracking-tight leading-none",
              featured ? "text-6xl sm:text-[5.5rem]" : "text-5xl sm:text-[3.5rem]",
              styles.amount,
            )}
          >
            {amount}
          </p>

          <p className={cn("mt-4 max-w-md text-sm leading-6 text-muted-foreground", featured ? "sm:text-base" : "text-sm")}>
            {description}
          </p>

          <p className={cn("mt-4 max-w-md text-sm italic leading-6 text-foreground/78", featured ? "sm:text-base" : "text-sm")}>
            {note}
          </p>
        </div>

        <div className={cn("mt-8 h-px w-full bg-gradient-to-r", styles.line)} />
      </div>
    </article>
  )
}
