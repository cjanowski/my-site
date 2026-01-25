'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import ComponentChip from './ComponentChip'
import LEDIndicator from './LEDIndicator'
import CircuitTrace from './CircuitTrace'

// Define all skills as individual items with their categories for color coding
const allSkills = [
  // Development Skills
  { name: "Microservices", category: "development", color: "blue" },
  { name: "REST APIs", category: "development", color: "blue" },
  { name: "System Design", category: "development", color: "blue" },
  { name: "Go", category: "development", color: "blue" },
  { name: "Python", category: "development", color: "blue" },
  { name: "TypeScript", category: "development", color: "blue" },
  { name: "Node.js", category: "development", color: "blue" },

  // Cloud & Infrastructure
  { name: "GCP", category: "cloud", color: "green" },
  { name: "AWS", category: "cloud", color: "green" },
  { name: "Docker", category: "cloud", color: "green" },
  { name: "K8s", category: "cloud", color: "green" },
  { name: "Terraform", category: "cloud", color: "green" },

  // Observability
  { name: "Grafana", category: "observability", color: "purple" },
  { name: "Splunk", category: "observability", color: "purple" },
  { name: "DataDog", category: "observability", color: "purple" }
] as const

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 section-padding relative">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="flex items-center justify-center gap-4 mb-16 relative"
        >
          {/* Left ornament */}
          <div className="absolute -left-24 top-1/2 -translate-y-1/2 hidden xl:block">
            <CircuitTrace width={80} height={2} color="#ef4444" />
          </div>

          <LEDIndicator color="red" state="pulse" />
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight text-center">
            Technical
            <span className="gradient-title-tech block">Skills</span>
          </h2>
          <LEDIndicator color="red" state="pulse" />

          {/* Right ornament */}
          <div className="absolute -right-24 top-1/2 -translate-y-1/2 hidden xl:block">
            <CircuitTrace width={80} height={2} color="#ef4444" />
          </div>
        </motion.div>

        {/* Categories Legend as a mini-circuit */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm font-mono border-b border-gray-800 pb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span className="text-gray-400">CORE_DEV</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <span className="text-gray-400">INFRA_OP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
            <span className="text-gray-400">OBSERVABILITY</span>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {allSkills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative group"
            >
              {/* Circuit Connectors (Decorative) */}
              {(index % 2 === 0) && <div className="absolute -right-4 top-1/2 w-4 h-1 bg-gray-800 hidden md:block" />}
              {(Math.floor(index / 4) < Math.floor(allSkills.length / 4)) && <div className="absolute -bottom-4 left-1/2 w-1 h-4 bg-gray-800 hidden lg:block" />}

              <ComponentChip
                pins="left-right"
                className="h-full"
              >
                <div className="flex flex-col items-center justify-center p-4 text-center h-full min-h-[100px] cursor-default bg-gray-900/80 hover:bg-gray-800/80 transition-colors">
                  <div className="absolute top-2 right-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${skill.color === 'blue' ? 'bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]' :
                      skill.color === 'green' ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]' :
                        'bg-purple-500 shadow-[0_0_5px_rgba(168,85,247,0.8)]'
                      }`} />
                  </div>

                  <span className="font-mono text-xs text-gray-500 mb-1 block opacity-50">IC-{100 + index}</span>
                  <span className="text-white font-bold tracking-wide group-hover:text-pcb-copper-300 transition-colors">
                    {skill.name}
                  </span>
                </div>
              </ComponentChip>
            </motion.div>
          ))}
        </div>

        {/* Structured PCB Circuit Traces - Grid Layout */}
        {/* Top Row - Horizontal traces */}
        <div className="absolute top-32 left-0 hidden lg:block z-0">
          <CircuitTrace width={160} height={2} color="#ef4444" delay={0} />
        </div>
        <div className="absolute top-32 right-0 hidden lg:block z-0">
          <CircuitTrace width={160} height={2} color="#3b82f6" delay={0.3} />
        </div>

        {/* Middle Row - Connecting to skill cards */}
        <div className="absolute top-1/2 left-12 hidden lg:block z-0">
          <CircuitTrace width={140} height={2} color="#22c55e" delay={0.6} />
        </div>
        <div className="absolute top-1/2 right-12 hidden lg:block z-0">
          <CircuitTrace width={140} height={2} color="#a855f7" delay={0.9} />
        </div>

        {/* Bottom Row */}
        <div className="absolute bottom-32 left-4 hidden lg:block z-0">
          <CircuitTrace width={120} height={2} color="#fbbf24" delay={1.2} />
        </div>
        <div className="absolute bottom-32 right-4 hidden lg:block z-0">
          <CircuitTrace width={120} height={2} color="#ef4444" delay={1.5} />
        </div>

        {/* Diagonal/Cross traces for depth */}
        <div className="absolute top-1/3 left-1/4 hidden lg:block z-0">
          <CircuitTrace width={100} height={2} color="#3b82f6" delay={0.4} style="complex" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 hidden lg:block z-0">
          <CircuitTrace width={100} height={2} color="#22c55e" delay={1.0} style="complex" />
        </div>
      </div>
    </section>
  )
}