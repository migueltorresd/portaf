import { useEffect, useRef, useState, FormEvent } from 'react'
import { useChat } from '../hooks/useChat'

/**
 * ChatPanel
 *
 * Experiencia conversacional mínima contra FastAPI /api/v1/chat.
 * Mantiene el estilo retro-terminal del portfolio.
 */
export default function ChatPanel() {
  const { messages, loading, error, send, clearError } = useChat()
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return
    send(input)
    setInput('')
  }

  return (
    <section
      id="chat"
      style={{
        margin: '2rem 0',
        border: '1px solid rgba(176, 38, 255, 0.45)',
        borderRadius: '14px',
        padding: '0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '0.85rem 1.4rem',
          borderBottom: '1px solid rgba(176, 38, 255, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'rgba(176, 38, 255, 0.06)',
        }}
      >
        <span style={{ fontSize: '0.72rem', color: 'var(--purple)', fontFamily: 'var(--display)', letterSpacing: '0.12em' }}>
          CHAT.AI
        </span>
        <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontFamily: 'var(--mono)' }}>
          — preguntame sobre mi CV
        </span>
        <span
          style={{
            marginLeft: 'auto',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: loading ? 'var(--purple)' : 'var(--green)',
            boxShadow: loading
              ? '0 0 6px var(--purple)'
              : '0 0 6px var(--green)',
            display: 'inline-block',
            transition: 'background 0.3s',
          }}
        />
      </div>

      {/* Messages area */}
      <div
        style={{
          minHeight: '260px',
          maxHeight: '420px',
          overflowY: 'auto',
          padding: '1.2rem 1.4rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.9rem',
        }}
      >
        {messages.length === 0 && !loading && (
          <p style={{ color: 'var(--text-dim)', fontSize: '0.84rem', textAlign: 'center', margin: 'auto 0' }}>
            &gt;_ ¿En qué puedo ayudarte? Podés preguntarme sobre experiencia, proyectos o tecnologías.
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <span
              style={{
                fontSize: '0.68rem',
                color: msg.role === 'user' ? 'var(--purple-soft)' : 'var(--green-soft)',
                marginBottom: '0.25rem',
                fontFamily: 'var(--display)',
                letterSpacing: '0.1em',
              }}
            >
              {msg.role === 'user' ? 'YOU' : 'AGENT'}
            </span>
            <div
              style={{
                maxWidth: '82%',
                background:
                  msg.role === 'user'
                    ? 'rgba(176, 38, 255, 0.1)'
                    : 'rgba(0, 255, 65, 0.06)',
                border:
                  msg.role === 'user'
                    ? '1px solid rgba(176, 38, 255, 0.3)'
                    : '1px solid rgba(0, 255, 65, 0.2)',
                borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                padding: '0.65rem 0.95rem',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'var(--text)',
                fontFamily: 'var(--mono)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--green-soft)', marginBottom: '0.25rem', fontFamily: 'var(--display)', letterSpacing: '0.1em' }}>
              AGENT
            </span>
            <div
              style={{
                background: 'rgba(0, 255, 65, 0.06)',
                border: '1px solid rgba(0, 255, 65, 0.2)',
                borderRadius: '12px 12px 12px 2px',
                padding: '0.65rem 0.95rem',
                fontSize: '0.85rem',
                color: 'var(--green)',
                fontFamily: 'var(--terminal)',
                letterSpacing: '0.05em',
              }}
            >
              procesando
              <span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
            </div>
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div
            style={{
              background: 'rgba(255, 60, 60, 0.08)',
              border: '1px solid rgba(255, 60, 60, 0.35)',
              borderRadius: '8px',
              padding: '0.6rem 0.9rem',
              fontSize: '0.8rem',
              color: '#ff6b6b',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>⚠ {error}</span>
            <button
              onClick={clearError}
              style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '0.9rem' }}
              aria-label="Cerrar error"
            >
              ✕
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: '0.75rem',
          padding: '0.9rem 1.4rem',
          borderTop: '1px solid rgba(176, 38, 255, 0.2)',
          background: 'rgba(4, 8, 14, 0.5)',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribí tu pregunta..."
          disabled={loading}
          style={{
            flex: 1,
            background: 'var(--card-bg)',
            border: '1px solid rgba(176, 38, 255, 0.3)',
            borderRadius: '10px',
            padding: '0.72rem 1rem',
            fontSize: '0.84rem',
            color: 'var(--text)',
            fontFamily: 'var(--mono)',
            outline: 'none',
            opacity: loading ? 0.6 : 1,
            transition: 'border-color 0.2s, opacity 0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'rgba(176, 38, 255, 0.7)')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(176, 38, 255, 0.3)')}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="btn btn-primary"
          style={{ opacity: loading || !input.trim() ? 0.5 : 1, cursor: loading ? 'wait' : 'pointer' }}
        >
          <span>&gt; ENVIAR</span>
        </button>
      </form>

      {/* Blink keyframe injected inline (avoids extra CSS file) */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
