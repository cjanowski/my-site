import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { profile } from '@/content/profile'
import { yearsSince } from '@/lib/dates'

// Link-preview card (LinkedIn, Slack, iMessage…), rendered from the same profile data as the page.
export const alt = `${profile.name} · ${profile.title}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const revalidate = 86400

const C = { bg: '#0c0c0e', fg: '#f4f4f5', muted: '#afafb9', subtle: '#78787f', line: '#2d2d32', accent: '#34d399', raised: '#202024' }

export default async function OpenGraphImage() {
  const portrait = await readFile(join(process.cwd(), 'public/portrait.jpeg'))
  const src = `data:image/jpeg;base64,${portrait.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: C.bg,
          backgroundImage: `radial-gradient(${C.line} 1.5px, transparent 1.5px)`,
          backgroundSize: '28px 28px',
          color: C.fg,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 700 }}>
          <div style={{ display: 'flex', fontSize: 26, color: C.accent, letterSpacing: 1 }}>~/cory</div>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, letterSpacing: -2, marginTop: 18 }}>{profile.name}</div>
          <div style={{ display: 'flex', fontSize: 34, color: C.fg, marginTop: 10 }}>
            {profile.title} @ {profile.company}
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: C.muted, marginTop: 18, lineHeight: 1.4 }}>
            {`${yearsSince(profile.careerStart)}+ years · ex-Apple · agentic LLM workflows, distributed systems, data pipelines`}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 34 }}>
            {profile.topSkills.map((s) => (
              <div key={s} style={{ display: 'flex', fontSize: 22, color: C.fg, background: C.raised, border: `1px solid ${C.line}`, borderRadius: 10, padding: '6px 14px' }}>
                {s}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', padding: 12, borderRadius: 36, border: `2px solid ${C.line}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={300} height={375} style={{ borderRadius: 26, objectFit: 'cover' }} alt="" />
        </div>
      </div>
    ),
    size,
  )
}
