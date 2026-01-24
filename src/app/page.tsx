'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Summary from '@/components/Summary'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import CircuitBackground from '@/components/CircuitBackground'
import DoomContainer from '@/components/DoomContainer'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      <CircuitBackground />
      <Navigation />
      <main className="min-h-screen relative z-10">
        <div id="home">
          <Hero />
        </div>

        <div id="about">
          <Summary />
        </div>

        <div id="experience">
          <Experience />
        </div>

        <div id="projects">
          <Projects />
        </div>

        <div id="education">
          <Education />
        </div>

        <div id="skills">
          <Skills />
        </div>

        <div id="skills">
          <Skills />
        </div>

        {/* Secret Retro Gaming Corner */}
        <div className="border-t border-pcb-copper-500/10">
          <DoomContainer />
        </div>

        {/* Footer */}
        <footer className="py-12 section-padding glass-panel-heavy mt-0 border-t border-pcb-copper-500/30">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex justify-center mb-8">
                <div className="w-full max-w-xs h-1 bg-gradient-to-r from-transparent via-pcb-copper-500 to-transparent opacity-50" />
              </div>

              <p className="text-gray-300 mb-4 font-mono">
                © 2026 Cory Janowski. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm font-mono">
                System Status: <span className="text-green-400">OPERATIONAL</span>
              </p>
              <p className="text-gray-600 text-xs mt-2">
                Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
              </p>
            </motion.div>
          </div>
        </footer>
      </main>
    </>
  )
}