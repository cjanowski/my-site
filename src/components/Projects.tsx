'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, ExternalLink, Bot, Cpu, Globe, Server } from 'lucide-react'
import ComponentChip from './ComponentChip'
import LEDIndicator from './LEDIndicator'

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
    title: 'Logs-and-Alerting',
    description: 'A robust log parsing system with configurable alerting mechanisms for real-time monitoring and incident response.',
    technologies: ['Python', 'Regex', 'YAML', 'JSON'],
    primaryTech: 'Python',
    category: 'DevOps',
    icon: <Server className="w-5 h-5" />,
    color: 'amber',
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
    icon: <Server className="w-5 h-5" />,
    color: 'blue',
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
    icon: <Bot className="w-5 h-5" />,
    color: 'purple',
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
    icon: <Globe className="w-5 h-5" />,
    color: 'green',
    links: {
      github: 'https://github.com/cjanowski/ragzzy'
    }
  },
  {
    id: 'toml-and-jerry',
    title: 'TOML and Jerry',
    description: 'A high-performance configuration validator written in Rust that supports multiple configuration formats.',
    technologies: ['Rust', 'TOML', 'YAML', 'JSON'],
    primaryTech: 'Rust',
    category: 'Low Level',
    icon: <Cpu className="w-5 h-5" />,
    color: 'red',
    links: {
      github: 'https://github.com/cjanowski/toml-and-jerry'
    }
  }
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 section-padding relative">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <LEDIndicator color="green" state="pulse" />
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight text-center">
            Featured
            <span className="gradient-title-projects block">Projects</span>
          </h2>
          <LEDIndicator color="green" state="pulse" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
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
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="group"
    >
      <ComponentChip
        label={`REV.A.${index}`}
        id={project.id.toUpperCase()}
        pins="top-bottom"
        className="h-full"
      >
        <div className="p-6 h-full flex flex-col relative overflow-hidden group-hover:bg-white/5 transition-colors">

          {/* Header Row */}
          <div className="flex items-start justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-sm ${project.color === 'blue' ? 'bg-blue-900/50 text-blue-400 border border-blue-500/30' :
                  project.color === 'green' ? 'bg-green-900/50 text-green-400 border border-green-500/30' :
                    project.color === 'purple' ? 'bg-purple-900/50 text-purple-400 border border-purple-500/30' :
                      project.color === 'amber' ? 'bg-amber-900/50 text-amber-400 border border-amber-500/30' :
                        'bg-red-900/50 text-red-400 border border-red-500/30'
                }`}>
                {project.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-pcb-copper-300 transition-colors">
                  {project.title}
                </h3>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{project.category}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-sm bg-gray-800 border border-gray-600 text-gray-400 hover:text-white hover:border-pcb-copper-500 transition-all"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              {project.links.demo && (
                <motion.a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-sm bg-gray-800 border border-gray-600 text-gray-400 hover:text-green-400 hover:border-green-500 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </div>

          <p className="text-gray-400 mb-6 leading-relaxed flex-grow font-mono text-sm border-l-2 border-gray-800 pl-4 relative z-10">
            {project.description}
          </p>

          <div className="mt-auto relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <LEDIndicator color={project.color as any} state="pulse" size="sm" />
              <span className="text-[10px] text-gray-500 font-mono">STATUS: ACTIVE</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-[10px] font-mono rounded-sm bg-gray-900 border border-gray-700 text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Background Circuit Pattern */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <path d="M50,200 L50,150 L100,100 L200,100" stroke="currentColor" fill="none" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </ComponentChip>
    </motion.div>
  )
}