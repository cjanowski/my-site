import Shell from '@/components/Shell'
import Hero from '@/components/Hero'
import { About, Education, Experience, Projects, Skills } from '@/components/Sections'
import { profile } from '@/content/profile'
import { yearsSince } from '@/lib/dates'

// Durations ("7 mos") and years in industry are computed at render; re-render daily so they stay current.
export const revalidate = 86400

export default function Home() {
  return (
    <Shell>
      <main>
        <Hero years={yearsSince(profile.careerStart)} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
      </main>
      <footer className="border-t border-line py-10">
        <div className="container-content flex flex-col gap-2 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p className="font-mono text-xs">
            Next.js · TypeScript · Tailwind · press <kbd className="kbd">⌘K</kbd>, or try the Konami code
          </p>
        </div>
      </footer>
    </Shell>
  )
}
