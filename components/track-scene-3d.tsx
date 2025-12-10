"use client"

import { Suspense, useMemo, useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html, PointerLockControls, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import trackCitiesStatic from "@/public/track-cities.json"

type TrackCity = {
  id: string
  name: string
  description: string
  color: string
  position: { x: number; y: number }
  model?: string | null
  scale?: number
  rotation?: { x?: number; y?: number; z?: number }
  offset?: { x?: number; y?: number; z?: number }
  bounds?: { x?: number; z?: number }
}

type Props = {
  selectedId?: string | null
  onSelect?: (id: string) => void
  insideId?: string | null
  islandModelPath?: string
}

export function TrackScene3D({ selectedId, onSelect, insideId, islandModelPath }: Props) {
  const cities = useMemo(() => trackCitiesStatic as TrackCity[], [])
  const [fade, setFade] = useState(0)

  useEffect(() => {
    setFade(0.8)
    const id = setTimeout(() => setFade(0), 220)
    return () => clearTimeout(id)
  }, [insideId, selectedId])

  return (
    <div className="relative w-full h-[420px] md:h-[520px] rounded-xl border border-primary/30 bg-card/40 overflow-hidden">
      <Canvas camera={{ position: [0, 12, 18], fov: 50 }} dpr={[1, 1.5]}>
        <SceneContent
          cities={cities}
          selectedId={selectedId}
          onSelect={onSelect}
          insideId={insideId}
          islandModelPath={islandModelPath}
        />
      </Canvas>

      {insideId && (
        <>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="relative w-4 h-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-px h-5 bg-primary/70" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-px w-5 bg-primary/70" />
              </div>
            </div>
          </div>
          <InstructionOverlay />
        </>
      )}
      <FadeOverlay opacity={fade} />
    </div>
  )
}

function SceneContent({
  cities,
  selectedId,
  onSelect,
  insideId,
  islandModelPath,
}: {
  cities: TrackCity[]
  selectedId?: string | null
  onSelect?: (id: string) => void
  insideId?: string | null
  islandModelPath?: string
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [locked, setLocked] = useState(false)
  const controlsRef = useRef<any>(null)
  const pointerRef = useRef<any>(null)
  const desiredCamera = useRef(new THREE.Vector3(0, 12, 18))
  const desiredTarget = useRef(new THREE.Vector3(0, 1, 0))
  const { camera } = useThree()
  const insideCenter = useRef<THREE.Vector3 | null>(null)
  const insideBounds = useRef<{ x: number; z: number } | null>(null)

  const keyState = useRef<Record<string, boolean>>({})

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keyState.current[e.code] = true
    }
    const onKeyUp = (e: KeyboardEvent) => {
      keyState.current[e.code] = false
    }
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup", onKeyUp)
    }
  }, [])

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
      insideCenter.current = new THREE.Vector3(x, 1.5, z)
      insideBounds.current = {
        x: city.bounds?.x ?? 2.3,
        z: city.bounds?.z ?? 2.3,
      }
      desiredTarget.current.set(x, 1.5, z)
      desiredCamera.current.set(x, 1.6, z + 2.4)
      camera.position.set(x, 1.6, z + 2.4)
    } else {
      desiredTarget.current.set(x, 2, z)
      desiredCamera.current.set(x + 2.5, 6, z + 8)
      insideCenter.current = null
      insideBounds.current = null
    }
  }, [cities, insideId, selectedId])

  useEffect(() => {
    if (!insideId && pointerRef.current) {
      pointerRef.current.unlock?.()
      setLocked(false)
    }
  }, [insideId])

  useFrame(() => {
    camera.position.lerp(desiredCamera.current, 0.08)
    if (controlsRef.current) {
      controlsRef.current.target.lerp(desiredTarget.current, 0.1)
      controlsRef.current.update()
    }

    if (insideCenter.current && locked) {
      const speed = 0.06
      const direction = new THREE.Vector3()
      camera.getWorldDirection(direction)
      direction.y = 0
      direction.normalize()

      const right = new THREE.Vector3()
      right.crossVectors(direction, new THREE.Vector3(0, 1, 0)).normalize()

      const move = new THREE.Vector3()
      if (keyState.current["KeyW"] || keyState.current["ArrowUp"]) move.add(direction)
      if (keyState.current["KeyS"] || keyState.current["ArrowDown"]) move.sub(direction)
      if (keyState.current["KeyA"] || keyState.current["ArrowLeft"]) move.sub(right)
      if (keyState.current["KeyD"] || keyState.current["ArrowRight"]) move.add(right)

      if (move.lengthSq() > 0) {
        move.normalize().multiplyScalar(speed)
        camera.position.add(move)
        desiredCamera.current.copy(camera.position)
      }

      const cx = insideCenter.current.x
      const cz = insideCenter.current.z
      const boundX = insideBounds.current?.x ?? 2.3
      const boundZ = insideBounds.current?.z ?? 2.3
      camera.position.x = THREE.MathUtils.clamp(camera.position.x, cx - boundX, cx + boundX)
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, cz - boundZ, cz + boundZ)
    }
  })

  return (
    <>
      <color attach="background" args={["#0b1021"]} />
      <ambientLight intensity={0.6} />
      <hemisphereLight intensity={0.35} groundColor="#0b1021" />
      <directionalLight position={[10, 12, 10]} intensity={0.8} castShadow />

      <Suspense fallback={null}>
        {islandModelPath && <Island modelPath={islandModelPath} />}
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
          const cityScale = city.scale ?? 1
          const hasModel = !!city.model
          const baseHeight = 3 + (idx % 3) * 0.5
          const rot = city.rotation ?? {}
          const offset = city.offset ?? {}

          return (
            <group
              key={city.id}
              position={[x, 0, z]}
              onPointerOver={() => setHoveredId(city.id)}
              onPointerOut={() => setHoveredId(null)}
              onClick={() => onSelect?.(city.id)}
            >
              <Suspense
                fallback={
                  <mesh castShadow position={[offset.x ?? 0, baseHeight / 2 + (offset.y ?? 0), offset.z ?? 0]} scale={scale * cityScale} rotation={[rot.x ?? 0, rot.y ?? 0, rot.z ?? 0]}>
                    <boxGeometry args={[2, baseHeight, 2]} />
                    <meshStandardMaterial
                      color={`hsl(${hue * 360}, 70%, 55%)`}
                      emissive={emissive}
                      emissiveIntensity={isSelected ? 1 : 0.4}
                      metalness={0.2}
                      roughness={0.4}
                    />
                  </mesh>
                }
              >
                {hasModel ? (
                  <HouseModel
                    url={city.model as string}
                    scale={scale * cityScale}
                    fallbackColor={`hsl(${hue * 360}, 70%, 55%)`}
                    emissive={emissive}
                    isSelected={isSelected}
                    rotation={rot}
                    offset={offset}
                  />
                ) : (
                  <mesh
                    castShadow
                    position={[offset.x ?? 0, baseHeight / 2 + (offset.y ?? 0), offset.z ?? 0]}
                    scale={scale * cityScale}
                    rotation={[rot.x ?? 0, rot.y ?? 0, rot.z ?? 0]}
                  >
                    <boxGeometry args={[2, baseHeight, 2]} />
                    <meshStandardMaterial
                      color={`hsl(${hue * 360}, 70%, 55%)`}
                      emissive={emissive}
                      emissiveIntensity={isSelected ? 1 : 0.4}
                      metalness={0.2}
                      roughness={0.4}
                    />
                  </mesh>
                )}
              </Suspense>
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
      <PointerLockControls
        ref={pointerRef}
        enabled={!!insideId}
        makeDefault={false}
        onLock={() => setLocked(true)}
        onUnlock={() => setLocked(false)}
      />
    </>
  )
}

function HouseModel({
  url,
  scale,
  fallbackColor,
  emissive,
  isSelected,
  rotation,
  offset,
}: {
  url: string
  scale: number
  fallbackColor: string
  emissive: string
  isSelected: boolean
  rotation?: { x?: number; y?: number; z?: number }
  offset?: { x?: number; y?: number; z?: number }
}) {
  const gltf = useGLTF(url)
  const scene = useMemo(() => {
    const cloned = gltf.scene.clone(true)
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const material =
          (mesh.material as THREE.MeshStandardMaterial | undefined)?.clone?.() ||
          new THREE.MeshStandardMaterial({ color: fallbackColor })
        material.emissive = new THREE.Color(emissive)
        material.emissiveIntensity = isSelected ? 1 : 0.4
        material.metalness = 0.2
        material.roughness = 0.4
        mesh.material = material
      }
    })
    return cloned
  }, [emissive, fallbackColor, gltf.scene, isSelected])

  return (
    <primitive
      object={scene}
      position={[offset?.x ?? 0, 1.6 + (offset?.y ?? 0), offset?.z ?? 0]}
      rotation={[rotation?.x ?? 0, rotation?.y ?? 0, rotation?.z ?? 0]}
      scale={scale * 1.2}
      dispose={null}
    />
  )
}

function InstructionOverlay() {
  const handleLock = () => {
    const canvas = document.querySelector("canvas") as any
    if (!canvas) return
    canvas.requestPointerLock?.()
  }
  return (
    <div className="absolute left-4 top-4 pointer-events-auto">
      <div className="px-3 py-2 rounded-md bg-black/70 border border-primary/30 shadow-lg max-w-xs space-y-1">
        <p className="text-[11px] font-mono text-foreground/90">Inside view: WASD to move, mouse to look.</p>
        <p className="text-[11px] font-mono text-foreground/70">Click canvas to lock cursor. Esc or Exit to leave.</p>
        <button
          onClick={handleLock}
          className="mt-2 text-[11px] font-mono px-2 py-1 rounded border border-primary/40 text-primary hover:border-primary transition-colors"
        >
          Enable mouse look
        </button>
      </div>
    </div>
  )
}

function FadeOverlay({ opacity }: { opacity: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-200"
      style={{ opacity }}
    />
  )
}

function Island({ modelPath }: { modelPath: string }) {
  const gltf = useGLTF(modelPath)
  return (
    <primitive
      object={gltf.scene}
      position={[0, -0.05, 0]}
      scale={1}
      dispose={null}
      rotation={[0, 0, 0]}
    />
  )
}
