interface TerminalCardProps {
  index: string
  title: string
  command: string
  children: React.ReactNode
  delay?: string
}

function TerminalCard({ index, title, command, children, delay }: TerminalCardProps) {
  return (
    <article className={`terminal-card reveal${delay ? ` ${delay}` : ''}`}>
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot-red" />
          <span className="dot-yellow" />
          <span className="dot-green" />
        </div>
        <div className="terminal-controls">_ [] X</div>
      </div>
      <div className="terminal-title">
        {index} | {title}
      </div>
      <div className="terminal-body">
        <div className="terminal-command">{command}</div>
        {children}
        <span className="terminal-more">VER MAS</span>
      </div>
    </article>
  )
}

export default function TerminalCards() {
  return (
    <div className="terminal-grid">
      <TerminalCard index="01" title="WHOAMI.TXT" command="cat about.txt">
        <p>
          Builder by mindset.
          <br />
          AI &amp; Automation Lover.
          <br />
          Knowledge Sharer.
          <br />
          Problem Solver.
        </p>
        <br />
        <p>
          Siempre aprendiendo.
          <br />
          Siempre construyendo.
        </p>
        <br />
      </TerminalCard>

      <TerminalCard index="02" title="STACK.SKILLS" command="ls skills/" delay="delay-1">
        <div className="skill-row">
          Node.js <span>/</span> NestJS
        </div>
        <div className="skill-row">
          TypeScript <span>/</span> Python
        </div>
        <div className="skill-row">
          LangChain <span>/</span> LangGraph
        </div>
        <div className="skill-row">LLMs &amp; Prompt Engineering</div>
        <div className="skill-row">Automation &amp; APIs</div>
        <div className="skill-row">
          SQL &amp; NoSQL <span>/</span> Docker
        </div>
        <div className="skill-row">Git &amp; CI/CD</div>
        <br />
      </TerminalCard>

      <TerminalCard index="03" title="PROJECTS.LOG" command="ls projects/" delay="delay-2">
        <div className="project-mini">
          <div className="project-mini-title">neXus</div>
          <div className="project-mini-text">Plataforma de conocimiento, ~90% adopción</div>
        </div>
        <div className="project-mini">
          <div className="project-mini-title">AI &amp; Automatización</div>
          <div className="project-mini-text">LLMs, LangChain/LangGraph y RAG</div>
        </div>
        <div className="project-mini">
          <div className="project-mini-title">Bots Conversacionales</div>
          <div className="project-mini-text">Atención multicanal en producción</div>
        </div>
        <br />
      </TerminalCard>

      <TerminalCard index="04" title="STATUS.SYS" command="system_status" delay="delay-3">
        <div className="status-grid">
          <span>MENTE:</span>
          <span>Siempre curiosa</span>
          <span>MODO:</span>
          <span>Construyendo</span>
          <span>FOCO:</span>
          <span>IA que impacta</span>
          <span>ENERGÍA:</span>
          <span>100%</span>
        </div>
        <div className="status-wave">
          <svg viewBox="0 0 300 70" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 40 L15 35 L30 44 L45 28 L60 42 L75 38 L90 18 L105 32 L120 48 L135 44 L150 22 L165 15 L180 30 L195 48 L210 34 L225 28 L240 40 L255 36 L270 44 L285 39 L300 41"
              fill="none"
              stroke="#00ff41"
              strokeWidth="2"
            />
          </svg>
        </div>
        <br />
      </TerminalCard>
    </div>
  )
}
