import { readFile } from "fs/promises"
import path from "path"

type BusStop = {
	type: "pickup" | "stop" | "dropoff"
	location: string
	time: string
}

type BusRoute = {
	id: string
	name: string
	stops: BusStop[]
}

type BusDay = {
	date: string
	label: string
	routes: BusRoute[]
}

const stopMeta = {
	pickup: { label: "Departure", dot: "border-[#002805]", inner: "bg-[#002805]" },
	stop: { label: "Stop", dot: "border-[#c4c6cf]", inner: "bg-[#e2e2e6]" },
	dropoff: { label: "Arrival", dot: "border-[#002805]", inner: "bg-[#002805]" },
}

async function getBusRoutes(): Promise<BusDay[]> {
	const filePath = path.join(process.cwd(), "public", "bus-routes.json")
	const fileContents = await readFile(filePath, "utf-8")
	return JSON.parse(fileContents) as BusDay[]
}

function splitTime(time: string) {
	const [clock, meridiem] = time.split(" ")
	return { clock, meridiem: meridiem ?? "" }
}

export async function BusRoutes() {
	const days = await getBusRoutes()

	return (
		<div className="space-y-16">
			{days.map((day) => (
				<section
					key={day.date}
					className="rounded-[28px] bg-linear-to-br from-[#0a0f1b] via-[#0c1322] to-[#101a2d] p-6 md:p-10 shadow-[0_12px_28px_rgba(5,10,20,0.45)]"
				>
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
						<div>
							<h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-orbitron">
								{day.label}
							</h2>
						</div>
					</div>

					<div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
						{day.routes.map((route) => (
							<div
								key={`${day.date}-${route.id}`}
								className="bg-[#0f172a] rounded-xl p-8 shadow-[0_10px_24px_rgba(3,8,16,0.5)] relative overflow-hidden"
							>

								<div className="flex justify-between items-start mb-10">
									<div>
										<span className="text-[10px] font-bold uppercase tracking-widest text-white/60 block mb-1">Route</span>
										<h3 className="text-2xl font-extrabold text-white">{route.name}</h3>
									</div>
									<div className="text-right" />
								</div>

								<div className="relative pl-8">
									<div className="absolute left-[7px] top-2 bottom-2 w-0.5 border-dashed border-l-2 border-white/20" />
									<div className="space-y-8">
										{route.stops.map((stop, index) => {
											const meta = stopMeta[stop.type]
											const { clock, meridiem } = splitTime(stop.time)
											return (
												<div key={`${route.id}-${stop.time}-${index}`} className="relative">
													<div
														className={`absolute -left-8 w-4 h-4 rounded-full border-2 bg-[#f9f9fd] z-10 flex items-center justify-center ${
															meta.dot
														}`}
													>
														<div className={`w-1.5 h-1.5 rounded-full ${meta.inner}`} />
													</div>
													<div className="flex justify-between rounded-lg bg-[#111b2f] px-3 py-2">
														<div>
															<p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
																{meta.label}
															</p>
															<p className="text-lg font-bold text-white">{stop.location}</p>
														</div>
														<p className="text-lg font-bold text-white whitespace-nowrap">
															{clock} <span className="text-xs font-normal">{meridiem}</span>
														</p>
													</div>
												</div>
											)
										})}
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			))}
		</div>
	)
}
