'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Summary() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 section-padding relative z-10">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900">
              Professional <span className="gradient-text">Summary</span>
            </h2>
          </div>

          {/* Main Glass Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel-heavy p-8 lg:p-12 mb-12 relative overflow-hidden"
          >
            {/* Subtle light flair */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />

            <div className="relative z-10">
              <p className="text-xl lg:text-2xl leading-relaxed text-gray-700 font-light">
                Software engineer with over{' '}
                <span className="font-semibold text-primary-600">7+ years experience</span>{' '}
                in Software Development, Distributed Systems, Data Ingestion, and Cloud infrastructure.
                I have extensive production experience with{' '}
                <span className="font-medium text-secondary-600">Python</span>,{' '}
                <span className="font-medium text-secondary-600">Go</span>,{' '}
                <span className="font-medium text-secondary-600">IaC</span>,{' '}
                Observability and Ops tooling.
              </p>
            </div>
          </motion.div>

          {/* Key Metric Glass Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { value: "07+", label: "Years Experience" },
              { value: "150+", label: "Formats Integrated" },
              { value: "99.9%", label: "Platform Uptime" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="glass-card text-center items-center justify-center py-10"
              >
                <div className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary-500 to-secondary-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-500 font-medium text-sm tracking-wider uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}