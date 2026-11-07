'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Copy, ExternalLink, Gamepad2, Hash, Moon } from 'lucide-react'
import { profile, SECTIONS, type SectionId } from '@/content/profile'

/** Every palette entry is one of these. Adding a kind without handling it in `run` is a compile error. */
export type Command =
  | { kind: 'section'; id: SectionId; label: string }
  | { kind: 'open'; href: string; label: string }
  | { kind: 'copy'; text: string; label: string }
  | { kind: 'theme'; label: string }
  | { kind: 'doom'; label: string }

type Kind = Command['kind']
export type Handlers = { [K in Exclude<Kind, 'section' | 'open' | 'copy'>]: () => void }

const ICON: Record<Kind, typeof Hash> = { section: Hash, open: ExternalLink, copy: Copy, theme: Moon, doom: Gamepad2 }

const assertNever = (x: never): never => {
  throw new Error(`Unhandled command: ${JSON.stringify(x)}`)
}

export const COMMANDS: readonly Command[] = [
  ...SECTIONS.map(({ id, label }) => ({ kind: 'section', id, label: `Go to ${label}` }) as const),
  ...profile.projects.map((p) => ({ kind: 'open', href: p.repo, label: `Open ${p.name} on GitHub` }) as const),
  { kind: 'open', href: profile.links.linkedin, label: 'Open LinkedIn' },
  { kind: 'open', href: profile.links.github, label: 'Open GitHub profile' },
  { kind: 'copy', text: profile.email, label: 'Copy email address' },
  { kind: 'theme', label: 'Toggle dark mode' },
  { kind: 'doom', label: 'Play Doom (or: ↑↑↓↓←→←→BA)' },
]

/** Subsequence match: every query char appears in order. Score rewards contiguous runs and word starts. */
export function fuzzyScore(query: string, text: string): number | null {
  const q = query.toLowerCase().replace(/\s+/g, '')
  const s = text.toLowerCase()
  let score = 0
  let run = 0
  let j = 0
  for (let i = 0; i < s.length && j < q.length; i++) {
    if (s[i] !== q[j]) {
      run = 0
      continue
    }
    run++
    score += run * 2 + (i === 0 || s[i - 1] === ' ' ? 3 : 0)
    j++
  }
  return j === q.length ? score - s.length * 0.01 : null
}

export default function CommandPalette({ open, onClose, handlers }: { open: boolean; onClose: () => void; handlers: Handlers }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const input = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    if (!query) return COMMANDS
    return COMMANDS.map((c) => [c, fuzzyScore(query, c.label)] as const)
      .filter((x): x is readonly [Command, number] => x[1] !== null)
      .sort((a, b) => b[1] - a[1])
      .map(([c]) => c)
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => input.current?.focus())
    } else {
      // Release focus right away; the input lingers during the exit animation and would eat keystrokes.
      input.current?.blur()
    }
  }, [open])
  useEffect(() => setActive(0), [query])

  const run = (cmd: Command) => {
    switch (cmd.kind) {
      case 'section':
        document.getElementById(cmd.id)?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'open':
        window.open(cmd.href, '_blank', 'noopener,noreferrer')
        break
      case 'copy':
        void navigator.clipboard?.writeText(cmd.text)
        setToast('Copied')
        setTimeout(() => setToast(null), 1200)
        return // keep the palette open so the confirmation is visible
      case 'theme':
      case 'doom':
        handlers[cmd.kind]()
        break
      default:
        assertNever(cmd)
    }
    onClose()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') setActive((i) => Math.min(i + 1, results.length - 1))
    else if (e.key === 'ArrowUp') setActive((i) => Math.max(i - 1, 0))
    else if (e.key === 'Enter' && results[active]) run(results[active])
    else if (e.key === 'Escape') onClose()
    else return
    e.preventDefault()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-label="Command palette"
            className="card w-full max-w-lg overflow-hidden shadow-2xl"
            initial={{ y: -8, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="font-mono text-sm text-accent">&gt;</span>
              <input
                ref={input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a command or search…"
                className="h-12 w-full bg-transparent text-sm text-fg placeholder:text-subtle focus:outline-none"
                aria-controls="palette-results"
              />
              {toast ? <span className="font-mono text-xs text-accent">{toast}</span> : <kbd className="kbd">esc</kbd>}
            </div>
            <ul id="palette-results" role="listbox" className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-subtle">No matches</li>}
              {results.map((c, i) => {
                const Icon = ICON[c.kind]
                return (
                  <li
                    key={c.label}
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => run(c)}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm ${i === active ? 'bg-raised text-fg' : 'text-muted'}`}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-subtle" aria-hidden />
                    <span className="flex-1 truncate">{c.label}</span>
                    {i === active && <ArrowRight className="h-3.5 w-3.5 text-subtle" aria-hidden />}
                  </li>
                )
              })}
            </ul>
            <div className="flex items-center gap-3 border-t border-line px-4 py-2 font-mono text-[10px] text-subtle">
              <span><kbd className="kbd">↑</kbd> <kbd className="kbd">↓</kbd> move</span>
              <span><kbd className="kbd">↵</kbd> run</span>
              <span className="ml-auto">{COMMANDS.length} commands · typed as a discriminated union</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
