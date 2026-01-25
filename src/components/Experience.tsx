'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react'
import LEDIndicator from './LEDIndicator'
import ComponentChip from './ComponentChip'
import CircuitTrace from './CircuitTrace'

interface ExperienceItem {
  company: string
  position: string
  duration: string
  location?: string
  achievements: string[]
  active?: boolean
}

const experiences: ExperienceItem[] = [
  {
    company: "Abre",
    position: "Software Engineer II | Full Stack",
    duration: "Jan 2024 - Present",
    active: true,
    achievements: [
      "Spearheaded the development of a cloud-native data integration platform on Google Cloud Platform (GCP) that ingested 150+ education formats via secure APIs/SFTP into BigQuery, which reduced database load by 40%.",
      "Fortified data security by containerizing SFTP servers with Docker and Terraform; implemented strict IP allow-lists and key-based authentication, resolving 4 critical vulnerabilities.",
      "Engineered a Golang ingestion pipeline in GCP, processing 45+GB zip files and encoding thousands, reducing manual processing by 10+ hours monthly, and improving application availability.",
      "Authored detailed documentation for GCP cloud infrastructure utilizing Terraform, slashing new engineer onboarding time by 50% and accelerating project integration by 30% within the team.",
      "Led the creation of detailed API documentation, including SFTP protocols, enabling new engineers to deploy code within the first week, improving initial productivity.",
      "Developed a structured behavioral interview question set, decreasing time-to-hire by 15% for Software and Data Engineer roles across six-round interview processes; improved candidate quality scores by 20%.",
      "Championed a bi-weekly code review program, personally reviewing 30+ pull requests monthly across all experience levels, resulting in a 30% reduction in pre-deployment holds.",
      "Collaborated with cross-functional teams to resolve integration complexities, achieving consistent sub-24-hour resolution times for P1 tickets and fostering greater trust across the organization."
    ]
  },
  {
    company: "Total Expert",
    position: "Engineer II QA/SDET",
    duration: "Jun 2021 - Dec 2023",
    active: false,
    achievements: [
      "Maintained email deliverability for over 10 million daily fintect emails, supporting ongoing marketing campaigns and maintaining 99.98% platform uptime with zero downtime incidents on AWS.",
      "Implemented a suite of Python/SQL scripts for automated log analysis, enabling rapid detection of anomalies and reduced the number of high-priority escalations by 20% within six months. Monitored on DataDog and AWS.",
      "Optimized SQL queries and database schemas in SQL, leading to a 50% reduction in query execution times and improved overall system performance."
    ]
  },
  {
    company: "Apple Inc",
    position: "Software Engineer | Wireless/Cellular",
    duration: "Jul 2015 - Jun 2021",
    active: false,
    achievements: [
      "Engineered Python scripts leveraging regular expressions and pattern matching, enabling rapid identification of urgent VIP wireless support tickets, reducing executive escalation response times to less than four hours.",
      "Designed and maintained real-time Splunk dashboards visualizing geospatial wireless Key Performance Indicators (KPIs) across major U.S. carriers, cutting issue investigation time by 30% and improving network performance."
    ]
  }
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [expandedItems, setExpandedItems] = useState<number[]>([0])

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

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
            <CircuitTrace width={80} height={2} color="#3b82f6" />
          </div>

          <LEDIndicator color="blue" state="pulse" />
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight text-center">
            Work
            <span className="gradient-title-experience block">Experience</span>
          </h2>
          <LEDIndicator color="blue" state="pulse" />

          {/* Right ornament */}
          <div className="absolute -right-24 top-1/2 -translate-y-1/2 hidden xl:block">
            <CircuitTrace width={80} height={2} color="#3b82f6" />
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main Circuit Trace Timeline */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-pcb-copper-500/20 md:left-8">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : { height: 0 }}
              transition={{ duration: 1.5, ease: "linear" }}
              className="w-full bg-pcb-copper-500 shadow-[0_0_10px_rgba(184,134,11,0.5)]"
            />
          </div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative mb-12 last:mb-0 pl-20 md:pl-24"
            >
              {/* Solder Point Connector */}
              <div className="absolute left-[19px] md:left-[27px] top-8 w-4 h-4 rounded-full border-4 border-gray-900 bg-pcb-copper-300 z-10 shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                <div className="absolute inset-0 rounded-full bg-white/50 animate-pulse" />
              </div>

              {/* Connecting Trace */}
              <div className="absolute left-[24px] md:left-[32px] top-[38px] w-14 md:w-16 h-1 bg-pcb-copper-500/50" />

              <ComponentChip
                className="w-full"
                label={`JOB_ID_${experiences.length - index}`}
                pins="left-right"
              >
                <div
                  className="cursor-pointer group"
                  onClick={() => toggleExpanded(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <LEDIndicator color={exp.active ? 'green' : 'blue'} state={exp.active ? 'pulse' : 'on'} size="sm" />
                        <span className={`text-xs font-mono font-bold tracking-wider ${exp.active ? 'text-green-400' : 'text-blue-400'}`}>
                          {exp.active ? 'CURRENT_ROLE' : 'ARCHIVED_ROLE'}
                        </span>
                      </div>

                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-1 group-hover:text-pcb-copper-300 transition-colors">
                        {exp.position}
                      </h3>
                      <p className="text-lg font-semibold text-gray-400 mb-2 font-mono">
                        @{exp.company}
                      </p>

                      <div className="flex items-center gap-4 text-gray-500 text-sm font-mono">
                        <div className="flex items-center gap-1 bg-gray-900/50 px-2 py-1 rounded">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      className="ml-4 p-2 rounded-full border border-gray-700 bg-gray-900 hover:border-pcb-copper-500 transition-colors"
                      animate={{ rotate: expandedItems.includes(index) ? 180 : 0 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.button>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedItems.includes(index) ? 'auto' : 0,
                      opacity: expandedItems.includes(index) ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gray-700/50 mt-4">
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-3 text-sm text-gray-300">
                            <span className="mt-1.5 text-pcb-copper-500 text-xs">0x{achIndex}:</span>
                            <p className="leading-relaxed font-mono text-xs md:text-sm opacity-90">
                              {achievement}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </ComponentChip>
            </motion.div>
          ))}
        </div>

        {/* Additional Circuit Traces */}
        <div className="absolute top-1/3 right-16 hidden xl:block">
          <CircuitTrace width={110} height={2} color="#a855f7" delay={0.4} />
        </div>
        <div className="absolute bottom-1/4 left-12 hidden xl:block">
          <CircuitTrace width={130} height={2} color="#ef4444" delay={0.9} />
        </div>
      </div>
    </section>
  )
}