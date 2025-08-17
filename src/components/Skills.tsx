'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Cloud, Database, Settings, Cpu, Globe } from 'lucide-react'

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: string[]
  color: string
}

const skillCategories: SkillCategory[] = [
  {
    title: "Development",
    icon: <Code className="w-6 h-6" />,
    skills: ["Microservices", "REST APIs", "gRPC", "Message Queues", "System Design", "Distributed Systems", "Caching Strategies", "Go", "Python", "Java", "C++", "PHP", "TypeScript", "JavaScript"],
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Backend & Cloud",
    icon: <Cloud className="w-6 h-6" />,
    skills: ["Google Cloud Platform (GCP)", "Amazon Web Services (AWS)", "Docker", "Kubernetes", "Terraform", "CI/CD Pipelines", "Infrastructure as Code", "Cloud Functions", "Cloud Storage", "IaC", "IAM", "Node.js"],
    color: "from-green-500 to-green-600"
  },
  {
    title: "Observability",
    icon: <Settings className="w-6 h-6" />,
    skills: ["Grafana", "OpenTelemetry", "Prometheus", "Splunk", "DataDog"],
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Emerging Tech",
    icon: <Cpu className="w-6 h-6" />,
    skills: ["Generative AI"],
    color: "from-orange-500 to-orange-600"
  }
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 section-padding bg-white">
      <div className="container-max">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-apple-gray-800 mb-16 text-center"
        >
          Technical
          <span className="text-gradient block">Skills</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="liquid-card rounded-2xl p-6 transition-all duration-300 group hover:scale-105"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {category.icon}
              </div>
              
              <h3 className="text-xl font-bold text-apple-gray-800 mb-4">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: (index * 0.1) + (skillIndex * 0.05) }}
                    className="px-3 py-1 bg-apple-gray-100 text-apple-gray-700 rounded-full text-sm font-medium hover:bg-apple-blue-500 hover:text-white transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
