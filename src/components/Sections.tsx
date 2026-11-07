import { ArrowUpRight, Award, Github, GraduationCap, Star } from 'lucide-react'
import { profile, type SectionId } from '@/content/profile'
import { formatMonth, formatSpan, yearsSince } from '@/lib/dates'
import { toTsLines, type TokenKind } from '@/lib/tsLiteral'

function SectionHeader({ id, eyebrow, title }: { id: SectionId; eyebrow: string; title: string }) {
  return (
    <header className="mb-10">
      <p className="eyebrow">{`// ${eyebrow}`}</p>
      <h2 id={`${id}-title`} className="heading">{title}</h2>
    </header>
  )
}

// ---------------- About ----------------

const TOKEN_CLASS: Record<TokenKind, string> = {
  kw: 'text-code-kw',
  name: 'text-fg',
  key: 'text-code-key',
  str: 'text-code-str',
  num: 'text-code-num',
  punct: 'text-subtle',
  type: 'text-code-type',
  plain: '',
}

function CodeCard() {
  const lines = toTsLines(
    'cory',
    {
      role: profile.title,
      at: profile.company,
      yearsInIndustry: yearsSince(profile.careerStart),
      topSkills: profile.topSkills,
      ships: profile.roles,
      openSource: profile.projects.filter((p) => p.featured).map((p) => p.repo.replace('https://', '')),
    },
    'Engineer',
  )
  return (
    <figure className="card min-w-0 overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <figcaption className="ml-2 font-mono text-xs text-subtle">profile.ts</figcaption>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-6" aria-label="Profile summary written as TypeScript">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="table-row">
              <span className="table-cell select-none pr-4 text-right text-subtle/60">{i + 1}</span>
              <span className="table-cell whitespace-pre">
                {line.map((tok, j) => <span key={j} className={TOKEN_CLASS[tok.kind]}>{tok.text}</span>)}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </figure>
  )
}

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container-content">
        <SectionHeader id="about" eyebrow="about" title="Systems that have to keep working" />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr]">
          <div className="min-w-0 space-y-5 text-[15px] leading-7 text-muted">
            {profile.about.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            <dl className="grid grid-cols-3 gap-3 pt-4">
              {profile.metrics.map((m) => (
                <div key={m.label} className="card flex flex-col p-4">
                  <dt className="text-xs leading-snug text-subtle">{m.label}</dt>
                  <dd className="order-first mb-1 whitespace-nowrap text-xl font-semibold sm:text-2xl tracking-tight text-fg">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <CodeCard />
        </div>
      </div>
    </section>
  )
}

// ---------------- Experience ----------------

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container-content">
        <SectionHeader id="experience" eyebrow="experience" title="Where I've worked" />
        <ol className="relative space-y-12 border-l border-line pl-6 sm:pl-8">
          {profile.experience.map((r) => {
            const current = r.span.end === 'present'
            return (
              <li key={r.company} className="relative">
                <span className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-bg sm:-left-[39px] ${current ? 'bg-accent' : 'bg-line'}`} aria-hidden />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold text-fg">
                    {r.title} <span className="text-muted">· {r.company}</span>
                  </h3>
                  <p className="font-mono text-xs text-subtle">{formatSpan(r.span)}</p>
                </div>
                <p className="mt-0.5 text-sm text-subtle">{r.location}</p>
                <ul className="mt-4 space-y-2 text-[15px] leading-7 text-muted">
                  {r.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-subtle" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

// ---------------- Projects ----------------

export function Projects() {
  const [featured, ...rest] = [...profile.projects].sort((a, b) => Number('featured' in b) - Number('featured' in a))
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container-content">
        <SectionHeader id="projects" eyebrow="projects" title="Things I've built on the side" />
        <article className="card relative overflow-hidden p-6 sm:p-8">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <div className="relative">
            <p className="inline-flex items-center gap-1.5 font-mono text-xs text-accent"><Star className="h-3.5 w-3.5" aria-hidden /> featured</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-fg">{featured.name}</h3>
            <p className="mt-3 max-w-2xl leading-7 text-muted">{featured.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">{featured.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={featured.repo} target="_blank" rel="noopener noreferrer" className="btn-primary"><Github className="h-4 w-4" aria-hidden /> Source</a>
              {'demo' in featured && (
                <a href={featured.demo} target="_blank" rel="noopener noreferrer" className="btn">Live graph <ArrowUpRight className="h-4 w-4" aria-hidden /></a>
              )}
            </div>
          </div>
        </article>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <li key={p.name}>
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="card group flex h-full flex-col p-5 transition-colors hover:border-fg/25">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-sm font-medium text-fg">{p.name}</h3>
                  <ArrowUpRight className="h-4 w-4 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </div>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{p.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => <span key={s} className={`chip ${s === p.primary ? 'border-accent/40 text-accent' : ''}`}>{s}</span>)}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ---------------- Skills ----------------

export function Skills() {
  const top = new Set<string>(profile.topSkills)
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container-content">
        <SectionHeader id="skills" eyebrow="skills" title="Stack" />
        <div className="card divide-y divide-line">
          {Object.entries(profile.stack).map(([group, items]) => (
            <div key={group} className="grid gap-3 p-5 sm:grid-cols-[11rem_1fr] sm:items-center">
              <h3 className="font-mono text-xs uppercase tracking-wider text-subtle">{group}</h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <li key={s} className={`rounded-lg border px-3 py-1 text-sm ${top.has(s) ? 'border-accent/40 bg-accent/10 text-fg' : 'border-line text-muted'}`}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-subtle">Highlighted: top skills on LinkedIn. Also: distributed systems design, on-call and incident response.</p>
      </div>
    </section>
  )
}

// ---------------- Education ----------------

export function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container-content">
        <SectionHeader id="education" eyebrow="education" title="Education & certifications" />
        <div className="grid gap-4 md:grid-cols-2">
          {profile.education.map((e) => (
            <article key={e.school} className="card p-5">
              <GraduationCap className="h-5 w-5 text-subtle" aria-hidden />
              <h3 className="mt-3 font-semibold text-fg">{e.school}</h3>
              <p className="text-sm text-muted">{e.credential}</p>
              <p className="mt-1 font-mono text-xs text-subtle">{formatMonth(e.span.start)} – {formatMonth(e.span.end)}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{e.detail}</p>
            </article>
          ))}
        </div>
        <ul className="card mt-4 divide-y divide-line">
          {profile.certifications.map((c) => (
            <li key={c.name} className="flex items-center gap-3 px-5 py-3 text-sm">
              <Award className="h-4 w-4 shrink-0 text-subtle" aria-hidden />
              <span className="flex-1 text-fg">{c.name}</span>
              <span className="hidden text-subtle sm:inline">{c.issuer}</span>
              <span className="font-mono text-xs text-subtle">{formatMonth(c.issued)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
