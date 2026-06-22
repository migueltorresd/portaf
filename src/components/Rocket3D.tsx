import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const PURPLE = '#b026ff'
const PURPLE_HI = '#c44dff'
const CYAN = '#22d3ff'
const GREEN = '#00ff66'

/* Build glowing neon edges from a geometry, with a vertical purple→cyan→purple
   gradient applied as per-vertex colors. Bloom turns the lines into neon tubes. */
function neonEdges(geo: THREE.BufferGeometry, yMin: number, yMax: number) {
  const edges = new THREE.EdgesGeometry(geo, 30)
  const pos = edges.attributes.position
  const colors = new Float32Array(pos.count * 3)
  const cTop = new THREE.Color(PURPLE_HI)
  const cMid = new THREE.Color(CYAN)
  const cBot = new THREE.Color(PURPLE)
  const tmp = new THREE.Color()
  for (let i = 0; i < pos.count; i++) {
    let t = (pos.getY(i) - yMin) / (yMax - yMin)
    t = Math.min(1, Math.max(0, t))
    if (t > 0.5) tmp.copy(cMid).lerp(cTop, (t - 0.5) * 2)
    else tmp.copy(cBot).lerp(cMid, t * 2)
    colors[i * 3] = tmp.r
    colors[i * 3 + 1] = tmp.g
    colors[i * 3 + 2] = tmp.b
  }
  edges.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  return edges
}

/* Extruded silhouette → dark fill mesh + glowing neon outline */
function NeonShape({
  shape,
  depth,
  yMin,
  yMax,
  fill = '#05080f',
}: {
  shape: THREE.Shape
  depth: number
  yMin: number
  yMax: number
  fill?: string
}) {
  const { geo, edges } = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false })
    g.translate(0, 0, -depth / 2)
    return { geo: g, edges: neonEdges(g, yMin, yMax) }
  }, [shape, depth, yMin, yMax])

  return (
    <group>
      <mesh geometry={geo}>
        <meshBasicMaterial color={fill} transparent opacity={0.82} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial vertexColors toneMapped={false} />
      </lineSegments>
    </group>
  )
}

/* Flat neon accent line on the front face of the body */
function neonLine(points: number[][], color: string, z = 0.47, opacity = 0.9) {
  const g = new THREE.BufferGeometry().setFromPoints(
    points.map((p) => new THREE.Vector3(p[0], p[1], z)),
  )
  const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity, toneMapped: false })
  return new THREE.Line(g, m)
}

function Rocket() {
  const ref = useRef<THREE.Group>(null)

  const bodyShape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0, 5.4)
    s.quadraticCurveTo(0.55, 4.2, 0.85, 2.6)
    s.quadraticCurveTo(0.98, 1.9, 0.98, 1.2)
    s.lineTo(0.98, -1.3)
    s.lineTo(0.7, -2.2)
    s.lineTo(-0.7, -2.2)
    s.lineTo(-0.98, -1.3)
    s.lineTo(-0.98, 1.2)
    s.quadraticCurveTo(-0.98, 1.9, -0.85, 2.6)
    s.quadraticCurveTo(-0.55, 4.2, 0, 5.4)
    return s
  }, [])

  const finLeft = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-0.92, -0.1)
    s.lineTo(-2.15, -2.9)
    s.lineTo(-1.35, -2.5)
    s.lineTo(-0.92, -1.7)
    s.closePath()
    return s
  }, [])

  const finRight = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0.92, -0.1)
    s.lineTo(2.15, -2.9)
    s.lineTo(1.35, -2.5)
    s.lineTo(0.92, -1.7)
    s.closePath()
    return s
  }, [])

  const nozzle = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-0.5, -2.2)
    s.lineTo(-0.7, -3.05)
    s.lineTo(0.7, -3.05)
    s.lineTo(0.5, -2.2)
    s.closePath()
    return s
  }, [])

  // Neon detail lines (panels, separators, rivets)
  const details = useMemo(
    () => [
      // nose cone separator
      neonLine([[-0.82, 2.5], [-0.4, 2.78], [0, 2.86], [0.4, 2.78], [0.82, 2.5]], CYAN, 0.47, 0.85),
      // upper body panel
      neonLine([[-0.96, 0.0], [0.96, 0.0]], PURPLE_HI, 0.47, 0.6),
      // lower body panel
      neonLine([[-0.92, -1.5], [0.92, -1.5]], PURPLE, 0.47, 0.6),
      // fin spars
      neonLine([[-0.95, -1.0], [-1.7, -2.6]], PURPLE_HI, 0.3, 0.7),
      neonLine([[0.95, -1.0], [1.7, -2.6]], PURPLE_HI, 0.3, 0.7),
    ],
    [],
  )

  // Rivet dots down the body
  const rivets = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let y = 1.6; y >= -1.0; y -= 0.55) {
      pts.push(new THREE.Vector3(-0.78, y, 0.47))
      pts.push(new THREE.Vector3(0.78, y, 0.47))
    }
    const g = new THREE.BufferGeometry().setFromPoints(pts)
    const m = new THREE.PointsMaterial({ color: CYAN, size: 0.12, toneMapped: false })
    return new THREE.Points(g, m)
  }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4
  })

  return (
    <group ref={ref}>
      <NeonShape shape={bodyShape} depth={0.9} yMin={-2.2} yMax={5.4} />
      <NeonShape shape={finLeft} depth={0.55} yMin={-2.9} yMax={-0.1} fill="#0a0514" />
      <NeonShape shape={finRight} depth={0.55} yMin={-2.9} yMax={-0.1} fill="#0a0514" />
      <NeonShape shape={nozzle} depth={0.55} yMin={-3.05} yMax={-2.2} fill="#0a0514" />

      {details.map((o, i) => (
        <primitive key={i} object={o} />
      ))}
      <primitive object={rivets} />

      {/* Window: green neon ring + soft core */}
      <mesh position={[0, 1.05, 0.46]}>
        <torusGeometry args={[0.48, 0.06, 16, 40]} />
        <meshBasicMaterial color={GREEN} toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.05, 0.45]}>
        <circleGeometry args={[0.48, 32]} />
        <meshBasicMaterial color={GREEN} transparent opacity={0.18} toneMapped={false} />
      </mesh>
    </group>
  )
}

/* Animated neon exhaust trails */
function Exhaust() {
  const ref = useRef<THREE.Group>(null)

  const objects = useMemo(() => {
    const mk = (x: number, len: number) => {
      const g = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, -3.0, 0),
        new THREE.Vector3(x, -3.0 - len, 0),
      ])
      g.setAttribute(
        'color',
        new THREE.BufferAttribute(new Float32Array([0.82, 0.15, 1, 0.13, 0.83, 1]), 3),
      )
      const m = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        toneMapped: false,
      })
      return new THREE.Line(g, m)
    }
    return [mk(-0.45, 3.0), mk(0, 3.8), mk(0.45, 3.0)]
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.scale.y = 0.8 + Math.sin(clock.getElapsedTime() * 16) * 0.2
  })

  return (
    <group ref={ref}>
      {objects.map((o, i) => (
        <primitive key={i} object={o} />
      ))}
    </group>
  )
}

/* Glowing landing-pad rings */
function LandingPad() {
  const objects = useMemo(() => {
    const make = (r: number, color: string, opacity: number) => {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2
        pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0))
      }
      const g = new THREE.BufferGeometry().setFromPoints(pts)
      const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity, toneMapped: false })
      return new THREE.LineLoop(g, m)
    }
    return [
      make(3.0, PURPLE, 0.5),
      make(2.0, PURPLE_HI, 0.7),
      make(1.1, GREEN, 0.7),
    ]
  }, [])

  return (
    <group position={[0, -6.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {objects.map((o, i) => (
        <primitive key={i} object={o} />
      ))}
    </group>
  )
}

/* Radial glow disc (back halo + floor glow) */
function GlowDisc({
  radius,
  color,
  intensity,
}: {
  radius: number
  color: string
  intensity: number
}) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uIntensity: { value: intensity },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform vec3 uColor; uniform float uIntensity;
          void main() {
            float d = distance(vUv, vec2(0.5));
            gl_FragColor = vec4(uColor, smoothstep(0.5, 0.0, d) * uIntensity);
          }
        `,
      }),
    [color, intensity],
  )
  return (
    <mesh material={mat}>
      <circleGeometry args={[radius, 48]} />
    </mesh>
  )
}

/* Exhaust sparks — neon embers expelled from the nozzle */
function Sparks() {
  const COUNT = 70
  const velocities = useRef<number[]>([])

  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const vel: number[] = []
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.7
      positions[i * 3 + 1] = -3.0 - Math.random() * 4
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.7
      vel.push(2.5 + Math.random() * 3)
    }
    velocities.current = vel
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [])

  useFrame((_, delta) => {
    const arr = geometry.attributes.position.array as Float32Array
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] -= velocities.current[i] * delta
      if (arr[i * 3 + 1] < -7.5) {
        arr[i * 3] = (Math.random() - 0.5) * 0.6
        arr[i * 3 + 1] = -3.0
        arr[i * 3 + 2] = (Math.random() - 0.5) * 0.6
      }
    }
    geometry.attributes.position.needsUpdate = true
  })

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color={CYAN}
        size={0.13}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  )
}

/* Scene: handles mouse tilt + breathing bloom pulse */
function Scene() {
  const tilt = useRef<THREE.Group>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bloomRef = useRef<any>(null)

  useFrame((state) => {
    if (tilt.current) {
      tilt.current.rotation.x = THREE.MathUtils.lerp(tilt.current.rotation.x, -state.pointer.y * 0.25, 0.06)
      tilt.current.rotation.y = THREE.MathUtils.lerp(tilt.current.rotation.y, state.pointer.x * 0.3, 0.06)
    }
    if (bloomRef.current) {
      bloomRef.current.intensity = 1.25 + Math.sin(state.clock.elapsedTime * 2.2) * 0.45
    }
  })

  return (
    <>
      <Stars radius={40} depth={30} count={800} factor={3} saturation={0} fade speed={0.6} />

      <group ref={tilt}>
        <group scale={0.82} position={[0, 0.4, 0]}>
          {/* back halo for depth */}
          <group position={[0, 1, -3]}>
            <GlowDisc radius={5.5} color={PURPLE} intensity={0.22} />
          </group>

          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Rocket />
            <Exhaust />
            <Sparks />
          </Float>

          <LandingPad />
          {/* floor glow / reflection */}
          <group position={[0, -6.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <GlowDisc radius={3.2} color={PURPLE_HI} intensity={0.5} />
          </group>
        </group>
      </group>

      <EffectComposer>
        <Bloom ref={bloomRef} intensity={1.4} luminanceThreshold={0.2} luminanceSmoothing={0.4} mipmapBlur />
      </EffectComposer>
    </>
  )
}

export default function Rocket3D({ className = '' }: { className?: string }) {
  return (
    <div className={`rocket-3d ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 17], fov: 34 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
