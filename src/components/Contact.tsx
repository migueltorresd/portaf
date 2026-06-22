import { useEffect, useState } from 'react'

function useLiveTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = () => {
      const now = new Date()
      const pad = (n: number) => String(n).padStart(2, '0')
      return `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())} - ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
    }
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

export default function Contact() {
  const liveTime = useLiveTime()

  return (
    <section className="contact-section" id="contact">
      {/* Contact info */}
      <div className="contact-block reveal">
        <div className="section-label">CONECTEMOS</div>
        <p>¿Tienes una idea, proyecto o quieres colaborar? Hablemos.</p>
        <ul className="contact-list">
          <li>
            <span className="contact-icon">[M]</span>
            <a href="mailto:miguel.torresd@hotmail.com">miguel.torresd@hotmail.com</a>
          </li>
          <li>
            <span className="contact-icon">in</span>
            <a href="https://linkedin.com/in/miguel-angel-torres-diaz" target="_blank" rel="noreferrer">
              linkedin.com/in/miguel-angel-torres-diaz
            </a>
          </li>
          <li>
            <span className="contact-icon">[G]</span>
            <a href="https://github.com/migueltorresd" target="_blank" rel="noreferrer">
              github.com/migueltorresd
            </a>
          </li>
          <li>
            <span className="contact-icon">[T]</span>
            <a href="tel:+573196245555">+57 319 624 5555</a>
          </li>
          <li>
            <span className="contact-icon">[#]</span> Bogotá, Colombia
          </li>
        </ul>

        <a
          href="/CV-Miguel-Angel-Torres.pdf"
          download
          className="btn btn-primary contact-cv-btn"
        >
          <span>&gt; DESCARGAR CV</span>
        </a>
      </div>

      {/* Rocket decoration */}
      <div className="contact-rocket reveal delay-1" aria-hidden="true">
        <div className="contact-city">
          <img src="/hero-reference.png" alt="" className="contact-city-image" />
          <span className="contact-city-scanlines" />
        </div>
      </div>

      {/* Last commit */}
      <div className="last-commit reveal delay-2">
        <div className="section-label">ÚLTIMO COMMIT</div>
        <div className="commit-time">{liveTime}</div>
        <p>
          Making magic happen,
          <br />
          one line of code at a time.
        </p>
        <a
          href="https://github.com/migueltorresd"
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
        >
          <span>&gt; VER EN GITHUB</span>
        </a>
      </div>
    </section>
  )
}
