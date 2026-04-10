import { TrackLandingKinetic } from "@/components/track-landing-kinetic"
import trackDetails from "@/public/track-details.json"

type TrackDetail = {
  trackName: string
  description: string
  challenge: string
  whatGoodLooksLike: string[]
  prizes: string[]
  resources: { name: string; description: string; url: string }[]
}

export default function TracksPage() {
  const tracks = Object.entries(trackDetails as Record<string, TrackDetail>).map(([id, detail]) => ({
    id,
    ...detail,
  }))

  return (
    <main className="min-h-screen">
      <TrackLandingKinetic tracks={tracks} />
    </main>
  )
}
