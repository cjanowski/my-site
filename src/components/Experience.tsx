'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Calendar, MapPin } from 'lucide-react'

interface ExperienceItem {
  company: string
  position: string
  duration: string
  location?: string
  achievements: string[]
}

const experiences: ExperienceItem[] = [
  {
    company: "Abre",
    position: "Software Engineer",
    duration: "Jan 2024 - Present",
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
    position: "Software QA Engineer | Main App",
    duration: "Jun 2021 - Dec 2023",
    achievements: [
      "Improved email deliverability for over 10 million emails, supporting ongoing marketing campaigns and maintaining 99.98% platform uptime with zero downtime incidents on AWS.",
      "Implemented a suite of Python/SQL scripts for automated log analysis, enabling rapid detection of anomalies and reduced the number of high-priority escalations by 20% within six months. Monitored on DataDog and AWS.",
      "Optimized SQL queries and database schemas in SQL, leading to a 50% reduction in query execution times and improved overall system performance."
    ]
  },
  {
    company: "Apple Inc",
    position: "Data Engineer | CD | Wireless",
    duration: "Jul 2015 - Jun 2021",
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
    <section ref={ref} className="py-24 section-padding bg-apple-gray-50">
      <div className="container-max">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-apple-gray-800 mb-16 text-center"
        >
          Work
          <span className="text-gradient block">Experience</span>
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative mb-8 last:mb-0"
            >
              {/* Timeline line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-full bg-gradient-to-b from-apple-blue-500 to-apple-gray-300" />
              )}
              
              {/* Timeline dot */}
              <div className="absolute left-4 top-8 w-4 h-4 bg-apple-blue-500 rounded-full ring-4 ring-white shadow-lg" />
              
              <div className="ml-16">
                <div 
                  className="glass-effect rounded-2xl p-6 cursor-pointer hover:bg-white/90 transition-all duration-300"
                  onClick={() => toggleExpanded(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-apple-gray-800 mb-1">
                        {exp.position}
                      </h3>
                      <p className="text-lg font-semibold text-apple-blue-500 mb-2">
                        {exp.company}
                      </p>
                      <div className="flex items-center gap-4 text-apple-gray-500 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                    <button className="ml-4 p-2 rounded-full hover:bg-apple-gray-100 transition-colors">
                      {expandedItems.includes(index) ? (
                        <ChevronUp className="w-5 h-5 text-apple-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-apple-gray-500" />
                      )}
                    </button>
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
                    <div className="pt-4 border-t border-apple-gray-200 mt-4">
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-apple-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-apple-gray-600 leading-relaxed">
                              {achievement}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
