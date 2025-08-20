'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

// Define all skills as individual items with their categories for color coding
const allSkills = [
  // Development Skills
  { name: "Microservices", category: "development", color: "blue" },
  { name: "REST APIs", category: "development", color: "blue" },
  { name: "gRPC", category: "development", color: "blue" },
  { name: "Message Queues", category: "development", color: "blue" },
  { name: "System Design", category: "development", color: "blue" },
  { name: "Distributed Systems", category: "development", color: "blue" },
  { name: "Caching Strategies", category: "development", color: "blue" },
  { name: "Go", category: "development", color: "blue" },
  { name: "Python", category: "development", color: "blue" },
  { name: "Java", category: "development", color: "blue" },
  { name: "C++", category: "development", color: "blue" },
  { name: "PHP", category: "development", color: "blue" },
  { name: "TypeScript", category: "development", color: "blue" },
  { name: "JavaScript", category: "development", color: "blue" },
  { name: "Node.js", category: "development", color: "blue" },
  
  // Cloud & Infrastructure
  { name: "Google Cloud Platform", category: "cloud", color: "green" },
  { name: "Amazon Web Services", category: "cloud", color: "green" },
  { name: "Docker", category: "cloud", color: "green" },
  { name: "Kubernetes", category: "cloud", color: "green" },
  { name: "Terraform", category: "cloud", color: "green" },
  { name: "CI/CD Pipelines", category: "cloud", color: "green" },
  { name: "Infrastructure as Code", category: "cloud", color: "green" },
  { name: "Cloud Functions", category: "cloud", color: "green" },
  { name: "Cloud Storage", category: "cloud", color: "green" },
  { name: "IAM", category: "cloud", color: "green" },
  
  // Observability
  { name: "Grafana", category: "observability", color: "purple" },
  { name: "OpenTelemetry", category: "observability", color: "purple" },
  { name: "Prometheus", category: "observability", color: "purple" },
  { name: "Splunk", category: "observability", color: "purple" },
  { name: "DataDog", category: "observability", color: "purple" },
  
  // Emerging Tech
  { name: "MLOps", category: "emerging", color: "orange" },
  { name: "Agentic AI", category: "emerging", color: "orange" },
  { name: "Metal Performance Shaders", category: "emerging", color: "orange" },
]

const getSkillColorClasses = (color: string) => {
  const colorMap = {
    blue: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 border-blue-300",
    green: "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 border-green-300",
    purple: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 border-purple-300",
    orange: "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 border-orange-300"
  }
  return colorMap[color as keyof typeof colorMap] || colorMap.blue
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 section-padding glass-section-light">
      <div className="container-max">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-gray-900 mb-16 text-center"
        >
          Technical
          <span className="gradient-title-tech block">Skills</span>
        </motion.h2>

        {/* Skills as Individual Buttons */}
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {allSkills.map((skill, index) => {
            const colorClasses = getSkillColorClasses(skill.color)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.03,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                className={`
                  ${colorClasses}
                  rounded-full px-6 py-3
                  font-medium text-sm
                  cursor-pointer select-none
                  border transition-all duration-200
                  backdrop-blur-md glass-skill-button
                  shadow-sm hover:shadow-md
                `}
              >
                {skill.name}
              </motion.div>
            )
          })}
        </div>

        {/* Category Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-gray-600"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Development</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Cloud & Infrastructure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Observability</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Emerging Tech</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}