"use client"

import { Suspense, useMemo, useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import * as THREE from "three"
import trackCitiesStatic from "@/public/track-cities.json"

type TrackCity = {
  id: string
  name: string
  description: string
  color: string
  position: { x: number; y: number }
}

type Props = {
  selectedId?: string | null
  onSelect?: (id: string) => void
  insideId?: string | null
}

export function TrackScene3D({ selectedId, onSelect, insideId }: Props) {
  const cities = useMemo(() => trackCitiesStatic as TrackCity[], [])

  return (
    <div className="w-full h-[520px] rounded-xl border border-primary/30 bg-card/40 overflow-hidden">
      <Canvas camera={{ position: [0, 12, 18], fov: 50 }}>
        <SceneContent cities={cities} selectedId={selectedId} onSelect={onSelect} insideId={insideId} />
      </Canvas>
    </div>
  )
}

function SceneContent({
  cities,
  selectedId,
  onSelect,
  insideId,
}: {
  cities: TrackCity[]
  selectedId?: string | null
  onSelect?: (id: string) => void
  insideId?: string | null
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const controlsRef = useRef<any>(null)
  const desiredCamera = useRef(new THREE.Vector3(0, 12, 18))
  const desiredTarget = useRef(new THREE.Vector3(0, 1, 0))
  const { camera } = useThree()

  const toWorld = (value: number) => (value - 50) / 6

  useEffect(() => {
    if (!selectedId) {
      desiredCamera.current.set(0, 12, 18)
      desiredTarget.current.set(0, 1, 0)
      return
    }
    const city = cities.find((c) => c.id === selectedId)
    if (!city) return
    const x = toWorld(city.position.x)
    const z = toWorld(city.position.y)
    const isInside = insideId === city.id
    if (isInside) {
      desiredTarget.current.set(x, 1.5, z)
      desiredCamera.current.set(x, 1.6, z + 2.4)
    } else {
      desiredTarget.current.set(x, 2, z)
      desiredCamera.current.set(x + 2.5, 6, z + 8)
    }
  }, [cities, insideId, selectedId])

  useFrame(() => {
    camera.position.lerp(desiredCamera.current, 0.08)
    if (controlsRef.current) {
      controlsRef.current.target.lerp(desiredTarget.current, 0.1)
      controlsRef.current.update()
    }
  })

  return (
    <>
      <color attach="background" args={["#0b1021"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 12, 10]} intensity={0.8} />

      <Suspense fallback={null}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>

        {cities.map((city, idx) => {
          const x = toWorld(city.position.x)
          const z = toWorld(city.position.y)
          const hue = 0.1 * idx
          const emissive = city.color.includes("to") ? "#22d3ee" : "#38bdf8"
          const isSelected = selectedId === city.id
          const isHovered = hoveredId === city.id
          const scale = isSelected ? 1.15 : isHovered ? 1.1 : 1

          return (
            <group
              key={city.id}
              position={[x, 0, z]}
              onPointerOver={() => setHoveredId(city.id)}
              onPointerOut={() => setHoveredId(null)}
              onClick={() => onSelect?.(city.id)}
            >
              <mesh castShadow position={[0, 2, 0]} scale={scale}>
                <boxGeometry args={[2, 4, 2]} />
                <meshStandardMaterial
                  color={`hsl(${hue * 360}, 70%, 55%)`}
                  emissive={emissive}
                  emissiveIntensity={isSelected ? 1 : 0.4}
                  metalness={0.2}
                  roughness={0.4}
                />
              </mesh>
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]} scale={isSelected ? 1.1 : 1}>
                <torusGeometry args={[1.4, 0.06, 12, 48]} />
                <meshStandardMaterial
                  color={emissive}
                  emissive={emissive}
                  emissiveIntensity={isSelected ? 1 : 0.6}
                  roughness={0.2}
                />
              </mesh>
              <Html position={[0, 3.2, 0]} center className="pointer-events-none">
                <div className="px-2 py-1 rounded-full bg-background/80 border border-primary/30 text-xs font-mono text-foreground shadow">
                  {city.name}
                </div>
              </Html>

              {insideId === city.id && (
                <mesh position={[0, 2, 0]}>
                  <boxGeometry args={[5, 4, 5]} />
                  <meshStandardMaterial color="#0b1224" transparent opacity={0.35} />
                </mesh>
              )}
            </group>
          )
        })}
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        enablePan={insideId ? false : true}
        enableZoom={insideId ? false : true}
        enableRotate={insideId ? false : true}
        maxDistance={insideId ? 30 : 30}
        minDistance={insideId ? 4 : 8}
        target={[0, 1, 0]}
      />
    </>
  )
}
