'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Calendar, Award } from 'lucide-react'

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
    degree: "Data Science Certificate",
    duration: "Feb 2020 - Dec 2020",
    status: "Certified",
    details: "Achievements: Graduated",
    dateCode: "2020-12-CERT"
  },
  {
    institution: "Regis University",
    degree: "Bachelor of Science - BS, Computer Science",
    duration: "Jan 2017 - Feb 2018",
    status: "CS Foundations",
    details: "CS Foundations, Data Structures, and Algorithms",
    dateCode: "2018-02-UNDG"
  }
]

export default function Education() {
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
          <span className="text-secondary-600 font-semibold tracking-wider text-sm uppercase mb-3">Learning</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight text-center">
            Academic <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative px-4">
          {/* Clean Timeline Background */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-200 via-secondary-200 to-transparent">
          </div>

          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative mb-12 last:mb-0 pl-16 md:pl-20"
            >
              <div className="absolute left-[18px] md:left-[26px] top-8 w-6 h-6 rounded-full border-4 border-[#f8fafc] bg-primary-400 z-10 shadow-sm shadow-primary-500/30 w-3 h-3 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              <div className="glass-card hover:-translate-y-1 transition-transform duration-300">
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-500 items-center justify-center text-white shadow-lg shadow-primary-500/20 flex-shrink-0">
                      <GraduationCap className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                          {edu.degree}
                        </h3>
                      </div>

                      <p className="text-lg font-semibold text-primary-600 mb-4">
                        {edu.institution}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-4">
                        <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full border border-gray-100 font-medium">
                          <Calendar className="w-4 h-4 text-primary-500" />
                          <span>{edu.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full border border-gray-100 font-medium">
                          <Award className="w-4 h-4 text-secondary-500" />
                          <span>{edu.status}</span>
                        </div>
                      </div>

                      {edu.details && (
                        <div className="text-sm text-gray-600 border-l-2 border-primary-200 pl-4 py-1 leading-relaxed mt-2 bg-gradient-to-r from-primary-50 to-transparent">
                          {edu.details}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}