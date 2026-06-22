/**
 * chatApi — thin HTTP client for the FastAPI backend.
 *
 * In development, Vite proxies `/api` → `http://localhost:8000`
 * so there are zero CORS issues during local work.
 */

export interface MessageSchema {
  role: 'user' | 'assistant'
  content: string
}

export interface SourceChunk {
  text: string
  source: string
  score: number
}

export interface ChatRequest {
  message: string
  history: MessageSchema[]
}

export interface ChatResponse {
  answer: string
  sources: SourceChunk[]
  model: string
}

const BASE = '/api/v1'

export async function sendMessage(payload: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => res.statusText)
    throw new Error(`Error ${res.status}: ${detail}`)
  }

  return res.json() as Promise<ChatResponse>
}
