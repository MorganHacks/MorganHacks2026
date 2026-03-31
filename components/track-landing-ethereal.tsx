import Link from "next/link"
import { Heart, Leaf, Gamepad2, Infinity as InfinityIcon, Sparkles } from "lucide-react"

type TrackDetail = {
	id: string
	trackName: string
	description: string
}

type TrackLandingEtherealProps = {
	tracks: TrackDetail[]
}

const trackNodes = [
	{
		id: "health_human_impact",
		label: "VITALITY",
		tagline: "Pulse of the collective",
		position: { top: 12, left: 44 },
		color: "#f472b6",
		glow: "rgba(244, 114, 182, 0.35)",
		icon: Heart,
		size: "p-8",
	},
	{
		id: "planet",
		label: "GAIA_CORE",
		tagline: "Symbiotic rhythms",
		position: { top: 30, left: 78 },
		color: "#2dd4bf",
		glow: "rgba(45, 212, 191, 0.35)",
		icon: Leaf,
		size: "p-7",
	},
	{
		id: "culture",
		label: "FOLKLORE",
		tagline: "Digital ancestral echoes",
		position: { top: 68, left: 30 },
		color: "#a855f7",
		glow: "rgba(168, 85, 247, 0.35)",
		icon: Gamepad2,
		size: "p-9",
	},
	{
		id: "commerce",
		label: "FLOW",
		tagline: "Infinite value exchange",
		position: { top: 48, left: 20 },
		color: "#ffffff",
		glow: "rgba(255, 255, 255, 0.3)",
		icon: InfinityIcon,
		size: "p-6",
	},
	{
		id: "beyond_reality",
		label: "TRANSCENDENCE",
		tagline: "Unfolding dimensions",
		position: { top: 70, left: 68 },
		color: "#2dd4bf",
		glow: "rgba(45, 212, 191, 0.35)",
		icon: Sparkles,
		size: "p-10",
	},
]

export function TrackLandingEthereal({ tracks }: TrackLandingEtherealProps) {
	const orderedTracks = trackNodes.map((node) => {
		const match = tracks.find((track) => track.id === node.id)
		return {
			...node,
			trackName: match?.trackName ?? node.label,
			description: match?.description ?? "",
		}
	})

	return (
		<section className="relative min-h-[900px] overflow-hidden bg-[#0a0314] text-white">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a0b2e_0%,#0a0314_100%)]" />
				<div className="absolute -left-[10%] -top-[20%] h-[60%] w-[60%] animate-pulse rounded-full bg-linear-to-br from-[#4a1d96] via-[#2dd4bf] to-[#f472b6] opacity-30 blur-[90px]" />
				<div className="absolute -bottom-[10%] -right-[10%] h-[50%] w-[50%] rounded-full bg-linear-to-br from-[#4a1d96] via-[#2dd4bf] to-[#f472b6] opacity-20 blur-[90px]" />
				<svg className="absolute inset-0 h-full w-full opacity-10" preserveAspectRatio="none" viewBox="0 0 1000 1000">
					<path
						d="M440,120 Q600,200 780,300 Q500,500 300,680 Q250,550 200,480 Q400,300 440,120"
						fill="none"
						stroke="white"
						strokeWidth="0.5"
					/>
					<path
						d="M780,300 Q850,500 680,700 Q500,750 300,680"
						fill="none"
						stroke="white"
						strokeWidth="0.5"
					/>
				</svg>
			</div>

			<div className="relative z-10 mx-auto flex min-h-[900px] w-full max-w-6xl flex-col px-6 pb-16 pt-24 md:px-12">
				<div className="flex flex-col gap-2">
					<span className="text-xs uppercase tracking-[0.35em] text-white/60">AETHER_MANIFEST</span>
					<h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">Navigating the Emergent</h1>
					<p className="max-w-2xl text-base text-white/60 md:text-lg">
						Drift through the living network of tracks. Each node is a story thread waiting for builders to weave
						into reality.
					</p>
				</div>

				<div className="relative mt-12 min-h-[560px] flex-1">
					<div className="absolute left-0 top-0 space-y-6">
						<div>
							<p className="text-lg text-[#2dd4bf]/80">Consciousness Streams</p>
							<div className="flex items-baseline gap-3">
								<span className="text-4xl font-semibold text-white">{tracks.length * 100 + 24}</span>
								<span className="text-xs uppercase tracking-[0.3em] text-white/40">Awakened Souls</span>
							</div>
							<div className="mt-2 h-px w-24 bg-linear-to-r from-[#2dd4bf] to-transparent" />
						</div>
						<div>
							<p className="text-lg text-[#f472b6]/80">Nexus Convergence ETA</p>
							<div className="flex items-baseline gap-3">
								<span className="text-3xl font-light text-white">11h 59m 59s</span>
							</div>
							<div className="mt-2 h-px w-32 bg-linear-to-r from-[#f472b6] to-transparent" />
						</div>
					</div>

					{orderedTracks.map((node) => {
						const Icon = node.icon

						return (
							<div
								key={node.id}
								className="absolute group"
								style={{ left: `${node.position.left}%`, top: `${node.position.top}%` }}
							>
								<Link href={`/tracks/${node.id}`} className="relative flex items-center justify-center">
									<span
										className="absolute inset-0 rounded-full opacity-0 transition duration-500 group-hover:opacity-100"
										style={{ boxShadow: `0 0 50px ${node.glow}` }}
									/>
									<span
										className={`relative flex items-center justify-center rounded-full ${node.size} transition duration-500 group-hover:-translate-y-1 group-hover:scale-105`}
										style={{
											background: "rgba(255, 255, 255, 0.03)",
											backdropFilter: "blur(8px)",
											boxShadow: `0 0 30px ${node.glow}`,
										}}
									>
										<Icon className="h-9 w-9" style={{ color: node.color }} />
									</span>

									<span className="pointer-events-none absolute -bottom-16 whitespace-nowrap text-center opacity-0 transition duration-500 group-hover:opacity-100">
										<span className="block text-xs font-semibold tracking-[0.35em] text-white">{node.trackName}</span>
										<span className="block text-sm italic text-white/60">{node.tagline}</span>
									</span>
								</Link>
							</div>
						)
					})}

					<div className="absolute bottom-16 right-12 hidden lg:block">
						<div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
							<div className="absolute h-px w-full rotate-45 bg-white/5" />
							<div className="absolute h-px w-full -rotate-45 bg-white/5" />
							<span className="text-sm text-white/40">Centered</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
