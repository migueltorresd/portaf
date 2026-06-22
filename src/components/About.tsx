const TIMELINE = [
  {
    year: '2024 →',
    role: 'Consultor en Desarrollo · AI Center',
    company: 'Sofka',
    desc: 'Soluciones con LLMs (LangChain, LangGraph, RAG). Co-creación de neXus (~90% adopción) y formación de +20 aprendices.',
  },
  {
    year: '2025 →',
    role: 'Tutor de Programación',
    company: 'AlgoNova',
    desc: 'Formación en lógica de programación y pensamiento computacional con Python y Scratch.',
  },
  {
    year: '2023',
    role: 'Desarrollador Full Stack',
    company: 'Hibot Chat',
    desc: 'Bots conversacionales multicanal y APIs REST en Node/NestJS. Despliegues en Google Cloud.',
  },
  {
    year: '2023',
    role: 'Desarrollador Full Stack',
    company: 'SofkaU',
    desc: 'Apps web con NestJS, Angular y TypeScript bajo arquitectura limpia (SOLID) y mensajería.',
  },
]

const TRAITS = [
  { label: 'Builder', desc: 'Construyo primero, perfecciono después.' },
  { label: 'AI Lover', desc: 'LLMs, agentes y automatización como herramientas de impacto.' },
  { label: 'Problem Solver', desc: 'Me motiva resolver problemas reales, no teóricos.' },
  { label: 'Knowledge Sharer', desc: 'Creo que compartir conocimiento multiplica el impacto.' },
]

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-header reveal">
        <div className="section-label">SOBRE MÍ</div>
        <h2 className="about-title">
          QUIÉN SOY<span>.</span>
        </h2>
        <p className="about-intro">
          Soy <strong>Miguel Ángel Torres</strong>, desarrollador full stack y consultor técnico con
          experiencia construyendo y liderando soluciones de software en{' '}
          <strong>entornos reales de negocio</strong>. Me adapto rápido a nuevos stacks y combino
          criterio técnico, ejecución y colaboración, con la <strong>IA y la automatización</strong>{' '}
          como apalancadores para entregar más valor y velocidad.
        </p>
      </div>

      <div className="about-grid">
        {/* Timeline */}
        <div className="about-timeline reveal delay-1">
          <div className="section-label">EXPERIENCIA</div>
          {TIMELINE.map((item) => (
            <div key={item.year} className="timeline-item">
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content">
                <div className="timeline-role">{item.role}</div>
                <div className="timeline-company">{item.company}</div>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Traits */}
        <div className="about-traits reveal delay-2">
          <div className="section-label">MENTALIDAD</div>
          <div className="traits-grid">
            {TRAITS.map(({ label, desc }) => (
              <div key={label} className="trait-card">
                <div className="trait-label">&gt; {label}</div>
                <p className="trait-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
