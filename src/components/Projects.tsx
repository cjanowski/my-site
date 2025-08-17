'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, ExternalLink, Bot, Cpu, Globe } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  primaryTech: string
  category: 'ML Systems' | 'Low Level' | 'Web Application'
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
    id: 'chimera',
    title: 'Project Chimera',
    description: 'Advanced ML Systems Design with Python-based distributed architecture',
    longDescription: 'A sophisticated machine learning systems framework designed for scalable model deployment and distributed training across multiple environments.',
    technologies: ['Python', 'TensorFlow', 'Docker', 'Kubernetes', 'Redis', 'PostgreSQL'],
    primaryTech: 'Python',
    category: 'ML Systems',
    icon: <Bot className="w-6 h-6" />,
    color: {
      primary: 'bg-gradient-to-r from-purple-600 to-pink-600',
      secondary: 'bg-purple-100'
    },
    links: {
      github: 'https://github.com/cjanowski/project-chimera'
    },
    stats: [
      { label: 'Models Deployed', value: '15+' },
      { label: 'Accuracy', value: '94.2%' }
    ],
    features: [
      'Distributed model training',
      'Real-time inference pipeline',
      'Automated model versioning',
      'Performance monitoring'
    ]
  },
  {
    id: 'cpp-110111',
    title: 'CPP-110111',
    description: 'Low-level C++ systems programming with advanced memory management',
    longDescription: 'A comprehensive systems programming project showcasing advanced C++ techniques, custom memory allocators, and high-performance computing patterns.',
    technologies: ['C++17', 'CMake', 'Boost', 'Intel TBB', 'Valgrind', 'GDB'],
    primaryTech: 'C++',
    category: 'Low Level',
    icon: <Cpu className="w-6 h-6" />,
    color: {
      primary: 'bg-gradient-to-r from-blue-600 to-cyan-600',
      secondary: 'bg-blue-100'
    },
    links: {
      github: 'https://github.com/cjanowski/CPP-110111'
    },
    stats: [
      { label: 'Performance', value: '300% faster' },
      { label: 'Memory Usage', value: '60% reduced' }
    ],
    features: [
      'Custom memory allocators',
      'Lock-free data structures',
      'SIMD optimizations',
      'Template metaprogramming'
    ]
  },
  {
    id: 'ragzzy',
    title: 'Ragzzy',
    description: 'Modern customer service application built with JavaScript and cloud architecture',
    longDescription: 'A full-stack customer service platform featuring real-time communication, intelligent routing, and comprehensive analytics dashboard.',
    technologies: ['JavaScript', 'Node.js', 'React', 'Express', 'MongoDB', 'Socket.io'],
    primaryTech: 'JavaScript',
    category: 'Web Application',
    icon: <Globe className="w-6 h-6" />,
    color: {
      primary: 'bg-gradient-to-r from-green-600 to-emerald-600',
      secondary: 'bg-green-100'
    },
    links: {
      github: 'https://github.com/cjanowski/ragzzy',
      demo: 'https://ragzzy-demo.vercel.app'
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
            Showcasing innovative solutions across machine learning, systems programming, and web development
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
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
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  tech === project.primaryTech 
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