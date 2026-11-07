'use client'

import { useEffect, useRef, useState } from 'react'

/** Keys as `KeyboardEvent.key` reports them; letters are matched case-insensitively. */
type Arrow = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'
type Letter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
export type Key = Arrow | Letter | 'Enter' | 'Escape'

export const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'] as const satisfies readonly Key[]

/** Fires `onMatch` when the user types `sequence` in order, anywhere on the page. */
export function useKeySequence(sequence: readonly Key[], onMatch: () => void) {
  const progress = useRef(0)
  const cb = useRef(onMatch)
  cb.current = onMatch
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      progress.current = key === sequence[progress.current] ? progress.current + 1 : key === sequence[0] ? 1 : 0
      if (progress.current === sequence.length) {
        progress.current = 0
        cb.current()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sequence])
}

/** Types and deletes each word in turn. Respects prefers-reduced-motion by showing the first word. */
export function useTypewriter(words: readonly string[], { type = 55, erase = 30, hold = 1600 } = {}) {
  const [text, setText] = useState(words[0] ?? '')
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let i = 0
    let n = words[0]?.length ?? 0
    let deleting = true
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const word = words[i]
      n += deleting ? -1 : 1
      setText(word.slice(0, n))
      if (!deleting && n === word.length) {
        deleting = true
        timer = setTimeout(tick, hold)
        return
      }
      if (deleting && n === 0) {
        deleting = false
        i = (i + 1) % words.length
      }
      timer = setTimeout(tick, deleting ? erase : type)
    }
    timer = setTimeout(tick, hold)
    return () => clearTimeout(timer)
  }, [words, type, erase, hold])
  return text
}
