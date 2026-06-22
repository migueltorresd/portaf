const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
)

const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)

const CloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.7 1.5A4 4 0 0 0 6.5 19Z" />
  </svg>
)

const SKILL_CARDS = [
  {
    accent: 'green',
    icon: <CodeIcon />,
    title: 'BACKEND & APIS',
    desc: 'Construyo APIs robustas y escalables con arquitectura limpia.',
    items: ['Node.js / NestJS', 'Python', 'APIs REST', 'PostgreSQL / Mongo'],
  },
  {
    accent: 'magenta',
    icon: <BrainIcon />,
    title: 'AI & AUTOMATIZACIÓN',
    desc: 'Integro IA para automatizar procesos y crear agentes inteligentes.',
    items: ['LangChain / LangGraph', 'LLMs / RAG', 'Prompt Engineering', 'Bases vectoriales'],
  },
  {
    accent: 'cyan',
    icon: <MonitorIcon />,
    title: 'FRONTEND',
    desc: 'Interfaces modernas, rápidas y enfocadas en experiencia.',
    items: ['TypeScript', 'React / Angular', 'RxJS', 'HTML / CSS'],
  },
  {
    accent: 'purple',
    icon: <CloudIcon />,
    title: 'CLOUD & DEVOPS',
    desc: 'Despliego, automatizo y escalo soluciones en la nube.',
    items: ['Azure / Google Cloud', 'Docker', 'Git & CI/CD', 'RabbitMQ / Kafka'],
  },
]

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-header reveal">
        <div className="section-label">HABILIDADES</div>
        <h2 className="section-title">
          MI<span> STACK.</span>
        </h2>
        <p className="section-subtitle">
          Las herramientas con las que construyo soluciones día a día.
        </p>
      </div>

      <div className="skills-grid">
        {SKILL_CARDS.map((card, i) => (
          <div
            key={card.title}
            className={`skill-card skill-card--${card.accent} reveal${i > 0 ? ` delay-${i}` : ''}`}
          >
            <div className="skill-card-head">
              <span className="skill-card-icon">{card.icon}</span>
              <h3 className="skill-card-title">{card.title}</h3>
            </div>

            <p className="skill-card-desc">{card.desc}</p>

            <ul className="skill-card-list">
              {card.items.map((item) => (
                <li key={item}>
                  <span className="skill-dot" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
