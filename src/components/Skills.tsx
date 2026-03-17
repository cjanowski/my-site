'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const allSkills = [
  // Development Skills
  { name: "Microservices", category: "development" },
  { name: "REST APIs", category: "development" },
  { name: "System Design", category: "development" },
  { name: "Go", category: "development" },
  { name: "Python", category: "development" },
  { name: "TypeScript", category: "development" },
  { name: "Node.js", category: "development" },

  // Cloud & Infrastructure
  { name: "GCP", category: "cloud" },
  { name: "AWS", category: "cloud" },
  { name: "Docker", category: "cloud" },
  { name: "K8s", category: "cloud" },
  { name: "Terraform", category: "cloud" },

  // Observability
  { name: "Grafana", category: "observability" },
  { name: "Splunk", category: "observability" },
  { name: "DataDog", category: "observability" }
] as const

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 section-padding relative z-10 bg-white/30 backdrop-blur-sm border-t border-b border-gray-100/50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="flex flex-col items-center justify-center mb-16"
        >
          <span className="text-secondary-600 font-semibold tracking-wider text-sm uppercase mb-3">Expertise</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight text-center">
            Technical <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        {/* Categories Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm font-medium border-b border-gray-200 pb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel-subtle bg-primary-50 text-primary-700">
            <div className="w-2 h-2 rounded-full bg-primary-500 shadow-sm shadow-primary-500/50" />
            <span>Development</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel-subtle bg-secondary-50 text-secondary-700">
            <div className="w-2 h-2 rounded-full bg-secondary-500 shadow-sm shadow-secondary-500/50" />
            <span>Cloud & Infra</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel-subtle bg-purple-50 text-purple-700">
            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50" />
            <span>Observability</span>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {allSkills.map((skill, index) => {
            const isDev = skill.category === 'development';
            const isCloud = skill.category === 'cloud';

            const dotColor = isDev ? 'bg-primary-500' : isCloud ? 'bg-secondary-500' : 'bg-purple-500';
            const textHover = isDev ? 'group-hover:text-primary-600' : isCloud ? 'group-hover:text-secondary-600' : 'group-hover:text-purple-600';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group cursor-default"
              >
                <div className="glass-card flex flex-col items-center justify-center p-6 text-center h-full min-h-[120px] transition-all hover:shadow-xl hover:shadow-primary-900/5">
                  <div className="absolute top-4 right-4 group-hover:animate-pulse">
                    <div className={`w-2 h-2 rounded-full ${dotColor} shadow-sm`} />
                  </div>
                  <span className={`text-lg md:text-xl font-bold text-gray-800 transition-colors ${textHover}`}>
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}