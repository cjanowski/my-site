'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import ComponentChip from './ComponentChip'
import LEDIndicator from './LEDIndicator'

export default function Summary() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 section-padding relative">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <LEDIndicator color="amber" state="on" />
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              System
              <span className="gradient-title-summary block">Summary</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel-heavy rounded-sm p-1 border-gray-700 mx-auto"
          >
            {/* Memory Stick Aesthetic */}
            <div className="bg-gray-900/50 rounded-sm p-8 lg:p-12 relative overflow-hidden group">

              {/* RAM Heat Spreader Visuals */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 opacity-50" />
              <div className="absolute top-4 right-4 flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1 h-3 bg-pcb-copper-500/50 rounded-sm" />
                ))}
              </div>

              {/* Memory Label */}
              <div className="absolute top-4 left-6 border border-gray-600 px-2 py-0.5 rounded-sm">
                <span className="text-[10px] font-mono text-gray-400">DDR5-6400  32GB  CL32</span>
              </div>

              <div className="relative z-10 mt-6 pointer-events-none">
                <p className="text-lg lg:text-xl leading-relaxed text-gray-300 font-medium font-mono">
                  <span className="text-pcb-copper-300">&gt; execute summary_log.txt</span>
                  <br /><br />
                  Software engineer with over{' '}
                  <span className="text-amber-400 font-bold">5+ years experience</span>{' '}
                  in Software Development, Distributed Systems, Data Ingestion, and Cloud infrastructure.
                  I have extensive production experience with{' '}
                  <span className="text-amber-300 font-bold">Python</span>,{' '}
                  <span className="text-amber-300 font-bold">Go</span>,{' '}
                  <span className="text-amber-300 font-bold">IaC</span>,{' '}
                  Observability and Ops tooling.
                </p>
              </div>

              {/* Gold Contacts Bottom Edge */}
              <div className="absolute -bottom-1 left-4 right-4 h-4 flex justify-between space-x-1 opacity-80">
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: "40%" }}
                    whileHover={{ height: "100%", backgroundColor: "#fbbf24" }}
                    className="w-full bg-gradient-to-b from-yellow-600 to-yellow-400 rounded-b-sm"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Key Highlights wrapped in ComponentChips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mt-12"
          >
            <ComponentChip label="EXP_CTR">
              <div className="p-6 text-center">
                <div className="text-4xl font-bold text-amber-400 mb-2 font-mono">
                  05+
                </div>
                <div className="text-gray-400 font-medium text-xs tracking-wider uppercase">Years Experience</div>
              </div>
            </ComponentChip>

            <ComponentChip label="DATA_BUS">
              <div className="p-6 text-center">
                <div className="text-4xl font-bold text-amber-400 mb-2 font-mono">
                  150+
                </div>
                <div className="text-gray-400 font-medium text-xs tracking-wider uppercase">Formats Integrated</div>
              </div>
            </ComponentChip>

            <ComponentChip label="UPTIME">
              <div className="p-6 text-center">
                <div className="text-4xl font-bold text-amber-400 mb-2 font-mono">
                  99.9%
                </div>
                <div className="text-gray-400 font-medium text-xs tracking-wider uppercase">Platform Uptime</div>
              </div>
            </ComponentChip>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}