import { TeamShowcase } from "@/components/team-showcase"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <section className="px-4 pb-4 pt-24 bg-gradient-to-b from-background via-card/30 to-background">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron">About MorganHacks</h1>
          </div>
          <div className="mx-auto max-w-3xl space-y-4 text-left text-lg leading-8 text-muted-foreground">
            <p>
              MorganHacks is Morgan State University&apos;s hackathon for builders across all majors, bringing together
              students who want to create, experiment, and solve real problems with technology. On April 11-12, 2026,
              participants will spend the weekend turning ideas into working projects, learning from one another, and
              building in a space designed for curiosity, collaboration, and momentum.
            </p>
            <p>
              Whether someone is shipping their first prototype or refining a more ambitious concept, MorganHacks is
              meant to feel accessible, energetic, and community-driven. It is a weekend to meet other creators, push
              ideas further than expected, and leave with something tangible that did not exist before.
            </p>
          </div>
        </div>
      </section>

      <TeamShowcase />
    </main>
  )
}
