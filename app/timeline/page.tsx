"use client"

import { Navigation } from "@/components/navigation"
import { useEffect, useMemo, useState } from "react"
import { Clock3, MapPin, CalendarDays, UtensilsCrossed, Sparkles, Wrench, CircleDot } from "lucide-react"

type TimelineSubEvent = {
  title: string
  time: string
}

type TimelineEvent = {
  id: number
  title: string
  timeStart: string
  timeEnd?: string
  location?: string
  type: "general" | "food" | "highlight" | "workshop" | string
  subEvents?: TimelineSubEvent[]
  responsibility?: string
}

type TimelineDay = {
  date: string
  label: string
  events: TimelineEvent[]
}

type TimelineData = {
  days: TimelineDay[]
}

type ScheduleSnapshot = {
  mode: "before" | "live" | "next" | "ended"
  event: TimelineEvent | null
  day: TimelineDay | null
}

const EVENT_TYPE_STYLES: Record<string, string> = {
  general: "text-muted-foreground bg-muted/50",
  food: "text-accent bg-accent/15",
  highlight: "text-primary bg-primary/15",
  workshop: "text-secondary bg-secondary/15",
}

const EVENT_TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  general: CalendarDays,
  food: UtensilsCrossed,
  highlight: Sparkles,
  workshop: Wrench,
}

function parseDateTime(date: string, time: string) {
  const [hourText, minuteText] = time.split(":")
  const hour = Number(hourText)
  const minute = Number(minuteText)
  return new Date(`${date}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`)
}

function eventRange(day: TimelineDay, event: TimelineEvent) {
  const start = parseDateTime(day.date, event.timeStart)
  const end = event.timeEnd ? parseDateTime(day.date, event.timeEnd) : new Date(start.getTime() + 60 * 60 * 1000)
  return { start, end }
}

function formatTime(time: string) {
  const [hourText, minuteText] = time.split(":")
  const base = new Date()
  base.setHours(Number(hourText), Number(minuteText), 0, 0)
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(base)
}

function formatEventTime(event: TimelineEvent) {
  if (!event.timeEnd) {
    return formatTime(event.timeStart)
  }
  return `${formatTime(event.timeStart)} - ${formatTime(event.timeEnd)}`
}

function shouldShowEvent(day: TimelineDay, event: TimelineEvent) {
  if (day.date === "2026-04-11" && event.id === 0) {
    return false
  }

  const hiddenTitles = new Set(["clean up", "judges deliberation", "volunteers arrive"])
  return !hiddenTitles.has(event.title.trim().toLowerCase())
}

function dayTabLabel(day: TimelineDay) {
  const date = new Date(`${day.date}T00:00:00`)
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date)
  return weekday
}

export default function TimelinePage() {
  const [data, setData] = useState<TimelineData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeDate, setActiveDate] = useState<string | null>(null)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let mounted = true

    const loadTimeline = async () => {
      try {
        const response = await fetch("/timeline.json", { cache: "no-store" })
        if (!response.ok) {
          throw new Error(`Failed to load timeline: ${response.status}`)
        }

        const json = (await response.json()) as TimelineData
        if (!mounted) {
          return
        }

        setData(json)

        const currentTime = new Date()
        const dayForToday = json.days.find((day) => {
          const start = new Date(`${day.date}T00:00:00`)
          const end = new Date(`${day.date}T23:59:59`)
          return currentTime >= start && currentTime <= end
        })

        setActiveDate(dayForToday?.date ?? json.days[0]?.date ?? null)
      } catch (error) {
        console.error(error)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadTimeline()

    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 60 * 1000)

    return () => {
      mounted = false
      window.clearInterval(timer)
    }
  }, [])

  const activeDay = useMemo(() => {
    if (!data || !activeDate) {
      return null
    }
    return data.days.find((day) => day.date === activeDate) ?? null
  }, [activeDate, data])

  const currentSchedule = useMemo<ScheduleSnapshot>(() => {
    if (!data || data.days.length === 0) {
      return { mode: "before", event: null, day: null }
    }

    const allEvents = data.days
      .flatMap((day) =>
        day.events.filter((event) => shouldShowEvent(day, event)).map((event) => {
          const { start, end } = eventRange(day, event)
          return { day, event, start, end }
        }),
      )
      .sort((a, b) => a.start.getTime() - b.start.getTime())

    const live = allEvents.find((entry) => now >= entry.start && now < entry.end)
    if (live) {
      return { mode: "live", event: live.event, day: live.day }
    }

    const upcoming = allEvents.find((entry) => now < entry.start)
    if (upcoming) {
      const firstStart = allEvents[0]?.start
      if (firstStart && now < firstStart) {
        return { mode: "before", event: upcoming.event, day: upcoming.day }
      }
      return { mode: "next", event: upcoming.event, day: upcoming.day }
    }

    const lastEntry = allEvents.at(-1)
    return { mode: "ended", event: lastEntry?.event ?? null, day: lastEntry?.day ?? null }
  }, [data, now])

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation />

      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_85%_65%_at_50%_0%,theme(colors.secondary/.06),transparent_70%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_55%_at_50%_5%,#000_70%,transparent_115%)] opacity-20" />

      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <CurrentScheduleCard schedule={currentSchedule} />

          {/* <header className="mt-8 mb-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-orbitron">
              MorganHacks <span className="text-primary">Schedule</span>
            </h1>
          </header> */}

          <div className="mt-8 md:mt-10">
            {loading && (
              <div className="rounded-2xl border border-primary/30 bg-card/80 backdrop-blur p-8 text-muted-foreground font-mono">
                Loading schedule...
              </div>
            )}

            {!loading && data && data.days.length > 0 && (
              <>
                <nav className="mb-10 flex justify-center">
                  <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-card/85 border border-primary/30 backdrop-blur shadow-lg shadow-black/20">
                    {data.days.map((day) => {
                      const isActive = day.date === activeDate
                      return (
                        <button
                          key={day.date}
                          type="button"
                          onClick={() => setActiveDate(day.date)}
                          className={`px-5 py-2.5 rounded-full text-xs md:text-sm transition-all font-mono uppercase tracking-wide ${
                            isActive
                              ? "bg-primary text-primary-foreground neon-border"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                          }`}
                        >
                          {dayTabLabel(day)}
                        </button>
                      )
                    })}
                  </div>
                </nav>

                {activeDay && (
                  <div className="relative pl-8 md:pl-24">
                    <div className="absolute left-[22px] md:left-[94px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary/40 to-transparent" />

                    <div className="space-y-8">
                      {activeDay.events.filter((event) => shouldShowEvent(activeDay, event)).map((event) => {
                        const { start, end } = eventRange(activeDay, event)
                        const state = now >= end ? "completed" : now >= start && now < end ? "live" : "upcoming"
                        const TypeIcon = EVENT_TYPE_ICONS[event.type] ?? CircleDot

                        return (
                          <article key={event.id} className="relative">
                            <div
                              className={`absolute -left-[11px] md:-left-[11px] top-5 w-5 h-5 rounded-full border-2 z-10 ${
                                state === "live"
                                  ? "bg-primary border-primary shadow-[0_0_16px_theme(colors.primary/.65)]"
                                  : state === "completed"
                                    ? "bg-muted border-muted-foreground/40"
                                    : "bg-card border-primary/40"
                              }`}
                            />

                            <div
                              className={`flex flex-col md:flex-row md:items-start gap-4 md:gap-10 ${
                                state === "completed" ? "opacity-60" : ""
                              }`}
                            >
                              <div
                                className={`hidden md:block w-28 text-right pt-4 text-sm font-mono tracking-wide ${
                                  state === "live" ? "text-primary" : "text-muted-foreground"
                                }`}
                              >
                                {formatTime(event.timeStart)}
                              </div>

                              <div
                                className={`flex-1 rounded-2xl border p-5 md:p-6 backdrop-blur ${
                                  state === "live"
                                    ? "bg-card border-primary/40 shadow-[0_16px_40px_-20px_theme(colors.primary/.50)]"
                                    : "bg-card/85 border-primary/20"
                                }`}
                              >
                                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                                  <span
                                    className={`inline-flex items-center justify-center text-[11px] uppercase tracking-[0.14em] font-semibold px-2.5 py-1 rounded-full ${
                                      EVENT_TYPE_STYLES[event.type] ?? "text-muted-foreground bg-muted/50"
                                    }`}
                                    title={event.type}
                                    aria-label={event.type}
                                  >
                                    <TypeIcon className="w-3.5 h-3.5" />
                                  </span>
                                  <span
                                    className={`text-xs px-2.5 py-1 rounded-full ${
                                      state === "live"
                                        ? "bg-primary/20 text-primary"
                                        : state === "completed"
                                          ? "bg-muted text-muted-foreground"
                                          : "bg-secondary/15 text-secondary"
                                    }`}
                                  >
                                    {state === "live" ? "Live Now" : state === "completed" ? "Completed" : "Upcoming"}
                                  </span>
                                </div>

                                <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 font-orbitron">{event.title}</h3>

                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-mono">
                                  <div className="inline-flex items-center gap-2">
                                    <Clock3 className="w-4 h-4" />
                                    <span>{formatEventTime(event)}</span>
                                  </div>
                                  {event.location && (
                                    <div className="inline-flex items-center gap-2">
                                      <MapPin className="w-4 h-4" />
                                      <span>{event.location}</span>
                                    </div>
                                  )}
                                </div>

                                {event.subEvents && event.subEvents.length > 0 && (
                                  <div className="mt-4 grid gap-2">
                                    {event.subEvents.map((subEvent) => (
                                      <div
                                        key={`${event.id}-${subEvent.title}`}
                                        className="rounded-lg bg-muted/40 px-3 py-2 text-sm border border-primary/10"
                                      >
                                        <span className="text-foreground">{subEvent.title}</span>
                                        <span className="ml-2 text-muted-foreground font-mono">{subEvent.time}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </article>
                        )
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

function CurrentScheduleCard({ schedule }: { schedule: ScheduleSnapshot }) {
  const dateLabel = schedule.day
    ? new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(
        new Date(`${schedule.day.date}T00:00:00`),
      )
    : "April 11-12"

  const title =
    schedule.mode === "live"
      ? "What's Happening Now"
      : schedule.mode === "before"
        ? ""
        // ? "Hackathon Starts Soon"
        : schedule.mode === "next"
          ? "Up Next"
          : "Hackathon Schedule Completed"

  const subtitle =
    schedule.mode === "live"
      ? "Currently in session"
      : schedule.mode === "before"
        ? "MorganHacks takes place April 11-12"
        : schedule.mode === "next"
          ? "Next scheduled event"
          : "Thanks for joining us"

  return (
    <section className="rounded-2xl border border-primary/30 bg-card/85 backdrop-blur-xl p-5 md:p-7 shadow-[0_20px_45px_-28px_theme(colors.primary/.60)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-primary font-semibold font-mono">{subtitle}</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight font-orbitron">{title}</h2>
          {schedule.event ? (
            <>
              <p className="mt-3 text-lg text-foreground font-orbitron">{schedule.event.title}</p>
              <p className="mt-1 text-sm text-muted-foreground font-mono">
                {dateLabel} - {formatEventTime(schedule.event)}
                {schedule.event.location ? ` - ${schedule.event.location}` : ""}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground font-mono">Schedule details will appear once timeline data is available.</p>
          )}
        </div>

        {schedule.mode === "live" && (
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-primary text-sm font-mono uppercase tracking-wide w-fit">
            <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
            Live Right Now
          </div>
        )}
      </div>
    </section>
  )
}
