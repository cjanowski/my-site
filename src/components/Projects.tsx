'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, ExternalLink, Bot, Cpu, Globe, Server } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  primaryTech: string
  category: 'ML Systems' | 'Low Level' | 'Web Application' | 'Infrastructure/DevOps'
  icon: React.ReactNode
  color: {
    primary: string
    secondary: string
  }
  links: {
    github: string
    demo?: string
  }
  stats?: {
    label: string
    value: string
  }[]
  features: string[]
}

const projects: Project[] = [
  {
    id: 'logs-and-alerting',
    title: 'Logs-and-Alerting',
    description: 'Log Parser with alerting configs',
    longDescription: 'A robust log parsing system with configurable alerting mechanisms for real-time monitoring and incident response.',
    technologies: ['Python', 'Regex', 'YAML', 'Logging', 'Alerting', 'JSON'],
    primaryTech: 'Python',
    category: 'Infrastructure/DevOps',
    icon: <Server className="w-6 h-6" />,
    color: {
      primary: 'bg-gradient-to-r from-orange-600 to-amber-600',
      secondary: 'bg-orange-100'
    },
    links: {
      github: 'https://github.com/cjanowski/Logs-and-Alerting'
    },
    stats: [
      { label: 'Alert Speed', value: '<1s' },
      { label: 'Log Processing', value: '10k/s' }
    ],
    features: [
      'Real-time log parsing',
      'Custom alert configurations',
      'Pattern matching engine',
      'Multi-source integration'
    ]
  },
  {
    id: 'k8s-python-argocd',
    title: 'K8s Python ArgoCD',
    description: 'Deployment Boilerplate',
    longDescription: 'A complete infrastructure-as-code solution for deploying and managing backend applications in production using Kubernetes orchestration and ArgoCD for continuous delivery.',
    technologies: ['Python', 'Kubernetes', 'ArgoCD', 'Docker', 'Helm', 'GitOps'],
    primaryTech: 'Kubernetes',
    category: 'Infrastructure/DevOps',
    icon: <Server className="w-6 h-6" />,
    color: {
      primary: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      secondary: 'bg-blue-100'
    },
    links: {
      github: 'https://github.com/cjanowski/k8s-python-argocd'
    },
    stats: [
      { label: 'Deployment Time', value: '<5min' },
      { label: 'Uptime', value: '99.9%' }
    ],
    features: [
      'GitOps continuous delivery',
      'Auto-scaling backend services',
      'Infrastructure as code',
      'Multi-environment support'
    ]
  },
  {
    id: 'scrapy-play',
    title: 'Scrapy Play',
    description: 'Data Collection and Analytics',
    longDescription: 'A powerful web scraping framework for collecting, processing, and analyzing data from various online sources with robust error handling and rate limiting.',
    technologies: ['Python', 'Scrapy', 'BeautifulSoup', 'Pandas', 'SQLite', 'Redis'],
    primaryTech: 'Python',
    category: 'ML Systems',
    icon: <Bot className="w-6 h-6" />,
    color: {
      primary: 'bg-gradient-to-r from-purple-600 to-pink-600',
      secondary: 'bg-purple-100'
    },
    links: {
      github: 'https://github.com/cjanowski/scrapy_play'
    },
    stats: [
      { label: 'Pages/Hour', value: '10k+' },
      { label: 'Success Rate', value: '98%' }
    ],
    features: [
      'Intelligent rate limiting',
      'Multi-site support',
      'Data validation pipeline',
      'Analytics dashboard'
    ]
  },
  {
    id: 'proxy-rot',
    title: 'Proxy Rotation',
    description: 'Proxy Creation and Rotation',
    longDescription: 'Dynamic proxy rotation system for managing and cycling through multiple proxy servers to ensure reliable and anonymous web requests.',
    technologies: ['Python', 'Proxy', 'Requests', 'Threading', 'IP Rotation', 'API'],
    primaryTech: 'Python',
    category: 'Infrastructure/DevOps',
    icon: <Server className="w-6 h-6" />,
    color: {
      primary: 'bg-gradient-to-r from-cyan-600 to-teal-600',
      secondary: 'bg-cyan-100'
    },
    links: {
      github: 'https://github.com/cjanowski/proxy-rot'
    },
    stats: [
      { label: 'Proxies', value: '100+' },
      { label: 'Rotation Time', value: '<100ms' }
    ],
    features: [
      'Automatic proxy rotation',
      'Health check monitoring',
      'Load balancing',
      'Failover support'
    ]
  },
  {
    id: 'ragzzy',
    title: 'Ragzzy',
    description: 'Customer service at its best',
    longDescription: 'A full-stack customer service platform featuring real-time communication, intelligent routing, and comprehensive analytics dashboard powered by modern web technologies.',
    technologies: ['JavaScript', 'Node.js', 'React', 'Express', 'MongoDB', 'Socket.io'],
    primaryTech: 'JavaScript',
    category: 'Web Application',
    icon: <Globe className="w-6 h-6" />,
    color: {
      primary: 'bg-gradient-to-r from-green-600 to-emerald-600',
      secondary: 'bg-green-100'
    },
    links: {
      github: 'https://github.com/cjanowski/ragzzy'
    },
    stats: [
      { label: 'Response Time', value: '<200ms' },
      { label: 'Uptime', value: '99.9%' }
    ],
    features: [
      'Real-time messaging',
      'Intelligent ticket routing',
      'Analytics dashboard',
      'Multi-channel support'
    ]
  },
  {
    id: 'toml-and-jerry',
    title: 'TOML and Jerry',
    description: 'Polyglot config validator',
    longDescription: 'A high-performance configuration validator written in Rust that supports multiple configuration formats and provides comprehensive validation and linting capabilities.',
    technologies: ['Rust', 'TOML', 'YAML', 'JSON', 'CLI', 'Validation'],
    primaryTech: 'Rust',
    category: 'Low Level',
    icon: <Cpu className="w-6 h-6" />,
    color: {
      primary: 'bg-gradient-to-r from-red-600 to-orange-600',
      secondary: 'bg-red-100'
    },
    links: {
      github: 'https://github.com/cjanowski/toml-and-jerry'
    },
    stats: [
      { label: 'Performance', value: '50x faster' },
      { label: 'Formats', value: '10+' }
    ],
    features: [
      'Multi-format support',
      'Schema validation',
      'Custom rule engine',
      'Zero-copy parsing'
    ]
  }
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 section-padding glass-section-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Featured
            <span className="gradient-title-projects block">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing innovative solutions across backend infrastructure, systems programming, and web development
          </p>
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

interface ProjectCardProps {
  project: Project
  index: number
  isInView: boolean
}

function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
      transition={{
        duration: 0.7,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 10
      }}
      className="group"
    >
      <div className="glass-tile rounded-2xl p-8 h-full flex flex-col transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className={`w-14 h-14 rounded-2xl ${project.color.primary} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
            {project.icon}
          </div>
          <div className="flex gap-3">
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-300"
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
                className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-green-600 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${project.color.secondary} text-gray-700 border border-gray-200`}>
            {project.category}
          </span>
        </div>

        {/* Title and Description */}
        <div className="mb-6 flex-grow">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {project.description}
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        {/* Stats */}
        {project.stats && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {project.stats.map((stat, statIndex) => (
              <div key={statIndex} className="text-center">
                <div className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Features</h4>
          <div className="space-y-2">
            {project.features.slice(0, 3).map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                <div className={`w-1.5 h-1.5 rounded-full ${project.color.primary} mr-3`} />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: (index * 0.2) + (techIndex * 0.1) }}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${tech === project.primaryTech
                    ? `${project.color.primary} text-white shadow-md`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}