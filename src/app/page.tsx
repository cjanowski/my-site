'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Summary from '@/components/Summary'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Education from '@/components/Education'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <Summary />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="education">
          <Education />
        </section>

        {/* Footer */}
        <footer className="py-12 section-padding bg-apple-gray-800 text-white">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-apple-gray-300 mb-4">
                © 2025 Cory Janowski. All rights reserved.
              </p>
              <p className="text-apple-gray-400 text-sm">
                Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
              </p>
            </motion.div>
          </div>
        </footer>
      </main>
    </>
  )
}
