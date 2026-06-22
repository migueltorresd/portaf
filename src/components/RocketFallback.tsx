/**
 * Cohete neón en SVG — versión liviana (sin Three.js).
 * Se usa en móvil, con reduce-motion, y como "eco" en la sección de contacto.
 */
export default function RocketFallback({ className = '' }: { className?: string }) {
  return (
    <div className={`rocket-3d rocket-fallback ${className}`}>
      <svg viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="fbBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c44dff" />
            <stop offset="50%" stopColor="#22d3ff" />
            <stop offset="100%" stopColor="#b026ff" />
          </linearGradient>
        </defs>
        {/* landing rings */}
        <ellipse cx="60" cy="176" rx="46" ry="11" fill="none" stroke="rgba(176,38,255,0.45)" strokeWidth="1.4" />
        <ellipse cx="60" cy="176" rx="28" ry="6.5" fill="none" stroke="rgba(0,255,102,0.5)" strokeWidth="1.4" />
        {/* exhaust */}
        <path d="M52 150 L60 174 L68 150 Z" fill="url(#fbBody)" opacity="0.5" />
        {/* fins */}
        <path d="M47 96 L33 128 L47 116 Z" fill="none" stroke="#b026ff" strokeWidth="2" strokeLinejoin="round" />
        <path d="M73 96 L87 128 L73 116 Z" fill="none" stroke="#b026ff" strokeWidth="2" strokeLinejoin="round" />
        {/* body */}
        <path
          d="M60 12 C72 26 76 42 76 58 L76 116 C76 126 70 134 60 138 C50 134 44 126 44 116 L44 58 C44 42 48 26 60 12 Z"
          fill="rgba(10,18,40,0.5)"
          stroke="url(#fbBody)"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        {/* window */}
        <circle cx="60" cy="66" r="9" fill="rgba(0,255,102,0.18)" stroke="#00ff66" strokeWidth="2.4" />
      </svg>
    </div>
  )
}
