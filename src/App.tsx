import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatPanel from './components/ChatPanel'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div className={theme === 'light' ? 'theme-light' : ''} style={{ minHeight: '100vh' }}>
      <div className="scanlines" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <ChatPanel />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
