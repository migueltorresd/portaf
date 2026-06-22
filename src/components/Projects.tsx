const PROJECTS = [
  {
    id: '01',
    name: 'neXus',
    status: 'PRODUCCIÓN',
    statusColor: 'green',
    desc: 'Co-creación y liderazgo de una plataforma interna de conocimiento en Sofka, alcanzando ~90% de adopción en el equipo. Centraliza procesos, documentación y recursos técnicos.',
    tags: ['Node.js', 'NestJS', 'TypeScript', 'SQL'],
    metrics: [
      { label: 'Adopción', value: '~90%' },
      { label: 'Rol', value: 'Co-creador / Líder' },
    ],
    highlight: true,
  },
  {
    id: '02',
    name: 'AI Agents & Automatización',
    status: 'EN CURSO',
    statusColor: 'purple',
    desc: 'Diseño y orquestación de soluciones con LLMs para automatizar tareas y toma de decisiones. Implementación de RAG y bases de datos vectoriales como parte de arquitecturas de negocio.',
    tags: ['Python', 'LangChain', 'LangGraph', 'RAG'],
    metrics: [
      { label: 'Stack', value: 'LLMs + RAG' },
      { label: 'Foco', value: 'Automatización' },
    ],
    highlight: true,
  },
  {
    id: '03',
    name: 'Bots Conversacionales',
    status: 'PRODUCCIÓN',
    statusColor: 'green',
    desc: 'Bots conversacionales en producción para atención multicanal en Hibot, usando Botpress y EasyFlow. APIs REST con Node.js y NestJS para extender funcionalidades e integraciones.',
    tags: ['Node.js', 'NestJS', 'Botpress', 'REST'],
    metrics: [
      { label: 'Canal', value: 'Multicanal' },
      { label: 'Estado', value: 'Producción' },
    ],
    highlight: false,
  },
]

interface MetricProps {
  label: string
  value: string
}

function MetricBadge({ label, value }: MetricProps) {
  return (
    <div className="project-metric">
      <span className="metric-label">{label}</span>
      <span className="metric-value">{value}</span>
    </div>
  )
}

export default function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-header reveal">
        <div className="section-label">PROYECTOS</div>
        <h2 className="section-title">
          LO QUE HE<span> CONSTRUIDO.</span>
        </h2>
        <p className="section-subtitle">
          Soluciones reales para problemas reales. Cada proyecto tiene un impacto concreto en
          quienes lo usan.
        </p>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <article
            key={p.id}
            className={`project-card reveal${p.highlight ? ' project-card--highlight' : ''}`}
          >
            <div className="project-card-header">
              <div className="project-index">{p.id}</div>
              <span
                className={`project-status project-status--${p.statusColor}`}
              >
                <span className="status-dot" />
                {p.status}
              </span>
            </div>

            <div className="project-card-body">
              <h3 className="project-name">{p.name}</h3>
              <p className="project-desc">{p.desc}</p>

              <div className="project-metrics">
                {p.metrics.map((m) => (
                  <MetricBadge key={m.label} {...m} />
                ))}
              </div>

              <div className="project-tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
