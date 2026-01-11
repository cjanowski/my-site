'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Summary from '@/components/Summary'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
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

        {/* Footer */}
        <footer className="py-12 section-padding bg-gray-900 text-white">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-gray-300 mb-4">
                © 2026 Cory Janowski. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
              </p>
            </motion.div>
          </div>
        </footer>
      </main>
    </>
  )
}