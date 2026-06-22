import { lazy, Suspense, useEffect, useState } from 'react'
import RocketFallback from './RocketFallback'

const Rocket3D = lazy(() => import('./Rocket3D'))

/** En móvil / reduce-motion usamos el cohete SVG liviano (sin Three.js). */
function useLiteRocket() {
  const [lite, setLite] = useState(true)
  useEffect(() => {
    const small = window.matchMedia('(max-width: 760px)')
    const update = () => setLite(small.matches)
    update()
    small.addEventListener('change', update)
    return () => small.removeEventListener('change', update)
  }, [])
  return lite
}

const LangChainIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="chain-icon"
    role="img"
    aria-label="LangChain"
    fill="#1fbfa8"
  >
    <path d="M13.796 0a6.93 6.93 0 0 0-4.91 2.019L5.451 5.455l3.273 3.27 3.432-3.432a2.284 2.284 0 0 1 3.277 0 2.28 2.28 0 0 1 0 3.275L12 12.001l3.273 3.273 3.433-3.435c2.692-2.692 2.692-7.127 0-9.82A6.92 6.92 0 0 0 13.796 0m-5.07 8.728-3.433 3.434c-2.692 2.693-2.692 7.126 0 9.819A6.92 6.92 0 0 0 10.203 24a6.93 6.93 0 0 0 4.911-2.02l3.432-3.432-3.271-3.272-3.433 3.433a2.284 2.284 0 0 1-3.277 0 2.28 2.28 0 0 1 0-3.276L12 12z" />
  </svg>
)

const TECH_CHIPS = [
  { icon: <i className="devicon-python-plain colored" />, label: 'Python' },
  { icon: <i className="devicon-typescript-plain colored" />, label: 'TypeScript' },
  { icon: <i className="devicon-nodejs-plain colored" />, label: 'Node.js' },
  { icon: <LangChainIcon />, label: 'LangChain' },
  { icon: <i className="devicon-nestjs-original colored" />, label: 'NestJS' },
  { icon: <i className="devicon-docker-plain colored" />, label: 'Docker' },
  { icon: <i className="devicon-googlecloud-plain colored" />, label: 'Google Cloud' },
  { icon: <i className="devicon-git-plain colored" />, label: 'Git' },
]

export default function Hero() {
  const lite = useLiteRocket()
  return (
    <section className="hero-section" id="home">
      {/* ── Hero panel: copy + scene ──────────────────────────────────────── */}
      <div className="hero-panel">
        {/* Left: copy */}
        <div className="hero-copy reveal">
          <div className="hero-tag">
            <span className="dot" />
            SISTEMA ONLINE
          </div>

          <h1 className="hero-title">
            BUILD AUTOMATE
            <br />
            <span>IMPACT.</span>
          </h1>

          <p className="hero-text">
            Soy <strong>Miguel Ángel Torres</strong>, desarrollador full stack y consultor técnico.
            Construyo y lidero soluciones de software que{' '}
            <strong>resuelven problemas reales</strong>, con foco en arquitectura, APIs e{' '}
            <strong>IA aplicada</strong>.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              <span>&gt; VER PROYECTOS</span>
            </a>
            <a href="#contact" className="btn btn-secondary">
              <span>&gt; CONECTEMOS</span>
            </a>
          </div>

          {/* Tech rack */}
          <div className="tech-rack reveal delay-2">
            <div className="section-label tech-label">TECNOLOGÍAS</div>
            <div className="tech-grid">
              {TECH_CHIPS.map(({ icon, label }) => (
                <div key={label} className="tech-chip">
                  {icon}
                  <small>{label}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: 3D rocket scene */}
        <div className="hero-scene hero-scene-rocket reveal delay-1" aria-hidden="true">
          <div className="hero-rocket-wrap">
            {lite ? (
              <RocketFallback className="rocket-3d--hero" />
            ) : (
              <Suspense fallback={<RocketFallback className="rocket-3d--hero" />}>
                <Rocket3D className="rocket-3d--hero" />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
