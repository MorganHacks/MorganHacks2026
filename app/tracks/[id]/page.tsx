import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Zap, Users, Trophy } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const trackData: Record<
  string,
  {
    name: string
    description: string
    fullDescription: string
    color: string
    icon: string
    challenges: string[]
    prizes: string[]
    mentors: string[]
    resources: string[]
  }
> = {
  ai: {
    name: "AI District",
    description: "Machine learning, neural networks, and artificial intelligence",
    fullDescription:
      "The AI District is the beating heart of machine intelligence in our parallel cities. Here, hackers push the boundaries of what's possible with neural networks, natural language processing, and computer vision. From chatbots to recommendation systems, this is where silicon dreams become reality.",
    color: "from-cyan-500 to-blue-500",
    icon: "🤖",
    challenges: [
      "Build an AI assistant that understands context",
      "Create a computer vision app for accessibility",
      "Develop a predictive model for social good",
      "Design an ML-powered creative tool",
    ],
    prizes: ["$10,000 Grand Prize", "$5,000 Runner Up", "$2,500 Best Use of OpenAI"],
    mentors: ["Dr. Sarah Chen - ML Researcher", "Alex Park - AI Product Lead", "Maya Rodriguez - Data Scientist"],
    resources: ["OpenAI API Credits", "Hugging Face Pro", "Google Colab GPUs", "TensorFlow Workshop"],
  },
  sustainability: {
    name: "Sustainability Harbor",
    description: "Green technology, climate solutions, and environmental innovation",
    fullDescription:
      "Sustainability Harbor is our greenest district, where technology meets environmental responsibility. Hackers here are tackling climate change, renewable energy, and sustainable living through innovative software and hardware solutions. This is where we build the future we want to live in.",
    color: "from-green-500 to-emerald-500",
    icon: "🌱",
    challenges: [
      "Create a carbon footprint tracking app",
      "Build tools for sustainable agriculture",
      "Develop renewable energy optimization software",
      "Design waste reduction solutions",
    ],
    prizes: ["$10,000 Grand Prize", "$5,000 Runner Up", "$2,500 Best Environmental Impact"],
    mentors: [
      "Prof. James Liu - Environmental Tech",
      "Emma Thompson - Sustainability Expert",
      "Carlos Mendez - Green Energy",
    ],
    resources: ["Climate Data APIs", "IoT Sensor Kits", "Satellite Imagery Access", "Sustainability Workshop"],
  },
  health: {
    name: "Health Core",
    description: "Medical technology, wellness apps, and healthcare innovation",
    fullDescription:
      "Health Core is the pulse of medical innovation in our parallel cities. This district focuses on healthcare technology, from telemedicine platforms to mental health apps, from fitness trackers to diagnostic tools. Here, code saves lives and algorithms improve wellbeing.",
    color: "from-pink-500 to-rose-500",
    icon: "❤️",
    challenges: [
      "Build a mental health support application",
      "Create accessible healthcare tools",
      "Develop fitness and wellness trackers",
      "Design medical data visualization systems",
    ],
    prizes: ["$10,000 Grand Prize", "$5,000 Runner Up", "$2,500 Best Health Innovation"],
    mentors: ["Dr. Lisa Anderson - Digital Health", "Michael Wong - Healthcare PM", "Nina Patel - UX Health"],
    resources: ["FHIR Health Data API", "Wearable Device SDKs", "Mental Health Resources", "Healthcare Workshop"],
  },
  entertainment: {
    name: "Entertainment Alley",
    description: "Gaming, AR/VR, creative tech, and digital experiences",
    fullDescription:
      "Entertainment Alley is where imagination runs wild. This vibrant district is home to game developers, VR creators, digital artists, and experience designers. From indie games to immersive installations, from music tech to interactive storytelling - this is where play meets innovation.",
    color: "from-purple-500 to-violet-500",
    icon: "🎮",
    challenges: [
      "Create an innovative game mechanic",
      "Build an AR/VR experience",
      "Develop music or audio technology",
      "Design interactive storytelling platforms",
    ],
    prizes: ["$10,000 Grand Prize", "$5,000 Runner Up", "$2,500 Most Creative Experience"],
    mentors: ["Jordan Kim - Game Developer", "Sophia Martinez - VR Designer", "Ryan Liu - Creative Technologist"],
    resources: ["Unity Pro Licenses", "Unreal Engine Access", "Meta Quest Devices", "Game Dev Workshop"],
  },
  robotics: {
    name: "Robotics Forge",
    description: "Hardware hacking, IoT, drones, and physical computing",
    fullDescription:
      "The Robotics Forge is where bits meet atoms. This industrial district is filled with the buzz of 3D printers, the hum of motors, and the glow of LEDs. From IoT devices to drones, from wearables to automation systems - if it moves, beeps, or blinks, it belongs here.",
    color: "from-orange-500 to-red-500",
    icon: "🤖",
    challenges: [
      "Build an autonomous robot or drone",
      "Create smart home IoT devices",
      "Develop wearable technology",
      "Design automation and robotics solutions",
    ],
    prizes: ["$10,000 Grand Prize", "$5,000 Runner Up", "$2,500 Best Hardware Hack"],
    mentors: ["Prof. David Zhang - Robotics", "Jessica Brown - Hardware Engineer", "Tom Anderson - IoT Specialist"],
    resources: ["Arduino & Raspberry Pi Kits", "3D Printing Access", "Electronic Components", "Hardware Workshop"],
  },
}

export default function TrackPage({ params }: { params: { id: string } }) {
  const track = trackData[params.id]

  if (!track) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link href="/tracks">
            <Button variant="ghost" className="mb-8 font-mono">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to City Map
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className={`inline-block text-6xl mb-4`}>{track.icon}</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-orbitron">
              <span className={`bg-linear-to-r ${track.color} bg-clip-text text-transparent`}>{track.name}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6">{track.description}</p>
            <p className="text-base text-foreground/80 leading-relaxed">{track.fullDescription}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="p-4 bg-card border border-primary/30 rounded-lg">
              <Trophy className="w-6 h-6 text-primary mb-2" />
              <p className="text-2xl font-bold font-orbitron">$17.5K</p>
              <p className="text-sm text-muted-foreground font-mono">Total Prizes</p>
            </div>
            <div className="p-4 bg-card border border-primary/30 rounded-lg">
              <Users className="w-6 h-6 text-secondary mb-2" />
              <p className="text-2xl font-bold font-orbitron">{track.mentors.length}</p>
              <p className="text-sm text-muted-foreground font-mono">Expert Mentors</p>
            </div>
            <div className="p-4 bg-card border border-primary/30 rounded-lg">
              <Zap className="w-6 h-6 text-accent mb-2" />
              <p className="text-2xl font-bold font-[family-name:var(--font-orbitron)]">{track.challenges.length}</p>
              <p className="text-sm text-muted-foreground font-mono">Challenges</p>
            </div>
          </div>

          {/* Challenges */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-orbitron)]">Track Challenges</h2>
            <div className="space-y-3">
              {track.challenges.map((challenge, i) => (
                <div
                  key={i}
                  className="p-4 bg-card border border-primary/30 rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary font-mono">{i + 1}</span>
                    </div>
                    <p className="text-foreground">{challenge}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prizes */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-orbitron)]">Prizes & Awards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {track.prizes.map((prize, i) => (
                <div
                  key={i}
                  className={`p-6 bg-gradient-to-br ${track.color} bg-opacity-10 border border-primary/30 rounded-lg text-center`}
                >
                  <p className="text-lg font-bold font-[family-name:var(--font-orbitron)]">{prize}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mentors */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-orbitron)]">Your Mentors</h2>
            <div className="space-y-3">
              {track.mentors.map((mentor, i) => (
                <div key={i} className="p-4 bg-card border border-primary/30 rounded-lg">
                  <p className="font-mono">{mentor}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-orbitron)]">Resources & Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {track.resources.map((resource, i) => (
                <div key={i} className="p-4 bg-card border border-primary/30 rounded-lg flex items-center gap-3">
                  <Zap className="w-5 h-5 text-accent" />
                  <p className="font-mono text-sm">{resource}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-orbitron)]">
              Ready to Build in {track.name}?
            </h3>
            <p className="text-muted-foreground mb-6 font-mono">Register now to secure your spot in this track</p>
            <Button size="lg" className={`bg-gradient-to-r ${track.color} text-white hover:opacity-90 neon-border`}>
              Register for MorganHacks 2026
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export async function generateStaticParams() {
  return [{ id: "ai" }, { id: "sustainability" }, { id: "health" }, { id: "entertainment" }, { id: "robotics" }]
}
