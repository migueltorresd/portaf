import { useState, useCallback } from 'react'
import { sendMessage, MessageSchema } from '../services/chatApi'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface UseChatReturn {
  messages: ChatMessage[]
  loading: boolean
  error: string | null
  send: (text: string) => Promise<void>
  clearError: () => void
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMsg: ChatMessage = { role: 'user', content: trimmed }

    setMessages((prev) => [...prev, userMsg])
    setLoading(true)
    setError(null)

    // Build history excluding the message we just added (it's the current question)
    const history: MessageSchema[] = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }))

    try {
      const response = await sendMessage({ message: trimmed, history })
      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: response.answer,
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error desconocido'
      setError(msg)
      // Roll back the user message so the user can retry
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setLoading(false)
    }
  }, [messages, loading])

  const clearError = useCallback(() => setError(null), [])

  return { messages, loading, error, send, clearError }
}
