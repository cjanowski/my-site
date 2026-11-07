'use client'

import { useCallback, useEffect, useState } from 'react'
import { Command as CommandIcon, Menu, Moon, Sun, X } from 'lucide-react'
import CommandPalette from '@/components/CommandPalette'
import Doom from '@/components/Doom'
import { KONAMI, useKeySequence } from '@/lib/hooks'
import { profile, SECTIONS } from '@/content/profile'

type Theme = 'light' | 'dark'

function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  useEffect(() => setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'), [])
  const toggle = useCallback(() => {
    setTheme((t) => {
      const next: Theme = t === 'dark' ? 'light' : 'dark'
      document.documentElement.dataset.theme = next
      try {
        localStorage.setItem('theme', next)
      } catch {}
      return next
    })
  }, [])
  return { theme, toggle }
}

export default function Shell({ children }: { children: React.ReactNode }) {
  const { theme, toggle } = useTheme()
  const [palette, setPalette] = useState(false)
  const [menu, setMenu] = useState(false)
  const [doom, setDoom] = useState(false)
  const [isMac, setIsMac] = useState(true)

  const unlockDoom = useCallback(() => {
    setDoom(true)
    setTimeout(() => document.getElementById('doom')?.scrollIntoView({ behavior: 'smooth' }), 80)
  }, [])
  useKeySequence(KONAMI, unlockDoom)

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform))
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette((p) => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
        <nav className="container-content flex h-14 items-center gap-6" aria-label="Main">
          <a href="#top" className="font-mono text-sm font-medium text-fg">
            <span className="text-accent">~/</span>
            {profile.name.split(' ')[0].toLowerCase()}
          </a>
          <ul className="hidden items-center gap-5 text-sm text-muted md:flex">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="transition-colors hover:text-fg">{s.label}</a>
              </li>
            ))}
          </ul>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setPalette(true)} className="btn hidden h-8 px-2.5 text-xs text-muted sm:inline-flex" aria-label="Open command palette">
              <CommandIcon className="h-3.5 w-3.5" aria-hidden />
              <span>Search</span>
              <kbd className="kbd">{isMac ? '⌘' : 'Ctrl'} K</kbd>
            </button>
            <button onClick={toggle} className="btn h-8 w-8 justify-center p-0" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={() => setMenu((m) => !m)} className="btn h-8 w-8 justify-center p-0 md:hidden" aria-label="Menu" aria-expanded={menu}>
              {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
        {menu && (
          <ul className="container-content flex flex-col gap-1 border-t border-line py-3 text-sm md:hidden">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={() => setMenu(false)} className="block rounded-md px-2 py-2 text-muted hover:bg-raised hover:text-fg">{s.label}</a>
              </li>
            ))}
            <li>
              <button onClick={() => { setMenu(false); setPalette(true) }} className="w-full rounded-md px-2 py-2 text-left text-muted hover:bg-raised hover:text-fg">Commands…</button>
            </li>
          </ul>
        )}
      </header>

      {children}
      {doom && <Doom />}

      <CommandPalette open={palette} onClose={() => setPalette(false)} handlers={{ theme: toggle, doom: unlockDoom }} />
    </>
  )
}
