'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Summary() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 section-padding bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl lg:text-5xl font-bold text-apple-gray-800 mb-8"
          >
            Professional
            <span className="text-gradient block">Summary</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-effect rounded-3xl p-8 lg:p-12"
          >
            <p className="text-lg lg:text-xl leading-relaxed text-apple-gray-600 font-medium">
              Software engineer with over{' '}
              <span className="text-apple-blue-500 font-semibold">4 years experience</span>{' '}
              in Engineering, Distributed Systems, Data Ingestion, and Cloud infrastructure. 
              I have extensive production experience with{' '}
              <span className="text-apple-blue-500 font-semibold">Python</span>,{' '}
              <span className="text-apple-blue-500 font-semibold">Go</span>,{' '}
              <span className="text-apple-blue-500 font-semibold">IaC</span>,{' '}
              Observability and Ops tooling.
            </p>
          </motion.div>

          {/* Key Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mt-12"
          >
            <div className="glass-effect rounded-2xl p-6 hover:bg-white/90 transition-all duration-300">
              <div className="text-3xl font-bold text-apple-blue-500 mb-2">4+</div>
              <div className="text-apple-gray-600 font-medium">Years Experience</div>
            </div>
            
            <div className="glass-effect rounded-2xl p-6 hover:bg-white/90 transition-all duration-300">
              <div className="text-3xl font-bold text-apple-blue-500 mb-2">150+</div>
              <div className="text-apple-gray-600 font-medium">Data Formats Integrated</div>
            </div>
            
            <div className="glass-effect rounded-2xl p-6 hover:bg-white/90 transition-all duration-300">
              <div className="text-3xl font-bold text-apple-blue-500 mb-2">99.98%</div>
              <div className="text-apple-gray-600 font-medium">Platform Uptime</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
