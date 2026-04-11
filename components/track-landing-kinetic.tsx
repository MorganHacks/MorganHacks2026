"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Banknote, ExternalLink, FileText, Gamepad2, Heart, Leaf, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

type TrackDetail = {
	id: string
	trackName: string
	description: string
	challenge: string
	whatGoodLooksLike: string[]
	resources: { name: string; description: string; url: string }[]
}

type TrackLandingKineticProps = {
	tracks: TrackDetail[]
}

const trackMap = [
	{
		id: "health_human_impact",
		color: "#ff8eb2",
		glow: "rgba(255, 142, 178, 0.18)",
		icon: Heart,
		legend: "Human wellbeing",
	},
	{
		id: "planet",
		color: "#10b981",
		glow: "rgba(16, 185, 129, 0.18)",
		icon: Leaf,
		legend: "Sustainability",
	},
	{
		id: "culture",
		color: "#a855f7",
		glow: "rgba(168, 85, 247, 0.18)",
		icon: Gamepad2,
		legend: "Creative expression",
	},
	{
		id: "commerce",
		color: "#84cc16",
		glow: "rgba(132, 204, 22, 0.18)",
		icon: Banknote,
		legend: "Money & markets",
	},
	{
		id: "beyond_reality",
		color: "#3cd7ff",
		glow: "rgba(60, 215, 255, 0.18)",
		icon: Sparkles,
		legend: "Future tech",
	},
]

const EXTRA_CHALLENGE_STATEMENTS_URL =
	"https://docs.google.com/document/d/1SovNOVzxPaan58nxvCJIt-VX49Rf-uU3/edit?usp=sharing&ouid=114078902189188144163&rtpof=true&sd=true"

function createTrackPositions() {
	const minDistance = 16
	const maxAttempts = 200
	const bounds = { top: [12, 78], left: [10, 68] }

	const nextPositions: Record<string, { top: number; left: number }> = {}
	const points: Array<{ top: number; left: number }> = []

	trackMap.forEach((track) => {
		let attempt = 0
		let placed = false

		while (attempt < maxAttempts && !placed) {
			const top = bounds.top[0] + Math.random() * (bounds.top[1] - bounds.top[0])
			const left = bounds.left[0] + Math.random() * (bounds.left[1] - bounds.left[0])

			const tooClose = points.some((point) => {
				const dx = point.left - left
				const dy = point.top - top
				return Math.hypot(dx, dy) < minDistance
			})

			if (!tooClose) {
				points.push({ top, left })
				nextPositions[track.id] = { top, left }
				placed = true
			}

			attempt += 1
		}

		if (!placed) {
			const fallback = {
				top: bounds.top[0] + Math.random() * (bounds.top[1] - bounds.top[0]),
				left: bounds.left[0] + Math.random() * (bounds.left[1] - bounds.left[0]),
			}
			points.push(fallback)
			nextPositions[track.id] = fallback
		}
	})

	return nextPositions
}

export function TrackLandingKinetic({ tracks }: TrackLandingKineticProps) {
	const [activeTrackId, setActiveTrackId] = useState<string | null>(null)
	const [positions] = useState<Record<string, { top: number; left: number }>>(createTrackPositions)

	const orderedTracks = trackMap.map((config) => {
		const match = tracks.find((track) => track.id === config.id)
		const fallbackPosition = positions[config.id] ?? { top: 50, left: 50 }
		return {
			...config,
			trackName: match?.trackName ?? config.id.replace(/_/g, " "),
			description: match?.description ?? "",
			position: fallbackPosition,
			legend: match?.trackName ?? config.id.replace(/_/g, " "),
		}
	})

	const activeTrack = useMemo(() => {
		if (!activeTrackId) return null
		const detail = tracks.find((track) => track.id === activeTrackId)
		const config = trackMap.find((track) => track.id === activeTrackId)
		if (!detail || !config) return null
		return { ...detail, ...config }
	}, [activeTrackId, tracks])

	const activeDetail = activeTrack

	return (
		<section className="relative overflow-hidden bg-background text-white">
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-background" />
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
				<div className="absolute inset-0 bg-linear-to-b from-transparent via-background/40 to-background" />
				<div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
				<div className="absolute bottom-1/3 right-1/4 h-[520px] w-[520px] rounded-full bg-secondary/5 blur-[150px]" />
			</div>

			<div className="relative z-10 mx-auto flex min-h-[760px] w-full max-w-6xl flex-col px-6 pb-16 pt-20 md:px-10">
				<div className="max-w-2xl">
					<h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">Tracks</h1>
					<p className="mt-3 text-base text-white/70 md:text-lg">
						Choose a mission track and explore the challenges, resources, and prizes.
					</p>
					<div className="mt-6 rounded-2xl border border-accent/20 bg-white/5 p-5 backdrop-blur-xl">
						<div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
							<div className="space-y-2">
								<div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-accent/80">
									<FileText className="h-3.5 w-3.5" />
									<span>Challenge Statements</span>
								</div>
								<h2 className="text-lg font-semibold text-white md:text-xl">Two extra challenges outside the five tracks</h2>
								<p className="text-sm text-white/70">
									These are separate challenge statements, not additional tracks. Open the Google Doc for the full prompts and requirements.
								</p>
							</div>
							<Button
								asChild
								variant="outline"
								size="lg"
								className="w-full shrink-0 border-accent/35 bg-accent/10 text-accent hover:bg-accent/15 hover:text-accent md:w-auto"
							>
								<Link
									href={EXTRA_CHALLENGE_STATEMENTS_URL}
									target="_blank"
									rel="noopener noreferrer"
								>
									Open Challenge Statements
									<ExternalLink className="h-4 w-4" />
								</Link>
							</Button>
						</div>
					</div>
				</div>

				<div className="relative mt-12 min-h-[520px] flex-1">

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
										<button
											type="button"
											className="relative flex items-center justify-center"
											onClick={() => setActiveTrackId(track.id)}
										>
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
												<span className="block text-sm font-semibold text-white">{track.trackName}</span>
											</span>
										</button>
									</div>
								)
					})}
				</div>
			</div>

			<aside className="absolute right-8 top-32 hidden w-64 xl:block">
				<div className="rounded-xl border border-white/10 bg-[#1c2026]/60 p-6 backdrop-blur-xl">
					<h3 className="mb-4 text-[10px] uppercase tracking-[0.3em] text-primary/80">Tracks</h3>
					<ul className="space-y-4 text-xs text-white/70">
						{orderedTracks.map((track) => (
							<li key={track.id} className="flex items-start gap-3">
								<span
									className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
									style={{ backgroundColor: track.color, boxShadow: `0 0 8px ${track.glow}` }}
								/>
								<span>{track.trackName}</span>
							</li>
						))}
					</ul>
				</div>
			</aside>

			{activeDetail ? (
				<div
					className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm"
					role="dialog"
					aria-modal="true"
				>
					<button
						type="button"
						className="absolute inset-0"
						aria-label="Close track details"
						onClick={() => setActiveTrackId(null)}
					/>
					<div className="relative h-full w-full max-w-3xl overflow-y-auto border-l bg-[#0a0f1b]/92 p-8 shadow-2xl backdrop-blur-xl md:p-12" style={{ borderColor: `${activeDetail.color}33` }}>
						<div className="mb-8 flex items-center justify-between border-b border-white/10 bg-[#0a0f1b]/85 px-8 py-6 backdrop-blur-xl -mx-8 -mt-8 md:-mx-12 md:px-12">
							<div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/50">
								<span style={{ color: activeDetail.color }}>Track</span>
								<div className="h-px w-8" style={{ backgroundColor: `${activeDetail.color}66` }} />
								<span>{activeTrack.id.replace(/_/g, " ")}</span>
							</div>
							<button
								type="button"
								className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-white"
								style={{ color: activeDetail.color }}
								onClick={() => setActiveTrackId(null)}
							>
								<span>Close</span>
							</button>
						</div>

						<div className="space-y-10">
							<div className="flex flex-col gap-4">
								<div className="flex items-center gap-4">
									<div className="flex h-16 w-16 items-center justify-center border bg-white/5" style={{ borderColor: `${activeDetail.color}55` }}>
										<activeDetail.icon
											className="h-8 w-8"
											style={{ color: activeDetail.color }}
										/>
									</div>
									<h2 className="text-3xl font-semibold uppercase md:text-4xl" style={{ color: activeDetail.color }}>
										{activeDetail.trackName}
									</h2>
								</div>
								<p className="border-l-2 border-white/10 pl-6 text-base italic text-white/80">
									{activeDetail.description}
								</p>
							</div>

							<section className="space-y-3 border-l-4 p-6" style={{ borderColor: activeDetail.color, backgroundColor: `${activeDetail.color}14` }}>
								<h3 className="text-sm uppercase tracking-[0.2em]" style={{ color: activeDetail.color }}>
									Core Challenge
								</h3>
								<p className="text-sm text-white/80">
									{activeDetail.challenge}
								</p>
							</section>

							<div className="grid gap-8 md:grid-cols-2">
								<section className="space-y-4">
									<h3 className="text-xs uppercase tracking-[0.2em] text-white/50">Success Metrics</h3>
									<ul className="space-y-3 text-sm text-white/80">
										{activeDetail.whatGoodLooksLike.map((item) => (
											<li key={item} className="flex items-start gap-3">
												<span
													className="mt-1 h-2 w-2 rounded-full"
													style={{ backgroundColor: activeDetail.color }}
												/>
												<span>{item}</span>
											</li>
										))}
									</ul>
								</section>

							</div>

							<section className="space-y-4">
								<h3 className="text-xs uppercase tracking-[0.2em] text-white/50">Resources</h3>
								<div className="space-y-3">
									{activeDetail.resources.map((resource) => (
										<a
											key={resource.name}
											href={resource.url}
											target="_blank"
											rel="noreferrer"
											className="flex items-center justify-between border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition"
											style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
										>
											<div>
												<p className="text-sm" style={{ color: activeDetail.color }}>
													{resource.name}
												</p>
												<p className="text-xs text-white/60">{resource.description}</p>
											</div>
										</a>
									))}
								</div>
							</section>

							<div className="border-t border-white/10 pt-6" />
						</div>
					</div>
				</div>
			) : null}
		</section>
	)
}
