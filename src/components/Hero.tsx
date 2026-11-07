'use client'

import Image from 'next/image'
import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { profile } from '@/content/profile'
import { useTypewriter } from '@/lib/hooks'

export default function Hero({ years }: { years: number }) {
  const focus = useTypewriter(profile.roles)
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-content relative grid items-center gap-12 py-20 sm:py-28 md:grid-cols-[1fr_auto]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.title} @ {profile.company}
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-fg sm:text-6xl">{profile.name}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {years}+ years building backend systems that have to keep working, six of them at Apple. These days:{' '}
            <span className="whitespace-nowrap font-mono text-fg">
              {focus}
              <span className="ml-0.5 inline-block w-[2px] animate-blink bg-accent align-middle" style={{ height: '1.1em' }} aria-hidden />
            </span>
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-subtle">
            <MapPin className="h-4 w-4" aria-hidden /> {profile.location}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary"><Mail className="h-4 w-4" aria-hidden /> Email me</a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn"><Linkedin className="h-4 w-4" aria-hidden /> LinkedIn</a>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="btn"><Github className="h-4 w-4" aria-hidden /> GitHub</a>
          </div>
        </div>
        <div className="relative mx-auto w-56 sm:w-64">
          <div className="absolute -inset-3 rounded-[2rem] border border-line" aria-hidden />
          <Image src="/portrait.jpeg" alt={profile.name} width={512} height={640} priority className="relative aspect-[4/5] w-full rounded-3xl border border-line object-cover" />
        </div>
      </div>
    </section>
  )
}
