import { TeamShowcase } from "@/components/team-showcase"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="px-4 pb-4 pt-24 bg-gradient-to-b from-background via-card/30 to-background">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron">About MorganHacks</h1>
          </div>
          <div className="mx-auto max-w-3xl text-left text-lg leading-8 text-muted-foreground">
            <p>
              MorganHacks 2026 is Morgan State University&apos;s student-led hackathon, bringing together builders across
              all majors for a high-energy weekend of creating, learning, and shipping bold ideas. On April 11-12,
              students will build alongside mentors, sponsors, and peers in an inclusive space designed for both
              first-time hackers and experienced creators.
            </p>
          </div>
        </div>
      </section>

      <TeamShowcase />
    </main>
  )
}
