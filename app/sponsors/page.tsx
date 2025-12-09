import { Navigation } from "@/components/navigation"
import { SponsorGrid } from "@/components/sponsor-grid"
import { AnalyticsDataTower } from "@/components/analytics-data-tower"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SponsorsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Sponsors section */}
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 font-orbitron">
                <span className="neon-glow-pink">Our Sponsors</span>
              </h1>
              <div className="space-y-4 text-left max-w-4xl mx-auto text-base leading-relaxed">
                <p>
                  Hello, Potential Sponsors,
                </p>
                <p>
                  Thank you for your interest in supporting MorganHacks, Morgan State University’s premier hackathon and
                  one of the fastest growing university-led tech events in the HBCU ecosystem. Next spring, students
                  from across the country will gather for an exciting two-day experience of building, learning,
                  networking, and innovation.
                </p>
                <p>
                  In 2025, MorganHacks welcomed students from dozens of schools and a wide range of majors. Our hackers
                  brought creativity, ambition, and passion for using technology to solve real-world problems. With your
                  support, MorganHacks 2026 aims to expand that impact even further through immersive workshops,
                  hands-on mentorship, community challenges, and new interdisciplinary tracks.
                </p>
                <p>
                  MorganHacks is designed to be welcoming for beginners while still offering depth for experienced
                  builders. Whether participants are creating their first mobile app or experimenting with robotics, AI,
                  cybersecurity, or sustainability solutions, our team is committed to creating a supportive environment
                  that helps students grow.
                </p>
                <p>
                  By partnering with us, you not only support the next generation of engineers, designers, and
                  entrepreneurs but also gain meaningful opportunities to engage directly with diverse, high-potential
                  talent.
                </p>
                <p>We appreciate your consideration and look forward to connecting with you.</p>
                <p>Thank you,<br />The MorganHacks Team</p>
              </div>

              <div className="mt-6 flex justify-center">
                <Link
                  href="https://www.jotform.com/form/253334594024051"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="neon-border">
                    Sponsor Us
                  </Button>
                </Link>
              </div>
            </div> 

            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-3 font-orbitron">
                  <span className="neon-glow-cyan">Last Year’s Review</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
                  Sponsors who backed us and the attendee breakdown your brand can reach.
                </p>
              </div>

              <SponsorGrid />
              <AnalyticsDataTower />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
