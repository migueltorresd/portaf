# apps/web — Frontend React del Portfolio

> **Portfolio personal de Miguel Angel Torres.**  
> Migrado desde HTML/CSS/JS vanilla a React + TypeScript, preservando al 100% el diseño original: estética retro-terminal/synthwave con efectos CRT (scanlines, noise), paleta verde neón + púrpura, tipografías monospace y animaciones de entrada (`reveal`).

---

## Qué hace

SPA de una sola página que muestra el portfolio profesional:

- Presentación personal con hero section y rack de tecnologías.
- Tarjetas estilo terminal con `about`, `stack`, proyectos y status del sistema.
- **Chat IA integrado** — conversación contra el backend FastAPI para preguntar sobre el CV.
- Sección de contacto con reloj en tiempo real y decoración animada.
- Toggle dark/light theme gestionado desde el componente raíz.
- Navegación con active-section tracking via `IntersectionObserver`.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | React 18 |
| Lenguaje | TypeScript 5 |
| Bundler / Dev server | Vite 5 |
| Estilos | CSS vanilla (`styles.css`) — sin CSS-in-JS ni Tailwind |
| HTTP client | `fetch` nativo |
| State | `useState` / `useCallback` — sin librerías externas |

Sin dependencias de UI (no MUI, no Radix, no Tailwind). El diseño vive íntegramente en `styles.css`, idéntico al original vanilla.

---

## Estructura de carpetas

```
apps/web/
├── index.html              # Entry point HTML (Vite)
├── vite.config.ts          # Config de Vite + proxy /api → :8000
├── tsconfig.json
├── package.json
└── src/
    ├── main.tsx            # Punto de entrada React (ReactDOM.createRoot)
    ├── App.tsx             # Componente raíz: layout + estado global de tema
    ├── styles.css          # Todos los estilos del portfolio (variables CSS, animaciones, componentes)
    ├── components/
    │   ├── Header.tsx          # Navbar fija + toggle de tema + active-section tracking
    │   ├── Hero.tsx            # Hero principal: copy, imagen, tech rack, quote box
    │   ├── TerminalCards.tsx   # Grid de 4 tarjetas estilo terminal (about, stack, projects, status)
    │   ├── ChatPanel.tsx       # Chat IA — conversación contra FastAPI /api/v1/chat
    │   ├── ChatPlaceholder.tsx # Placeholder visual (no conectado — referencia de diseño)
    │   ├── Contact.tsx         # Contacto + reloj en tiempo real + decoración cohete
    │   └── Footer.tsx          # Footer mínimo con versión
    ├── hooks/
    │   └── useChat.ts          # Hook: estado de mensajes, loading, error, historial, retry
    └── services/
        └── chatApi.ts          # Cliente HTTP thin: POST /api/v1/chat con tipos TypeScript
```

---

## Cómo levantarlo en local

### Requisitos

- Node.js >= 18
- El backend FastAPI corriendo en `http://localhost:8000` (para el chat — ver `apps/back/`)

### Pasos

```bash
cd apps/web
npm install
npm run dev
```

El dev server arranca en **http://localhost:5173**.

El chat funciona sólo si el backend está activo. El resto del portfolio es estático y funciona sin backend.

### Scripts disponibles

```bash
npm run dev       # Dev server con HMR
npm run build     # Build de producción (tsc + vite build)
npm run preview   # Preview del build de producción
```

---

## Conexión con el backend

En desarrollo, Vite actúa como proxy:

```
POST /api/v1/chat
  → Vite proxy
  → http://localhost:8000/api/v1/chat  (FastAPI)
```

Esto elimina CORS por completo durante el desarrollo local. La configuración está en `vite.config.ts`:

```ts
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  },
}
```

En producción, el frontend debe desplegarse de forma que `/api` apunte al servidor FastAPI (reverse proxy Nginx, mismo dominio, etc.).

### Contrato de la API de chat

**Request** — `POST /api/v1/chat`
```ts
{
  message: string        // pregunta del usuario
  history: { role: 'user' | 'assistant', content: string }[]
}
```

**Response**
```ts
{
  answer: string         // respuesta del agente
  sources: { text: string, source: string, score: number }[]
  model: string          // modelo LLM usado
}
```

---

## Secciones principales de la UI

| Sección | ID | Descripción |
|---------|----|-------------|
| Hero | `#home` | Presentación principal, imagen synthwave, tech rack, quote |
| Terminal cards | _(dentro de Hero)_ | 4 tarjetas: `about`, `stack`, proyectos, status |
| Chat IA | `#chat` | Interfaz conversacional contra el agente del backend |
| Contacto | `#contact` | Links de contacto, reloj en tiempo real, cohete animado |

La navegación del header apunta a `#about`, `#projects` y `#skills` aunque esas secciones aún no tienen contenido dedicado — están mapeadas como anclas para expansión futura.

---

## Componentes principales

### `App.tsx`
Componente raíz. Gestiona el estado de tema (`dark | light`) y renderiza el layout completo. Aplica la clase `theme-light` al wrapper raíz para el toggle de tema via CSS variables.

### `Header.tsx`
Navbar fija con:
- Logo `> MIGUEL.DEV_`
- Links de navegación numerados (`01.` a `05.`)
- Hamburguer para mobile
- Botón de toggle de tema
- `IntersectionObserver` para marcar el link activo según la sección visible

### `Hero.tsx`
Sección hero con:
- Copy principal y CTA buttons
- Imagen de referencia synthwave (`/hero-reference.png`)
- Panel de status lateral
- Grid de chips de tecnologías (iconos Devicons)
- `<TerminalCards />` embebido
- Quote box

### `TerminalCards.tsx`
Grid de 4 tarjetas con chrome de ventana terminal (dots rojo/amarillo/verde). Contenido estático: whoami, stack, proyectos, system status con gráfico SVG de ondas.

### `ChatPanel.tsx`
Chat funcional conectado al backend:
- Historial de mensajes con scroll automático
- Indicador de carga animado (`procesando_`)
- Banner de error con retry (rollback del mensaje del usuario si falla)
- Estado de conexión (punto verde/púrpura)
- Usa el hook `useChat`

### `useChat.ts`
Hook que encapsula toda la lógica del chat:
- Mantiene el array de `messages` y el historial para el backend
- Maneja `loading` y `error`
- En caso de error, hace rollback del mensaje del usuario para permitir reintento

### `Contact.tsx`
- Links de email, LinkedIn, GitHub
- Reloj en tiempo real (actualizado cada segundo via `setInterval`)
- Decoración de cohete animada con SVG inline

---

## Decisiones de diseño relevantes

- **Sin librerías de UI**: todo el diseño está en `styles.css` porque la migración priorizó fidelidad visual exacta con el original vanilla.
- **Sin router**: es una SPA de una sola página con navegación por anclas, sin React Router.
- **Sin estado global**: el único estado compartido es el tema, que se pasa por props desde `App`. El chat tiene su propio estado en el hook.
- **`ChatPlaceholder.tsx`** existe como referencia del diseño original del placeholder. En producción se usa `ChatPanel.tsx` directamente.

---

## Próximos pasos sugeridos

- [ ] Implementar secciones `#about`, `#projects` y `#skills` con contenido real.
- [ ] Extraer los estilos inline de `ChatPanel` a `styles.css` para consistencia.
- [ ] Agregar manejo de Markdown en las respuestas del agente (el backend puede devolver texto formateado).
- [ ] Paginación o límite del historial de chat para no enviar un contexto infinito al backend.
- [ ] Agregar tests con Vitest + Testing Library.
- [ ] Variables de entorno para la URL base del backend (útil en staging/producción).
- [ ] PWA / manifest para instalación en mobile.
