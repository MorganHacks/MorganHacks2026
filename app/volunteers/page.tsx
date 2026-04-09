import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Camera,
  ClipboardCheck,
  Clock3,
  Gift,
  Package,
  ShieldCheck,
  Sparkles,
  Users,
  Waypoints,
  type LucideIcon,
} from "lucide-react"

const VOLUNTEER_FORM_URL = "https://www.jotform.com/form/253384481261155"
const VOLUNTEER_GROUPME_URL = "https://groupme.com/join_group/114232249/4WJM5Ol8"

const highlights = [
  { label: "Innovators supported", value: "200+" },
  { label: "Onboarding session", value: "40 min" },
  { label: "Shift length", value: "3-4 hrs" },
]

const benefits: Array<{
  title: string
  description: string
  icon: LucideIcon
  accent: string
}> = [
  {
    title: "Network",
    description: "Connect directly with corporate sponsors and industry mentors throughout the weekend.",
    icon: Building2,
    accent: "text-primary border-primary/30 bg-primary/10",
  },
  {
    title: "Experience",
    description: "See how one of the largest HBCU hackathons comes together from the ground up.",
    icon: Sparkles,
    accent: "text-secondary border-secondary/30 bg-secondary/10",
  },
  {
    title: "Perks",
    description: "Get exclusive volunteer merch, free meals, and access to the weekend's best energy.",
    icon: Gift,
    accent: "text-accent border-accent/30 bg-accent/10",
  },
  {
    title: "Impact",
    description: "Help create an inclusive space where 200+ innovators can build, learn, and collaborate.",
    icon: Users,
    accent: "text-primary border-primary/30 bg-primary/10",
  },
  {
    title: "Service Hours",
    description: "Earn community service hours while contributing to a student-built production.",
    icon: BadgeCheck,
    accent: "text-secondary border-secondary/30 bg-secondary/10",
  },
]

const roles: Array<{
  title: string
  description: string
  icon: LucideIcon
}> = [
  {
    title: "Registration",
    description:
      "Be the first point of contact. Welcome attendees, manage check-in, and set the tone for the entire event.",
    icon: ClipboardCheck,
  },
  {
    title: "Operations",
    description:
      "Keep the event flowing in real time. Support workshops, assist participants, coordinate schedules, and solve on-the-ground issues.",
    icon: Waypoints,
  },
  {
    title: "Logistics",
    description:
      "Power the behind-the-scenes. Manage supplies, room setups, food distribution, and make sure every space is ready when it needs to be.",
    icon: Package,
  },
  {
    title: "Media",
    description:
      "Capture the story of MorganHacks. Take photos, record videos, and document the builds, energy, and moments all weekend long.",
    icon: Camera,
  },
]

const whatWeNeed = [
  "High-energy, reliable teammates who can keep momentum up all weekend.",
  "People who are comfortable helping attendees and solving small problems quickly.",
  "No coding experience required, just a get-it-done mindset.",
]

export const metadata: Metadata = {
  title: "Volunteers",
  description: "Help power MorganHacks 2026 as a volunteer across registration, operations, logistics, and media.",
}

export default function VolunteersPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden px-4 pb-16 pt-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-20" />
        <div className="absolute left-8 top-20 h-44 w-44 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
        <div className="absolute right-0 top-28 h-56 w-56 rounded-full bg-secondary/15 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-mono text-primary">
                <ShieldCheck className="h-4 w-4" />
                Students powering students
              </div>

              <div className="space-y-5">
                <h1 className="text-4xl font-bold leading-tight md:text-6xl font-orbitron">
                  <span className="neon-glow-cyan">Join the Crew</span>
                  <br />
                  <span className="neon-glow-pink">Behind the Magic</span>
                </h1>

                <div className="max-w-3xl space-y-4 text-lg leading-8 text-muted-foreground">
                  <p>
                    MorganHacks 2026 is more than just a hackathon. It&apos;s a full-scale production powered by
                    students, for students. From the first check-in at registration to the final trophy on stage, our
                    volunteers are the engine that keeps everything running.
                  </p>
                  <p>
                    We&apos;re looking for high-energy, reliable people to support logistics, registration, operations,
                    and media throughout the weekend. Whether you&apos;re technical or just love being part of something
                    big, there&apos;s a place for you on the team.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg" className="neon-border bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href={VOLUNTEER_FORM_URL} target="_blank" rel="noopener noreferrer">
                    Apply to Volunteer Now
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-accent/40 bg-card/70 text-accent hover:bg-accent/10 hover:text-accent"
                >
                  <a href={VOLUNTEER_GROUPME_URL} target="_blank" rel="noopener noreferrer">
                    Join the Volunteer GroupMe
                    <Users className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-secondary/40 bg-card/70 text-secondary hover:bg-secondary/10 hover:text-secondary"
                >
                  <a href="#roles">
                    Explore Roles
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {highlights.map((highlight) => (
                  <div
                    key={highlight.label}
                    className="rounded-2xl border border-white/8 bg-card/65 px-5 py-4 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
                  >
                    <p className="text-2xl font-bold font-orbitron text-foreground">{highlight.value}</p>
                    <p className="mt-1 text-sm font-mono text-muted-foreground">{highlight.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-10 hidden h-24 w-24 rounded-full border border-primary/30 bg-primary/10 blur-sm lg:block" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] border border-primary/25 bg-linear-to-br from-card/85 via-card/70 to-background/80 p-6 shadow-2xl shadow-black/25 backdrop-blur-xl md:p-8">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent" />
                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-primary/80 font-mono">Volunteer Snapshot</p>
                      <h2 className="mt-3 text-2xl font-bold font-orbitron">Weekend Support Crew</h2>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/10 text-secondary animate-float">
                      <Sparkles className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {roles.map((role, index) => (
                      <span
                        key={role.title}
                        className={`rounded-full border px-3 py-1 text-xs font-mono ${
                          index % 3 === 0
                            ? "border-primary/30 bg-primary/10 text-primary"
                            : index % 3 === 1
                              ? "border-secondary/30 bg-secondary/10 text-secondary"
                              : "border-accent/30 bg-accent/10 text-accent"
                        }`}
                      >
                        {role.title}
                      </span>
                    ))}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-primary/20 bg-background/35 p-4">
                      <div className="mb-3 flex items-center gap-3 text-primary">
                        <Clock3 className="h-4 w-4" />
                        <p className="text-sm font-mono">Commitment</p>
                      </div>
                      <p className="text-sm leading-7 text-muted-foreground">
                        Attend one 40-minute onboarding session on Thursday or Friday, then sign up for one or more
                        shifts during the event.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-secondary/20 bg-background/35 p-4">
                      <div className="mb-3 flex items-center gap-3 text-secondary">
                        <BadgeCheck className="h-4 w-4" />
                        <p className="text-sm font-mono">Perks</p>
                      </div>
                      <p className="text-sm leading-7 text-muted-foreground">
                        Volunteer merch, free meals, direct access to mentors and sponsors, plus service hours.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-background/40 p-5">
                    <p className="text-sm font-mono text-accent">No coding experience needed</p>
                    <p className="mt-3 text-base leading-7 text-muted-foreground">
                      What matters most is your energy, your reliability, and your ability to help MorganHacks feel
                      polished from the first welcome to the final awards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-mono uppercase tracking-[0.35em] text-primary/75">Why Volunteer</p>
            <h2 className="text-3xl font-bold md:text-5xl font-orbitron">
              <span className="neon-glow-blue">Build the experience</span>
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              Volunteers are the team that keeps MorganHacks welcoming, organized, and memorable for every attendee.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {benefits.map((benefit) => {
              const Icon = benefit.icon

              return (
                <div
                  key={benefit.title}
                  className="group rounded-3xl border border-white/8 bg-card/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                >
                  <div className={`inline-flex rounded-2xl border p-3 ${benefit.accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold font-orbitron">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="roles" className="px-4 pb-16 scroll-mt-24">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-mono uppercase tracking-[0.35em] text-secondary/80">Volunteer Roles</p>
            <h2 className="text-3xl font-bold md:text-5xl font-orbitron">
              <span className="neon-glow-pink">Find your lane</span>
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              Whether you want to welcome people, keep rooms running, move logistics, or capture the event, there&apos;s a
              clear role for you.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {roles.map((role, index) => {
              const Icon = role.icon

              return (
                <div
                  key={role.title}
                  className={`rounded-3xl border bg-card/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${
                    index % 2 === 0 ? "border-primary/20 hover:border-primary/35" : "border-secondary/20 hover:border-secondary/35"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 inline-flex rounded-2xl border p-3 ${
                        index % 2 === 0
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-secondary/30 bg-secondary/10 text-secondary"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-semibold font-orbitron">{role.title}</h3>
                      <p className="text-base leading-8 text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-accent/25 bg-card/70 p-6 backdrop-blur-sm md:p-8">
            <div className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-mono text-accent">
              Commitment
            </div>
            <h2 className="mt-5 text-3xl font-bold font-orbitron">What the weekend asks from you</h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground">
              <div className="rounded-2xl border border-white/8 bg-background/35 p-4">
                Attend a 40-minute onboarding session on Thursday or Friday via Google Meet.
              </div>
              <div className="rounded-2xl border border-white/8 bg-background/35 p-4">
                Sign up for one or more 3-4 hour shifts during the event weekend.
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-primary/25 bg-linear-to-br from-card/75 via-card/70 to-background/70 p-6 backdrop-blur-sm md:p-8">
            <div className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-mono text-primary">
              Who We&apos;re Looking For
            </div>
            <h2 className="mt-5 text-3xl font-bold font-orbitron">Bring the energy. We&apos;ll build the rest together.</h2>
            <div className="mt-6 space-y-4">
              {whatWeNeed.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/8 bg-background/35 p-4">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-base leading-7 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-primary/25 bg-linear-to-r from-primary/10 via-card/80 to-secondary/10 p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-sm md:p-10">
          <p className="text-sm font-mono uppercase tracking-[0.35em] text-primary/80">Ready to make history at Morgan State?</p>
          <h2 className="mt-4 text-3xl font-bold md:text-5xl font-orbitron">
            <span className="neon-glow-cyan">Help power</span> <span className="neon-glow-pink">MorganHacks 2026</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            No coding experience needed, just your energy, your reliability, and a get-it-done mindset.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="neon-border bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={VOLUNTEER_FORM_URL} target="_blank" rel="noopener noreferrer">
                Apply to Volunteer Now
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-accent/40 bg-card/70 text-accent hover:bg-accent/10 hover:text-accent"
            >
              <a href={VOLUNTEER_GROUPME_URL} target="_blank" rel="noopener noreferrer">
                Join the Volunteer GroupMe
                <Users className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <p className="mt-5 text-sm font-mono text-muted-foreground">
            Questions?{" "}
            <a
              href="mailto:morganhacks2022@gmail.com"
              className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
            >
              Email the team
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
