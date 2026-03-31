import { Navigation } from "@/components/navigation"
import { TrackLandingKinetic } from "@/components/track-landing-kinetic"
import trackDetails from "@/public/track-details.json"

export default function TracksPage() {
  const tracks = Object.entries(trackDetails as Record<string, TrackDetail>).map(([id, track]) => ({
    id,
    ...track,
  }))

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* <TrackLandingKinetic tracks={tracks} /> */}
    </main>
  )
}

type TrackDetail = {
  trackName: string
  description: string
  challenge: string
  whatGoodLooksLike: string[]
  prizes: string[]
  resources: { name: string; description: string; url: string }[]
}
