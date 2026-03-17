'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, ExternalLink, Bot, Cpu, Globe, Server, ArrowRight } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  primaryTech: string
  category: string
  icon: React.ReactNode
  color: string
  links: {
    github: string
    demo?: string
  }
}

const projects: Project[] = [
  {
    id: 'logs-and-alerting',
    title: 'Logs & Alerting',
    description: 'A robust log parsing system with configurable alerting mechanisms for real-time monitoring and incident response.',
    technologies: ['Python', 'Regex', 'YAML', 'JSON'],
    primaryTech: 'Python',
    category: 'DevOps',
    icon: <Server className="w-6 h-6" />,
    color: 'from-amber-400 to-orange-500',
    links: {
      github: 'https://github.com/cjanowski/Logs-and-Alerting'
    }
  },
  {
    id: 'k8s-python-argocd',
    title: 'K8s Python ArgoCD',
    description: 'A complete infrastructure-as-code solution for deploying and managing backend applications in production using Kubernetes.',
    technologies: ['Python', 'Kubernetes', 'ArgoCD', 'Docker', 'Helm'],
    primaryTech: 'Kubernetes',
    category: 'Infrastructure',
    icon: <Server className="w-6 h-6" />,
    color: 'from-blue-400 to-indigo-500',
    links: {
      github: 'https://github.com/cjanowski/k8s-python-argocd'
    }
  },
  {
    id: 'scrapy-play',
    title: 'Scrapy Play',
    description: 'A powerful web scraping framework for collecting, processing, and analyzing data from various online sources.',
    technologies: ['Python', 'Scrapy', 'BeautifulSoup', 'Redis'],
    primaryTech: 'Python',
    category: 'ML Systems',
    icon: <Bot className="w-6 h-6" />,
    color: 'from-purple-400 to-pink-500',
    links: {
      github: 'https://github.com/cjanowski/scrapy_play'
    }
  },
  {
    id: 'ragzzy',
    title: 'Ragzzy',
    description: 'A full-stack customer service platform featuring real-time communication, intelligent routing, and comprehensive analytics.',
    technologies: ['Node.js', 'React', 'MongoDB', 'Socket.io'],
    primaryTech: 'JavaScript',
    category: 'Web App',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-emerald-400 to-teal-500',
    links: {
      github: 'https://github.com/cjanowski/ragzzy'
    }
  },
  {
    id: 'toml-and-jerry',
    title: 'TOML & Jerry',
    description: 'A high-performance configuration validator written in Rust that supports multiple configuration formats.',
    technologies: ['Rust', 'TOML', 'YAML', 'JSON'],
    primaryTech: 'Rust',
    category: 'Low Level',
    icon: <Cpu className="w-6 h-6" />,
    color: 'from-rose-400 to-red-500',
    links: {
      github: 'https://github.com/cjanowski/toml-and-jerry'
    }
  }
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 section-padding relative z-10">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="flex flex-col items-center justify-center mb-16"
        >
          <span className="text-secondary-600 font-semibold tracking-wider text-sm uppercase mb-3">Portfolio</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight text-center">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, isInView }: { project: Project, index: number, isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
      className="group h-full"
    >
      <div className="glass-card h-full flex flex-col hover:-translate-y-2 transition-transform duration-300">
        {/* Header Icon & Links */}
        <div className="flex items-start justify-between mb-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${project.color} text-white shadow-lg shadow-gray-200`}>
            {project.icon}
          </div>

          <div className="flex gap-2">
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-white/50 text-gray-600 hover:text-gray-900 hover:bg-white shadow-sm transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            {project.links.demo && (
              <motion.a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-white/50 text-gray-600 hover:text-gray-900 hover:bg-white shadow-sm transition-colors"
                aria-label="Live Demo"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
          <span className="text-xs font-semibold text-secondary-600 uppercase tracking-widest mb-2 block">{project.category}</span>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6 font-light">
            {project.description}
          </p>
        </div>

        {/* Footer (Technologies) */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/60 text-gray-600 border border-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}