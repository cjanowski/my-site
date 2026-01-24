'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Calendar, Award } from 'lucide-react'
import ComponentChip from './ComponentChip'
import LEDIndicator from './LEDIndicator'

interface EducationItem {
  institution: string
  degree: string
  duration: string
  status: string
  details?: string
  dateCode: string
}

const education: EducationItem[] = [
  {
    institution: "Woz U",
    degree: "Bootcamp - Data Science",
    duration: "Feb 2020 - Dec 2020",
    status: "Certified",
    details: "Achievements: Graduated",
    dateCode: "2020-12-CERT"
  },
  {
    institution: "Regis University",
    degree: "Bachelor of Science - BS, Computer Science",
    duration: "Jan 2017 - Feb 2018",
    status: "Foundations",
    details: "CS Foundations, Data Structures, and Algorithms",
    dateCode: "2018-02-UNDG"
  }
]

export default function Education() {
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
          <LEDIndicator color="amber" state="on" />
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight text-center">
            <span className="gradient-title-education">Education</span>
          </h2>
          <LEDIndicator color="amber" state="on" />
        </motion.div>

        <div className="max-w-3xl mx-auto relative px-4">
          {/* Timeline Background */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-1 bg-pcb-copper-500/20">
            {/* Decorative Vias along the line */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-pcb-copper-500 bg-gray-900" style={{ top: `${i * 25}%` }} />
            ))}
          </div>

          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative mb-12 last:mb-0 pl-16 md:pl-20"
            >
              {/* Connector from Timeline */}
              <div className="absolute left-[24px] md:left-[32px] top-[40px] w-10 md:w-12 h-1 bg-pcb-copper-500/50" />
              <div className="absolute left-[20px] md:left-[28px] top-[35px] w-3 h-3 rounded-full bg-pcb-copper-300 shadow-[0_0_10px_rgba(184,134,11,0.5)] z-10" />

              <ComponentChip
                label={`CERT_MOD_${index + 1}`}
                id={edu.dateCode}
                pins="left-right"
              >
                <div className="p-6 md:p-8 hover:bg-white/5 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex w-12 h-12 rounded-sm bg-gradient-to-br from-violet-900 to-purple-900 border border-violet-500/30 items-center justify-center text-violet-300 shadow-lg flex-shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight">
                          {edu.degree}
                        </h3>
                        <LEDIndicator color="green" state="on" size="sm" className="hidden sm:flex" />
                      </div>

                      <p className="text-lg font-semibold text-violet-300 mb-3 font-mono">
                        {edu.institution}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-4 font-mono">
                        <div className="flex items-center gap-1 bg-gray-900/50 px-2 py-1 rounded-sm border border-gray-700">
                          <Calendar className="w-3 h-3" />
                          <span>{edu.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3 text-pcb-copper-500" />
                          <span className="text-gray-300">{edu.status}</span>
                        </div>
                      </div>

                      {edu.details && (
                        <div className="text-sm text-gray-400 border-l border-gray-700 pl-3">
                          {edu.details}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ComponentChip>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}