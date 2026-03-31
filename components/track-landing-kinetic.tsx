import Link from "next/link"
import { Banknote, Gamepad2, Heart, Leaf, Sparkles } from "lucide-react"

type TrackDetail = {
	id: string
	trackName: string
	description: string
}

type TrackLandingKineticProps = {
	tracks: TrackDetail[]
}

const trackMap = [
	{
		id: "health_human_impact",
		sector: "Sector 44:12",
		position: { top: 12, left: 44 },
		color: "#ff8eb2",
		glow: "rgba(255, 142, 178, 0.18)",
		icon: Heart,
		legend:
			"Biological and human-centric technological advancement.",
	},
	{
		id: "planet",
		sector: "Sector 78:30",
		position: { top: 30, left: 78 },
		color: "#10b981",
		glow: "rgba(16, 185, 129, 0.18)",
		icon: Leaf,
		legend: "Sustainability, ecology, and climate remediation systems.",
	},
	{
		id: "culture",
		sector: "Sector 30:68",
		position: { top: 68, left: 30 },
		color: "#a855f7",
		glow: "rgba(168, 85, 247, 0.18)",
		icon: Gamepad2,
		legend: "Creative media, games, and immersive cultural moments.",
	},
	{
		id: "commerce",
		sector: "Sector 20:48",
		position: { top: 48, left: 20 },
		color: "#84cc16",
		glow: "rgba(132, 204, 22, 0.18)",
		icon: Banknote,
		legend: "Markets, money movement, and practical fintech tools.",
	},
	{
		id: "beyond_reality",
		sector: "Sector 68:70",
		position: { top: 70, left: 68 },
		color: "#3cd7ff",
		glow: "rgba(60, 215, 255, 0.18)",
		icon: Sparkles,
		legend: "XR, AI, and boundary-pushing future interfaces.",
	},
]

export function TrackLandingKinetic({ tracks }: TrackLandingKineticProps) {
	const orderedTracks = trackMap.map((config) => {
		const match = tracks.find((track) => track.id === config.id)
		return {
			...config,
			trackName: match?.trackName ?? config.id.replace(/_/g, " "),
			description: match?.description ?? "",
		}
	})

	return (
		<section className="relative overflow-hidden bg-[#10141a] text-white">
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-[#10141a]" />
				<div
					className="absolute inset-0 opacity-40"
					style={{
						backgroundImage:
							"linear-gradient(to right, rgba(65,71,84,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(65,71,84,0.05) 1px, transparent 1px)",
						backgroundSize: "10px 10px",
					}}
				/>
				<div
					className="absolute inset-0 opacity-60"
					style={{
						backgroundImage:
							"linear-gradient(to right, rgba(65,71,84,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(65,71,84,0.12) 1px, transparent 1px)",
						backgroundSize: "40px 40px",
					}}
				/>
				<div className="absolute inset-0 bg-linear-to-b from-transparent via-[#10141a]/40 to-[#10141a]" />
				<div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
				<div className="absolute bottom-1/3 right-1/4 h-[520px] w-[520px] rounded-full bg-secondary/5 blur-[150px]" />
			</div>

			<div className="relative z-10 mx-auto flex min-h-[760px] w-full max-w-6xl flex-col px-6 pb-16 pt-20 md:px-10">
				<div className="max-w-2xl">
					<span className="mb-4 block text-[10px] uppercase tracking-[0.3em] text-primary/80">
						System Interface // v2.04
					</span>
					<h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
						Hackathon City: Track Navigation
					</h1>
					<p className="mt-4 text-base text-white/70 md:text-lg">
						Navigate the digital architecture of MorganHacks. Each sector is a mission track calling for
						builders, storytellers, and technologists.
					</p>
				</div>

				<div className="relative mt-12 min-h-[520px] flex-1">
					<div className="absolute left-0 top-0 flex flex-col gap-2 text-[10px] font-mono text-white/30">
						<span>LAT_REF: 44.022N</span>
						<span>LONG_REF: 12.011E</span>
					</div>

					{orderedTracks.map((track) => {
						const Icon = track.icon
						const isRight = track.position.left > 60
						const isCenter = track.id === "beyond_reality"

						return (
							<div
								key={track.id}
								className="absolute group"
								style={{ top: `${track.position.top}%`, left: `${track.position.left}%` }}
							>
								<Link href={`/tracks/${track.id}`} className="relative flex items-center justify-center">
									<span
										className="absolute h-20 w-20 rounded-full blur-xl transition-all duration-300 group-hover:scale-110"
										style={{ backgroundColor: track.glow }}
									/>
									<span
										className="relative z-10 flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 group-hover:scale-110"
									>
										<Icon className="h-6 w-6" style={{ color: track.color }} />
									</span>

									<span
										className={`absolute whitespace-nowrap rounded-xl border border-white/10 bg-[#1c2026]/90 px-4 py-2 text-left text-xs text-white/80 opacity-0 shadow-2xl backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 ${
											isCenter
												? "top-14 left-1/2 -translate-x-1/2"
												: isRight
													? "right-14"
													: "left-14"
										}`}
									>
										<span className="block text-[10px] uppercase tracking-[0.2em] text-white/40">
											{track.sector}
										</span>
										<span className="block text-sm font-semibold text-white">{track.trackName}</span>
									</span>
								</Link>
							</div>
						)
					})}
				</div>
			</div>

			<aside className="absolute right-8 top-32 hidden w-64 xl:block">
				<div className="rounded-xl border border-white/10 bg-[#1c2026]/60 p-6 backdrop-blur-xl">
					<h3 className="mb-4 text-[10px] uppercase tracking-[0.3em] text-primary/80">Cartography Legend</h3>
					<ul className="space-y-4 text-xs text-white/70">
						{orderedTracks.map((track) => (
							<li key={track.id} className="flex items-start gap-3">
								<span
									className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
									style={{ backgroundColor: track.color, boxShadow: `0 0 8px ${track.glow}` }}
								/>
								<span>{track.legend}</span>
							</li>
						))}
					</ul>
					<div className="mt-6 border-t border-white/10 pt-6">
						<div className="text-[10px] uppercase tracking-[0.25em] text-white/40">Network Status</div>
						<div className="mt-2 flex items-center gap-2 text-[10px] font-mono text-primary">
							<span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
							OPERATIONAL
						</div>
					</div>
				</div>
			</aside>
		</section>
	)
}
