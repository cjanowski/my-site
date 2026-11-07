'use client'

import { useState } from 'react'
import { Power } from 'lucide-react'

export default function Doom() {
  const [on, setOn] = useState(false)
  return (
    <section id="doom" className="section">
      <div className="container-content">
        <p className="eyebrow">// unlocked</p>
        <h2 className="heading">Doom (1993)</h2>
        <p className="mt-2 font-mono text-sm text-subtle">$ /usr/bin/retro --force</p>
        <div className="card mt-8 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="ml-3 font-mono text-xs text-subtle">doom.exe</span>
            <button onClick={() => setOn((v) => !v)} className="btn ml-auto h-7 px-2 text-xs" aria-pressed={on}>
              <Power className={`h-3.5 w-3.5 ${on ? 'text-accent' : ''}`} /> {on ? 'Power off' : 'Power on'}
            </button>
          </div>
          <div className="aspect-[4/3] w-full bg-black">
            {on ? (
              <iframe src="https://archive.org/embed/msdos_DOOM_1993" title="Doom (1993), via the Internet Archive" className="h-full w-full" allowFullScreen />
            ) : (
              <div className="flex h-full items-center justify-center font-mono text-sm text-white/40">press power to boot</div>
            )}
          </div>
        </div>
        <p className="mt-3 text-xs text-subtle">Runs in the browser via the Internet Archive&apos;s DOS emulator. Click the screen to capture keys.</p>
      </div>
    </section>
  )
}
