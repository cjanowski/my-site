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
}

const education: EducationItem[] = [
  {
    institution: "University of the People",
    degree: "BS, Computer Science",
    duration: "Jan 2023 - Dec 2027",
    status: "In Progress - 3rd year",
    details: "Achievements: Student Ambassador"
  },
  {
    institution: "Woz-U",
    degree: "Technical Diploma - Data Science",
    duration: "Feb 2020 - Dec 2020",
    status: "Graduated",
    details: "Achievements: Graduated"
  },
  {
    institution: "Regis University",
    degree: "Bachelor of Science - BS, Computer Science",
    duration: "Jan 2017 - Feb 2018",
    status: "Intro to CS, Programming I/II, and CS Math",
    details: "Studied Computer Science fundamentals"
  }
]

export default function Education() {
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
          <span className="gradient-title-education">Education</span>
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative mb-8 last:mb-0"
            >
              {/* Timeline line */}
              {index < education.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-full bg-gradient-to-b from-violet-300 to-purple-300" />
              )}
              
              {/* Timeline dot */}
              <motion.div 
                whileHover={{ scale: 1.2 }}
                className="absolute left-4 top-8 w-4 h-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full ring-4 ring-violet-100 shadow-lg"
              />
              
              <div className="ml-16">
                <motion.div 
                  className="glass-tile rounded-2xl p-6 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -3 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <GraduationCap className="w-6 h-6" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-lg font-semibold text-blue-600 mb-2">
                        {edu.institution}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <motion.span 
                            className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                              edu.status === 'Graduated' 
                                ? 'bg-green-100 text-green-700 border border-green-200' 
                                : 'bg-blue-100 text-blue-700 border border-blue-200'
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {edu.status}
                          </motion.span>
                        </div>
                      </div>
                      
                      {edu.details && (
                        <p className="text-gray-600">
                          {edu.details}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}