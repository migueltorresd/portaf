/**
 * ChatPlaceholder
 *
 * Espacio reservado para la futura experiencia de chat contra FastAPI.
 * Cuando se integre el chat, reemplazá este componente por <ChatPanel />.
 *
 * TODO: Conectar con FastAPI endpoint POST /api/chat
 */
export default function ChatPlaceholder() {
  return (
    <section
      id="chat"
      style={{
        margin: '2rem 0',
        border: '1px dashed rgba(176, 38, 255, 0.45)',
        borderRadius: '14px',
        padding: '2.5rem',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Top-left label */}
      <div
        className="section-label"
        style={{ justifyContent: 'center', marginBottom: '1.2rem' }}
      >
        CHAT.AI — PRÓXIMAMENTE
      </div>

      {/* Placeholder icon */}
      <div
        style={{
          fontSize: '2.4rem',
          marginBottom: '1rem',
          opacity: 0.55,
          fontFamily: 'var(--terminal)',
        }}
      >
        &gt;_ CARGANDO AGENTE...
      </div>

      <p
        style={{
          color: 'var(--text-dim)',
          fontSize: '0.88rem',
          lineHeight: 1.65,
          maxWidth: '480px',
          margin: '0 auto 1.4rem',
        }}
      >
        Aquí irá la experiencia conversacional con el agente IA.
        <br />
        Conectará con el backend FastAPI en <code>/api/chat</code>.
      </p>

      {/* Mock input bar — visual only */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          maxWidth: '560px',
          margin: '0 auto',
          opacity: 0.38,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            flex: 1,
            background: 'var(--card-bg)',
            border: '1px solid rgba(176, 38, 255, 0.3)',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            fontSize: '0.84rem',
            color: 'var(--text-dim)',
            textAlign: 'left',
          }}
        >
          Escribí tu mensaje...
        </div>
        <button className="btn btn-primary" style={{ cursor: 'default' }}>
          <span>&gt; ENVIAR</span>
        </button>
      </div>
    </section>
  )
}
